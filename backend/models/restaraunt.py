import sqlalchemy as sql
from ..settings.db import metadata

restaraunt = sql.Table(
    "restaraunt",
    metadata,
    sql.Column("restaraunt_id", sql.Integer, primary_key=True),
    sql.Column("city", sql.VARCHAR(30)),
    sql.Column("street", sql.VARCHAR(30)),
    sql.Column("building", sql.VARCHAR(5)),
    sql.Column("number_of_seats", sql.Integer),
    sql.Column("work_time", sql.VARCHAR(11))
)
