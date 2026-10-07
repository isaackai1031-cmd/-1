# Алдаа оношлогооны бүртгэл

Загвар. Бодит алдаагаа энд нэм (доорх нь жишээ).

## Алдаа 1: SQL syntax error
- **Огноо:** [YYYY-MM-DD]
- **Алдаа:** `You have an error in your SQL syntax near 'JOIN'`
- **Шалтгаан:** JOIN-ийн дараа ON бичихээ мартсан
- **Шийдэл:** `JOIN products p ON p.id = sb.product_id`
- **Сурсан зүйл:** JOIN үргэлж ON-той хамт

## Алдаа 2: Python venv идэвхгүй
- **Огноо:** [YYYY-MM-DD]
- **Алдаа:** `ModuleNotFoundError: No module named 'fastapi'`
- **Шалтгаан:** venv идэвхжүүлээгүй
- **Шийдэл:** `source venv/bin/activate` (Windows: `venv\Scripts\activate`)
- **Сурсан зүйл:** Python ажиллахаас өмнө venv шалгах
