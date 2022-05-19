import bytes from "bytes";
import { Title } from "../../models";
import { Link } from "react-router-dom";
import { duration } from "duration-pretty";
import { ChangeEvent, useEffect, useState } from "react";

type Props = {
  titles: Title[];
  deleteTitleHandler: (t: Title) => void;
  segmentTitleHandler: Function;
  downloadTitleHandler: Function;
};

export const TitlesTable = ({
  titles,
  segmentTitleHandler,
  deleteTitleHandler,
  downloadTitleHandler,
}: Props) => {
  useEffect(() => {
    setFilteredTitles(titles);
  }, [titles]);
  const [filteredTitles, setFilteredTitles] = useState<Title[]>(titles);
  const [titleFilter, setTitleFilter] = useState<boolean>(false);

  const formatDuration = (num: number) =>
    duration(num, "seconds").format("HH:mm:ss");
  const sum = (arr: Array<number>) => arr.reduce((t, c) => t + c, 0);
  const totalDuration = sum(titles.map((a) => a.sourceDuration || 0));
  const totalSize = sum(titles.map((a) => a.sourceFileSize || 0));
  const totalSegments = sum(titles.map((a) => a.segments || 0));
  const titleSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let v = e.target?.value;
    let filtered = titles.filter((a) => a.sourceFilename.includes(v));
    setFilteredTitles(filtered);
  };

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
              <i className="bi bi-search px-1 text-primary fs-6 download"></i>
            </td>
          )}
          <td>{`Duration (${formatDuration(totalDuration || 0)})`}</td>
          <td>{`File Size (${bytes.format(totalSize || 0)})`}</td>
          <td>{`Segments (${totalSegments})`}</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {filteredTitles.length ? (
          filteredTitles.map((title, i) => {
            return (
              <tr key={title.id}>
                <td>
                  {/* <a href={`/titles?projectId=${title.projectId}`}> */}
                  {title.projectName}
                  {/* </a> */}
                </td>
                <td>
                  <Link to={`/titles/${title.id}`}>{title.sourceFilename}</Link>
                </td>
                <td>{formatDuration(title.sourceDuration || 0)}</td>
                <td>{bytes.format(title.sourceFileSize || 0)}</td>
                <td>{title.segments || 0}</td>
                <td>
                  <i
                    className="bi bi-scissors px-2 text-primary fs-4 segment"
                    onClick={() => segmentTitleHandler(title)}
                  ></i>{" "}
                  <i
                    className="bi bi-trash px-2 text-danger fs-4 delete"
                    onClick={() => deleteTitleHandler(title)}
                  ></i>{" "}
                  <i
                    className="bi bi-download px-2 text-primary fs-4 download"
                    onClick={() => downloadTitleHandler(title)}
                  ></i>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={6} onClick={() => setFilteredTitles(titles)}>
              <span>No Records Found...</span>
              <i className="bi bi-arrow-clockwise px-2 text-primary fs-5 download"></i>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
