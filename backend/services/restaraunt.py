import logging

from fastapi import HTTPException
from ..schemas import restaraunt as sch
from ..repos.restaraunt import RestarauntRepo
import datetime

logger = logging.getLogger(f'app.{__name__}')


class RestarauntService:

    @classmethod
    async def get_restaraunts(cls):
        return await RestarauntRepo.get_restaraunts()

    @classmethod
    async def get_restaraunt_by_id(cls, restaraunt_id):
        return await RestarauntRepo.get_restaraunt_by_id(restaraunt_id)

    @classmethod
    async def create_restaraunt(cls, restaraunt_item):
        rest_id = await RestarauntRepo.create_restaraunt(restaraunt_item)
        return await RestarauntRepo.get_restaraunt_by_id(rest_id)

    @classmethod
    async def change_restaraunt_info(cls, rest_id, rest_item: sch.RestarauntUpdate):
        updated_rest_info = sch.RestarauntUpdate(
            city=rest_item.city,
            street=rest_item.street,
            building=rest_item.building,
            number_of_seats=rest_item.number_of_seats,
            work_time=rest_item.work_time
        )
        await RestarauntRepo.change_rest_info(rest_id, updated_rest_info)
        return await RestarauntRepo.get_restaraunt_by_id(rest_id)

    @classmethod
    async def get_count_of_restaraunt(cls):
        record = await RestarauntRepo.get_count()
        count = record[0]
        return {"restaraunt_count": count}

    @classmethod
    async def delete_restaraunt(cls, rest_id):
        return await RestarauntRepo.delete_restaraunt(rest_id)