FROM python:slim

RUN apt-get update && apt-get -y install libsndfile1
RUN python -m pip install --upgrade pip
RUN pip install librosa soundfile numpy fastapi uvicorn[standard] sqlalchemy
RUN pip install redis msgpack-numpy

WORKDIR /audio-annotator/segmenter

COPY . .

EXPOSE 8000

CMD APP_ENV=production uvicorn app:app --proxy-headers --host 0.0.0.0 --port 8000
