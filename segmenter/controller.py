from database import Annotation
from sqlalchemy import exc


class AnnotationController():
    def __init__(self, db_session):
        self.db_session = db_session

    def add_annotations(self, annotations):
        annotations = [Annotation(title=a.title, source=a.source, filename=a.filename, srate=a.srate,
                                  start=a.start, end=a.end, duration=a.duration, text_desc=a.text_desc, is_valid=a.is_valid) for a in annotations]
        self.db_session.add_all(annotations)
        self.db_session.commit()

    def update_annotation(self, new_annotation):
        annotation = self.db_session.query(Annotation).filter(
            Annotation.filename == new_annotation.filename).first()
        annotation.title = new_annotation.title
        annotation.source = new_annotation.source
        annotation.filename = new_annotation.filename
        annotation.srate = new_annotation.srate
        annotation.start = new_annotation.start
        annotation.end = new_annotation.end
        annotation.text_desc = new_annotation.text_desc
        annotation.duration = new_annotation.duration
        annotation.is_valid = new_annotation.is_valid
        self.db_session.commit()

    def get_all(self):
        return self.db_session.query(Annotation).all()

    def get_all_title(self):
        return self.db_session.query(Annotation.title).distinct().all()

    # def get_by_filename(self, filename):
    #     return self.db_session.query(Annotation).filter(Annotation.filename == filename)

    def get_by_title(self, title):
        return self.db_session.query(Annotation).filter(Annotation.title == title).all()

    # def delete(self, filename):
    #     self.db_session.query(Annotation).filter(
    #         Annotation.filename == filename).first()
    #     self.db_session.commit()
