import logging

from typing import List

from ..models.restaraunt import restaraunt
from ..schemas import restaraunt as sch
from ..settings.db import db
from sqlalchemy import select, insert, delete, update, and_, func
logger = logging.getLogger(f'app.{__name__}')


class RestarauntRepo:
    # @classmethod
    # async def create(cls, new_advert: sch.AdvertsInDBCreate):
    #     query = (
    #         insert(adverts)
    #             .values(**new_advert.dict())
    #         )
    #     return await db.execute(query)
    #
    # @classmethod
    # async def create_advert_files(cls, adv_files):
    #     query = (
    #         insert(advert_files)
    #         .values(adv_files)
    #     )
    #     return await db.execute(query)


    @classmethod
    async def get_restaraunts(cls):
        query = (
            select(restaraunt)
        )
        return await db.fetch_all(query)


    # @classmethod
    # async def find_by_id(cls, adverts_id):
    #     query = (
    #         select(adverts, menu.c.menu_name, menu.c.parent_id, files.c.file_id, files.c.file_name)
    #             .outerjoin(menu, adverts.c.menu_fk == menu.c.menu_id)
    #             .outerjoin(advert_files, advert_files.c.advert_fk == adverts.c.advert_id)
    #             .outerjoin(files, files.c.file_id == advert_files.c.file_fk)
    #             .where(adverts.c.advert_id == adverts_id)
    #     )
    #     return await db.fetch_all(query)
    #
    # @classmethod
    # async def update(cls, adverts_item_dict, adverts_updated_dict: sch.AdvertsInDBUpdate):
    #     async with db.transaction() as transact:
    #         delete_advert_files = delete(advert_files).where(advert_files.c.advert_fk == adverts_item_dict['advert_id'])
    #         await db.execute(delete_advert_files)
    #         update_adverts_item = (
    #             update(adverts)
    #                 .where(adverts.c.advert_id == adverts_item_dict['advert_id'])
    #                 .values(**adverts_updated_dict.dict())
    #         )
    #         await db.execute(update_adverts_item)
    #
    # @classmethod
    # async def update_advert_files(cls, advert_id, files):
    #     query_add_files = (insert(advert_files).values(files))
    #     return await db.execute(query_add_files)
    #
    #
    #
    # @classmethod
    # async def delete(cls, advert_item_dict):
    #     async with db.transaction() as transact:
    #         delete_advert_files= delete(advert_files).where(advert_files.c.advert_fk == advert_item_dict['advert_id'])
    #         await db.execute(delete_advert_files)
    #         delete_advert_search= delete(adverts_search).where(adverts_search.c.advert_fk == advert_item_dict['advert_id'])
    #         await db.execute(delete_advert_search)
    #         delete_item = (delete(adverts).where(adverts.c.advert_id == advert_item_dict['advert_id']))
    #         await db.execute(delete_item)
    #
    #
    # @classmethod
    # async def find_all_items(cls):
    #     query = (
    #         select(adverts)
    #             .where(adverts.c.is_deleted == False)
    #     )
    #     return await db.fetch_all(query)
    #
    # @classmethod
    # async def update_all_is_active(cls, adverts_id_update_list):
    #     async with db.transaction():
    #         all_is_active_eq_false = (
    #             update(adverts)
    #                 .values(is_active=False)
    #         )
    #         await db.execute(all_is_active_eq_false)
    #         is_active_from_list_ex_true = (
    #             update(adverts)
    #                 .where(adverts.c.advert_id.in_(adverts_id_update_list))
    #                 .values(is_active=True)
    #         )
    #         await db.execute(is_active_from_list_ex_true)
    #
    # @classmethod
    # async def update_sync_sppo(cls, adverts_id):
    #     sync_sppo_in_true = (
    #         update(adverts)
    #             .where(adverts.c.advert_id.in_(adverts_id))
    #             .values(sync_sppo=True)
    #     )
    #     await db.execute(sync_sppo_in_true)
    #
    # @classmethod
    # async def calculate_count(cls):
    #     base_select = (
    #         select([func.count()])
    #             .select_from(adverts)
    #     )
    #     return await db.fetch_one(base_select)
    #
    # @classmethod
    # async def calculate_is_deleted_count(cls):
    #     base_select = (
    #         select([func.count()])
    #             .select_from(adverts)
    #             .where(adverts.c.is_deleted.is_(True))
    #     )
    #     return await db.fetch_one(base_select)
    #
    # @classmethod
    # async def find_all_for_auth(cls, size):
    #     query = (
    #         select(adverts, menu)
    #             .outerjoin(menu, adverts.c.menu_fk == menu.c.menu_id)
    #             .order_by(adverts.c.create_date.desc())
    #             .limit(size)
    #     )
    #     return await db.fetch_all(query)
    #
    # @classmethod
    # async def show_advert_files_by_id(cls, advert_id):
    #     query= (select(advert_files).where(advert_files.c.advert_fk==advert_id))
    #     return await db.fetch_all(query)
    #
    # @classmethod
    # async def find_adverts_by_search_phrase(cls, page, size, search_phrase):
    #     select_query = """
    #             SELECT adv.advert_title, adv.message, adv.menu_fk, adv.advert_id,
    #                     adv.creator_email, adv.create_date, ts_rank_cd(ase.search_vector, query, 1) AS rank
    #             FROM to_tsquery('russian', :phrase) AS query,
    #                 public.adverts AS adv
    #             JOIN public.adverts_search AS ase
    #             ON adv.advert_id = ase.advert_fk
    #             WHERE query @@ ase.search_vector
    #             ORDER BY rank DESC
    #             LIMIT :limit
    #             OFFSET :offset;
    #         """
    #     values = {"phrase": search_phrase, "limit": size, "offset": size * page}
    #     return await db.fetch_all(select_query, values)
    #
    # @classmethod
    # async def calculate_count_for_adverts_search(cls, search_phrase):
    #     count_query = """
    #         SELECT count(*)
    #         FROM to_tsquery('russian', :phrase) AS query,
    #                 public.adverts AS adv
    #             JOIN public.adverts_search AS ase
    #             ON adv.advert_id = ase.advert_fk
    #             WHERE query @@ ase.search_vector
    #     """
    #     values = {"phrase": search_phrase}
    #     return await db.fetch_one(count_query, values)
    #
    # @classmethod
    # async def delete_advert_files(cls, advert_id):
    #     delete_advert_files = delete(advert_files).where(advert_files.c.advert_fk == advert_id)
    #     await db.execute(delete_advert_files)
    #
    # @classmethod
    # async def get_advert_files(cls, advert_id):
    #     query =(
    #         select(advert_files, files.c.file_id, files.c.file_name)
    #         .join(files, advert_files.c.file_fk == files.c.file_id)
    #         .where(advert_files.c.advert_fk == advert_id)
    #     )
    #     return await db.fetch_all(query)
