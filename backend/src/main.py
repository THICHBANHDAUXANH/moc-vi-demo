import os

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.orm import Session

from src.db.database import engine, Base, get_db
from src.auth.router import router as auth_router
from src.orders.router import router as orders_router

# Import routers before create_all so every model they depend on
# (including order_notes) is registered in SQLAlchemy metadata.
Base.metadata.create_all(bind=engine)

app = FastAPI(title="API Mộc Miên")


@app.get("/api/health", tags=["System"])
def health(db: Session = Depends(get_db)):
    db.execute(text("SELECT 1"))
    return {"status": "ok"}

default_cors_origins = ",".join(
    [
        "https://thichbanhdauxanh.github.io",
        "http://localhost:5500",
        "http://127.0.0.1:5500",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]
)
cors_origins = [
    origin.strip()
    for origin in os.getenv("CORS_ORIGINS", default_cors_origins).split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(orders_router)
