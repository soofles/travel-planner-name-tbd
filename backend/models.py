from typing import Optional
from sqlmodel import SQLModel, Field

class Trip(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    description: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    budget: Optional[float] = None
    created_at: Optional[str] = None

class TripRequest(SQLModel):
    name: str
    description: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    budget: Optional[float] = None
    created_at: Optional[str] = None

class Stop(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    trip_id: int = Field(foreign_key="trip.id")
    sort_order: int
    name: str
    category: Optional[str] = None
    description: Optional[str] = None
    address: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    cost: Optional[float] = None
    time_zone: Optional[str] = None
    arrival_time: Optional[str] = None
    departure_time: Optional[str] = None

class StopRequest(SQLModel, table=True):
    name: str
    category: Optional[str] = None
    description: Optional[str] = None
    address: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    cost: Optional[float] = None
    time_zone: Optional[str] = None
    arrival_time: Optional[str] = None
    departure_time: Optional[str] = None

class StopReorder(SQLModel):
    ids: List[int]