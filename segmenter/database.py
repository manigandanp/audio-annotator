from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy import Column, String, Integer, BigInteger, Float, Boolean, create_engine
import os


# https://github.com/jod35/Introduction-to-SQLAlchemy/blob/main/main.py

BASE_DIR = os.path.dirname(os.path.realpath(__file__))
connection_string = "sqlite:///"+os.path.realpath('../data/annotations.db')

Base = declarative_base()
engine = create_engine(connection_string, echo=True)
Session = sessionmaker(bind=engine)

"""
class Annotation
  id str
  source str
  filename str
  srate int
  start bigint
  end bigint
  duration float
  is_valid bool
  text_desc str
"""


class Annotation(Base):
    __tablename__ = 'annotations'
    title = Column(String, nullable=False)
    source = Column(String, nullable=False)
    filename = Column(String, nullable=False, primary_key=True)
    srate = Column(Integer, nullable=False)
    start = Column(BigInteger, nullable=False)
    end = Column(BigInteger, nullable=False)
    duration = Column(Float, nullable=False)
    text_desc = Column(String, nullable=True)
    is_valid = Column(Boolean, default=True)

    def __repr__(self):
        return f"<Annotation title={self.title}, source={self.source}, filename={self.filename}, srate={self.srate}, start={self.start}, end={self.end}, duration={self.duration}, text_desc={self.text_desc}, is_valid={self.is_valid} >"


# Base.metadata.create_all(engine)
