import logging
from ..schemas import ingredients as sch
from ..repos.ingredients import IngredientsRepo
from ..repos.food_ingredients import  FoodIngredientsRepo

logger = logging.getLogger(f'app.{__name__}')

class IngredientsService:

    @classmethod
    async def get_ingredients(cls):
        return await IngredientsRepo.get_ingredients()

    @classmethod
    async def get_ingredient_by_id(cls, ingredient_id):
        return await IngredientsRepo.get_ingredient_by_id(ingredient_id)

    @classmethod
    async def create_ingredient(cls, ingredient_item):
        ingredient_id = await IngredientsRepo.create_ingredient(ingredient_item)
        return await IngredientsRepo.get_ingredient_by_id(ingredient_id)

    @classmethod
    async def update_ingredient(cls, ingredient_id, ingredient_item: sch.IngredientUpdate):
        await IngredientsRepo.update_ingredient(ingredient_id, ingredient_item)
        return await IngredientsRepo.get_ingredient_by_id(ingredient_id)

    @classmethod
    async def delete_ingredient(cls, ingredient_id):
        return await IngredientsRepo.delete_ingredient(ingredient_id)

    @classmethod
    async def get_ingredients_by_food_id(cls, food_id):
        ingredient_ids = await FoodIngredientsRepo.get_ingredients_by_food_id(food_id)
        return [await IngredientsRepo.get_ingredient_by_id(ingredient_id[0]) for ingredient_id in ingredient_ids]

    @classmethod
    async def add_food_ingredient(cls, food_fk, ingredient_fk):
        return await FoodIngredientsRepo.add_food_ingredient(food_fk, ingredient_fk)
