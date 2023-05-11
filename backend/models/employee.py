import sqlalchemy as sql
import sqlalchemy.dialects.postgresql as pg
from ..settings.db import metadata

employee = sql.Table(
    "employee",
    metadata,
    sql.Column("employee_id", sql.Integer, primary_key=True),
    sql.Column("employee_name", sql.VARCHAR(30)),
    sql.Column("employee_surname", sql.VARCHAR(30)),
    sql.Column("position", sql.Integer),
    sql.Column("file_fk", pg.UUID)
)
