from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


class OrderItemCreate(BaseModel):
    sku: str = Field(min_length=1, max_length=50)
    quantity: int = Field(ge=1, le=99)


class CustomerCreate(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    phone: str = Field(min_length=6, max_length=100)
    address: str = Field(min_length=1, max_length=500)


class OrderCreate(BaseModel):
    items: list[OrderItemCreate] = Field(min_length=1, max_length=50)
    customer: CustomerCreate
    payment_method: Literal["cod", "bank_transfer"]
    note: str | None = Field(default=None, max_length=500)


class OrderItemResponse(BaseModel):
    sku: str
    name: str
    quantity: int
    unit_price: int
    line_total: int


class PaymentResponse(BaseModel):
    status: str
    transaction_reference: str | None = None


class OrderResponse(BaseModel):
    id: int
    total_amount: int
    status: str
    payment_method: str
    created_at: datetime
    items: list[OrderItemResponse]
    payment: PaymentResponse
