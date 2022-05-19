import { Project } from "../../models";
import dateformat from "dateformat";

type Props = {
  projects: Project[];
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
            <td>Created On</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => {
            return (
              <tr>
                <td>{project.name}</td>
                <td>{project.titles}</td>
                <td>{dateformat(project.createdAt, "dd/mm/yyyy")}</td>
                <td>
                  <i
                    className="bi bi-trash px-2 text-danger fs-5 delete"
                    onClick={() => deleteProjectHandler(project)}
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
