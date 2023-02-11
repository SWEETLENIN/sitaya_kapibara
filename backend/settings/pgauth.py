from databases import Database
from sqlalchemy import MetaData
import logging
from .pgauth_config import CONNECT_URL

logger = logging.getLogger('app')
logger.info(f'Generated AUTH postgres connect URL: {CONNECT_URL}')
auth_db = Database(CONNECT_URL)
auth_new_metadata = MetaData(schema="auth_new")
nsi_metadata = MetaData(schema="nsi")
