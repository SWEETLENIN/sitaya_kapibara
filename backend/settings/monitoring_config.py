from pydantic import BaseSettings
# from typing import Optional


class MonitoringConfig(BaseSettings):
    scheduler_sec: int

    class Config:
        env_prefix = 'MONITORING_'
        env_file = './backend/config/config.env'


MONITORING_CONFIG = MonitoringConfig()
