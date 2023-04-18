from fastapi import APIRouter, UploadFile, Depends
from uuid import UUID
from typing import List
from ..schemas import files as sch
from ..services.files import FileService


router = APIRouter(prefix="/api/v1/files")


@router.post("", response_model=sch.FileResponse)
async def create_file(file: UploadFile):
    return await FileService.create_file(file)


@router.post("/several", response_model=List[sch.FileResponse])
async def create_files(files: List[UploadFile]):
    return await FileService.create_files(files)


@router.get("", response_model=List[sch.FileFull])
async def get_files_info(page: int = 0, size: int = 20):
    return await FileService.get_files_info(page, size)


@router.get("/count")
async def get_files_count():
    return await FileService.get_files_count()


@router.get("/{file_id}")
async def get_file(file_id: UUID):
    return await FileService.get_file(file_id)


@router.delete("/{file_id}", status_code=204)
async def delete_file(file_id: UUID):
    return await FileService.delete(file_id)


@router.put("/{file_id}", response_model=sch.FileResponse)
async def update_file(file_id: UUID, file: UploadFile):
    return await FileService.update(file_id, file)
