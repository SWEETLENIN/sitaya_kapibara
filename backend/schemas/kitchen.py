from pydantic import BaseModel, validator
from typing import Optional, List, Dict
import datetime
import re
from uuid import UUID


class KitchenBase(BaseModel):
    name: str


class KitchenResponse(KitchenBase):
    kitchen_id: int
