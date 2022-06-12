type SetPageFunction = (i: number) => void;
type Props = {
  pageNos: number[];
  currentPageNo: number;
  setPageHandler: SetPageFunction;
};

export const Pagination = ({
  pageNos,
  currentPageNo,
  setPageHandler,
}: Props) => (
  <nav aria-label="Page navigation example">
    <ul className="pagination justify-content-center">
      {pageNos.map((p, i) => toNavItems(i, currentPageNo, setPageHandler))}
    </ul>
  </nav>
);

const toNavItems = (
  i: number,
  pageNo: number,
  setPagenNoHandler: SetPageFunction,
): JSX.Element => (
  <li className={`page-item ${i == pageNo ? "active" : ""}`} key={i}>
    <a
      className="page-link"
      onClick={() => {
        setPagenNoHandler(i);
      }}
    >
      {i + 1}
    </a>
  </li>
);
