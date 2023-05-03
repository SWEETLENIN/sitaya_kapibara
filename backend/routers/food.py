import logging
from fastapi import APIRouter, Body, Depends
from typing import List
from ..services.food import FoodService
from ..schemas import food as food_sch

router = APIRouter(prefix="/api/v1/food")
logger = logging.getLogger(f'app.{__name__}')


@router.get("")
async def get_foods():
    return await FoodService.get_foods()


@router.post("", response_model=food_sch.FoodResponse)
async def create_food(food_item: food_sch.FoodCreate):
    return await FoodService.create_food(food_item)


@router.get("/count")
async def get_count_of_food():
    return await FoodService.get_count_of_food()


@router.get("/{food_id}", response_model=food_sch.FoodResponse)
async def get_food_by_id(food_id: int):
    return await FoodService.get_food_by_id(food_id)


@router.put("/{food_id}")
async def change_food_info(food_id: int, food_item: food_sch.FoodUpdate):
    return await FoodService.change_food_info(food_id, food_item)


@router.delete("/{food_id}", status_code=204)
async def delete_food(food_id: int):
    return await FoodService.delete_food(food_id)


@router.get("/by_kitchen/{kitchen_fk}")
async def get_food_by_kitchen(kitchen_fk: int):
    return await FoodService.get_food_for_kitchen(kitchen_fk)


@router.get("/for_food/{file_fk}")
async def get_food_pic(file_fk: str):
    return await FoodService.get_food_pic(file_fk)
