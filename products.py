from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from database import get_db
from models.product import Product
from schemas import ProductCreate, ProductOut

router = APIRouter(prefix="/api/v1/products", tags=["products"])


@router.get("", response_model=list[ProductOut])
def list_products(db: Session = Depends(get_db)):
    return db.scalars(select(Product).order_by(Product.id)).all()


@router.get("/{product_id}", response_model=ProductOut)
def get_product(product_id: str, db: Session = Depends(get_db)):
    product = db.get(Product, int(product_id)) if product_id.isdigit() else None
    if product is None:
        raise HTTPException(status_code=404, detail="Бараа олдсонгүй")
    return product


@router.post("", response_model=ProductOut, status_code=201)
def create_product(data: ProductCreate, db: Session = Depends(get_db)):
    if db.scalar(select(Product.id).where(Product.sku == data.sku)) is not None:
        raise HTTPException(status_code=409, detail="SKU давхардсан")

    product = Product(sku=data.sku, name=data.name)
    db.add(product)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=409, detail="SKU давхардсан")
    db.refresh(product)
    return product
