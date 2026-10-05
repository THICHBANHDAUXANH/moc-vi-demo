# Payments

Hiện tại khi tạo đơn, backend tạo một bản ghi `payments` ở trạng thái `pending` cho cả COD và chuyển khoản.

Chưa có endpoint webhook vì nhóm chưa chốt nhà cung cấp thanh toán. Khi tích hợp SePay/payOS hoặc nhà cung cấp khác:

- webhook phải chạy ở backend;
- xác minh chữ ký/token theo tài liệu chính thức của nhà cung cấp;
- chống xử lý trùng event;
- chỉ backend/webhook hợp lệ mới được đổi trạng thái sang đã thanh toán;
- không đưa secret, số tài khoản nhạy cảm hoặc khóa ký vào JavaScript frontend.
