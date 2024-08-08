import { FC } from "react";
import styles from "./style.repositories.module.css";

export type Trepo = {
  name: string;
  description?: string;
  html_url?: string;
  id?: number;
};

const Repositories: FC<Trepo> = ({ name, id, description, html_url }) => {
  return (
    <div className={styles._item_repository} key={id}>
      <a
        href={html_url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles._link_one_repo}
      >
        {name}
      </a>
      <p>{description ? description : "no descriptions"}</p>
    </div>
  );
};
export default Repositories;
