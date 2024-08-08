import AnyImage from "../Image/ImageComponent";
import { FC } from "react";
import styles from "./styles.profile.module.css";
import Folowers from "../../images/followers.png";
import Folowing from "../../images/following.png";
import Repositories from "../Repositories/ItemRepository";
import { Trepo } from "../Repositories/ItemRepository";
import { LIST_STATES } from "../States/CurrentState";
import CurrentState from "../States/CurrentState";

export type Props = {
  avatar_url: string;
  userName: string;
  name: string;
  login: string;
  followers: number;
  following: number;
  repos_url: string;
  isRepo?: boolean;
  arrOfRepo?: Trepo[];
};

const Profile: FC<Props> = (props) => {
  const listRepositories = props.arrOfRepo;

  return (
    <div className={styles._main_info}>
      <div className={styles._blockProfile}>
        <AnyImage
          image={props.avatar_url}
          classNameImage={styles._avatar_image}
          title="avatar"
        />

        <div className={styles._blockProfile_userInfo}>
          <h2>{props.name}</h2>
          <a
            href={`https://github.com/${props.userName}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles._user_link}
          >
            {props.login}
          </a>
          <div className={styles._blockProfile_follow}>
            <div className={styles._follow_block}>
              <AnyImage
                image={Folowers}
                title="followers"
                classNameImage={styles._icon_follow}
              />
              <p>
                {props.followers}
                {props.followers > 1000 ? "k " : " "}
                {"followers"}
              </p>
            </div>
            <div className={styles._follow_block}>
              <AnyImage
                image={Folowing}
                title="following"
                classNameImage={styles._icon_follow}
              />
              <p>
                {props.following}
                {props.following > 1000 ? "k " : " "}
                {"following"}
              </p>
            </div>
          </div>
        </div>
      </div>
      {listRepositories != undefined ? (
        <div className={styles._main_repo}>
          <h2>{`Repositories (${listRepositories.length})`}</h2>
          {listRepositories.map((item) => (
            <Repositories
              name={item.name}
              id={item.id}
              description={item.description}
              html_url={item.html_url}
            />
          ))}
        </div>
      ) : (
        <CurrentState
          className={LIST_STATES.no_repositories_state.className}
          title_image={LIST_STATES.no_repositories_state.title_image}
          image={LIST_STATES.no_repositories_state.image}
          text={LIST_STATES.no_repositories_state.text}
        />
      )}
    </div>
  );
};

export default Profile;
