from typing import Annotated

from pydantic import BaseModel, ConfigDict, StringConstraints

Sku = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=50)]
Name = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=255)]


class ProductCreate(BaseModel):
    sku: Sku
    name: Name


class ProductOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    sku: str
    name: str
