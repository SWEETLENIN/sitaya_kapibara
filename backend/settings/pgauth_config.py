from pydantic import BaseSettings


class PGAuthSettings(BaseSettings):
    username: str
    password: str
    database: str
    host: str
    port: str

    def create_connect_url(self):
        return 'postgresql+asyncpg://{0}:{1}@{2}:{3}/{4}'.format(
            self.username, self.password, self.host, self.port, self.database)

    class Config:
        env_prefix = 'PGAUTH_'
        env_file = './backend/config/config.env'


CONNECT_URL = PGAuthSettings().create_connect_url()
