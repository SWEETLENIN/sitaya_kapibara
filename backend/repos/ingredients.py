import logging
from ..models.ingredients import ingredients
from ..schemas import ingredients as sch
from ..settings.db import db
from sqlalchemy import select, insert, delete, update

logger = logging.getLogger(f'app.{__name__}')

class IngredientsRepo:
    @classmethod
    async def get_ingredients(cls):
        query = (
            select(ingredients).order_by(ingredients.c.ingredients_id.asc())
        )
        return await db.fetch_all(query)

    @classmethod
    async def create_ingredient(cls, ingredient_item):
        query = (insert(ingredients).values(**ingredient_item.dict()))
        return await db.execute(query)

    @classmethod
    async def get_ingredient_by_id(cls, ingredient_id):
        query = (select(ingredients).where(ingredients.c.ingredients_id == ingredient_id))
        return await db.fetch_one(query)

    @classmethod
    async def update_ingredient(cls, ingredient_id, ingredient_item):
        query = (update(ingredients).where(ingredients.c.ingredients_id == ingredient_id).values(**ingredient_item.dict()))
        return await db.execute(query)

    @classmethod
    async def delete_ingredient(cls, ingredient_id):
        query = (delete(ingredients).where(ingredients.c.ingredients_id == ingredient_id))
        await db.execute(query)
