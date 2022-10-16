from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String, Float, ARRAY

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    name = Column(String)
    friends = Column(ARRAY(Integer))
    lat = Column(Float)
    long = Column(Float)
    phone = Column(String)
    username = Column(String, primary_key=True)
    password = Column(String)

