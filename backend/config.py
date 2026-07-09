import os
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(override=False)

def get_api_key(name: str):
    key = os.getenv(name)
    if not key:
        raise RuntimeError(f"{name} Not Found")
    return key

def get_db_path():
    db_path = Path(os.getenv("TRIPS_DB_PATH", "./trips.db")).resolve()

    db_path.parent.mkdir(
        parents=True,
        exist_ok=True,
    )

    return db_path