from fastapi.middleware.cors import CORSMiddleware
from .settings.log import logger
from fastapi import FastAPI
from fastapi_utils.tasks import repeat_every
from .settings.db import db
from .settings.pgauth import auth_db
from .settings.file_config import FILE_CONFIG
from .settings.monitoring_config import MONITORING_CONFIG
from .settings.smtp_config import SMTP_CONFIG
from .routers.menu import router as menu_router
from .routers.tno import router as tno_router
from .routers.tasks import router as tasks_router
from .routers.user_rights import router as user_right_router
from .routers.asoz import router as asoz_router
from .routers.periods import router as periods_router
from .routers.work_groups import router as wg_router
from .routers.reports import router as reports_router
from .routers.mailing_list import router as mailing_list_router
from .routers.files import router as files_router
from .routers.asoz_menu import router as asoz_menu_router
from .routers.adverts import router as adverts_router
from .routers.auth import router as auth_router
from .routers.stat import router as stat_router
from .routers.docs import router as doc_router
from .routers.report_fact_incomes import router as fact_income_router
from .routers.monitoring import router as monitoring_router
from .routers.user_asoz_rights import router as user_asoz_router
from .schedulers import clean_tmp_files
from .schedulers import monitoring

app = FastAPI()
app.include_router(menu_router)
app.include_router(user_right_router)
app.include_router(asoz_router)
app.include_router(periods_router)
app.include_router(wg_router)
app.include_router(reports_router)
app.include_router(tasks_router)
app.include_router(adverts_router)
app.include_router(mailing_list_router)
app.include_router(files_router)
app.include_router(asoz_menu_router)
app.include_router(auth_router)
app.include_router(stat_router)
app.include_router(doc_router)
app.include_router(fact_income_router)
app.include_router(tno_router)
app.include_router(monitoring_router)
app.include_router(user_asoz_router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# очистка директории с временным хранением файлов из таблицы files.
# Запуск каждые 3 часа(по умолчанию)
@app.on_event("startup")
@repeat_every(seconds=FILE_CONFIG.scheduler_sec, wait_first=True, logger=logger)
def run_cleaning_tmp_files():
    clean_tmp_files.run()


# Проверка поступивших отчетов для ведения журнала задержанных/непришедших отчетов в соответствии с заданиями (tasks).
# Каждые 10 минут(по умолчанию)
@app.on_event("startup")
@repeat_every(seconds=MONITORING_CONFIG.scheduler_sec, wait_first=True, logger=logger)
async def run_monitoring():
    await monitoring.run()


@app.on_event("startup")
async def startup():
    logger.info("Connecting to postgres...")
    await db.connect()
    logger.info("Connecting to auth postgres...")
    await auth_db.connect()
    logger.info(f"Tmp folder path: {FILE_CONFIG.path.absolute()}")
    logger.info(f"SMTP parameters address: {SMTP_CONFIG.address} host: {SMTP_CONFIG.host}")


@app.on_event("shutdown")
async def shutdown():
    logger.info("Disconnecting from postgres...")
    await db.disconnect()
    logger.info("Disconnecting from auth postgres...")
    await auth_db.disconnect()
