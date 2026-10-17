from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from src.auth.utils import decode_optional_token
from src.db.database import get_db
from src.orders.schemas import OrderCreate, OrderResponse
from src.orders.service import create_order


router = APIRouter(prefix="/api/orders", tags=["Orders"])


@router.post("", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
def create_order_endpoint(
    payload: OrderCreate,
    db: Session = Depends(get_db),
    user_id: int | None = Depends(decode_optional_token),
):
    return create_order(db, payload, user_id=user_id)
