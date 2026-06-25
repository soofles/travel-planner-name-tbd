import { api } from "./client"
import type { OkResponse } from "./client"
import type { Trip } from "../types/Trip"

export interface TripRequest {
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    budget: number;
}

export async function createTrip(input: TripRequest): Promise<Trip> {
    return api<Trip>("/trips", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
    });
}

export async function getTrips(): Promise<Trip[]> {
    return api<Trip[]>("/trips", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function getTrip(id: number): Promise<Trip> {
    return api<Trip>(`/trips/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function updateTrip(id: number, input: TripRequest): Promise<Trip> {
    return api<Trip>(`/trips/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
    });
}

export async function deleteTrip(id: number): Promise<OkResponse> {
    return api<OkResponse>(`/trips/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
}