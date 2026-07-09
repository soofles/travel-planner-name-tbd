from typing import List
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from sqlalchemy.exc import IntegrityError
from db import init_db, get_session
from geocoding import geocoding, GeocodeError
from routing import routing, RouteError
from models import Trip, TripRequest, Stop, StopRequest, StopReorder, Route

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "null",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    init_db()

@app.get("/")
def root():
    return {"status": "ok"}

@app.post("/trips")
def create_trip(
    trip_input: TripRequest,
    session: Session = Depends(get_session)
):
    trip = Trip.from_orm(trip_input)
    session.add(trip)
    session.commit()
    session.refresh(trip)
    return trip

@app.get("/trips", response_model=List[Trip])
def get_trips(
    session: Session = Depends(get_session)
):
    return session.exec(select(Trip)).all()

@app.get("/trips/{trip_id}", response_model=Trip)
def get_trip(
    trip_id: int,
    session: Session = Depends(get_session)
):
    trip = session.get(Trip, trip_id)
    if not trip:
            raise HTTPException(status_code=404, detail="Trip Not Found")
    return trip

@app.put("/trips/{trip_id}")
def update_trip(
    trip_id: int,
    trip_input: TripRequest,
    session: Session = Depends(get_session)
):
    trip = session.get(Trip, trip_id)
    if not trip:
        raise HTTPException(status_code=404, detail="Trip Not Found")
    for key, value in trip_input.dict().items():
        setattr(trip, key, value)
    session.add(trip)
    session.commit()
    session.refresh(trip)
    return trip

@app.delete("/trips/{trip_id}")
def delete_trip(
    trip_id: int,
    session: Session = Depends(get_session)
):
    trip = session.get(Trip, trip_id)
    if not trip:
        raise HTTPException(status_code=404, detail="Trip Not Found")
    stops = session.exec(select(Stop).where(Stop.trip_id == trip_id)).all()
    for stop in stops:
        session.delete(stop)
    session.delete(trip)
    session.commit()
    return {"ok": True}

@app.post("/trips/{trip_id}/stops")
def create_stop(
    trip_id: int,
    stop_input: StopRequest,
    session: Session = Depends(get_session)
):
    stops = session.exec(select(Stop).where(Stop.trip_id == trip_id)).all()
    next_stop = max([stop.sort_order for stop in stops], default=0) + 1
    stop = Stop(
        **stop_input.dict(),
        trip_id=trip_id,
        sort_order=next_stop
    )
    session.add(stop)
    session.commit()
    session.refresh(stop)
    return stop

@app.get("/trips/{trip_id}/stops", response_model=List[Stop])
def get_stops(
    trip_id: int,
    session: Session = Depends(get_session)
):
    return session.exec(select(Stop).where(Stop.trip_id == trip_id).order_by(Stop.sort_order)).all()

@app.get("/stops/{stop_id}", response_model=Stop)
def get_stop(
    stop_id: int,
    session: Session = Depends(get_session)
):
    stop = session.get(Stop, stop_id)
    if not stop:
        raise HTTPException(status_code=404, detail="Stop Not Found")
    return stop

@app.put("/stops/{stop_id}")
def update_stop(
    stop_id: int,
    stop_input: StopRequest,
    session: Session = Depends(get_session)
):
    stop = session.get(Stop, stop_id)
    if not stop:
        raise HTTPException(status_code=404, detail="Stop Not Found")
    new_address = stop_input.address
    old_address = stop.address
    for key, value in stop_input.dict().items():
        setattr(stop, key, value)
    if new_address != old_address:
        try:
            coordinates = geocoding(new_address)
        except GeocodeError as e:
            raise HTTPException(status_code=502, detail=str(e))
        stop.latitude = coordinates["latitude"]
        stop.longitude = coordinates["longitude"]
    session.add(stop)
    session.commit()
    session.refresh(stop)
    return stop

@app.delete("/stops/{stop_id}")
def delete_stop(
    stop_id: int,
    session: Session = Depends(get_session)
):
    stop = session.get(Stop, stop_id)
    if not stop:
        raise HTTPException(status_code=404, detail="Stop Not Found")
    session.delete(stop)
    session.commit()
    return {"ok": True}

@app.post("/trips/{trip_id}/stops/reorder")
def reorder_stops(
    trip_id: int,
    order: StopReorder,
    session: Session = Depends(get_session)
):
    stops = session.exec(select(Stop).where(Stop.trip_id == trip_id)).all()
    stop_map = {stop.id: stop for stop in stops}
    for index, stop_id in enumerate(order.ids):
        stop = stop_map.get(stop_id)
        if stop:
            stop.sort_order = index
    session.add_all(stops)
    session.commit()
    return {"ok": True}

@app.get("/stops/routes/{origin_id}/{destination_id}", response_model=Route)
def get_route(
    origin_id: int,
    destination_id: int,
    session: Session = Depends(get_session)
):
    origin = session.get(Stop, origin_id)
    destination = session.get(Stop, destination_id)
    if not origin or not destination:
        raise HTTPException(status_code=404, detail="Stop Not Found")
    if (
        origin.latitude is None or 
        origin.longitude is None or
        destination.latitude is None or
        destination.longitude is None
    ):
        raise HTTPException(status_code=400, detail="Coordinates Not Found")
    route = session.exec(select(Route).where(
        Route.origin_lat == origin.latitude,
        Route.origin_lon == origin.longitude,
        Route.destination_lat == destination.latitude,
        Route.destination_lon == destination.longitude,
        Route.profile == "driving-car",
    )).first()
    if route:
        return route
    try:
        data = routing(
            origin.latitude,
            origin.longitude,
            destination.latitude,
            destination.longitude,
        )
    except RouteError as e:
        raise HTTPException(status_code=502, detail=str(e))
    distance = data["distance_meters"]
    duration = data["duration_seconds"]
    route = Route(
        origin_lat = origin.latitude,
        origin_lon = origin.longitude,
        destination_lat = destination.latitude,
        destination_lon = destination.longitude,
        distance_meters = distance,
        duration_seconds = duration,
        profile = "driving-car",
    )
    try:
        session.add(route)
        session.commit()
        session.refresh(route)
    except IntegrityError:
        session.rollback()
        route = session.exec(select(Route).where(
            Route.origin_lat == origin.latitude,
            Route.origin_lon == origin.longitude,
            Route.destination_lat == destination.latitude,
            Route.destination_lon == destination.longitude,
            Route.profile == "driving-car",
        )).first()
    return route

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        app,
        host="127.0.0.1",
        port=8000,
    )