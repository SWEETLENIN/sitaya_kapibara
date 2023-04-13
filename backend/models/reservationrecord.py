import sqlalchemy as sql
from ..settings.db import metadata
import sqlalchemy.dialects.postgresql as pg

reservationrecord = sql.Table(
    "reservationrecord",
    metadata,
    sql.Column("reservationrecord", pg.UUID, primary_key=True),
    sql.Column("customer_fk", sql.Integer),
    sql.Column("restaraunt_fk", sql.Integer),
    sql.Column("date", sql.TIMESTAMP),
)
