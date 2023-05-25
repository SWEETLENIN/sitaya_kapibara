from pydantic import BaseModel, validator
from typing import Optional, List, Dict
import datetime
import re
from uuid import UUID


class OrderBase(BaseModel):
    user_email: str
    user_name: str
    user_phone: Optional[str]
    user_address: str
    food: List

    @validator('user_email')
    def properties_for_email(cls, email):
        pattern = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
        if len(email) > 50:
            raise ValueError(f"Превышена допустимая длина email{email}")
        if re.match(pattern, email) is None:
            raise ValueError(f"Неккоректный формат электронного адреса{email}")
        return email
