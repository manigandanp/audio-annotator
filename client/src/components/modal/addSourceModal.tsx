import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ProjectCreatableSelect } from "../select/index";
import { FileBrowser } from "../FileBrowser";
import { useState } from "react";
import { Option } from "../../models/index";

type Props = {
  show: boolean;
  modalCloseHandler: () => void;
  addSourceHandler: Function;
};

export const AddSourceModal = ({
  show,
  modalCloseHandler,
  addSourceHandler,
}: Props) => {
  const [selectedProject, setSelectedProject] = useState<Option>();
  const [selectedFile, setSelectedFile] = useState("");
  const [transcription, setTranscription] = useState("");

  const selectedProjectHandler = (opt: Option) => {
    setSelectedProject(opt);
  };

  const selectedFileHandler = (file: string) => {
    setSelectedFile(file);
  };

  return (
    <Modal show={show} onHide={modalCloseHandler}>
      <Modal.Header>
        <Modal.Title>Add New Source</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProjectCreatableSelect
          selectedProjectHandler={selectedProjectHandler}
        />
        <FileBrowser selectedFileHandler={selectedFileHandler} />
        <textarea
          style={{ width: "100%" }}
          className="px-1"
          value={transcription}
          onChange={(e) => setTranscription(e.target.value)}
          placeholder="Add Transcription"
        ></textarea>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={modalCloseHandler}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() =>
            addSourceHandler(selectedFile, selectedProject, transcription)
          }
        >
          Add New
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
