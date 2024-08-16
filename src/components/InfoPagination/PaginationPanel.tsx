import { FC, useState } from "react";
import style from "../Pagination/style.pagination.module.css";
import { Pagination } from "../Pagination/Pagination";
import { MARGIN_PAGES_DISPLAYED, PAGE_RANGE_DISPLAYED } from "../../config";
interface PageClickEvent {
  selected: number;
}

type Props = {
  allItemsOfRepo: number;
  getRepositoriesFromCurrentPage: (page: number, per_page: number) => void;
};

const PaginationPanel: FC<Props> = ({
  allItemsOfRepo,
  getRepositoriesFromCurrentPage,
}) => {
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 4;

  const endOffset = itemOffset + itemsPerPage;
  const numbersPage = Math.ceil(allItemsOfRepo / itemsPerPage);

  const handlePageClick = async (event: PageClickEvent) => {
    const selectedPage = event.selected;
    const newOffset = selectedPage * itemsPerPage;

    setItemOffset(newOffset);
    const currentPage = selectedPage + 1;
    getRepositoriesFromCurrentPage(currentPage, itemsPerPage);
  };
  return (
    <>
      <div className={style.infoPagination}>
        <span className={style.infoText}>
          {`${itemOffset + 1} - ${endOffset > allItemsOfRepo ? allItemsOfRepo : endOffset} of ${allItemsOfRepo} items`}
        </span>
        <Pagination
          pageCount={numbersPage}
          onChange={handlePageClick}
          marginPagesDisplayed={MARGIN_PAGES_DISPLAYED}
          pageRangeDisplayed={PAGE_RANGE_DISPLAYED}
          activeClassName={style.active}
          containerClassName={style.Pagination}
          breakLinkClassName={style.linkBreak}
          breakLabel="..."
          nextClassName={style.nextLabel}
          previousClassName={style.previousLabel}
          nextLinkClassName={style.linkNext}
          previousLinkClassName={style.linkPreview}
          pageClassName={style.page}
        />
      </div>
    </>
  );
};

export default PaginationPanel;
