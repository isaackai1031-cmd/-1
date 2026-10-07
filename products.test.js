// Бодит MySQL (warehouse_node) шаардана. Ажиллуулах: cd src/backend-node && npm test
const { test, before, after } = require('node:test');
const assert = require('node:assert');

const app = require('../../src/backend-node/server');
const pool = require('../../src/backend-node/db/connection');

let server;
let base;
const unique = (prefix) => `${prefix}${Date.now()}${Math.floor(Math.random() * 1000)}`;

const post = (body) =>
  fetch(`${base}/api/v1/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, () => {
      base = `http://localhost:${server.address().port}`;
      resolve();
    });
  });
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
  await pool.end();
});

test('AC-01: шинэ SKU 201 буцаана', async () => {
  const sku = unique('T');
  const res = await post({ sku, name: 'Тест бараа' });
  assert.strictEqual(res.status, 201);
  const body = await res.json();
  assert.strictEqual(body.sku, sku);
  assert.ok(body.id > 0);
});

test('AC-02: давхар SKU 409 буцаана', async () => {
  const sku = unique('D');
  assert.strictEqual((await post({ sku, name: 'Нэг' })).status, 201);
  const res = await post({ sku, name: 'Хоёр' });
  assert.strictEqual(res.status, 409);
});

test('AC-03: хоосон нэр 422 буцаана, бараа үүсэхгүй', async () => {
  const sku = unique('E');
  assert.strictEqual((await post({ sku, name: '' })).status, 422);
  assert.strictEqual((await post({ sku, name: '   ' })).status, 422);
  const list = await (await fetch(`${base}/api/v1/products`)).json();
  assert.ok(!list.some((p) => p.sku === sku));
});

test('байхгүй id 404 буцаана', async () => {
  const res = await fetch(`${base}/api/v1/products/999999999`);
  assert.strictEqual(res.status, 404);
});

test('үүсгэсэн бараа id-аар болон жагсаалтаар олдоно', async () => {
  const sku = unique('G');
  const created = await (await post({ sku, name: 'Жагсаалт' })).json();
  const one = await fetch(`${base}/api/v1/products/${created.id}`);
  assert.strictEqual(one.status, 200);
  assert.strictEqual((await one.json()).sku, sku);
  const list = await (await fetch(`${base}/api/v1/products`)).json();
  assert.ok(list.some((p) => p.id === created.id));
});
