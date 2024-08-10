import React, { FC } from "react";
import ReactPaginate from "react-paginate";
import style from "./style.pagination.module.css";

const iconLeft = (
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.4144 13.0001L14.7073 8.70718L13.293 7.29297L7.58594 13.0001L13.293 18.7072L14.7073 17.293L10.4144 13.0001Z"
      fill="#808080"
    />
  </svg>
);
const iconRight = (
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10 8L15 13L10 18" stroke="#808080" stroke-width="2" />
  </svg>
);
export interface Props {
  initialPage?: number;
  marginPagesDisplayed?: number;
  pageCount: number;
  onChange: ({ selected }: { selected: number }) => void;
  pageRangeDisplayed: number;
  containerClassName?: string;
  activeClassName: string;
  pageLinkClassName: string;
  breakLinkClassName: string;
  nextLinkClassName: string;
  previousLinkClassName: string;
  pageClassName: string;
  breakClassName: string;
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
  pageLinkClassName,
  breakLinkClassName,
  nextLinkClassName,
  previousLinkClassName,
  pageClassName,
  breakClassName,
  nextClassName,
  previousClassName,
  breakLabel,
}) => {
  return (
    <ReactPaginate
      initialPage={initialPage}
      pageCount={pageCount}
      marginPagesDisplayed={marginPagesDisplayed}
      onPageChange={onChange}
      pageRangeDisplayed={pageRangeDisplayed}
      containerClassName={style.Pagination}
      activeClassName={style.active}
      pageLinkClassName={pageLinkClassName}
      breakLinkClassName={breakLinkClassName}
      nextLinkClassName={nextLinkClassName}
      previousLinkClassName={previousLinkClassName}
      pageClassName={pageClassName}
      breakClassName={breakClassName}
      nextClassName={nextClassName}
      previousClassName={previousClassName}
      previousLabel={iconLeft}
      nextLabel={iconRight}
      breakLabel={breakLabel}
    />
  );
};
