import sqlalchemy as sql
from ..settings.db import metadata
import sqlalchemy.dialects.postgresql as pg

ingredients = sql.Table(
    "ingredients",
    metadata,
    sql.Column("ingredients_id", sql.Integer, primary_key=True),
    sql.Column("name", sql.VARCHAR(30))
)
