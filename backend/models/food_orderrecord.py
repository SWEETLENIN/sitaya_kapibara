import sqlalchemy as sql
from ..settings.db import metadata
import sqlalchemy.dialects.postgresql as pg

food_orderrecord = sql.Table(
    "food_orderrecord",
    metadata,
    sql.Column("food_fk", sql.Integer),
    sql.Column("orderrecord_fk", pg.UUID)
)
