import bytes from "bytes";
import { Title } from "../../models";
import { Link } from "react-router-dom";
import { formatDuration } from "../../utils";
import { ChangeEvent, useEffect, useState } from "react";
import { Pagination } from "../nav/pagination";
import * as _ from "lodash";

type Props = {
  titles: Title[];
  deleteTitleHandler: (t: Title) => void;
  segmentTitleHandler: Function;
  downloadTitleHandler: Function;
  cleanTitleHandler: Function;
};

export const TitlesTable = ({
  titles,
  segmentTitleHandler,
  deleteTitleHandler,
  downloadTitleHandler,
  cleanTitleHandler,
}: Props) => {
  useEffect(() => {
    setFilteredTitles(titles);
  }, [titles]);

  const [filteredTitles, setFilteredTitles] = useState<Title[]>(titles);
  const [titleFilter, setTitleFilter] = useState<boolean>(false);
  const [pageNo, setPageNo] = useState<number>(0);

  const sum = (arr: Array<number>) => arr.reduce((t, c) => t + c, 0);
  const totalDuration = sum(titles.map((a) => a.sourceDuration || 0));
  const totalSize = sum(titles.map((a) => a.sourceFileSize || 0));
  const totalSegments = sum(titles.map((a) => a.segments?.length || 0));
  const annotatedSegments = sum(
    titles.map((a) => a.segments?.filter((b) => b.annotation).length || 0),
  );
  const titleSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let v = e.target?.value;
    let filtered = titles.filter((a) => a.sourceFilename.includes(v));
    setFilteredTitles(filtered);
  };
  const getAnnotatedDutation = (title: Title) =>
    title.segments?.filter((a) => a.annotation).map((a) => a.duration);
  const annotatedDuration = sum(
    titles.flatMap((t) => getAnnotatedDutation(t) || [0]),
  );

  const rowsPerPage = 15;
  const start = pageNo * rowsPerPage;
  const end = start + rowsPerPage;
  const pageNos = _.range(0, filteredTitles.length, rowsPerPage);

  const searchTd = (
    <td>
      <input
        type="text"
        onChange={titleSearchHandler}
        onBlur={() => {
          setTitleFilter(false);
        }}
      />
    </td>
  );

  return (
    <>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <td>Project</td>
            {titleFilter ? (
              searchTd
            ) : (
              <td
                onClick={() => {
                  setTitleFilter(true);
                }}
              >
                <span>Title</span>{" "}
                <i
                  className="bi bi-search px-1 text-primary fs-6 search"
                  title="Search Title"
                ></i>
              </td>
            )}
            <td>
              Duration{" "}
              <span style={{ fontSize: ".7rem" }}>
                ({formatDuration(annotatedDuration || 0)} /{" "}
                {formatDuration(totalDuration || 0)})
              </span>
            </td>
            <td>{`File Size (${bytes.format(totalSize || 0)})`}</td>
            <td>{`Segments (${annotatedSegments} / ${totalSegments})`}</td>
            <td className="text-center">Actions</td>
          </tr>
        </thead>
        <tbody>
          {filteredTitles.length ? (
            filteredTitles.slice(start, end).map((title, i) => {
              const currentTitleSegmentsLen = title.segments?.length || 0;
              const currentTitleAnnotatedSegmentsLen =
                title.segments?.filter((a) => a.annotation).length || 0;
              return (
                <tr key={title.id}>
                  <td>
                    <Link to={`/projects/${title.project.id}?size=15&offset=0`}>
                      {title.project.name}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/titles/${title.id}`}>
                      {title.sourceFilename}
                    </Link>
                  </td>
                  <td>
                    {formatDuration(sum(getAnnotatedDutation(title) || [0]))} /{" "}
                    {formatDuration(title.sourceDuration || 0)}
                  </td>
                  <td>{bytes.format(title.sourceFileSize || 0)}</td>
                  <td>{` ${currentTitleAnnotatedSegmentsLen} / ${currentTitleSegmentsLen}`}</td>
                  <td className="text-center">
                    <i
                      className="bi bi-scissors px-2 text-primary fs-4 segment"
                      title="Segment"
                      onClick={() => segmentTitleHandler(title)}
                    ></i>{" "}
                    <i
                      className="bi bi-trash px-2 text-danger fs-4 delete"
                      title="Delete"
                      onClick={() => deleteTitleHandler(title)}
                    ></i>{" "}
                    <i
                      className="bi bi-download px-2 text-primary fs-4 download"
                      title="Download"
                      onClick={() => downloadTitleHandler(title)}
                    ></i>{" "}
                    {currentTitleSegmentsLen &&
                    currentTitleAnnotatedSegmentsLen ==
                      currentTitleSegmentsLen ? (
                      <>
                        <Link to={`/titles/validation/${title.id}`}>
                          <i
                            className="bi bi-check2-all px-2 text-primary fs-4 validation"
                            title="Validation"
                          ></i>
                        </Link>
                        <i
                          className="bi bi-crop px-2 text-primary fs-4 clean"
                          title="Clean Title"
                          onClick={() => cleanTitleHandler(title)}
                        ></i>
                      </>
                    ) : null}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={6} onClick={() => setFilteredTitles(titles)}>
                <span>No Records Found...</span>
                <i
                  className="bi bi-arrow-clockwise px-2 text-primary fs-5 refresh"
                  title="Reset"
                ></i>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        pageNos={pageNos}
        currentPageNo={pageNo}
        setPageHandler={(i) => setPageNo(i)}
      />
    </>
  );
};
