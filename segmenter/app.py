import librosa
import soundfile as sf
import numpy as np
from fastapi import FastAPI
from typing import Optional, List
from segmenter import Segmenter
from database import Base, Session, engine
from controller import AnnotationController
from starlette.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from schema import AnnotationSchema, SegmentOnSamples

app = FastAPI()


segmenter = Segmenter()

# Create tables and a session with db
Base.metadata.create_all(engine)
db_session = Session()
annotation_controller = AnnotationController(db_session)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

@app.get('/')
def index():
    return RedirectResponse(url="/docs/")


@app.post('/segment/silence')
def segment_on_silence(title: str, sound_file_path: str, destination: str, silence_threshold_in_db: Optional[int] = 75, trim_threshold_in_db:  Optional[int] = 20):
    meta = segmenter.segment_on_silence(
        sound_file_path, destination, title, silence_threshold_in_db, trim_threshold_in_db)
    annotations = [AnnotationSchema(**m) for m in meta]
    annotation_controller.add_annotations(annotations)
    return meta


@app.post('/segment/samples')
# def segment_on_samples(title:str, sound_file_path: str, destination: str, start: int, end: int, file_prefix: str, trim_threshold_in_db:  Optional[int] = 20):
def segment_on_samples(data: SegmentOnSamples):
    meta = segmenter.segment_on_samples(
        data.title, data.source, data.destination, data.start, data.end, data.file_prefix, data.trim_threshold_in_db)
    annotations = [AnnotationSchema(**m) for m in meta]
    annotation_controller.add_annotations(annotations)
    return meta


@app.post('/annotations')
def add_annotaion(annotations: List[AnnotationSchema]):
    response = annotation_controller.add_annotations(annotations)
    return response


@app.put('/annotations')
def update_annotaion(annotation: AnnotationSchema):
    response = annotation_controller.update_annotation(annotation)
    return response


@app.get('/annotations')
def get_all_annotations():
    return annotation_controller.get_all()


@app.get('/annotations/titles')
def get_all_title():
    return annotation_controller.get_all_titles()


@app.get('/annotations/titles/{title}')
def get_by_title(title: str):
    return annotation_controller.get_by_title(title)
