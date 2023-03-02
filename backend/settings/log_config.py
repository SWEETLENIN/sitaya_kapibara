from pydantic import BaseModel


class LogConfig(BaseModel):
    """
    Описание конфигурации логира с названием "app"
    Определен формат вывода логов: УРОВЕНЬ | ДАТА-ВРЕМЯ | ИМЯ ЛОГГЕРА(МОДУЛЯ) | СООБЩЕНИЕ
    Формат даты и времени: "%Y-%m-%d %H:%M:%S"
    Логи пишутся в файл с ротацией файла - 1 день.
        То есть, каждый день создается новый файл app.log, а лог за прошлый день переименовывается в app-DD-MM-YYYY.log
        Глубина хранения логов - 7 дней.
    """

    LOGGER_NAME: str = "app"
    LOG_FORMAT: str = "%(levelname)s | %(asctime)s | %(name)s | %(message)s"
    LOG_LEVEL: str = "DEBUG"

    # Logging config
    version = 1
    disable_existing_loggers = False
    formatters = {
        "default": {
            "()": "logging.Formatter",
            "fmt": LOG_FORMAT,
            "datefmt": "%Y-%m-%d %H:%M:%S",
        },
    }
    handlers = {
        "default": {
            "formatter": "default",
            "class": "logging.handlers.TimedRotatingFileHandler",
            "filename": "./backend/logs/app.log",
            "when": "D",
            "backupCount": 7
        },
        "app_errors": {
            "formatter": "default",
            "class": "logging.handlers.TimedRotatingFileHandler",
            "filename": "./backend/logs/app_errors.log",
            "when": "D",
            "backupCount": 7
        },
    }
    loggers = {
        "app": {"handlers": ["default"], "level": LOG_LEVEL},
        "app_errors": {"handlers": ["app_errors"], "level": LOG_LEVEL},
    }
