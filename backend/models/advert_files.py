import sqlalchemy as sql
import sqlalchemy.dialects.postgresql as pg
from ..settings.db import metadata

advert_files = sql.Table(
    "advert_files",
    metadata,
    sql.Column("file_fk",     pg.UUID, sql.ForeignKey('files.file_id'), primary_key=True),
    sql.Column("advert_fk",   sql.Integer, sql.ForeignKey('adverts.advert_id'), primary_key=True)
)