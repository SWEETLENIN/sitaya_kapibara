import logging
from fastapi import APIRouter, Body, Depends
from typing import List
from ..services.ingredients import IngredientsService
from ..schemas import ingredients as sch

router = APIRouter(prefix="/api/v1/ingredients")
logger = logging.getLogger(f'app.{__name__}')

@router.get("", response_model=List[sch.IngredientResponse])
async def get_ingredients():
    return await IngredientsService.get_ingredients()

@router.post("", response_model=sch.IngredientResponse)
async def create_ingredient(ingredient_item: sch.IngredientCreate):
    return await IngredientsService.create_ingredient(ingredient_item)

@router.get("/{ingredient_id}", response_model=sch.IngredientResponse)
async def get_ingredient_by_id(ingredient_id: int):
    return await IngredientsService.get_ingredient_by_id(ingredient_id)

@router.put("/{ingredient_id}", response_model=sch.IngredientResponse)
async def update_ingredient(ingredient_id: int, ingredient_item: sch.IngredientUpdate):
    return await IngredientsService.update_ingredient(ingredient_id, ingredient_item)

@router.delete("/{ingredient_id}", status_code=204)
async def delete_ingredient(ingredient_id: int):
    return await IngredientsService.delete_ingredient(ingredient_id)

@router.get("/for_food/{food_id}", response_model=List[sch.IngredientResponse])
async def get_ingredients_by_food_id(food_id: int):
    return await IngredientsService.get_ingredients_by_food_id(food_id)

@router.post("/food_ingredient")
async def add_food_ingredient(food_fk: int, ingredient_fk: int):
    return await IngredientsService.add_food_ingredient(food_fk, ingredient_fk)


