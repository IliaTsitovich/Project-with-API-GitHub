import InitStateIcon from "../../images/Icon_InitialState.png";
import IconUser from "../../images/Icon_User.png";
import EmptyRepo from "../../images/Union.png";

export const LIST_STATUS = {
  no_users_status: {
    className: "noUserState statusComponent",
    image: IconUser,
    title_image: "Icon of User",
    text: "User not found",
  },
  no_repositories_status: {
    className: "noRepositoriesState statusComponent",
    image: EmptyRepo,
    title_image: "Icon Empty",
    text: "Repository list is empty",
  },
  loading_status: {
    className: "loadingState statusComponent",
    image: InitStateIcon,
    title_image: "Search Icon Loading",
    text: "Loading...",
  },
  rate_limit_status: {
    className: "rateLimitState statusComponent",
    image: InitStateIcon,
    title_image: "Icon Rate Limit",
    text: "GitHub API rate limit exceeded. Try again later",
  },
  error_status: {
    className: "errorState statusComponent",
    image: InitStateIcon,
    title_image: "Icon Error",
    text: "Something went wrong. Try again",
  },
};
