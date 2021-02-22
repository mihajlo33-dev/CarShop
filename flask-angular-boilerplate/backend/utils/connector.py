from sqlalchemy import create_engine, Column, Integer, String, MetaData, Table, DateTime
from datetime import datetime

metadata = MetaData()

notes = Table('notes', metadata,
    Column('Id', Integer, primary_key=True),
    Column('Title', String(120)),
    Column('Description', String(120)),
    Column('DateCreated', DateTime, default=datetime.utcnow)
)

engine = create_engine('mysql://root:mihajlo@localhost/car')
metadata.create_all(engine)