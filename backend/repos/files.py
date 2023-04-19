import logging
from sqlalchemy import insert, select, delete, update, func, and_
from ..settings.db import db
from ..models.files import files

logger = logging.getLogger(f"app.{__name__}")


class FileRepo:
    @classmethod
    async def insert_file(cls, file_in_db):
        insert_query = (
            insert(files)
            .values(**file_in_db)
        )
        return await db.execute(insert_query)

    @classmethod
    async def get_info_by_id(cls, file_id):
        query = (
            select(files.c.file_id, files.c.file_name, files.c.ext, files.c.size,
                   files.c.type, files.c.description, files.c.creator_email,
                   files.c.editor_email, files.c.create_time, files.c.edit_time)
            .where(files.c.file_id == file_id)
        )
        return await db.fetch_one(query)

    @classmethod
    async def get_file_data_by_id(cls, file_id_str):
        query = select(files.c.file_data).where(files.c.file_id == file_id_str)
        return await db.fetch_one(query)

    @classmethod
    async def delete_by_id(cls, file_id_str):
        query = delete(files).where(files.c.file_id == file_id_str)
        return await db.execute(query)

    @classmethod
    async def update_by_id(cls, file_id_str, file_in_db):
        async with db.transaction() as t:
            select_for_update = (
                select(files.c.file_id)
                .where(files.c.file_id == file_id_str)
                .with_for_update()
            )
            await db.execute(select_for_update)
            update_query = (
                update(files)
                .where(files.c.file_id == file_id_str)
                .values(**file_in_db)
            )
            return await db.execute(update_query)

    @classmethod
    async def find_all(cls, page, size):
        query = (
            select(files.c.file_id, files.c.file_name, files.c.ext, files.c.size,
                   files.c.type, files.c.description, files.c.creator_email,
                   files.c.editor_email, files.c.create_time, files.c.edit_time)
            .order_by(files.c.create_time.desc())
            .limit(size)
            .offset(page*size)
        )
        return await db.fetch_all(query)

    @classmethod
    async def calculate_files_count(cls):
        query = (
            select([func.count()])
            .select_from(files)
        )
        return await db.fetch_one(query)