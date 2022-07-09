import { ProjectSummary } from "../../models";
import dateformat from "dateformat";
import { formatDuration } from "../../utils";
import bytes from "bytes";
import { Link } from "react-router-dom";

type Props = {
  projects: ProjectSummary[];
  deleteProjectHandler: Function;
};

export const ProjectTable = ({ deleteProjectHandler, projects }: Props) => {
  return (
    <div className="container">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <td>Project</td>
            <td>Titles</td>
            <td>Duration</td>
            <td>Annotated</td>
            <td>Filesize</td>
            <td>Created On</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => {
            return (
              <tr key={p.project.id}>
                <td>
                  <Link
                    className="nav-link "
                    to={`\projects\\${p.project.id}?size=15&offset=0`}
                  >
                    {p.project.name}
                  </Link>
                </td>
                <td>{p.titlesCount}</td>
                <td>{`${formatDuration(
                  p.segmentAnnotatedDuration,
                )} / ${formatDuration(p.segemntsTotalDuration || 0)}`}</td>
                <td>{`${p.segmentsAnnotatedCount || 0} / ${
                  p.segmentsTotalCount || 0
                }`}</td>
                <td>{bytes.format(p.segmentsTotalFileSize || 0)}</td>
                <td>{dateformat(p.project.createdAt, "dd/mm/yyyy")}</td>
                <td>
                  <i
                    className="bi bi-trash px-2 text-danger fs-5 delete"
                    onClick={() => deleteProjectHandler(p.project)}
                  ></i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
