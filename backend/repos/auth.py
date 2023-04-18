import datetime
import logging
import sqlalchemy as sql
from backend.settings.pgauth import auth_db
from backend.models.users import users

logger = logging.getLogger(f"app.{__name__}")


class AuthRepo:
    @classmethod
    async def find_user_by_login(cls, username):
        select_user = (
            sql.select(users)
            .where(users.c.username == username)
        )
        return await auth_db.fetch_one(select_user)

    @classmethod
    async def get_roles_by_user_id(cls, user_id):
        select_roles = (
            sql.select(users.c.roles)
            .where(
                users.c.user_id == user_id,
            )
        )
        return await auth_db.fetch_all(select_roles)
