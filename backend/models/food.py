import sqlalchemy as sql
from ..settings.db import metadata
import sqlalchemy.dialects.postgresql as pg

food = sql.Table(
    "food",
    metadata,
    sql.Column("food_id", sql.Integer, primary_key=True),
    sql.Column("food_name", sql.VARCHAR(30)),
    sql.Column("file_fk", pg.UUID),
    sql.Column("description", sql.Text),
    sql.Column("price", sql.Numeric)
)
