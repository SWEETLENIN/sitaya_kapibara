from pydantic import BaseModel, validator
from typing import Optional, List, Dict
import datetime
import re
from uuid import UUID


class FoodBase(BaseModel):
    food_name: str
    file_fk: Optional[UUID]
    description: str
    price: float
    kitchen_fk: Optional[int]



class FoodUpdate(FoodBase):
    pass


class FoodCreate(FoodBase):
    @validator('kitchen_fk')
    def check_correctness_of_kitchen(cls, kitchen_fk):
        if 0 < kitchen_fk < 5:
            return kitchen_fk
        raise ValueError(f"kitchen_fk не должен быть меньше 1 и больше 4")

    @validator('food_name')
    def check_food_name_length(cls, food_name):
        """
            Проверка на длину food_name. food_name не может быть длиннее чем 30 символов.
        """
        length_limit = 30
        if len(food_name) > length_limit:
            raise ValueError(f"food_name не может быть длиннее чем {length_limit} символов")
        return food_name

    @validator('description')
    def check_description_length(cls, description):
        """
            Проверка на длину description. description не может быть длиннее чем 200 символов.
        """
        length_limit = 200
        if len(description) > length_limit:
            raise ValueError(f"description не может быть длиннее чем {length_limit} символов")
        return description

    @validator('price')
    def check_price(cls, price):
        """
            Проверка цены на корректность. Цена должна быть больше 0.
        """
        if price <= 0:
            raise ValueError("Цена должна быть больше 0")
        return price


class FoodResponse(FoodBase):
    food_id: int