from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from src.db.database import get_db
from src.db.models import User
from src.auth.utils import get_password_hash, verify_password, create_access_token, decode_token

router = APIRouter(prefix="/api/auth", tags=["Auth"])

class UserCreate(BaseModel):
    name: str
    phone_or_email: str
    password: str

class UserLogin(BaseModel):
    phone_or_email: str
    password: str

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.phone_or_email == user.phone_or_email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Tài khoản đã tồn tại")
    
    hashed_password = get_password_hash(user.password)
    new_user = User(name=user.name, phone_or_email=user.phone_or_email, password_hash=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"user_id": new_user.id}

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.phone_or_email == user.phone_or_email).first()
    if not db_user or not verify_password(user.password, db_user.password_hash):
        raise HTTPException(status_code=401, detail="Thông tin đăng nhập không chính xác")
    
    access_token = create_access_token(data={"sub": str(db_user.id)})
    return {"access_token": access_token, "user_id": db_user.id}

@router.get("/me")
def get_current_user(user_id: int = Depends(decode_token), db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="Người dùng không tồn tại")
    return {
        "user_id": db_user.id, 
        "name": db_user.name, 
        "phone_or_email": db_user.phone_or_email
    }