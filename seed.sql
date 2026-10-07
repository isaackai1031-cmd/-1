INSERT IGNORE INTO products (sku, name) VALUES
  ('P01', 'Дэвтэр'),
  ('P02', 'Үзэг'),
  ('P03', 'Хавтас'),
  ('P04', 'Маркер'),
  ('P05', 'Цаас');

INSERT IGNORE INTO warehouses (name) VALUES ('Агуулах А'), ('Агуулах Б');

INSERT IGNORE INTO stock_balances (product_id, warehouse_id, quantity)
SELECT p.id, w.id, v.qty
FROM (
  SELECT 'P01' AS sku, 'Агуулах А' AS wh, 25 AS qty UNION ALL
  SELECT 'P02', 'Агуулах А', 8  UNION ALL
  SELECT 'P03', 'Агуулах А', 3  UNION ALL
  SELECT 'P04', 'Агуулах А', 15 UNION ALL
  SELECT 'P05', 'Агуулах Б', 2
) v
JOIN products p ON p.sku = v.sku
JOIN warehouses w ON w.name = v.wh;
