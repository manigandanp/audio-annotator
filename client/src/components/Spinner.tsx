import { Spinner } from "react-bootstrap";

type Props = {
  showSpinner: boolean;
};

export const SpinnerIcon = ({showSpinner} : Props) => {
  return showSpinner ? (
    <div className="overlay d-flex justify-content-center align-items-center">
      <Spinner animation="border" role="status" style={{color: "green"}}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  ) : (
    <></>
  );
};
