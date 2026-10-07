def create(client, sku="P06", name="Ном"):
    return client.post("/api/v1/products", json={"sku": sku, "name": name})


def test_create_product_returns_201(client):
    res = create(client)
    assert res.status_code == 201
    assert res.json()["sku"] == "P06"


def test_duplicate_sku_returns_409_and_creates_nothing(client):
    assert create(client, "P01", "Дэвтэр").status_code == 201
    res = create(client, "P01", "Өөр нэр")
    assert res.status_code == 409
    assert res.json()["code"] == "CONFLICT"
    assert len(client.get("/api/v1/products").json()) == 1


def test_empty_name_returns_422_and_creates_nothing(client):
    assert create(client, "P07", "").status_code == 422
    assert create(client, "P07", "   ").status_code == 422
    assert client.get("/api/v1/products").json() == []


def test_missing_id_returns_404(client):
    assert client.get("/api/v1/products/999999").status_code == 404
    assert client.get("/api/v1/products/abc").status_code == 404


def test_get_by_id_and_list(client):
    created = create(client, "P08", "Үзэг").json()
    one = client.get(f"/api/v1/products/{created['id']}")
    assert one.status_code == 200
    assert one.json()["sku"] == "P08"
    assert [p["sku"] for p in client.get("/api/v1/products").json()] == ["P08"]
