import {
  AddSourceModal,
  Header,
  TitleTable,
  SpinnerIcon,
} from "../../components";
import { Title, Option } from "../../models";
import { useEffect, useState } from "react";
import { get, post, postFormData, remove, download } from "../../requests";
import { titlesUrl, silenceSegmentsUrl } from "../../config";

export const TitlesPage = () => {
  const deleteTitleHandler = (title: Title) => {
    toggelSpinner();
    remove(`${titlesUrl}?sourceFilePath=${title.sourceFilePath}`, {}).then(
      (data) => {
        setTitles((prev) => prev.filter((t) => t.id !== title.id));
        toggelSpinner();
      }
    );
  };

  const segmentTitleHandler = (title: Title) => {
    toggelSpinner();
    let postData = {
      projectId: title.projectId,
      sourceId: title.id,
      projectName: title.projectName,
      sourceFilename: title.sourceFilename,
      sourceFilePath: title.sourceFilePath,
    };
    post(silenceSegmentsUrl, postData).then((data) => {
      setTitles((prev) => [
        ...prev.filter((t) => t.id !== title.id),
        { ...data, projectName: title.projectName },
      ]);
      toggelSpinner();
    });
  };

  const downloadTitleHandler = (title: Title) => {
    toggelSpinner();
    download(`${titlesUrl}/download/${title.id}`).then((d) => {
      toggelSpinner();
    });
  };

  const modalShowHandler = () => {
    setShowModal(true);
  };

  const modalCloseHandler = () => {
    setShowModal(false);
  };

  const addSourceHandler = (
    selectedFile: File,
    selectedProject: Option,
    transcription: string
  ) => {
    const formData = new FormData();
    formData.append("projectName", selectedProject.label);
    formData.append("projectId", selectedProject.value);
    formData.append("titleName", selectedFile.name);
    formData.append("fileSize", selectedFile.size.toString());
    formData.append("file", selectedFile);
    formData.append("transcription", transcription);
    toggelSpinner();
    postFormData(titlesUrl, formData).then((data) => {
      setTitles((prev) => [...prev, data]);
      toggelSpinner();
      setShowModal(false);
    });
  };

  const [titles, setTitles] = useState([] as Title[]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const toggelSpinner = () => setLoading((prev) => !prev);

  useEffect(() => {
    toggelSpinner();
    get(titlesUrl).then((data) => {
      setTitles(data as Title[]);
      toggelSpinner();
    });
  }, []);

  return (
    <>
      <Header isButtonEnabled={true} modalShowHandler={modalShowHandler} />

      <AddSourceModal
        show={showModal}
        modalCloseHandler={modalCloseHandler}
        addSourceHandler={addSourceHandler}
      />
      <SpinnerIcon showSpinner={loading} />
      <div className="container">
        <TitleTable
          titles={titles}
          segmentTitleHandler={segmentTitleHandler}
          deleteTitleHandler={deleteTitleHandler}
          downloadTitleHandler={downloadTitleHandler}
        />
      </div>
    </>
  );
};
