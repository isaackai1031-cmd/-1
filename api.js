class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

function messageFor(status, body) {
  if (status === 409) return 'Энэ SKU аль хэдийн бүртгэгдсэн байна.';
  if (status === 422) return 'SKU болон нэр хоосон байж болохгүй.';
  return (body && body.message) || `Алдаа гарлаа (${status}).`;
}

async function request(base, path, options) {
  let res;
  try {
    res = await fetch(`${base}/api/v1${path}`, options);
  } catch {
    // Сүлжээний алдаа: сервер ажиллахгүй эсвэл хаяг буруу
    throw new ApiError('Серверт холбогдож чадсангүй. Сонгосон backend ажиллаж байгаа эсэхийг шалгана уу.', 0);
  }
  if (res.ok) return res.json();

  // HTTP алдаа: сервер хариулсан ч хүсэлт амжилтгүй
  let body = null;
  try { body = await res.json(); } catch { /* JSON биш хариу */ }
  throw new ApiError(messageFor(res.status, body), res.status);
}

function getProducts(base) {
  return request(base, '/products');
}

function createProduct(base, sku, name) {
  return request(base, '/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sku, name }),
  });
}
