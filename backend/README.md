# Backend

Backend Mộc Miên dùng FastAPI + SQLAlchemy + PostgreSQL.

## Cấu trúc

- `src/auth/`: đăng ký, đăng nhập, JWT và `GET /api/auth/me`.
- `src/db/`: kết nối database và các model chính.
- `src/orders/`: catalog SKU và `POST /api/orders`.
- `src/payments/`: tạo trạng thái thanh toán ban đầu cho đơn hàng.

Hợp đồng giữa frontend và backend nằm ở [`docs/API_CONTRACT.md`](../docs/API_CONTRACT.md).

## Chạy local

Tạo database PostgreSQL `moc_vi_db`, sau đó:

```bash
cd backend
cp .env.example .env
pip install -r requirements.txt
uvicorn src.main:app --reload
```

Mở `http://127.0.0.1:8000/docs` để thử API.

## Biến môi trường

- `DATABASE_URL`: PostgreSQL connection string.
- `JWT_SECRET`: secret dùng để ký JWT; production phải dùng giá trị ngẫu nhiên mạnh.
- `CORS_ORIGINS`: danh sách origin frontend, phân tách bằng dấu phẩy. Ví dụ: `https://thichbanhdauxanh.github.io,http://localhost:5500`.

Không commit file `.env` hoặc secret thật lên Git.
