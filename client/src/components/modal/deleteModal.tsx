import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Title } from "../../models";

type Props = {
  show: boolean;
  modalCloseHandler: () => void;
  deleteHandler: (title: Title) => void;
  currentTitle: Title;
};

export const DeleteModal = ({
  show,
  modalCloseHandler,
  deleteHandler,
  currentTitle,
}: Props) => {
  return (
    <Modal show={show}>
      <Modal.Header>{`Deleting ${currentTitle.sourceFilename}`}</Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={modalCloseHandler}>
          Close
        </Button>
        <Button variant="danger" onClick={() => deleteHandler(currentTitle)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
