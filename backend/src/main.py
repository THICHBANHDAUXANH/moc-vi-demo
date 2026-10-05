from fastapi import FastAPI
from src.db.database import engine, Base
from src.auth.router import router as auth_router

# Lệnh này sẽ tự động tạo tất cả các model đã được import/đăng ký (users, products, orders, payments)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="API Mộc Miên")

app.include_router(auth_router)