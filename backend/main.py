from fastapi.middleware.cors import CORSMiddleware
from .settings.log import logger
from fastapi import FastAPI
from .settings.db import db
from .settings.pgauth import auth_db
from .settings.file_config import FILE_CONFIG
from .settings.smtp_config import SMTP_CONFIG
from .routers.restaraunt import router as restaraunt_router

app = FastAPI()
app.include_router(restaraunt_router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
