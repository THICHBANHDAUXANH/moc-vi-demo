# Orders API

Phần này dùng schema do nhánh `feat/auth` cung cấp trong `src/db/models.py`.

## Contract hiện tại

Frontend gửi SKU thay vì `product_id + variant`:

```json
{
  "items": [
    {"sku": "TRA-TD-DB-100G", "quantity": 2}
  ],
  "customer": {
    "name": "Nguyen Van A",
    "phone": "0900000000",
    "address": "Ha Noi"
  },
  "payment_method": "cod",
  "note": ""
}
```

Server tra `products.sku`, lấy giá từ database, tính lại tổng tiền, tạo `orders`, `order_items`, `payments` và (nếu có) `order_notes`.

## Sau khi PR auth/database được merge

Trong `src/main.py`, import router **trước** `Base.metadata.create_all(...)` để model `OrderNote` được đăng ký:

```python
from src.orders.router import router as orders_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="API Mộc Miên")
app.include_router(auth_router)
app.include_router(orders_router)
```

Không copy hoặc tạo lại các class `Product`, `Order`, `OrderItem`, `Payment` trong thư mục này.
