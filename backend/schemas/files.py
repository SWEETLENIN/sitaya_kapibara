from pydantic import BaseModel
from typing import Optional
from uuid import UUID
import datetime


class FileBase(BaseModel):
    file_id: UUID
    file_name: str
    type: str
    ext: str
    size: int


class FileResponse(FileBase):
    pass


class FileFull(FileResponse):
    creator_email: str
    editor_email: Optional[str]
    create_time: datetime.datetime
    edit_time: Optional[datetime.datetime]
    description: Optional[str]


class FileInDb(FileFull):
    file_data: bytes


class FileShort(BaseModel):
    file_id: UUID
    file_name: str