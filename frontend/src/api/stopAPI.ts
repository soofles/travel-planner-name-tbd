import { api } from "./client";
import type { OkResponse } from "./client";
import type { Stop } from "../types/Stop";

export interface StopRequest {
    name: string;
    category: string;
    description: string;
    address: string;
    latitude: number;
    longitude: number;
    cost: number;
    time_zone: string;
    arrival_time: string;
    departure_time: string;
}

export async function createStop(id: number, input: StopRequest): Promise<Stop> {
    return api<Stop>(`/trips/${id}/stops`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
    });
}

export async function getStops(id: number): Promise<Stop[]> {
    return api<Stop[]>(`/trips/${id}/stops`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function getStop(id: number): Promise<Stop> {
    return api<Stop>(`/stops/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function updateStop(id: number, input: StopRequest): Promise<Stop> {
    return api<Stop>(`/stops/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
    });
}

export async function deleteStop(id: number): Promise<OkResponse> {
    return api<OkResponse>(`/stops/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function reorderStops(id: number, input: number[]): Promise<OkResponse> {
    return api<OkResponse>(`/trips/${id}/stops/reorder`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: input }),
    });
}