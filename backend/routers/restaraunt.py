import logging
from fastapi import APIRouter, Body, Depends
from typing import List
from ..services.restaraunt import RestarauntService
from ..schemas import restaraunt as sch

router = APIRouter(prefix="/api/v1/restaraunt")
logger = logging.getLogger(f'app.{__name__}')


@router.get("")
async def get_restaraunts():
    return await RestarauntService.get_restaraunts()

#
# @router.post("", response_model=sch.AdvertsResponse, status_code=201)
# async def create_advert(advert_item: sch.AdvertsCreate, admin_info: auth_sch.UserInfo = Depends(ud.get_admin)):
#     return await AdvertsService.create(advert_item, admin_info)
#
#
# @router.get("")
# async def get_adverts_page(page: int = 0, size: int = 20):
#     return await AdvertsService.get_all_adverts(page, size)
#
#
#
# @router.get("/count")
# async def get_adverts_count_for_pagination():
#     return await AdvertsService.get_count()
#
#
# @router.get("/for_auth", response_model=List[sch.AdvertsResponse])
# async def get_adverts_for_auth(page: int = 0, size: int = 5):
#     return await AdvertsService.get_all_adverts(page, size)
#
#
# @router.post("/search", response_model=List[sch.AdvertsResponse])
# async def find_adverts_with_pagination(page: int = 0, size: int = 10, phrase: str = Body(embed=True)):
#     return await AdvertsService.find_adverts_paged(page, size, phrase)
#
# @router.post("/search/count")
# async def count_for_search_results(phrase: str = Body(embed=True)):
#     return await AdvertsService.count_for_adverts_search_results(phrase)
#
#
# @router.get("/advert_files/{advert_id}", response_model=List[sch.AdvertFiles])
# async def get_adverts_files(advert_id: int):
#     return await AdvertsService.show_advert_files_by_id(advert_id)
#
#
# @router.put("/{advert_id}", response_model=sch.AdvertsResponse)
# async def change_advert_by_id(advert_id: int, advert_item: sch.AdvertsUpdate, admin_info: auth_sch.UserInfo = Depends(ud.get_admin)):
#     return await AdvertsService.change_advert_info(advert_id, advert_item, admin_info)
#
#
# @router.get("/{advert_id}", response_model=sch.AdvertsResponse)
# async def get_advert_by_id(advert_id: int):
#     return await AdvertsService.get_advert_by_id(advert_id)
#
#
# @router.delete("/{advert_id}", status_code=204)
# async def delete_advert_by_id(advert_id: int, admin_info: auth_sch.UserInfo = Depends(ud.get_admin)):
#     return await AdvertsService.delete_advert_item_by_id(advert_id)
#
#
# @router.post("/{advert_id}/mail", status_code=200)
# async def send_mail_to_users(advert_id: int, smtp_item: sch.Advert_to_send,
#                              admin_info: auth_sch.UserInfo = Depends(ud.get_admin)):
#     return await AdvertsService.send_mail_to_users(advert_id, smtp_item)
#
#
#
