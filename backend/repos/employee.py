import logging
from typing import List
from ..models.employee import employee
from ..models.positions import positions
from ..schemas import food as food_sch
from ..settings.db import db
from sqlalchemy import select, insert, delete, update, and_, func

logger = logging.getLogger(f'app.{__name__}')


class EmployeeRepo:

    @classmethod
    async def get_employee(cls, page, size):
        query = (
            select(employee, positions.c.position_name)
            .outerjoin(positions, employee.c.position == positions.c.position_id)
            .limit(size)
            .offset(size*page)
            .order_by(employee.c.position.asc())
        )
        return await db.fetch_all(query)

    # @classmethod
    # async def get_employee_by_id(cls, food_id: int):
    #     query = (
    #         select(food).where(food.c.food_id == food_id)
    #     )
    #     return await db.fetch_one(query)

    # @classmethod
    # async def create_food(cls, food_item: food_sch.FoodCreate):
    #     query = (
    #         insert(food)
    #         .values(
    #             food_name=food_item.food_name,
    #             file_fk=food_item.file_fk,
    #             description=food_item.description,
    #             price=food_item.price
    #         )
    #         .returning(food.c.food_id)
    #     )
    #     return await db.fetch_val(query)

    # @classmethod
    # async def change_food_info(cls, food_id: int, updated_food_info: food_sch.FoodUpdate):
    #     query = (
    #         update(food)
    #         .where(food.c.food_id == food_id)
    #         .values(updated_food_info.dict(exclude_unset=True))
    #         .returning(food.c.food_id)
    #     )
    #     return await db.fetch_val(query)

    # @classmethod
    # async def get_count(cls):
    #     query = (
    #         select(func.count(food.c.food_id))
    #     )
    #     return await db.fetch_val(query)
    #
    # @classmethod
    # async def delete_food(cls, food_id: int):
    #     query = (
    #         delete(food).where(food.c.food_id == food_id)
    #     )
    #     return await db.execute(query)
    #
    # @classmethod
    # async def get_food_for_kitchen(cls, kitchen_fk: int):
    #     query = (
    #         select(food).where(food.c.kitchen_fk == kitchen_fk)
    #     )
    #     return await db.fetch_all(query)
