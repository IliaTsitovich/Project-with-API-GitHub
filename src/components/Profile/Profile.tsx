import Image from "../Image/ImageComponent";
import { FC, ReactNode } from "react";
import styles from "./styles.profile.module.css";
import FollowersIcon from "../../images/followers.png";
import FollowingIcon from "../../images/following.png";
import Repositories from "../Repositories/ItemRepository";
import StatusDisplay from "../StatusDisplay/StatusDisplay";
import { LIST_STATUS } from "../StatusDisplay/listStatus";
import { GithubRepository, GithubUser } from "../../types/github";
import { RepositoriesStatus } from "../../hooks/useGithubUser";

type Props = {
  user: GithubUser;
  repositories: GithubRepository[];
  repositoriesStatus: RepositoriesStatus;
  children?: ReactNode;
};

const numberFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const Profile: FC<Props> = ({
  user,
  repositories,
  repositoriesStatus,
  children,
}) => {
  return (
    <div className={styles.mainInfo}>
      <div className={styles.blockProfile}>
        <Image
          image={user.avatar_url}
          classNameImage={styles.imageUsers}
          title={`${user.login} avatar`}
        />

        <div className={styles.userInfo}>
          <h2>{user.name ?? user.login}</h2>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.userLink}
          >
            {user.login}
          </a>
          <div className={styles.containerSubscriptionInfo}>
            <div className={styles.containerFollow}>
              <Image
                image={FollowersIcon}
                title="followers"
                classNameImage={styles.iconFollow}
              />
              <p>
                {numberFormatter.format(user.followers)}
                {" followers"}
              </p>
            </div>
            <div className={styles.containerFollow}>
              <Image
                image={FollowingIcon}
                title="following"
                classNameImage={styles.iconFollow}
              />
              <p>
                {numberFormatter.format(user.following)}
                {" following"}
              </p>
            </div>
          </div>
        </div>
      </div>
      {user.public_repos !== 0 ? (
        <div
          className={styles.containerRepositoriesInfo}
          aria-busy={repositoriesStatus === "loading"}
        >
          <h2>{`Repositories (${user.public_repos})`}</h2>
          {repositoriesStatus === "error" ? (
            <p>Could not load repositories. Try another page or search again</p>
          ) : (
            repositories.map((item) => (
              <Repositories
                key={item.id}
                name={item.name}
                description={item.description}
                html_url={item.html_url}
              />
            ))
          )}
          {children}
        </div>
      ) : (
        <StatusDisplay {...LIST_STATUS.no_repositories_status} />
      )}
    </div>
  );
};

export default Profile;
