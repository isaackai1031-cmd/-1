# Агуулахын бүртгэлийн систем

## Зорилго
Агуулахын орлого, зарлага, үлдэгдлийг бүртгэх, хянах, тайлагнах сургалтын систем.

## Технологи
- Node.js + Express + mysql2
- Python + FastAPI + SQLAlchemy 2.x
- MySQL 8.4
- HTML/CSS + vanilla JavaScript

## Одоогийн хүрээ
Барааны жагсаалт, шинэ бараа нэмэх (201 / 409 / 422 / 404), хоёр backend дээр ижил API гэрээтэй.
Үлдэгдэл, баримт, reversal зэрэг нь дараагийн шатуудад нэмэгдэнэ. Хүснэгтүүд (`warehouses`, `stock_balances`) бэлэн.

## Ажиллуулах

### 1. Өгөгдлийн сан (нэг удаа)
```
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS warehouse_node CHARACTER SET utf8mb4; CREATE DATABASE IF NOT EXISTS warehouse_python CHARACTER SET utf8mb4;"
mysql -u root -p warehouse_node < db/setup.sql
mysql -u root -p warehouse_python < db/setup.sql
```
(`db/setup.sql` = `db/migrations/*` + `db/seeds/seed.sql`. Windows PowerShell дээр `<` ажилладаггүй тул cmd ашигла.)

### 2. Node API (порт 3000)
```
cd src/backend-node
copy .env.example .env        (Linux/Mac: cp .env.example .env) ба DB_PASSWORD-оо бөглө
npm install
npm start
```

### 3. Python API (порт 8000)
```
cd src/backend-python
python -m venv venv
venv\Scripts\activate         (Linux/Mac: source venv/bin/activate)
pip install -r requirements.txt
set DATABASE_URL=mysql+pymysql://root:НУУЦ_ҮГ@localhost/warehouse_python?charset=utf8mb4
uvicorn main:app --reload --port 8000
```
(Linux/Mac: `export DATABASE_URL=...`)

### 4. Frontend
`src/frontend/index.html` файлыг browser-ээр нээ. Баруун дээд буланд backend-ээ (Node эсвэл Python) сонгоно. Нэг үед нэг backend ажиллуулахад хангалттай.

## Тест
```
# Python (MySQL хэрэггүй, SQLite санах ойд ажиллана)
pip install -r src/backend-python/requirements.txt
pytest tests/python

# Node (MySQL ажиллаж, db/setup.sql хийгдсэн байх ёстой)
cd src/backend-node
npm test
```

## API гэрээ
| Хүсэлт | Амжилт | Алдаа |
|---|---|---|
| `GET /health` | 200 | |
| `GET /api/v1/products` | 200, жагсаалт | |
| `GET /api/v1/products/{id}` | 200 | 404 |
| `POST /api/v1/products` `{sku, name}` | 201 | 409 давхар SKU, 422 хоосон SKU/нэр |

Алдааны хариу хоёр backend дээр ижил: `{ "code": "...", "message": "..." }` (422 дээр нэмж `details`).

## Бүтэц
```
docs/                баримт бичиг (L01-L04)
src/frontend/        HTML/CSS/JS
src/backend-node/    Express API
src/backend-python/  FastAPI API
db/                  migration, seed, setup.sql
tests/               node ба python тест
```

## Холбоос
GitHub: https://github.com/isaackai1031-cmd/warehouse-learning
