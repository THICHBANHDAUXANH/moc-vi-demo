# Làm việc nhóm trên Mộc Miên

## Cấu trúc hiện tại và phần sẽ phát triển

```text
index.html, che.html, cacao.html, caphe.html, product.html
script.js, style.css, catalog.css, products/   Site đang chạy trên GitHub Pages
backend/                                      API, cơ sở dữ liệu, đăng nhập, đơn hàng, thanh toán
infra/                                        Cấu hình triển khai, tài liệu về hosting
docs/                                         Hợp đồng API và quy trình chung
.github/                                      Mẫu pull request
```

GitHub Pages hiện xuất bản nhánh `main` từ thư mục gốc. Giữ các file HTML/CSS/JS hiện tại ở gốc cho đến khi có quy trình build và deploy mới đã chạy thử. Không đưa mật khẩu, API key, thông tin thẻ hay giá vốn vào repo công khai.

## Ai phụ trách gì

| Người | Phần việc | Vùng chỉnh sửa chính | Bàn giao |
| --- | --- | --- | --- |
| Hoàng Sơn | Cơ sở dữ liệu, đăng ký, đăng nhập | `backend/src/auth/`, `backend/src/db/` | Migration, API xác thực, hướng dẫn chạy, kiểm thử API |
| Bùi Đăng Cường | UI, checkout và thanh toán | HTML/CSS/JS ở gốc, `checkout.js`, `backend/src/orders/`, `backend/src/payments/` | Hoàn thiện giao diện, kết nối API tạo đơn, COD/chuyển khoản, kiểm thử luồng checkout |
| Dương Huy Phúc | So sánh host miễn phí, triển khai bản thử | `infra/`, `.github/workflows/` | Bảng giới hạn host, hướng dẫn deploy, URL thử và biến môi trường cần thiết |
| Chủ repo | Ghép các phần và duyệt PR | `docs/`, cấu hình chung | Chốt API contract, kiểm tra tích hợp, review và merge PR |

Thư mục thể hiện chức năng, không đặt theo tên người. Khi cần sửa vùng của người khác, ghi rõ trong PR và nhờ người đó review. Sơn quản lý migration; Cường thống nhất thay đổi schema đơn hàng với Sơn trước khi viết migration. Mọi người chốt đường dẫn API và cấu trúc dữ liệu trong [API_CONTRACT.md](API_CONTRACT.md) trước khi nối frontend.

## Cách làm để không đè code nhau

Mỗi người clone repo về máy riêng, tạo nhánh từ `main` mới nhất. Không dùng chung một thư mục làm việc và không push thẳng lên `main`.

```bash
git clone https://github.com/THICHBANHDAUXANH/moc-vi-demo.git
cd moc-vi-demo
git switch -c feat/auth       # Sơn; Cường dùng feat/checkout, Phúc dùng infra/hosting
# sửa file, chạy kiểm tra phần mình phụ trách
git add .
git commit -m "feat: add auth API"
git push -u origin feat/auth
```

Mở pull request từ nhánh của mình vào `main`. Trước khi merge: cập nhật nhánh từ `main`, chạy kiểm tra có liên quan, nhờ ít nhất một người review, và xem file thay đổi. Mỗi PR nên giải quyết một việc có thể chạy/kiểm tra được. Nếu hai người cần sửa cùng một file, thống nhất người sửa chính rồi người còn lại review hoặc làm PR tiếp theo.

Thứ tự ghép đề xuất: thống nhất API và schema → xác thực/cơ sở dữ liệu → đơn hàng/thanh toán → kết nối giao diện → deploy backend thử → kiểm tra toàn bộ luồng → chuyển môi trường chính thức. Phúc có thể khảo sát host song song, nhưng chưa chuyển site chính sang host mới trước khi luồng đặt hàng chạy ổn trên URL thử.

Trên GitHub, chủ repo nên bật **Settings → Branches → Add branch protection rule** cho `main`, yêu cầu pull request và ít nhất một review trước khi merge. Nếu có CI, thêm yêu cầu kiểm tra chạy thành công. Chỉ thêm người vào `CODEOWNERS` khi đã biết đúng username GitHub của họ.


## Quy ước chống conflict cho nhánh UI/payment

- Nhánh của Cường: `feat/ui-payment`.
- Sơn không sửa trực tiếp `script.js`, `checkout.js`, `style.css`, `catalog.css` trong lúc nhánh UI/payment đang mở; nếu API cần frontend đổi, cập nhật `docs/API_CONTRACT.md` rồi báo Cường.
- Cường không sửa migration hoặc auth của Sơn. Frontend chỉ gọi API qua `checkout.js`, không nhúng logic database hay secret.
- Phúc chỉ cấu hình `API_BASE_URL`/deploy; không hard-code URL production vào `script.js`.
- Khi cần lấy thay đổi của người khác, ưu tiên `git fetch origin && git rebase origin/main` trên nhánh cá nhân rồi giải conflict tại nhánh đó; không giải conflict trực tiếp trên `main`.
