const express = require('express');
const pool = require('../db/connection');

const router = express.Router();

function fail(res, status, code, message, details) {
  const body = { code, message };
  if (details) body.details = details;
  return res.status(status).json(body);
}

function parseId(value) {
  return /^\d+$/.test(value) ? Number(value) : null;
}

router.get('/', async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT id, sku, name FROM products ORDER BY id');
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  const id = parseId(req.params.id);
  if (id === null) return fail(res, 404, 'NOT_FOUND', 'Бараа олдсонгүй');
  try {
    const [rows] = await pool.execute('SELECT id, sku, name FROM products WHERE id = ?', [id]);
    if (rows.length === 0) return fail(res, 404, 'NOT_FOUND', 'Бараа олдсонгүй');
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  const body = req.body || {};
  const sku = typeof body.sku === 'string' ? body.sku.trim() : '';
  const name = typeof body.name === 'string' ? body.name.trim() : '';

  const details = [];
  if (!sku || sku.length > 50) details.push({ field: 'sku', message: 'SKU хоосон биш, 50 тэмдэгтээс ихгүй байх ёстой' });
  if (!name || name.length > 255) details.push({ field: 'name', message: 'Нэр хоосон биш, 255 тэмдэгтээс ихгүй байх ёстой' });
  if (details.length > 0) return fail(res, 422, 'VALIDATION', 'Оролтын утга буруу', details);

  try {
    const [result] = await pool.execute('INSERT INTO products (sku, name) VALUES (?, ?)', [sku, name]);
    res.status(201).json({ id: result.insertId, sku, name });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return fail(res, 409, 'CONFLICT', 'SKU давхардсан');
    next(err);
  }
});

module.exports = router;
