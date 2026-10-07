# L02: Хөгжүүлэлтийн орчин

Хувилбаруудыг өөрийн компьютер дээр `node --version`, `python --version`, `mysql --version`, `git --version` командаар шалгаж бодит утгаар солино.

| Програм | Хувилбар |
|---|---|
| Node.js | v20.11.0 (LTS) |
| npm | 10.2.4 |
| Python | 3.11.5 |
| MySQL | 8.4 |
| Git | 2.43.0 |

## Эхлүүлэх дараалал
1. MySQL серверийг эхлүүлэх
2. Database үүсгэх: `warehouse_node`, `warehouse_python`
3. `db/setup.sql`-ийг хоёр database дээр ажиллуулах
4. Node API: `cd src/backend-node && npm install && npm start`
5. Python API: `cd src/backend-python && uvicorn main:app --reload --port 8000`
6. Frontend: `src/frontend/index.html` нээх

Дэлгэрэнгүй командыг үндсэн `README.md`-аас үз.

## Анхаарах зүйл
- `.env` файлд нууц үг хадгална, GitHub-д оруулахгүй
- Token-ийг хэзээ ч commit хийхгүй
