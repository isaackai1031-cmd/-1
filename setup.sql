-- migrations + seed (автоматаар нэгтгэсэн). Давтан ажиллуулахад аюулгүй.
SET NAMES utf8mb4;

-- db/migrations/001_create_products.sql
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sku VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- db/migrations/002_create_warehouses.sql
CREATE TABLE IF NOT EXISTS warehouses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- db/migrations/003_create_stock_balances.sql
CREATE TABLE IF NOT EXISTS stock_balances (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  warehouse_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 0,
  UNIQUE KEY uk_product_warehouse (product_id, warehouse_id),
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (warehouse_id) REFERENCES warehouses(id),
  CHECK (quantity >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- db/seeds/seed.sql
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
