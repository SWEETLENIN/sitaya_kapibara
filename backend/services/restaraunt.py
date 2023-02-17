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

#     @classmethod
#     async def create(cls, adverts_item: sch.AdvertsCreate, admin_info):
#         """
#         Создание элемента adverts.
#         """
#         email = cls._get_email(admin_info)
#         today_date = cls._get_date()
#         adverts_in_db_dict = sch.AdvertsInDBCreate(
#             message=adverts_item.message,
#             advert_title=adverts_item.advert_title,
#             menu_fk=adverts_item.menu_fk,
#             creator_email=email,
#             editor_email=None,
#             edit_date=None,
#             create_date=today_date
#         )
#         item_id = await AdvertsRepo.create(adverts_in_db_dict)
#
#         files_in_adverts = []
#         if adverts_item.files is not None:
#             for file_id in adverts_item.files:
#                 files_in_adverts_sch = sch.AdvertFiles(
#                     advert_fk=item_id,
#                     file_fk=file_id
#                 )
#                 files_in_adverts.append(files_in_adverts_sch.dict())
#             await AdvertsRepo.create_advert_files(files_in_adverts)
#
#         return await cls.get_advert_by_id(item_id)
#
#
#
#     @classmethod
#     async def change_advert_info(cls, advert_id, advert_updated: sch.AdvertsUpdate, admin_info):
#         advert_item_dict = await cls.get_advert_by_id(advert_id)
#         # await AdvertsRepo.delete_advert_files(advert_id)
#         edit_email = cls._get_editor_email(admin_info)
#         today_date = cls._get_date()
#         adverts_in_db_dict = sch.AdvertsInDBUpdate(
#             message=advert_updated.message,
#             advert_title=advert_updated.advert_title,
#             menu_fk=advert_updated.menu_fk,
#             editor_email=edit_email,
#             edit_date=today_date
#         )
#         await AdvertsRepo.update(advert_item_dict, adverts_in_db_dict)
#         new_files_in_adverts = []
#         # print(advert_updated.files)
#         if advert_updated.files is not None and advert_updated.files!=[]:
#             for file_id in advert_updated.files:
#                 new_files_in_adverts_sch = sch.AdvertFiles(
#                     advert_fk=advert_id,
#                     file_fk=file_id
#                 )
#                 new_files_in_adverts.append(new_files_in_adverts_sch.dict())
#             await AdvertsRepo.update_advert_files(advert_id, new_files_in_adverts)
#
#         return await cls.get_advert_by_id(advert_id)
#
#     @classmethod
#     async def get_advert_by_id(cls, advert_id):
#         advert_item = await AdvertsRepo.find_by_id(advert_id)
#
#         if advert_item == []:
#             raise HTTPException(status_code=404, detail="Элемент advert не найден")
#         files=[]
#         for i in advert_item:
#             if i.file_id is not None:
#                 file_info_obj = sch.FileInfoForAdvert(file_id=i.file_id, file_name=i.file_name)
#                 files.append(file_info_obj)
#         advert_response = sch.AdvertsResponse(
#                     advert_id=advert_item[0].advert_id,
#                     message=advert_item[0].message,
#                     advert_title=advert_item[0].advert_title,
#                     menu_name=advert_item[0].menu_name,
#                     menu_fk=advert_item[0].menu_fk,
#                     parent_id=advert_item[0].parent_id,
#                     editor_email=advert_item[0].editor_email,
#                     edit_date=advert_item[0].edit_date,
#                     creator_email=advert_item[0].creator_email,
#                     create_date=advert_item[0].create_date,
#                     files=files
#         )
#         return dict(advert_response)
#
#     @classmethod
#     async def delete_advert_item_by_id(cls, advert_id):
#         advert_item_dict = await cls.get_advert_by_id(advert_id)
#         await AdvertsRepo.delete(advert_item_dict)
#
#     @classmethod
#     async def get_count(cls):
#         record = await AdvertsRepo.calculate_count()
#         count = record[0]
#         return {"adverts_count": count}
#
#     @classmethod
#     def _get_email(cls, admin_info):
#         email = admin_info.email
#         return email
#
#     @classmethod
#     def _get_editor_email(cls, admin_info):
#         edit_email = admin_info.email
#         return edit_email
#
#     @classmethod
#     def _get_date(cls):
#         return datetime.datetime.today()
#
#
#     @classmethod
#     async def show_advert_files_by_id(cls, advert_id):
#         return await AdvertsRepo.show_advert_files_by_id(advert_id)
#
#
#     @classmethod
#     async def send_mail_to_users(cls, advert_id, smtp: sch.Advert_to_send):
#         user_ids=smtp.user_id
#         emails=[]
#         for mail_id in user_ids:
#             item=await MailingListService.get_mail_by_id(mail_id)
#             emails.append(item['email'])
#
#
#         advert_and_files_ids=await cls.show_advert_files_by_id(advert_id)
#         paths=[]
#         for ids in advert_and_files_ids:
#             file_info = await FileService.get_file_info_by_id(ids.file_fk)
#             file_name_with_ext = f"{file_info['file_name']}.{file_info['ext']}"
#             file= await FileService.get_file_with_path(str(ids.file_fk))
#             paths.append({'file_path':file, 'file_name': file_name_with_ext})
#
#
#
#
#         adv_inf = await cls.get_advert_by_id(advert_id)
#         msg_text = adv_inf['message']
#         msg_subj="СИС Эффект: "
#         if adv_inf['advert_title'] is not None and len(adv_inf['advert_title'])>0:
#             msg_subj+=f"{adv_inf['advert_title']}"
#         elif adv_inf['menu_name'] is not None and len(adv_inf['menu_name'])>0:
#             msg_subj+=f"Объявление в разделе {adv_inf['menu_name']}"
#         else:
#             msg_subj+="Общее объявление"
#
#
#         return SMTPmail.send_email(emails, msg_subj, msg_text, paths)
#
#
#     @classmethod
#     async def find_adverts_paged(cls, page, size, phrase):
#         search_phrase = cls._prepare_search_phrase(phrase)
#         return await AdvertsRepo.find_adverts_by_search_phrase(page, size, search_phrase)
#
#     @classmethod
#     def _prepare_search_phrase(cls, phrase):
#         phrase_without_spaces = phrase.strip()
#         phrase_list = phrase_without_spaces.split(' ')
#         if len(phrase_list) == 1:
#             return f"{phrase_without_spaces}:*"
#         separator = ':* & '
#         result_phrase = separator.join(phrase_list)
#         return result_phrase
#
#
#     @classmethod
#     async def count_for_adverts_search_results(cls, phrase):
#         search_phrase = cls._prepare_search_phrase(phrase)
#         record = await AdvertsRepo.calculate_count_for_adverts_search(search_phrase)
#         count = record[0]
#         return {"search_count": count}
#
#
#     @classmethod
#     async def get_all_adverts(cls, page, size):
#         advert_list=[]
#         adverts= await AdvertsRepo.get_adverts(page, size)
#         for adv in adverts:
#             advert_response = sch.AdvertsResponse(
#                 advert_id=adv.advert_id,
#                 message=adv.message,
#                 advert_title=adv.advert_title,
#                 menu_name=adv.menu_name,
#                 menu_fk=adv.menu_fk,
#                 parent_id=adv.parent_id,
#                 editor_email=adv.editor_email,
#                 edit_date=adv.edit_date,
#                 creator_email=adv.creator_email,
#                 create_date=adv.create_date
#             )
#             files_for_advert= await AdvertsRepo.get_advert_files(adv.advert_id)
#             files = []
#             for file in files_for_advert:
#                 files_obj_inf = sch.FileInfoForAdvert(file_id=file.file_id, file_name=file.file_name)
#                 files.append(files_obj_inf)
#             advert_response.files=files
#             advert_list.append(advert_response)
#         return(advert_list)
#
#
#
#
#
#
#
#
#
