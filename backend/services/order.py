import logging
import uuid

from fastapi import HTTPException
from ..schemas import food as food_sch
from ..repos.food import FoodRepo
import datetime
from ..repos.files import FileRepo
from .files import FileService
from ..settings.file_config import FILE_CONFIG
from ..utils.smtp import SMTPmail

logger = logging.getLogger(f'app.{__name__}')


class OrderService:

    @classmethod
    async def send_email(cls, user_info):
        order_num = uuid.uuid4()
        msg_zag = f'Заказ {order_num}'
        msg_text = f'Добрый день!\nВы оформили заказ с сайта "Сытая капибара"\nВаш номер заказа: {order_num} \nВаш заказ:\n'
        total_price = 0
        for item in user_info.food:
            msg_text += item['food_name'] + '\n'
            total_price += item['price']
        msg_text += f'Итоговая стоимость: {total_price}'
        addr_to = user_info.user_email
        SMTPmail.send_email(addr_to, msg_zag, msg_text)
        # print(msg_text)
