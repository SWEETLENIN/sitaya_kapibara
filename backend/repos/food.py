import logging
from typing import List
from ..models.food import food
from ..schemas import food as food_sch
from ..settings.db import db
from sqlalchemy import select, insert, delete, update, and_, func

logger = logging.getLogger(f'app.{__name__}')


class FoodRepo:

    @classmethod
    async def get_food(cls):
        query = (
            select(food).order_by(food.c.food_id.asc())
        )
        return await db.fetch_all(query)

    @classmethod
    async def get_food_by_id(cls, food_id: int):
        query = (
            select(food).where(food.c.food_id == food_id)
        )
        return await db.fetch_one(query)

    @classmethod
    async def create_food(cls, food_item: food_sch.FoodCreate):
        query = (
            insert(food)
            .values(
                food_name=food_item.food_name,
                file_fk=food_item.file_fk,
                description=food_item.description,
                price=food_item.price
            )
            .returning(food.c.food_id)
        )
        return await db.fetch_val(query)

    @classmethod
    async def change_food_info(cls, food_id: int, updated_food_info: food_sch.FoodUpdate):
        query = (
            update(food)
            .where(food.c.food_id == food_id)
            .values(updated_food_info.dict(exclude_unset=True))
            .returning(food.c.food_id)
        )
        return await db.fetch_val(query)

    @classmethod
    async def get_count(cls):
        query = (
            select(func.count(food.c.food_id))
        )
        return await db.fetch_val(query)

    @classmethod
    async def delete_food(cls, food_id: int):
        query = (
            delete(food).where(food.c.food_id == food_id)
        )
        return await db.execute(query)