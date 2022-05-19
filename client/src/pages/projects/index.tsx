import { Header, ProjectTable } from "../../components";
import { Project } from "../../models";
import { projectsUrl } from "../../config";
import { useState, useEffect } from "react";
import { get, remove } from "../../requests";
import { SpinnerIcon } from "../../components";

export const ProjectPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  
  const [loading, setLoading] = useState(false);
  const toggelSpinner = () => setLoading((prev) => !prev);

  useEffect(() => {
    toggelSpinner();
    get(projectsUrl).then((data) => {
      setProjects(data as Project[]);
      toggelSpinner();
    });
  }, []);

  const deleteProjectHandler = (project: Project) => {
    toggelSpinner();
    remove(`${projectsUrl}/${project.id}`, {}).then((data) => {
      setProjects(projects.filter((p) => p.id !== project.id));
      toggelSpinner();
    });
  };


  return (
    <>
      <Header isButtonEnabled={false} />
      <SpinnerIcon showSpinner={loading} />
      <ProjectTable
        projects={projects}
        deleteProjectHandler={deleteProjectHandler}
      />
    </>
  );
};
