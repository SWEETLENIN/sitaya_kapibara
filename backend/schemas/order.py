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