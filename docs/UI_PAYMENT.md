# UI & Payment handoff

Nhánh triển khai: `feat/ui-payment`.

## File do UI/payment quản lý

- `script.js`: render storefront, giỏ hàng, form checkout và trạng thái giao diện.
- `checkout.js`: adapter duy nhất giữa frontend và `POST /api/orders`.
- `style.css`, `catalog.css`: style storefront/checkout.
- HTML ở thư mục gốc: chỉ bootstrap CSS/JS và `data-page`.

Không đặt API key, secret, thông tin ngân hàng nhạy cảm hay logic xác nhận thanh toán trong các file frontend.

## Luồng checkout

1. Khách chọn sản phẩm và quy cách; giỏ hàng lưu localStorage.
2. Khách nhập thông tin nhận hàng và chọn COD hoặc chuyển khoản.
3. Frontend map quy cách sang SKU và tạo payload chỉ gồm `sku`, `quantity` và thông tin nhận hàng.
4. Nếu có `window.MOC_MIEN_API_BASE_URL`, frontend gọi `POST /api/orders`.
5. Backend tự tính lại giá/tổng tiền và trả mã đơn + trạng thái thanh toán.
6. Nếu chưa có backend, giao diện giữ fallback gửi nội dung đơn qua Zalo; không đánh dấu đã thanh toán.

## Cấu hình môi trường

Host frontend inject trước `checkout.js`:

```html
<script>
  window.MOC_MIEN_API_BASE_URL = 'https://api.example.com';
</script>
```

Giá trị thật của production nên do quy trình deploy cung cấp. Không commit secret.

## Điểm ghép với Sơn và Phúc

- Sơn cung cấp schema/migration và API auth; checkout không phụ thuộc đăng nhập để khách vẫn mua không cần tài khoản.
- Cường dùng đúng contract trong `docs/API_CONTRACT.md`; thay đổi payload phải sửa contract cùng PR.
- Phúc cấu hình domain backend, HTTPS và CORS cho domain frontend.


## Phụ thuộc PR auth/database

Phần backend order/payment trong nhánh này dùng các class `Product`, `Order`, `OrderItem`, `Payment` từ PR auth/database của Sơn. Không copy các model đó sang nhánh UI để tránh conflict.

Sau khi PR auth/database merge vào `main`, cập nhật nhánh này từ `main`, sau đó thêm `orders_router` vào `src/main.py` theo hướng dẫn trong `backend/src/orders/README.md`.

Schema hiện tại được giữ nguyên: một biến thể bán hàng tương ứng một SKU/row trong bảng `products`.
