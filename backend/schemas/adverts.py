from pydantic import BaseModel, validator
from typing import Optional, List, Dict
import datetime
import re
from uuid import UUID


class AdvertsBase(BaseModel):
    message: str
    advert_title: str

    @validator('advert_title')
    def check_title_length(cls, title):
        """
            Проверка на длину title. title не может быть длиннее чем 150 символов.
        """
        length_limit = 150
        if len(title) > length_limit:
            raise ValueError(f"title не может быть длиннее чем {length_limit} символов")
        return title


class AdvertsUpdate(AdvertsBase):
    menu_fk: Optional[int]
    files: Optional[List[UUID]]


class AdvertsCreate(AdvertsUpdate):
    pass


class AdvertsInDBUpdate(AdvertsBase):
    menu_fk: Optional[int]
    edit_date: Optional[datetime.datetime]
    editor_email: Optional[str]

    @validator('editor_email')
    def check_editor_email_length(cls, email):
        """
            Проверка на корректность ввода creator_email
            Проверка на длину creator_email. creator_email не может быть длиннее чем 50 символов.
        """
        pattern = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
        length_limit = 50
        if email is not None and len(email) > length_limit:
            raise ValueError(f"editor_email не может быть длиннее чем {length_limit} символов")
        if email is not None and re.match(pattern, email) is None:
            raise ValueError(f"Неккоректный формат электронного адреса{email}")
        return email


class AdvertsInDBCreate(AdvertsInDBUpdate):
    create_date: datetime.datetime
    creator_email: str

    @validator('creator_email')
    def check_creator_email_length(cls, email):
        """
            Проверка на корректность ввода creator_email
            Проверка на длину creator_email. creator_email не может быть длиннее чем 50 символов.
        """
        pattern = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
        if re.match(pattern, email) is None:
            raise ValueError(f"Неккоректный формат электронного адреса{email}")

        length_limit = 50
        if len(email) > length_limit:
            raise ValueError(f"creator_email не может быть длиннее чем {length_limit} символов")
        return email


class FileInfoForAdvert(BaseModel):
    file_name: str
    file_id: UUID


class AdvertsResponse(AdvertsBase):
    advert_id: int
    menu_name: Optional[str]
    menu_fk: Optional[int]
    parent_id: Optional[int]
    edit_date: Optional[datetime.datetime]
    create_date: datetime.datetime
    creator_email: str
    editor_email: Optional[str]
    files: Optional[List[FileInfoForAdvert]]


class AdvertFiles(BaseModel):
    advert_fk: int
    file_fk: UUID


class Advert_to_send(BaseModel):
    user_id: List[int]


