import logging

from fastapi import HTTPException
from ..repos.employee import EmployeeRepo

logger = logging.getLogger(f'app.{__name__}')


class EmployeeService:

    @classmethod
    async def get_employees(cls, page, size):
        return await EmployeeRepo.get_employee(page, size)
