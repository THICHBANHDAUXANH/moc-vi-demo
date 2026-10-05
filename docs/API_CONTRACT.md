# Hợp đồng API dự thảo

Tài liệu này là điểm thống nhất trước khi ba phần backend, checkout và frontend được nối với nhau. Tên route và framework có thể đổi trong PR đầu tiên, nhưng các bên phải cập nhật tài liệu cùng lúc.

## Đăng nhập — Sơn phụ trách

| Route dự kiến | Input | Output tối thiểu |
| --- | --- | --- |
| `POST /api/auth/register` | tên, số điện thoại hoặc email, mật khẩu | user ID; lỗi rõ nếu tài khoản đã tồn tại |
| `POST /api/auth/login` | thông tin đăng nhập, mật khẩu | phiên đăng nhập an toàn; user ID |
| `GET /api/auth/me` | phiên hiện tại | user ID và thông tin hồ sơ được phép hiển thị |

Chưa buộc khách phải tạo tài khoản để đặt hàng. Mật khẩu chỉ xử lý phía server và lưu dạng hash; không trả mật khẩu qua API.

## Đơn hàng và thanh toán — Cường phụ trách

| Route dự kiến | Input | Output tối thiểu |
| --- | --- | --- |
| `POST /api/orders` | `items[]` (`sku`, `quantity`), `customer` (`name`, `phone`, `address`), `payment_method` (`cod` hoặc `bank_transfer`), `note` | `id`, `total_amount` do server tính, `status`, `payment_method`, `items[]`, `payment` |
| `GET /api/orders/:id` | mã đơn, quyền truy cập hợp lệ | trạng thái đơn và thanh toán |

Server tự tra giá hiện hành và tính lại tổng tiền, không tin tổng tiền do trình duyệt gửi. Trạng thái thanh toán chỉ được cập nhật sau khi có xác nhận hợp lệ; chọn chuyển khoản không đồng nghĩa đã thanh toán. Cần thống nhất với Sơn các bảng `users`, `orders`, `order_items`, `payments` và migration tương ứng trước khi code.

Chưa chốt cổng thanh toán trực tuyến. Luồng hiện tại của shop là khách gửi đơn qua Zalo, rồi chủ shop xác nhận COD hoặc chuyển khoản. Nếu tích hợp cổng thanh toán về sau, Cường bổ sung webhook, kiểm tra chữ ký và chống xử lý trùng sự kiện ở phía server.

## Môi trường triển khai — Phúc phụ trách

Frontend cần một `API_BASE_URL` theo từng môi trường. Backend cần database URL và khóa bí mật qua biến môi trường của host; không ghi giá trị thật vào Git. Phúc ghi rõ domain thử, CORS, lệnh chạy/build, cách migrate và cách quay lại bản trước trong `infra/`.


### Quy ước frontend checkout

Frontend không gửi hoặc tin cậy đơn giá/tổng tiền. Mỗi quy cách bán hàng có một `products.sku` riêng; `checkout.js` chỉ gửi `sku` và `quantity`, backend tra SKU trong database rồi tự tính giá.

Nếu `payment_method = bank_transfer`, backend có thể trả thêm dữ liệu như `payment.qr_url`, `payment.checkout_url`, `payment.reference` hoặc thông tin tương đương. Không đặt số tài khoản, API key, checksum secret hoặc chữ ký webhook trong JavaScript phía trình duyệt.

Frontend đọc base URL từ `window.MOC_MIEN_API_BASE_URL`. Khi biến này chưa được cấu hình (ví dụ GitHub Pages hiện tại), checkout chạy chế độ demo/Zalo và không giả vờ rằng giao dịch đã thanh toán.

Trạng thái gợi ý: `order_status = pending|confirmed|cancelled|fulfilled`; `payment_status = unpaid|pending|paid|failed|refunded`. Chỉ backend/webhook hợp lệ được chuyển `payment_status` sang `paid`.


### Quy ước SKU với schema hiện tại

Không cần thêm cột `variant` vào bảng `products`. Mỗi quy cách là một row/SKU riêng, ví dụ `TRA-TD-DB-100G`, `TRA-TD-DB-200G`, `TRA-TD-DB-1KG`. `order_items.product_id` vẫn là khóa ngoại integer tới row SKU tương ứng.

Danh mục bootstrap cho môi trường dev nằm ở `backend/src/orders/catalog.py`. Nếu SKU đã tồn tại trong database, giá trong database là nguồn sự thật và không bị frontend ghi đè.

`note` được lưu riêng trong bảng `order_notes` để không sửa file model do Sơn đang phụ trách.
