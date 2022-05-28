from fastapi import FastAPI
from typing import Optional
from service import segement_on_silence, segment_on_samples, write_wav_files
from starlette.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from model import SilenceSegmenter, SamplesSegmenter

app = FastAPI()

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


@app.post('/v2/segment/silence')
# def segment_on_silence_v2(project:str, source_path:str, silence_threshold_in_db: Optional[int] = 75, trim_threshold_in_db: Optional[int] = 20):
def segment_on_silence_v2(silence: SilenceSegmenter):
    segmented_meta = segement_on_silence(
        silence.project, silence.source_file_path, silence.silence_threshold, silence.trim_threshold)
    segment_objs = write_wav_files(
        segmented_meta['segments'], segmented_meta['sample_rate'])
    return {**segmented_meta, 'segments': segment_objs}


@app.post('/v2/segment/samples')
# def segment_on_samples_v2(project:str, source_path:str, start_sample:int, end_sample:int, trim_threshold_in_db: Optional[int] = 20):
def segment_on_samples_v2(samples: SamplesSegmenter):
    print(samples)
    segmented_meta = segment_on_samples(
        samples.project, samples.source_file_path, samples.start_sample, samples.end_sample, samples.trim_threshold)
    segment_objs = write_wav_files(
        segmented_meta['segments'], segmented_meta['sample_rate'])
    return {**segmented_meta, 'segments': segment_objs}
