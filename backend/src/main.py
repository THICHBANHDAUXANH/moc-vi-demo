from fastapi import FastAPI
from src.db.database import engine, Base
from src.auth.router import router as auth_router

# Lệnh này sẽ tự động chạy vào database moc_vi_db để tạo bảng users
Base.metadata.create_all(bind=engine)

app = FastAPI(title="API Mộc Miên")

app.include_router(auth_router)