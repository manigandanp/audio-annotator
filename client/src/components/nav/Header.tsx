import { Link } from "react-router-dom";

type Props = {
  isButtonEnabled: boolean;
  modalShowHandler?: () => void;
};

export const Header = ({ isButtonEnabled, modalShowHandler }: Props) => {
  return (
    <nav className="navbar navbar-expand-sm fixed-top navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="\">
          Audio Annotator
        </a>
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link " to="/">
              Titles
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link " to="/projects">
              Projects
            </Link>
          </li>
        </ul>
        {!isButtonEnabled || (
          <form className="d-flex">
            <button
              type="button"
              className="btn btn-outline-primary my-2 my-sm-0 addSource"
              onClick={modalShowHandler}
            >
              Add Source
            </button>
          </form>
        )}
      </div>
    </nav>
  );
};
