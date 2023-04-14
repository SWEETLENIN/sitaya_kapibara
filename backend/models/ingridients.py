import sqlalchemy as sql
from ..settings.db import metadata
import sqlalchemy.dialects.postgresql as pg

ingridients = sql.Table(
    "ingridients",
    metadata,
    sql.Column("ingridients_id", sql.Integer, primary_key=True),
    sql.Column("name", sql.VARCHAR(30))
)
