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
| `POST /api/orders` | sản phẩm, quy cách, số lượng, tên và số liên hệ, địa chỉ, `payment_method` (`cod` hoặc `bank_transfer`) | mã đơn, tổng tiền, trạng thái, thông tin thanh toán phù hợp |
| `GET /api/orders/:id` | mã đơn, quyền truy cập hợp lệ | trạng thái đơn và thanh toán |

Server tự tra giá hiện hành và tính lại tổng tiền, không tin tổng tiền do trình duyệt gửi. Trạng thái thanh toán chỉ được cập nhật sau khi có xác nhận hợp lệ; chọn chuyển khoản không đồng nghĩa đã thanh toán. Cần thống nhất với Sơn các bảng `users`, `orders`, `order_items`, `payments` và migration tương ứng trước khi code.

Chưa chốt cổng thanh toán trực tuyến. Luồng hiện tại của shop là khách gửi đơn qua Zalo, rồi chủ shop xác nhận COD hoặc chuyển khoản. Nếu tích hợp cổng thanh toán về sau, Cường bổ sung webhook, kiểm tra chữ ký và chống xử lý trùng sự kiện ở phía server.

## Môi trường triển khai — Phúc phụ trách

Frontend cần một `API_BASE_URL` theo từng môi trường. Backend cần database URL và khóa bí mật qua biến môi trường của host; không ghi giá trị thật vào Git. Phúc ghi rõ domain thử, CORS, lệnh chạy/build, cách migrate và cách quay lại bản trước trong `infra/`.
