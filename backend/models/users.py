import sqlalchemy as sql
from sqlalchemy.dialects import postgresql as pg
from ..settings.db import metadata


customer = sql.Table(
    "customer",
    metadata,
    sql.Column("user_id", sql.Integer, primary_key=True),
    sql.Column("username", sql.VARCHAR(50)),
    sql.Column("password", sql.VARCHAR(24)),
    sql.Column("firstname", sql.VARCHAR(30)),
    sql.Column("surname", sql.VARCHAR(30)),
    sql.Column("email", sql.VARCHAR(50)),
    sql.Column("telephone", sql.VARCHAR(12)),
    sql.Column("roles", pg.ARRAY(sql.VARCHAR(8)))
)
