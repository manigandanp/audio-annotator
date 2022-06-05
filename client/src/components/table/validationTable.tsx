import { Annotation, Segment, Title } from "../../models";
import { annotationsUrl, audioUrl } from "../../config";
import { useEffect, useState } from "react";
import { formatDuration } from "../../utils";
import * as _ from "lodash";
import { update } from "../../requests";

type Props = {
  title: Title;
};

// Edit - partially implemented
// Resample
// Delete
// Invalid

export const ValidationTable = ({ title }: Props) => {
  const [pageNo, setPageNo] = useState<number>(0);
  const [editRow, setEditRow] = useState<string>();
  const [currentAnnotation, setCurrentAnnotation] = useState<string>();
  const [segments, setSegments] = useState<Segment[]>([]);
  const rowsPerPage = 10;
  const start = pageNo * rowsPerPage;
  const end = start + rowsPerPage;
  const pageNos = _.range(0, segments.length, rowsPerPage);

  const sortSegments = (segments: Segment[]) =>
    _.sortBy(segments, (s) => parseInt(s.endSample.toString()));

  useEffect(() => {
    setSegments(sortSegments(title.segments));
  }, []);

  const toNavItems = (i: number, pageNo: number): JSX.Element => (
    <li className={`page-item ${i == pageNo ? "active" : ""}`} key={i}>
      <a
        className="page-link"
        onClick={() => {
          setPageNo(i);
        }}
      >
        {i + 1}
      </a>
    </li>
  );

  const editAnnotationHandler = (segment: Segment) => {
    if (segment.id) {
      setEditRow(segment.id);
      setCurrentAnnotation(segment.annotation?.annotation);
    }
  };

  const updateAnnotation = (segment: Segment) => {
    if (segment.annotation?.annotation !== currentAnnotation) {
      update(`${annotationsUrl}/${segment.annotation?.id}`, {
        annotation: currentAnnotation,
        segmentId: segment.id,
      }).then((data: Annotation) => {
        setSegments(
          sortSegments([
            ...segments.filter((s) => s.id != data.segmentId),
            { ...segment, annotation: data },
          ]),
        );
        setEditRow("");
      });
    } else setEditRow("");
  };

  return (
    <div className="container">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <td className="col-sm-8">Annotation</td>
            <td className="col-sm-1">Audio</td>
            <td className="col-sm-1">Duraion</td>
            <td className="col-sm-2">Action</td>
            {/* <td className="col-sm-1">Is Valid?</td> */}
          </tr>
        </thead>
        <tbody>
          {segments.slice(start, end).map((segment, idx) => {
            return (
              <tr key={segment.id || idx}>
                <td>
                  {segment.id == editRow ? (
                    <textarea
                      value={currentAnnotation}
                      className="w-100 mh-100"
                      onChange={(e) => {
                        setCurrentAnnotation(e.target.value);
                      }}
                      onBlur={() => updateAnnotation(segment)}
                    />
                  ) : (
                    <p className="text-wrap">
                      {segment.annotation?.annotation}
                    </p>
                  )}
                </td>
                <td>
                  <audio
                    controls
                    src={`${audioUrl}?path=${segment.fileAbsolutePath}`}
                  />
                </td>
                <td>{formatDuration(segment.duration)}</td>
                <td>
                  <i
                    className="bi bi-pencil px-2 text-primary fs-5 edit"
                    onClick={() => editAnnotationHandler(segment)}
                  ></i>
                  <i
                    className="bi bi-trash px-2 text-danger fs-5 delete"
                    onClick={() => console.log(segment)}
                  ></i>
                  <i
                    className="bi bi-arrows-expand px-2 text-primary fs-5 resize"
                    style={{
                      transform: "rotate(90deg) !important",
                      WebkitTransform: "rotate(90deg)",
                      msTransform: "rotate(90deg)",
                    }}
                    onClick={() => console.log(segment)}
                  ></i>
                </td>
                {/* <td>
                  <input type="checkbox" name="isValid" id="isValid" />
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          {pageNos.map((p, i) => toNavItems(i, pageNo))}
        </ul>
      </nav>
    </div>
  );
};
