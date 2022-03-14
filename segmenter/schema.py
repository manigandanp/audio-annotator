from typing import Optional
from pydantic import BaseModel

# to receive a data from post method
class AnnotationSchema(BaseModel):
  title:str
  source: str
  filename: str
  srate: int
  start: int
  end: int
  duration: float
  text_desc: Optional[str] = None
  is_valid: Optional[bool] = True

  class Config:
      orm_mode = True

class SegmentOnSamples(BaseModel):
  destination: str
  end: int
  file_prefix: str
  source: str
  start: int
  title: str
  trim_threshold_in_db: Optional[int] = 20

  class Config:
      orm_mode = True