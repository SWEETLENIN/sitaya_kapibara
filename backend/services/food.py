import logging

from fastapi import HTTPException
from ..schemas import food as food_sch
from ..repos.food import FoodRepo
import datetime
from ..repos.files import FileRepo
from .files import FileService
from ..settings.file_config import FILE_CONFIG

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
        return {"food_count": record}

    @classmethod
    async def delete_food(cls, food_id):
        return await FoodRepo.delete_food(food_id)

    @classmethod
    async def get_food_for_kitchen(cls, kitchen_fk):
        return await FoodRepo.get_food_for_kitchen(kitchen_fk)

    @classmethod
    async def get_food_pic(cls, file_id_str):
        file_path = FILE_CONFIG.path.joinpath(file_id_str)
        if not file_path.exists():
            logger.debug(f"Файла {file_id_str} нет во временном хранилище. Получаем из базы.")
            file_data = await FileRepo.get_file_data_by_id(file_id_str)
            file_path.write_bytes(file_data[0])
        return file_path
        # file_path=FileService.get_file_with_path(file_fk)
        # return file_path
