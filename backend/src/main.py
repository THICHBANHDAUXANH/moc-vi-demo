from fastapi import FastAPI

from src.db.database import engine, Base
from src.auth.router import router as auth_router
from src.orders.router import router as orders_router

# Import routers before create_all so every model they depend on
# (including order_notes) is registered in SQLAlchemy metadata.
Base.metadata.create_all(bind=engine)

app = FastAPI(title="API Mộc Miên")

app.include_router(auth_router)
app.include_router(orders_router)
