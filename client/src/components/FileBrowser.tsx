import { Form } from "react-bootstrap";

type Props = {
  selectedFileHandler: Function;
};

export const FileBrowser = ({ selectedFileHandler }: Props) => {
  const onChnageHandler = (e: React.FormEvent) => {
    let el = e.target as HTMLInputElement;
    if (el?.files?.length) {
      selectedFileHandler(el.files[0])
    }
  };

  return (
    <Form.Group controlId="formFile" className="my-3">
      <Form.Control type="file" onChange={(e) => onChnageHandler(e)} />
    </Form.Group>
  );
};
