import { Header, ProjectTable } from "../../components";
import { Project, ProjectSummary as ProjectsSummary } from "../../models";
import { projectsSummaryUrl } from "../../config";
import { useState, useEffect } from "react";
import { get, remove } from "../../requests";
import { SpinnerIcon } from "../../components";

export const ProjectPage = () => {
  const [projectsSummary, setProjectsSummary] = useState<ProjectsSummary[]>([]);

  const [loading, setLoading] = useState(false);
  const toggelSpinner = () => setLoading((prev) => !prev);

  useEffect(() => {
    toggelSpinner();
    get(projectsSummaryUrl).then((data) => {
      setProjectsSummary(data as ProjectsSummary[]);
      toggelSpinner();
    });
  }, []);

  const deleteProjectHandler = (project: Project) => {
    // toggelSpinner();
    // remove(`${projectsUrl}/${project.id}`, {}).then((data) => {
    //   setProjects(projects.filter((p) => p.id !== project.id));
    //   toggelSpinner();
    // });
    console.log("implemention in progress");
  };

  return (
    <>
      <Header isButtonEnabled={false} />
      <SpinnerIcon showSpinner={loading} />
      <ProjectTable
        projects={projectsSummary}
        deleteProjectHandler={deleteProjectHandler}
      />
    </>
  );
};
