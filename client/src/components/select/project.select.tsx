import CreatableSelect from "react-select/creatable";
import { Project } from "../../models";
import { useEffect, useState } from "react";
import { get, post } from "../../requests";
import { projectsUrl } from "../../config";
import { Option } from "../../models/index";

type Props = {
  selectedProjectHandler: Function
}

export const ProjectCreatableSelect = ({selectedProjectHandler} : Props) => {
  const [options, setOptions] = useState<Option[]>();
  const [value, setValue] = useState<Option>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    get(projectsUrl).then((data) => {
      setOptions(data.map(createOption));
      setLoading(false);
    });
  }, []);

  const createOption = (project: Project) =>
    ({ label: project.name, value: project.id } as Option);

  const projectCreateHandler = (projectName: string) => {
    setLoading(true);
    post(projectsUrl, { name: projectName }).then((data) => {
      let opt = { label: (data as Project).name, value: (data as Project).id };
      setValue(opt);
      selectedProjectHandler(opt);
      setOptions((preVal) => [...(preVal as Option[]), opt]);
      setLoading(false);
    });
  };

  return (
    <CreatableSelect
      isClearable
      onChange={(a, b) => {
        selectedProjectHandler(a as Option);
      }}
      isDisabled={loading}
      isLoading={loading}
      options={options}
      onCreateOption={projectCreateHandler}
      value={value}
    />
  );
};
