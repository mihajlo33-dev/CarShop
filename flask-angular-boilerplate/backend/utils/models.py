from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, MetaData, Table

metadata = MetaData()

brands = Table('brands', metadata,
    Column('brandId', Integer, primary_key=True),
    Column('brandName', String(120))
)

engine = create_engine('mysql://root:@localhost/test')
metadata.create_all(engine)