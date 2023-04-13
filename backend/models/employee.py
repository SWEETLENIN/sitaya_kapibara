import sqlalchemy as sql
from ..settings.db import metadata

employee = sql.Table(
    "employee",
    metadata,
    sql.Column("employee_id", sql.Integer, primary_key=True),
    sql.Column("employee_name", sql.VARCHAR(30)),
    sql.Column("employee_surname", sql.VARCHAR(30)),
    sql.Column("position", sql.Integer)
)
