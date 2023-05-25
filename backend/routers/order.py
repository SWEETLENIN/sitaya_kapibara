import logging
from fastapi import APIRouter, Body, Depends
from typing import List
from ..services.food import FoodService
from ..services.order import OrderService
from ..schemas import food as food_sch
from ..schemas import order

router = APIRouter(prefix="/api/v1/order")
logger = logging.getLogger(f'app.{__name__}')


@router.post("")
async def send_email(user_info: order.OrderBase):
    return await OrderService.send_email(user_info)
