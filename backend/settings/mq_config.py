from pydantic import BaseSettings


class MQSettings(BaseSettings):
    manager: str
    channel: str
    address: str
    queue: str

    def get_info_about_mq_host(self):
        return {
            "manager": self.manager,
            "channel": self.channel,
            "address": self.address,
            "queue": self.queue,
        }

    class Config:
        env_prefix = 'MQ_'
        env_file = './backend/config/config.env'


MQ_HOST_INFO = MQSettings().get_info_about_mq_host()
