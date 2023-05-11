from pydantic import BaseModel, validator
from typing import Optional, List, Dict
import datetime
import re
from uuid import UUID


class EmployeeBase(BaseModel):
    employee_name: str
    employee_surname: str
    position: int
    file_fk: Optional[UUID]


class EmployeeUpdate(EmployeeBase):
    pass


class EmployeeCreate(EmployeeBase):
    pass


class EmployeeResponse(EmployeeBase):
    employee_id: int
    position_name: str
