const backendSelect = document.getElementById('backend');
const statusEl = document.getElementById('status');
const listEl = document.getElementById('productList');
const form = document.getElementById('productForm');
const skuInput = document.getElementById('sku');
const nameInput = document.getElementById('name');
const reloadBtn = document.getElementById('reload');
const saveBtn = form.querySelector('button[type="submit"]');

function setStatus(text, kind) {
  statusEl.textContent = text;
  statusEl.className = kind || '';
}

function noteRow(text) {
  const tr = document.createElement('tr');
  const td = document.createElement('td');
  td.colSpan = 2;
  td.className = 'note';
  td.textContent = text;
  tr.appendChild(td);
  listEl.replaceChildren(tr);
}

function renderProducts(products) {
  if (products.length === 0) {
    noteRow('Бараа алга. Дээрх маягтаар эхний бараагаа нэмнэ үү.');
    return;
  }
  const rows = products.map((p) => {
    const tr = document.createElement('tr');
    const sku = document.createElement('td');
    const name = document.createElement('td');
    sku.textContent = p.sku;   // textContent: HTML биш текст болгож харуулна (XSS-ээс хамгаална)
    name.textContent = p.name;
    tr.append(sku, name);
    return tr;
  });
  listEl.replaceChildren(...rows);
}

async function loadProducts() {
  noteRow('Ачаалж байна...');
  setStatus('');
  try {
    renderProducts(await getProducts(backendSelect.value));
  } catch (err) {
    noteRow('Жагсаалт ачаалагдсангүй.');
    setStatus(err.message, 'error');
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const sku = skuInput.value.trim();
  const name = nameInput.value.trim();
  if (!sku || !name) {
    setStatus('SKU болон нэр хоосон байж болохгүй.', 'error');
    return;
  }
  saveBtn.disabled = true;
  try {
    await createProduct(backendSelect.value, sku, name);
    form.reset();
    skuInput.focus();
    setStatus(`"${sku}" бараа хадгалагдлаа.`, 'ok');
    renderProducts(await getProducts(backendSelect.value));
  } catch (err) {
    setStatus(err.message, 'error');
  } finally {
    saveBtn.disabled = false;
  }
});

backendSelect.addEventListener('change', loadProducts);
reloadBtn.addEventListener('click', loadProducts);

loadProducts();
