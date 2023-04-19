import sqlalchemy as sql
from ..settings.db import metadata
import sqlalchemy.dialects.postgresql as pg

kitchen = sql.Table(
    "kitchen",
    metadata,
    sql.Column("kitchen_id", sql.Integer, primary_key=True),
    sql.Column("name", sql.VARCHAR(50))
)
