import { FC } from "react";
import style from "../Pagination/style.pagination.module.css";

type Props = {
  itemOffSet: number;
  endOffSet: number;
  allItemsOfRepo: number;
};
const AmountOfRepoInPagination: FC<Props> = (props) => {
  return (
    <>
      <div className={style.info_items_pagination}>
        <span className={style.info_pagination_span}>
          {`${props.itemOffSet + 1} - ${props.endOffSet > props.allItemsOfRepo ? props.allItemsOfRepo : props.endOffSet} of ${props.allItemsOfRepo} items`}
        </span>
      </div>
    </>
  );
};

export default AmountOfRepoInPagination;
