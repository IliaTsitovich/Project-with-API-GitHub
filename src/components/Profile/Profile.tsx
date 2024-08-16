import Image from "../Image/ImageComponent";
import { FC, useEffect, useState } from "react";
import styles from "./styles.profile.module.css";
import Folowers from "../../images/followers.png";
import Folowing from "../../images/following.png";
import Repositories from "../Repositories/ItemRepository";
import { Trepo } from "../Repositories/ItemRepository";
import { LIST_STATUS } from "../StatusDisplay/StatusDisplay";
import StatusDisplay from "../StatusDisplay/StatusDisplay";

export type Props = {
  html_url: string;
  avatar_url: string;
  name: string;
  login: string;
  followers: number;
  following: number;
  repos_url: string;
  repositories: number;
  arrOfRepo: Trepo[] | [];
};

const Profile: FC<Props> = (props) => {
  const listRepositories = props.arrOfRepo;

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K ";
    }
    return num.toString();
  };

  return (
    <div className={styles.mainInfo}>
      <div className={styles.blockProfile}>
        <Image
          image={props.avatar_url}
          classNameImage={styles.imageUsers}
          title="avatar"
        />

        <div className={styles.userInfo}>
          <h2>{props.name}</h2>
          <a
            href={props.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.userLink}
          >
            {props.login}
          </a>
          <div className={styles.containerSubscriptionInfo}>
            <div className={styles.containerFollow}>
              <Image
                image={Folowers}
                title="followers"
                classNameImage={styles.iconFollow}
              />
              <p>
                {formatNumber(props.followers)}
                {" followers"}
              </p>
            </div>
            <div className={styles.containerFollow}>
              <Image
                image={Folowing}
                title="following"
                classNameImage={styles.iconFollow}
              />
              <p>
                {formatNumber(props.following)}
                {" following"}
              </p>
            </div>
          </div>
        </div>
      </div>
      {props.repositories !== 0 && (
        <div className={styles.containerRepositoriesInfo}>
          <h2>{`Repositories (${props.repositories})`}</h2>
          {listRepositories.map((item) => (
            <Repositories
              key={item.id}
              name={item.name}
              id={item.id}
              description={item.description}
              html_url={item.html_url}
            />
          ))}
        </div>
      )}
      {props.repositories === 0 && (
        <StatusDisplay
          className={LIST_STATUS.no_repositories_status.className}
          title_image={LIST_STATUS.no_repositories_status.title_image}
          image={LIST_STATUS.no_repositories_status.image}
          text={LIST_STATUS.no_repositories_status.text}
        />
      )}
    </div>
  );
};

export default Profile;
