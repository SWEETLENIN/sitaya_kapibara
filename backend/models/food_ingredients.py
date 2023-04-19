import sqlalchemy as sql
from ..settings.db import metadata
import sqlalchemy.dialects.postgresql as pg

food_ingredients = sql.Table(
    "food_ingredients",
    metadata,
    sql.Column("food_fk", sql.Integer),
    sql.Column("ingredient_fk", sql.Integer)
)
