import time
import requests

GEOCODING_URL = "https://nominatim.openstreetmap.org/search"

HEADERS = {
    "User-Agent": "Enroute/0.1 (soph@soofles.me)"
}

class GeocodeError(Exception):
    pass

def geocoding(
    address: str,
    max_retries: int = 3,
    timeout: int = 10
):
    for attempt in range(max_retries):
        try:
            res = requests.get(
                GEOCODING_URL,
                params = {
                    "q": address,
                    "format": "jsonv2",
                    "limit": 1,
                },
                headers = HEADERS,
                timeout = timeout,
            )
            if res.status_code == 429:
                if attempt < max_retries - 1:
                    time.sleep(2 ** attempt)
                    continue
                raise GeocodeError("ERROR: Rate Limited (Nominatim)")
            res.raise_for_status()
            result = res.json()
            if not result:
                return None
            return {
                "latitude": float(result[0]["lat"]),
                "longitude": float(result[0]["lon"]),
            }
        except requests.Timeout:
            if attempt < max_retries - 1:
                time.sleep(2 ** attempt)
                continue
            raise GeocodeError("ERROR: Request Timed Out (Nominatim Geocoding)")
        except requests.RequestException as e:
            if attempt < max_retries - 1:
                time.sleep(2 ** attempt)
                continue
            raise GeocodeError(f"ERROR: Geocoding Failed; {str(e)}")
    raise GeocodeError("ERROR: Geocoding Failed")