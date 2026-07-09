from sqlmodel import SQLModel, create_engine, Session
from config import get_db_path

db_path = get_db_path()
DATABASE_URL = f"sqlite:///{db_path}"

print(f"Database Path: {db_path}")

engine = create_engine(
    DATABASE_URL,
    echo=True,
    connect_args={"check_same_thread": False}
)

def init_db():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session