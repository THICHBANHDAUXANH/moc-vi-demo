from sqlalchemy.orm import Session

from src.db.models import Product


# One database row represents one sellable variant/SKU.
# Prices here are only bootstrap defaults for an empty development database.
# Once a SKU exists, its database price remains authoritative.
CATALOG = [
    {"sku": "TRA-TD-DB-100G", "name": "Trà Trung Du đặc biệt · 100 g", "price": 99000},
    {"sku": "TRA-TD-DB-200G", "name": "Trà Trung Du đặc biệt · 200 g", "price": 189000},
    {"sku": "TRA-TD-DB-1KG", "name": "Trà Trung Du đặc biệt · 1 kg", "price": 790000},
    {"sku": "TRA-TD-TT-100G", "name": "Trà Trung Du truyền thống · 100 g", "price": 89000},
    {"sku": "TRA-TD-TT-200G", "name": "Trà Trung Du truyền thống · 200 g", "price": 169000},
    {"sku": "TRA-TD-TT-1KG", "name": "Trà Trung Du truyền thống · 1 kg", "price": 690000},
    {"sku": "CHE-TN-100G", "name": "Chè Thái Nguyên · 100 g", "price": 59000},
    {"sku": "CHE-TN-200G", "name": "Chè Thái Nguyên · 200 g", "price": 109000},
    {"sku": "CHE-TN-1KG", "name": "Chè Thái Nguyên · 1 kg", "price": 349000},
    {"sku": "CACAO-DL-200G", "name": "Cacao Đắk Lắk · 200 g", "price": 129000},
    {"sku": "CACAO-DL-500G", "name": "Cacao Đắk Lắk · 500 g", "price": 259000},
    {"sku": "CACAO-DL-1KG", "name": "Cacao Đắk Lắk · 1 kg", "price": 449000},
    {"sku": "CAPHE-GL-200G", "name": "Cà phê xay LA’CAPHE Gia Lai · 200 g", "price": 99000},
    {"sku": "CAPHE-GL-500G", "name": "Cà phê xay LA’CAPHE Gia Lai · 500 g", "price": 199000},
    {"sku": "CAPHE-GL-1KG", "name": "Cà phê xay LA’CAPHE Gia Lai · 1 kg", "price": 349000},
]


def ensure_catalog(db: Session) -> None:
    skus = [item["sku"] for item in CATALOG]
    existing = {
        product.sku
        for product in db.query(Product).filter(Product.sku.in_(skus)).all()
    }

    for item in CATALOG:
        if item["sku"] not in existing:
            db.add(
                Product(
                    name=item["name"],
                    sku=item["sku"],
                    price=int(item["price"]),
                )
            )

    db.flush()
