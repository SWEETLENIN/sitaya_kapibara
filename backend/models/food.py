from sqlalchemy import Table, Column, Integer, String, ForeignKey, MetaData, VARCHAR, TEXT, NUMERIC
from sqlalchemy.dialects.postgresql import UUID

metadata = MetaData()
food = Table(
    "food",
    metadata,
    Column("food_id", Integer, primary_key=True),
    Column("food_name", VARCHAR(30)),
    Column("file_fk", UUID),
    Column("description", TEXT),
    Column("price", NUMERIC)

)