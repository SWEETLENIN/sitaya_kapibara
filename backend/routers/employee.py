import logging
from fastapi import APIRouter, Body, Depends
from typing import List
from ..services.employee import EmployeeService
from ..schemas import employee as sch

router = APIRouter(prefix="/api/v1/employee")
logger = logging.getLogger(f'app.{__name__}')


@router.get("", response_model=List[sch.EmployeeResponse])
async def get_foods(page: int = 0, size: int = 4):
    return await EmployeeService.get_employees(page, size)
