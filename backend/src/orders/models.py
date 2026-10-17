from sqlalchemy import Column, ForeignKey, Integer, Text

from src.db.database import Base


class OrderNote(Base):
    __tablename__ = "order_notes"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), unique=True, nullable=False, index=True)
    note = Column(Text, nullable=False)
