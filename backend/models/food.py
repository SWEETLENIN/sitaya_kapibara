import sqlalchemy as sql
from ..settings.db import metadata


food = sql.Table(
    "food",
    metadata,
    sql.Column("food_id", sql.Integer, primary_key=True),
    sql.Column("food_name", sql.VARCHAR(30)),
    sql.Column("img", sql.BLOB),
    sql.Column("description", sql.TEXT),
    sql.Column("price", sql.NUMERIC)

)