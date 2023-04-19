import logging
from ..models.food_ingredients import food_ingredients
from ..settings.db import db
from sqlalchemy import select, insert

logger = logging.getLogger(f'app.{__name__}')

class FoodIngredientsRepo:
    @classmethod
    async def get_ingredients_by_food_id(cls, food_id):
        query = (
            select(food_ingredients.c.ingredient_fk)
            .where(food_ingredients.c.food_fk == food_id)
        )
        return await db.fetch_all(query)

    @classmethod
    async def add_food_ingredient(cls, food_fk, ingredient_fk):
        query = (
            insert(food_ingredients)
            .values(food_fk=food_fk, ingredient_fk=ingredient_fk)
        )
        await db.execute(query)