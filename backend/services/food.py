import logging

from fastapi import HTTPException
from ..schemas import food as food_sch
from ..repos.food import FoodRepo
import datetime

logger = logging.getLogger(f'app.{__name__}')


class FoodService:

    @classmethod
    async def get_foods(cls):
        return await FoodRepo.get_food()

    @classmethod
    async def get_food_by_id(cls, food_id):
        return await FoodRepo.get_food_by_id(food_id)

    @classmethod
    async def create_food(cls, food_item):
        food_id = await FoodRepo.create_food(food_item)
        return await FoodRepo.get_food_by_id(food_id)

    @classmethod
    async def change_food_info(cls, food_id, food_item: food_sch.FoodUpdate):
        updated_food_info = food_sch.FoodUpdate(
            food_name=food_item.food_name,
            file_fk=food_item.file_fk,
            description=food_item.description,
            price=food_item.price
        )
        await FoodRepo.change_food_info(food_id, updated_food_info)
        return await FoodRepo.get_food_by_id(food_id)

    @classmethod
    async def get_count_of_food(cls):
        record = await FoodRepo.get_count()
        count = record[0]
        return {"food_count": count}

    @classmethod
    async def delete_food(cls, food_id):
        return await FoodRepo.delete_food(food_id)
