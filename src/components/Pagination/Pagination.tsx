import { FC } from "react";
import ReactPaginate from "react-paginate";
import style from "./style.pagination.module.css";
import ReactComponenPreviousLabel from "../../images/leftArrow.svg?react";
import ReactComponentNextLabel from "../../images/rightArrow.svg?react";
export interface Props {
  initialPage?: number;
  marginPagesDisplayed?: number;
  pageCount: number;
  onChange: ({ selected }: { selected: number }) => void;
  pageRangeDisplayed: number;
  containerClassName?: string;
  activeClassName: string;
  pageLinkClassName?: string;
  breakLinkClassName: string;
  nextLinkClassName: string;
  previousLinkClassName: string;
  pageClassName?: string;
  breakClassName?: string;
  nextClassName: string;
  previousClassName: string;
  previousLabel?: string;
  nextLabel?: string;
  breakLabel?: string;
}

export const Pagination: FC<Props> = ({
  initialPage,
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
      initialPage={initialPage}
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
      previousLabel={<ReactComponenPreviousLabel className={style.iconLeft} />}
      nextLabel={<ReactComponentNextLabel className={style.iconRight} />}
    />
  );
};
