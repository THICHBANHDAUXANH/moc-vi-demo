from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv

load_dotenv()

SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL") or "sqlite:///./moc_vi.db"

# SQLAlchemy 2.1 defaults PostgreSQL URLs to psycopg (v3), while this
# project installs psycopg2. Pin the driver explicitly for Render/Postgres.
if SQLALCHEMY_DATABASE_URL.startswith("postgres://"):
    SQLALCHEMY_DATABASE_URL = "postgresql+psycopg2://" + SQLALCHEMY_DATABASE_URL[len("postgres://"):]
elif SQLALCHEMY_DATABASE_URL.startswith("postgresql://"):
    SQLALCHEMY_DATABASE_URL = "postgresql+psycopg2://" + SQLALCHEMY_DATABASE_URL[len("postgresql://"):]

connect_args = {"check_same_thread": False} if SQLALCHEMY_DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args=connect_args, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
