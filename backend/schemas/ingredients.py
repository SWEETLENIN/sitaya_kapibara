from pydantic import BaseModel
from typing import Optional

class IngredientBase(BaseModel):
    name: str

class IngredientCreate(IngredientBase):
    pass

class IngredientUpdate(IngredientBase):
    pass

class IngredientResponse(IngredientBase):
    ingredients_id: int
