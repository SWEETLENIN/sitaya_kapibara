import logging
from fastapi import APIRouter, Request, Depends
from fastapi.security import OAuth2PasswordRequestForm
from backend.services.auth import AuthService
import backend.dependencies.user as ud
import backend.schemas.auth as sch

router = APIRouter(prefix="/api/v1/auth")
logger = logging.getLogger(f"app.{__name__}")


@router.post("/token", status_code=201)
async def create_token(creds: OAuth2PasswordRequestForm = Depends()):
    return await AuthService.auth_user(creds)


@router.get("/token")
async def get_token_info(user_info: sch.UserInfo = Depends(ud.get_user)):
    return user_info


@router.get("/token/admin")
async def get_admin_token_info(admin_info: sch.UserInfo = Depends(ud.get_admin)):
    return admin_info
