# from fastapi import Depends, HTTPException
# from fastapi.security import OAuth2PasswordBearer
# from backend.utils.jwt import JWTUtil
# from backend.schemas.auth import UserInfo
#
# oauth2scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/token")
#
#
# def get_discor_user(token: str = Depends(oauth2scheme)):
#     payload = JWTUtil.get_discor_user_info(token)
#     return payload
#
#
# def get_user(token: str = Depends(oauth2scheme)):
#     user_info: UserInfo = JWTUtil.get_user_info(token)
#     roles = user_info.roles
#     if len(roles) == 0:
#         raise HTTPException(status_code=401, detail="У пользователя нет ни одной роли!")
#     return user_info
#
#
# def get_admin(user_info: UserInfo = Depends(get_user)):
#     roles = user_info.roles
#     if 'ADMIN' not in roles:
#         raise HTTPException(status_code=403, detail="Доступ запрещен!")
#     return user_info
#
#
# def get_user_admin(user_info: UserInfo = Depends(get_user)):
#     roles = user_info.roles
#     if 'USER_ADMIN' not in roles:
#         raise HTTPException(status_code=403, detail="Доступ запрещен!")
#     return user_info
