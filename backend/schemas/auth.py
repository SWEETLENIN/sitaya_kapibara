from pydantic import BaseModel
from typing import List


class UserInfo(BaseModel):
    user_id: int
    username: str
    full_name: str
    email: str
    roles: List[str]
