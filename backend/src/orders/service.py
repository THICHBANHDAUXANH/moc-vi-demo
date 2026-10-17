from decimal import Decimal, ROUND_HALF_UP

from fastapi import HTTPException
from sqlalchemy.orm import Session

from src.db.models import Order, OrderItem, Product
from src.orders.catalog import ensure_catalog
from src.orders.models import OrderNote
from src.orders.schemas import OrderCreate
from src.payments.service import create_pending_payment


VND = Decimal("1")


def _vnd(value: object) -> Decimal:
    return Decimal(str(value)).quantize(VND, rounding=ROUND_HALF_UP)


def create_order(db: Session, payload: OrderCreate, user_id: int | None = None) -> dict:
    ensure_catalog(db)

    quantities: dict[str, int] = {}
    for item in payload.items:
        sku = item.sku.strip().upper()
        quantities[sku] = quantities.get(sku, 0) + item.quantity
        if quantities[sku] > 99:
            raise HTTPException(status_code=422, detail=f"Số lượng SKU {sku} vượt quá 99.")

    products = {
        product.sku: product
        for product in db.query(Product).filter(Product.sku.in_(list(quantities))).all()
    }
    missing = [sku for sku in quantities if sku not in products]
    if missing:
        raise HTTPException(
            status_code=400,
            detail="SKU không tồn tại: " + ", ".join(missing),
        )

    lines = []
    total = Decimal("0")
    for sku, quantity in quantities.items():
        product = products[sku]
        unit_price = _vnd(product.price)
        line_total = unit_price * quantity
        total += line_total
        lines.append((product, quantity, unit_price, line_total))

    order = Order(
        user_id=user_id,
        guest_name=payload.customer.name.strip(),
        guest_contact=payload.customer.phone.strip(),
        shipping_address=payload.customer.address.strip(),
        total_amount=int(total),
        payment_method=payload.payment_method,
        status="pending",
    )
    db.add(order)

    try:
        db.flush()

        for product, quantity, unit_price, _ in lines:
            db.add(
                OrderItem(
                    order_id=order.id,
                    product_id=product.id,
                    quantity=quantity,
                    unit_price=int(unit_price),
                )
            )

        if payload.note and payload.note.strip():
            db.add(OrderNote(order_id=order.id, note=payload.note.strip()))

        payment = create_pending_payment(db, order.id, total)
        db.commit()
        db.refresh(order)
    except Exception:
        db.rollback()
        raise

    return {
        "id": order.id,
        "total_amount": int(total),
        "status": order.status,
        "payment_method": order.payment_method,
        "created_at": order.created_at,
        "items": [
            {
                "sku": product.sku,
                "name": product.name,
                "quantity": quantity,
                "unit_price": int(unit_price),
                "line_total": int(line_total),
            }
            for product, quantity, unit_price, line_total in lines
        ],
        "payment": {
            "status": payment.status,
            "transaction_reference": payment.transaction_reference,
        },
    }
