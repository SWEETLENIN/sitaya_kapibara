import logging
from typing import List
from ..models.kitchen import kitchen
from ..schemas import food as food_sch
from ..settings.db import db
from sqlalchemy import select, insert, delete, update, and_, func

logger = logging.getLogger(f'app.{__name__}')


class KitchenRepo:

    @classmethod
    async def get_kitchens(cls):
        query = (
            select(kitchen).order_by(kitchen.c.kitchen_id.asc())
        )
        return await db.fetch_all(query)
