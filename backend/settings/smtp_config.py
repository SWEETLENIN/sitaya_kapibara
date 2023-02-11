from pydantic import BaseSettings


class SMTPConfig(BaseSettings):
    address: str
    password: str
    host: str
    port: str

    class Config:
        env_prefix = 'SMTP_'
        env_file = './backend/config/config.env'


SMTP_CONFIG = SMTPConfig()
