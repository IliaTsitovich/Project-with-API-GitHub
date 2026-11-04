import { FC, FormEvent } from "react";
import styles from "./style.hero.module.css";
import { Props as InputProps } from "../Input/Input";
import Input from "../Input/Input";
import iconSearch from "../../images/imageSearchIcon.png";
import { EXAMPLE_USERS } from "../../config";

type Props = Pick<InputProps, "handleChangeCallback" | "value"> & {
  handleSubmitCallback: (event: FormEvent<HTMLFormElement>) => void;
  handleExampleClick: (login: string) => void;
};

const Hero: FC<Props> = ({
  handleChangeCallback,
  handleSubmitCallback,
  handleExampleClick,
  value,
}) => {
  return (
    <main className={styles.hero}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.content}>
        <p className={styles.badge}>Powered by the GitHub REST API</p>
        <h1 className={styles.title}>
          Find any <span className={styles.accent}>GitHub</span> developer
        </h1>
        <p className={styles.subtitle}>
          Look up a username to explore the profile, followers and public
          repositories in seconds.
        </p>
        <form
          role="search"
          className={styles.search}
          onSubmit={handleSubmitCallback}
        >
          <img src={iconSearch} alt="" className={styles.searchIcon} />
          <Input
            handleChangeCallback={handleChangeCallback}
            value={value}
            classNameInput={styles.searchInput}
            placeholder="GitHub username"
            autoFocus
          />
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </form>
        <div className={styles.examples}>
          <span className={styles.examplesLabel}>Try</span>
          {EXAMPLE_USERS.map((login) => (
            <button
              key={login}
              type="button"
              className={styles.example}
              onClick={() => handleExampleClick(login)}
            >
              {login}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Hero;
