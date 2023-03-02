from databases import Database
from sqlalchemy import MetaData
import logging
from .db_config import CONNECT_URL

logger = logging.getLogger('app')
logger.info(f'Generated Postgres connect URL: {CONNECT_URL}')
db = Database(CONNECT_URL)
metadata = MetaData()
