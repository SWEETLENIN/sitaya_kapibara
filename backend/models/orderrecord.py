import sqlalchemy as sql
from ..settings.db import metadata
import sqlalchemy.dialects.postgresql as pg

orderrecord = sql.Table(
    "orderrecord",
    metadata,
    sql.Column("orderrecord_id", pg.UUID, primary_key=True),
    sql.Column("customer_fk", sql.Integer),
    sql.Column("restaraunt_fk", sql.Integer),
    sql.Column("employee_fk", sql.Integer),
    sql.Column("order_time", sql.TIMESTAMP)
)
