import uuid
from typing import List
import datetime
import logging
from fastapi import UploadFile, HTTPException
from fastapi.responses import FileResponse
from ..repos.files import FileRepo
from ..settings.file_config import FILE_CONFIG

logger = logging.getLogger(f"app.{__name__}")


class FileService:
    @classmethod
    async def create_file(cls, file: UploadFile):
        new_uuid = uuid.uuid4()
        new_uuid_str = str(new_uuid)
        file_name, ext = cls._divide_name_and_ext(file.filename)
        file_data = file.file.read()
        size = len(file_data)
        file_type = file.content_type
        creator_email = cls._get_user_email()
        create_time = datetime.datetime.now()
        file_in_db = {
            "file_id": new_uuid_str, "ext": ext, "file_name": file_name,
            "type": file_type, "size": size, "file_data": file_data,
            "creator_email": creator_email, "create_time": create_time
        }
        await FileRepo.insert_file(file_in_db)
        return file_in_db

    @classmethod
    async def create_files(cls, files: List[UploadFile]):
        files_in_db = []
        if len(files) > 15:
            raise HTTPException(status_code=400, detail="Слишком большое кол-во файлов в один процесс")
        for file in files:
            new_uuid = uuid.uuid4()
            new_uuid_str = str(new_uuid)
            file_name, ext = cls._divide_name_and_ext(file.filename)
            file_data = file.file.read()
            size = len(file_data)
            file_type = file.content_type
            creator_email = cls._get_user_email()
            create_time = datetime.datetime.now()
            file_in_db = {
                "file_id": new_uuid_str, "ext": ext, "file_name": file_name,
                "type": file_type, "size": size, "file_data": file_data,
                "creator_email": creator_email, "create_time": create_time
            }
            await FileRepo.insert_file(file_in_db)
            files_in_db.append(file_in_db)
        return files_in_db

    @classmethod
    def _divide_name_and_ext(cls, file_name_with_ext):
        separator = '.'
        file_name_with_ext_list = file_name_with_ext.split(separator)
        ext = file_name_with_ext_list[-1]
        file_name = separator.join(file_name_with_ext_list[:-1])
        return file_name, ext

    @classmethod
    def _get_user_email(cls):
        return "test@ya.ru"

    @classmethod
    async def get_file_info_by_id(cls, file_id):
        file_info = await FileRepo.get_info_by_id(file_id)
        if file_info is None:
            raise HTTPException(status_code=404, detail="Файл не найден!")
        return dict(file_info)

    @classmethod
    async def get_file(cls, file_id):
        file_info = await cls.get_file_info_by_id(file_id)
        file_id_str = str(file_id)
        file_path = await cls.get_file_with_path(file_id_str)
        file_name_with_ext = f"{file_info['file_name']}.{file_info['ext']}"
        headers = {"Access-Control-Expose-Headers": "Content-Disposition"}
        return FileResponse(file_path, filename=file_name_with_ext, media_type=file_info['type'], headers=headers)

    @classmethod
    async def get_file_with_path(cls, file_id_str):
        file_path = FILE_CONFIG.path.joinpath(file_id_str)
        if not file_path.exists():
            logger.debug(f"Файла {file_id_str} нет во временном хранилище. Получаем из базы.")
            file_data = await FileRepo.get_file_data_by_id(file_id_str)
            file_path.write_bytes(file_data[0])
        return file_path

    # из временного хранилища не удаляем, удалит планировщик.
    @classmethod
    async def delete(cls, file_id):
        file_id_str = str(file_id)
        return await FileRepo.delete_by_id(file_id_str)

    @classmethod
    async def update(cls, file_id, file):
        file_id_str = str(file_id)
        await cls.get_file_info_by_id(file_id_str)
        file_name, ext = cls._divide_name_and_ext(file.filename)
        file_data = file.file.read()
        size = len(file_data)
        file_type = file.content_type
        editor_email = cls._get_user_email()
        edit_time = datetime.datetime.now()
        file_in_db = {
            "ext": ext, "file_name": file_name,
            "type": file_type, "size": size, "file_data": file_data,
            "editor_email": editor_email, "edit_time": edit_time
        }
        await FileRepo.update_by_id(file_id_str, file_in_db)
        file_path = FILE_CONFIG.path.joinpath(file_id_str)
        if file_path.exists():
            file_path.write_bytes(file_data)
        file_in_db.update({"file_id": file_id_str})
        return file_in_db

    @classmethod
    async def get_files_info(cls, page, size):
        return await FileRepo.find_all(page, size)

    @classmethod
    async def get_files_count(cls):
        count = await FileRepo.calculate_files_count()
        return {"files_count": count[0]}