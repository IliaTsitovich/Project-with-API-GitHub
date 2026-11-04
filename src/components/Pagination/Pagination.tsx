import { FC } from "react";
import ReactPaginate from "react-paginate";
import style from "./style.pagination.module.css";
import PreviousIcon from "../../images/leftArrow.svg?react";
import NextIcon from "../../images/rightArrow.svg?react";
export interface Props {
  forcePage?: number;
  marginPagesDisplayed?: number;
  pageCount: number;
  onChange: ({ selected }: { selected: number }) => void;
  pageRangeDisplayed: number;
  containerClassName?: string;
  activeClassName: string;
  breakLinkClassName: string;
  nextLinkClassName: string;
  previousLinkClassName: string;
  pageClassName?: string;
  breakClassName?: string;
  nextClassName: string;
  previousClassName: string;
  breakLabel?: string;
}

export const Pagination: FC<Props> = ({
  forcePage,
  pageCount,
  marginPagesDisplayed,
  onChange,
  pageRangeDisplayed,
  breakLinkClassName,
  previousLinkClassName,
  nextLinkClassName,
  breakClassName,
  nextClassName,
  previousClassName,
  breakLabel,
  activeClassName,
  containerClassName,
  pageClassName,
}) => {
  return (
    <ReactPaginate
      forcePage={forcePage}
      pageCount={pageCount}
      marginPagesDisplayed={marginPagesDisplayed}
      onPageChange={onChange}
      pageRangeDisplayed={pageRangeDisplayed}
      containerClassName={containerClassName}
      activeClassName={activeClassName}
      breakLinkClassName={breakLinkClassName}
      nextLinkClassName={nextLinkClassName}
      previousLinkClassName={previousLinkClassName}
      pageClassName={pageClassName}
      breakClassName={breakClassName}
      nextClassName={nextClassName}
      previousClassName={previousClassName}
      breakLabel={breakLabel}
      previousLabel={<PreviousIcon className={style.iconLeft} />}
      nextLabel={<NextIcon className={style.iconRight} />}
    />
  );
};
