import pathlib

from pydantic import BaseSettings
from passlib.context import CryptContext
from typing import Optional


class AuthConfig(BaseSettings):
    jwt_secret_key: str
    jwt_algorithm: str
    access_token_expire_minutes: int
    attempts_before_lock: int
    lock_minutes: int
    attempts_count_minutes: int
    pwd_context: Optional[CryptContext]
    discor_pub_key_path: str
    discor_pub_key: Optional[str]
    discor_jwt_algorithm: str

    def create_bcrypt_pwd_context(self):
        self.pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    def read_discor_pub_key(self):
        key_path = pathlib.Path(self.discor_pub_key_path)
        with open(key_path, 'r') as f:
            self.discor_pub_key = f.read()

    class Config:
        env_prefix = 'AUTH_'
        env_file = './backend/config/config.env'


AUTH_CONFIG = AuthConfig()
AUTH_CONFIG.create_bcrypt_pwd_context()
AUTH_CONFIG.read_discor_pub_key()
