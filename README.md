# Mộc Miên — bản demo giao diện

Bản HTML/CSS/JavaScript tĩnh của giao diện Mộc Miên để xem trên GitHub Pages. Trang chủ dẫn tới ba danh mục riêng: `che.html`, `cacao.html` và `caphe.html`. Mỗi sản phẩm mở `product.html?id=...` để chọn quy cách.

Ảnh lớn trên trang chủ tự chuyển theo thứ tự chè → cà phê → cacao sau mỗi 5 giây. Có nút chuyển và chấm chọn ảnh; chế độ giảm chuyển động sẽ tắt tự chuyển.

- Chè: Trà Trung Du đặc biệt, Trà Trung Du truyền thống, Chè Thái Nguyên; 100 g, 200 g, 1 kg.
- Cacao: Cacao Đắk Lắk; 200 g, 500 g, 1 kg.
- Cà phê xay LA’CAPHE Gia Lai: dự kiến 200 g, 500 g, 1 kg; giá bán đang chờ chốt. Tên được đổi theo bao bì trong ảnh người dùng gửi.

Ảnh chè Thái Nguyên, cacao, cà phê và chùm quả cà phê trong `products/*-demo.png` là ảnh chỉnh dựng bằng ImageGen từ ảnh tham khảo người dùng gửi trong chat. Chữ nhỏ và chi tiết bao bì có thể khác ảnh gốc; cần thay bằng tệp ảnh gốc và đối chiếu nhãn, quy cách trước khi dùng để bán hàng. Hai sản phẩm Trà Trung Du vẫn dùng hình minh họa SVG.

Bảng chè người dùng gửi có chi phí vốn nhưng chưa có giá bán, nên giao diện không hiển thị giá chè. Giá bán cà phê cũng chưa được chốt. Năm dòng Chè Thái Nguyên chưa có tên cấp trà riêng, nên hiện được gom thành một sản phẩm chờ xác nhận. Giỏ hàng chỉ chạy trong trình duyệt; website không nhận đơn hàng, thông tin khách hàng hay thanh toán.

