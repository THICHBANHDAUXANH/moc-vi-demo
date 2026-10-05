from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

# 1. BẢNG NGƯỜI DÙNG (Phần của Sơn)
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    phone_or_email = Column(String(100), unique=True, index=True)
    password_hash = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow)

    # Liên kết 1-Nhiều với bảng Orders
    orders = relationship("Order", back_populates="user")


# 2. BẢNG SẢN PHẨM
# Server cần bảng này để "tự tra giá hiện hành và tính lại tổng tiền"[cite: 2]
class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200)) # Ví dụ: Cà phê Gia Lai 100%
    sku = Column(String(50), unique=True, index=True) # Mã quy cách (ví dụ: CAPHE-GL-250G)
    price = Column(Integer)
    
    order_items = relationship("OrderItem", back_populates="product")


# 3. BẢNG ĐƠN HÀNG (Phần của Cường)
class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    # user_id cho phép NULL vì "Chưa buộc khách phải tạo tài khoản để đặt hàng"[cite: 2]
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True) 
    
    # Thông tin liên hệ bắt buộc đi kèm đơn (đề phòng khách vãng lai)
    guest_name = Column(String(100))
    guest_contact = Column(String(100))
    shipping_address = Column(Text)
    
    total_amount = Column(Integer)
    payment_method = Column(String(50)) # 'cod' hoặc 'bank_transfer'[cite: 2]
    status = Column(String(50), default="pending") # pending, confirmed, shipping, completed, cancelled
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="orders")
    items = relationship("OrderItem", back_populates="order")
    payment = relationship("Payment", back_populates="order", uselist=False) # Quan hệ 1-1


# 4. BẢNG CHI TIẾT ĐƠN HÀNG (Phần của Cường)
class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    
    quantity = Column(Integer)
    unit_price = Column(Integer) # Lưu lại giá của sản phẩm tại đúng thời điểm đặt mua

    order = relationship("Order", back_populates="items")
    product = relationship("Product", back_populates="order_items")


# 5. BẢNG THANH TOÁN (Phần của Cường)
class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), unique=True)
    amount = Column(Integer)
    
    # Trạng thái thanh toán chỉ cập nhật sau khi có xác nhận hợp lệ[cite: 2]
    status = Column(String(50), default="pending") # pending, success, failed
    transaction_reference = Column(String(255), nullable=True) # Mã giao dịch ngân hàng nếu có
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    order = relationship("Order", back_populates="payment")