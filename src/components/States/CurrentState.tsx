import { FC } from "react";
import InitStateIcon from "../../images/Icon_InitialState.png";
import IconUser from "../../images/Icon_InitialState.png";
import EmptyRepo from "../../images/Union.png";
import "./style.states.css";

type Props = {
  className: string;
  image: string;
  title_image: string;
  text: string;
};

export const LIST_STATES = {
  initial_state: {
    className: "_init_state state_components",
    image: InitStateIcon,
    title_image: "Search Icon Initial state",
    text: "Start with searching a GitHub user",
  },
  no_users_state: {
    className: "_no_users_state state_components",
    image: IconUser,
    title_image: "Icon of User",
    text: "User not found",
  },
  no_repositories_state: {
    className: "_no_repo_state state_components",
    image: EmptyRepo,
    title_image: "Icon Empty",
    text: "Repository list is empty",
  },
};

const CurrentState: FC<Props> = (props) => {
  return (
    <div className={props.className}>
      <img src={props.image} alt={props.title_image} />
      <h3>{props.text}</h3>
    </div>
  );
};

export default CurrentState;
