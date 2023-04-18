import sqlalchemy as sql
import sqlalchemy.dialects.postgresql as pg
from backend.settings.db import metadata

files = sql.Table(
    "files",
    metadata,
    sql.Column("file_id", pg.UUID, primary_key=True),
    sql.Column("file_name", sql.String(150), nullable=False),
    sql.Column("ext", sql.String(8), nullable=False),
    sql.Column("size", pg.BIGINT, nullable=False),
    sql.Column("type", sql.String(100)),
    sql.Column("description", pg.TEXT),
    sql.Column("creator_email", sql.String(50)),
    sql.Column("editor_email", sql.String(50)),
    sql.Column("create_time", sql.TIMESTAMP),
    sql.Column("edit_time", sql.TIMESTAMP),
    sql.Column("file_data", pg.BYTEA, nullable=False)
)
