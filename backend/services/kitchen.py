import logging

from ..repos.kitchen import KitchenRepo

logger = logging.getLogger(f'app.{__name__}')


class KitchenService:

    @classmethod
    async def get_kitchens(cls):
        return await KitchenRepo.get_kitchens()
