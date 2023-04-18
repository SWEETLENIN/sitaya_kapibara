import json
import logging
import traceback

from fastapi import HTTPException
from datetime import datetime, timedelta
from jose import JWTError, jwt, jws
from backend.schemas.auth import UserInfo
from backend.settings.auth_config import AUTH_CONFIG

logger = logging.getLogger(f"app.{__name__}")


class JWTUtil:

    @classmethod
    def create_jwt(cls, user_info: UserInfo):
        logger.debug(datetime.now())
        expire_time = datetime.now() + timedelta(minutes=AUTH_CONFIG.access_token_expire_minutes)
        expire_timestamp = int(expire_time.timestamp())
        logger.debug(expire_time)
        logger.debug(expire_timestamp)
        payload = user_info.dict()
        payload.update({"exp": expire_timestamp, "sub": user_info.username})
        logger.debug(payload)
        created_jwt = jwt.encode(payload, AUTH_CONFIG.jwt_secret_key, AUTH_CONFIG.jwt_algorithm)
        return created_jwt

    @classmethod
    def get_user_info(cls, token):
        try:
            payload = jwt.decode(token, AUTH_CONFIG.jwt_secret_key, AUTH_CONFIG.jwt_algorithm)
            user_info = UserInfo.parse_obj(payload)
            return user_info
        except JWTError:
            error_message = "Токен пользователя неправильный или просроченный"
            raise HTTPException(status_code=401, detail=error_message, headers={"WWW-Authenticate": "Bearer"})

    @classmethod
    def get_discor_user_info(cls, token):
        try:
            payload = jwt.decode(token, AUTH_CONFIG.discor_pub_key, AUTH_CONFIG.discor_jwt_algorithm, audience='diskor')
            return payload
        except JWTError:
            print(traceback.format_exc())
            error_message = "Токен пользователя ДИСКОР неправильный или просроченный"
            raise HTTPException(status_code=401, detail=error_message, headers={"WWW-Authenticate": "Bearer"})
