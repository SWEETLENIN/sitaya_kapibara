import logging
import bcrypt
from fastapi.security import OAuth2PasswordRequestForm
from datetime import datetime, timedelta
from fastapi import HTTPException
from ..settings.auth_config import AUTH_CONFIG
from ..repos.auth import AuthRepo
import backend.schemas.auth as sch
from backend.utils.jwt import JWTUtil

logger = logging.getLogger(f"app.{__name__}")


class AuthService:

    @classmethod
    async def auth_user(cls, creds: OAuth2PasswordRequestForm):
        user = await AuthRepo.find_user_by_login(creds.username)
        # print(user.user_id)
        if user is None:
            raise HTTPException(status_code=401, detail="Неправильный логин")
        user_password = user.password
        is_passwords_same = cls.verify_password(creds.password, user_password)
        if is_passwords_same:
            user_roles_records = await AuthRepo.get_roles_by_user_id(user.id)
            user_roles = [rec['name_role'] for rec in user_roles_records]
            user_jwt_info = cls._create_user_jwt_info(user)
            jwt_token = JWTUtil.create_jwt(user_jwt_info)
            return {"access_token": jwt_token}
        error_message = f"Неправильный пароль."
        raise HTTPException(status_code=401, detail=error_message)

    @classmethod
    def verify_password(cls, plain_password, actual_password):
        if plain_password == actual_password:
            return True
        return False

    @classmethod
    def _create_input_info(cls, user, user_ip):
        return {
            "fk_user": user.id,
            "type": "ВХОД",  # для авторизации всегда одно значение
            "date_create": datetime.now(),
            "ip": user_ip,
            "result": False,  # по умолчанию False далее при успешной попытке заменяем на True
            "login": user.login
        }

    @classmethod
    def get_password_hash(cls, password):
        return AUTH_CONFIG.pwd_context.hash(password)

    @classmethod
    async def get_user_info_with_roles(cls, user_id):
        pass

    @classmethod
    async def create_access_token(cls):
        pass

    @classmethod
    def get_user_from_jwt(cls):
        pass

    @classmethod
    def _create_user_jwt_info(cls, user):
        full_name = f"{user.firstname} {user.surname}"
        return sch.UserInfo(
            user_id=user.user_id,
            full_name=full_name,
            email=user.email,
            username=user.username,
            roles=user.roles
        )