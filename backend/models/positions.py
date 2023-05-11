import sqlalchemy as sql
from ..settings.db import metadata

positions = sql.Table(
    "positions",
    metadata,
    sql.Column("position_id", sql.Integer, primary_key=True),
    sql.Column("position_name", sql.VARCHAR(30)),
    sql.Column("salary", sql.Integer)
)
