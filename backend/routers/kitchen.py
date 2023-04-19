import logging
from fastapi import APIRouter, Body, Depends
from typing import List
from ..services.kitchen import KitchenService
from ..schemas import kitchen as sch

router = APIRouter(prefix="/api/v1/kitchen")
logger = logging.getLogger(f'app.{__name__}')


@router.get("", response_model=List[sch.KitchenResponse])
async def get_kitchnes():
    return await KitchenService.get_kitchens()
