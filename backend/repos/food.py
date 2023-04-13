import logging

from typing import List

from ..models.food import food
from ..schemas import restaraunt as sch
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

    async def create_food(cls):
        return
