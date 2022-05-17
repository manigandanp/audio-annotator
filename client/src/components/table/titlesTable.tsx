import bytes from "bytes";
import { Title } from "../../models";
import { Link } from "react-router-dom";
import { duration } from "duration-pretty";
import { titlesUrl } from "../../config";

type Props = {
  titles: Title[];
  deleteTitleHandler: Function;
  segmentTitleHandler: Function;
  downloadTitleHandler: Function;
};

export const TitlesTable = ({
  titles,
  segmentTitleHandler,
  deleteTitleHandler,
  downloadTitleHandler,
}: Props) => {
  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <td>Project</td>
          <td>Title</td>
          <td>Duration</td>
          <td>File Size</td>
          <td>Segments</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {titles.map((title, i) => {
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
              <td>
                {duration(title.sourceDuration || 0, "seconds").format(
                  "HH:mm:ss"
                )}
              </td>
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
        })}
      </tbody>
    </table>
  );
};
