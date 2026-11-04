import { FC } from "react";
import styles from "./style.repositories.module.css";
import { GithubRepository } from "../../types/github";

type Props = Pick<GithubRepository, "name" | "description" | "html_url">;

const Repositories: FC<Props> = ({ name, description, html_url }) => {
  return (
    <div className={styles.containerRepositories}>
      <a
        href={html_url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.linkRepositories}
      >
        {name}
      </a>
      <p>{description ? description : "no descriptions"}</p>
    </div>
  );
};
export default Repositories;
