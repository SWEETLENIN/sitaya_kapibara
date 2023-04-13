import sqlalchemy as sql
from ..settings.db import metadata
import sqlalchemy.dialects.postgresql as pg

food_ingridients = sql.Table(
    "food_ingridients",
    metadata,
    sql.Column("food_fk", sql.Integer),
    sql.Column("ingridient_fk", sql.Integer)
)
