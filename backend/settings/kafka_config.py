from pydantic import BaseSettings


class KafkaSettings(BaseSettings):
    topic: str
    broker_addr: str

    def get_info_about_kafka_host(self):
        return {
            "topic": self.topic,
            "broker_addr": self.broker_addr,
        }

    class Config:
        env_prefix = 'KAFKA_'
        env_file = './backend/config/config.env'


KAFKA_HOST_INFO = KafkaSettings().get_info_about_kafka_host()
