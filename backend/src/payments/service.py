from decimal import Decimal

from sqlalchemy.orm import Session

from src.db.models import Payment


def create_pending_payment(db: Session, order_id: int, amount: Decimal) -> Payment:
    payment = Payment(
        order_id=order_id,
        amount=float(amount),
        status="pending",
        transaction_reference=None,
    )
    db.add(payment)
    db.flush()
    return payment
