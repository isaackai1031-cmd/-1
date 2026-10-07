# L01: Суурь оношилгоо

## 1. Агуулахын ойлголт
- Орлого = агуулахад бараа нэмэгдэх
- Зарлага = агуулахаас бараа хасагдах
- Үлдэгдэл = Өмнөх үлдэгдэл + Орлого - Зарлага
- Дүрэм: Үлдэгдэл 0-ээс бага болох ёсгүй

## 2. Гурван оролдлого

### JavaScript
```javascript
const products = [
  { name: "Дэвтэр", stock: 25 },
  { name: "Үзэг", stock: 8 },
  { name: "Хавтас", stock: 3 },
  { name: "Маркер", stock: 15 },
  { name: "Цаас", stock: 2 }
];
const lowStock = products.filter(p => p.stock < 10);
console.log(lowStock);
```

### Python
```python
products = [
    {"name": "Дэвтэр", "stock": 25},
    {"name": "Үзэг", "stock": 8},
    {"name": "Хавтас", "stock": 3},
    {"name": "Маркер", "stock": 15},
    {"name": "Цаас", "stock": 2},
]
low_stock = [p for p in products if p["stock"] < 10]
print(low_stock)
```

### SQL
```sql
SELECT p.name, w.name AS warehouse, sb.quantity
FROM stock_balances sb
JOIN products p ON p.id = sb.product_id
JOIN warehouses w ON w.id = sb.warehouse_id
WHERE sb.quantity < 10;
```
Гараар таамагласан үр дүн (`db/seeds/seed.sql`-ийн өгөгдлөөр, ажиллуулж шалгана):

| name | warehouse | quantity |
|---|---|---|
| Үзэг | Агуулах А | 8 |
| Хавтас | Агуулах А | 3 |
| Цаас | Агуулах Б | 2 |

## 3. Мэдэхгүй зүйлсийн жагсаалт
- SQL JOIN-ийн нарийн механизм
- Transaction-ийг хэрхэн rollback хийх
- FastAPI-ийн dependency injection

## 4. Хувийн хоёр зорилго
1. Git-ийг сайн эзэмших
2. SQL-ийн JOIN-уудыг ойлгох

## 5. Эргэцүүлэл (3 өгүүлбэр)
[Өөрөө бичнэ: юу ойлгов, ямар алдаа гарав, дараа юуг шалгах вэ]
