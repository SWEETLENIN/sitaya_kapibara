from logging.config import dictConfig
import logging
from .log_config import LogConfig

dictConfig(LogConfig().dict())
logger = logging.getLogger("app")
logger.info("Added logger to application...")

logger_app_errors = logging.getLogger("app_errors")
logger_app_errors.info("Added logger_app_errors to application...")