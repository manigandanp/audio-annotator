import { Header, TitleTable, SpinnerIcon } from "../../components";
import { AddSourceModal, DeleteModal } from "../../components/modal";
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
        setDeleteTitleModal(false);
      }
    );
  };

  const deleteIconClickHandler = (title: Title) => {
    setDeleteTitleModal(true);
    setDeleteTitle(title);
  };

  const segmentTitleHandler = (title: Title) => {
    toggelSpinner();
    let postData = {
      projectId: title.projectId,
      sourceId: title.id,
      projectName: title.project.name,
      sourceFilename: title.sourceFilename,
      sourceFilePath: title.sourceFilePath,
    };
    post(silenceSegmentsUrl, postData).then((data) => {
      setTitles((prev) => [
        ...prev.filter((t) => t.id !== title.id),
        { ...data, projectName: title.project.name },
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

  const modalAddSourceShowHandler = () => {
    setShowAddSourceModal(true);
  };

  const modalAddSourceCloseHandler = () => {
    setShowAddSourceModal(false);
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
      setShowAddSourceModal(false);
    });
  };

  const [titles, setTitles] = useState([] as Title[]);
  const [showAddSourceModal, setShowAddSourceModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const toggelSpinner = () => setLoading((prev) => !prev);
  const [deleteTitle, setDeleteTitle] = useState<Title>();
  const [deleteTitleModal, setDeleteTitleModal] = useState<boolean>(false);

  useEffect(() => {
    toggelSpinner();
    get(titlesUrl).then((data) => {
      setTitles(data as Title[]);
      toggelSpinner();
    });
  }, []);

  return (
    <>
      <Header
        isButtonEnabled={true}
        modalShowHandler={modalAddSourceShowHandler}
      />

      <AddSourceModal
        show={showAddSourceModal}
        modalCloseHandler={modalAddSourceCloseHandler}
        addSourceHandler={addSourceHandler}
      />
      {deleteTitle ? (
        <DeleteModal
          currentTitle={deleteTitle}
          show={deleteTitleModal}
          modalCloseHandler={() => {
            setDeleteTitleModal(false);
          }}
          deleteHandler={deleteTitleHandler}
        />
      ) : (
        <></>
      )}

      <SpinnerIcon showSpinner={loading} />
      <div className="container">
        <TitleTable
          titles={titles}
          segmentTitleHandler={segmentTitleHandler}
          deleteTitleHandler={deleteIconClickHandler}
          downloadTitleHandler={downloadTitleHandler}
        />
      </div>
    </>
  );
};
