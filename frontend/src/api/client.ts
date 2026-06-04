const API_BASE_URL = "http://localhost:8000";

export async function api<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        options
    );

    if (!response.ok) {
        throw new Error(
            `${response.status}`
        );
    };

    return response.json();
}