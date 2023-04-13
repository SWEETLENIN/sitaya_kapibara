import sqlalchemy as sql
from ..settings.db import metadata

restarauntseat = sql.Table(
    "restarauntseat",
    metadata,
    sql.Column("restaraunt_fk", sql.Integer),
    sql.Column("seat_num", sql.VARCHAR(4)),
    sql.Column("status", sql.Boolean)
)
