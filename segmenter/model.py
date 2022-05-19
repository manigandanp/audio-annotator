from pydantic import BaseModel
from typing import Optional


class SilenceSegmenter(BaseModel):
    project: str
    source_file_path: str
    trim_threshold: Optional[int] = 20
    silence_threshold: Optional[int] = 75



class SamplesSegmenter(BaseModel):
    project: str
    source_file_path: str
    trim_threshold: Optional[int] = 20
    start_sample: int 
    end_sample: int