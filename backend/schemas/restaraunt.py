from pydantic import BaseModel, validator
from typing import Optional, List, Dict
import datetime
import re
from uuid import UUID


class RestarauntBase(BaseModel):
    city: str
    street: str
    building: str
    number_of_seats: int
    work_time: str


class RestarauntUpdate(RestarauntBase):
    pass


class RestarauntCreate(RestarauntBase):
    pass

    @validator('city')
    def check_city_length(cls, city):
        """
            Проверка на длину city. city не может быть длиннее чем 30 символов.
        """
        length_limit = 30
        if len(city) > length_limit:
            raise ValueError(f"city не может быть длиннее чем {length_limit} символов")
        return city

    @validator('street')
    def check_street_length(cls, street):
        """
            Проверка на длину street. street не может быть длиннее чем 30 символов.
        """
        length_limit = 30
        if len(street) > length_limit:
            raise ValueError(f"street не может быть длиннее чем {length_limit} символов")
        return street

    @validator('building')
    def check_building_length(cls, building):
        """
            Проверка на длину building. building не может быть длиннее чем 30 символов.
        """
        length_limit = 5
        if len(building) > length_limit:
            raise ValueError(f"building не может быть длиннее чем {length_limit} символов")
        return building

    @validator('work_time')
    def check_worktime_length(cls, work_time):
        """
            Проверка на длину work_time. work_time не может быть длиннее чем 30 символов.
        """
        length_limit = 11
        if len(work_time) > length_limit:
            raise ValueError(f"work_time не может быть длиннее чем {length_limit} символов")
        return work_time


# class AdvertsUpdate(AdvertsBase):
#     menu_fk: Optional[int]
#     files: Optional[List[UUID]]
#
#
# class AdvertsCreate(AdvertsUpdate):
#     pass
#
#
# class AdvertsInDBUpdate(AdvertsBase):
#     menu_fk: Optional[int]
#     edit_date: Optional[datetime.datetime]
#     editor_email: Optional[str]
#
#     @validator('editor_email')
#     def check_editor_email_length(cls, email):
#         """
#             Проверка на корректность ввода creator_email
#             Проверка на длину creator_email. creator_email не может быть длиннее чем 50 символов.
#         """
#         pattern = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
#         length_limit = 50
#         if email is not None and len(email) > length_limit:
#             raise ValueError(f"editor_email не может быть длиннее чем {length_limit} символов")
#         if email is not None and re.match(pattern, email) is None:
#             raise ValueError(f"Неккоректный формат электронного адреса{email}")
#         return email
#
#
# class AdvertsInDBCreate(AdvertsInDBUpdate):
#     create_date: datetime.datetime
#     creator_email: str
#
#     @validator('creator_email')
#     def check_creator_email_length(cls, email):
#         """
#             Проверка на корректность ввода creator_email
#             Проверка на длину creator_email. creator_email не может быть длиннее чем 50 символов.
#         """
#         pattern = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
#         if re.match(pattern, email) is None:
#             raise ValueError(f"Неккоректный формат электронного адреса{email}")
#
#         length_limit = 50
#         if len(email) > length_limit:
#             raise ValueError(f"creator_email не может быть длиннее чем {length_limit} символов")
#         return email
#
#
# class FileInfoForAdvert(BaseModel):
#     file_name: str
#     file_id: UUID
#

class RestarauntResponse(RestarauntBase):
    restaraunt_id: int

# class AdvertFiles(BaseModel):
#     advert_fk: int
#     file_fk: UUID
#
#
# class Advert_to_send(BaseModel):
#     user_id: List[int]
#
#
