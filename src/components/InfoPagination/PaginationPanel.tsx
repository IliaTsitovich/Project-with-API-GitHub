import { FC } from "react";
import style from "../Pagination/style.pagination.module.css";
import { Pagination } from "../Pagination/Pagination";
import {
  MARGIN_PAGES_DISPLAYED,
  PAGE_RANGE_DISPLAYED,
  REPOSITORIES_PER_PAGE,
} from "../../config";

type Props = {
  allItemsOfRepo: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const PaginationPanel: FC<Props> = ({
  allItemsOfRepo,
  currentPage,
  onPageChange,
}) => {
  const firstItem = (currentPage - 1) * REPOSITORIES_PER_PAGE + 1;
  const lastItem = Math.min(
    currentPage * REPOSITORIES_PER_PAGE,
    allItemsOfRepo
  );
  const numbersPage = Math.ceil(allItemsOfRepo / REPOSITORIES_PER_PAGE);

  return (
    <div className={style.infoPagination}>
      <span className={style.infoText}>
        {`${firstItem} - ${lastItem} of ${allItemsOfRepo} items`}
      </span>
      <Pagination
        forcePage={currentPage - 1}
        pageCount={numbersPage}
        onChange={({ selected }) => onPageChange(selected + 1)}
        marginPagesDisplayed={MARGIN_PAGES_DISPLAYED}
        pageRangeDisplayed={PAGE_RANGE_DISPLAYED}
        activeClassName={style.active}
        containerClassName={style.Pagination}
        breakLinkClassName={style.linkBreak}
        breakLabel="..."
        nextClassName={style.nextLabel}
        previousClassName={style.previousLabel}
        nextLinkClassName={style.linkNext}
        previousLinkClassName={style.linkPrevious}
        pageClassName={style.page}
      />
    </div>
  );
};

export default PaginationPanel;
