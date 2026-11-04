import { useState } from "react";
import "./fonts/_style_fonts.scss";
import "./main-styles.css";
import Header from "./components/Header/header";
import StatusDisplay from "./components/StatusDisplay/StatusDisplay";
import { LIST_STATUS } from "./components/StatusDisplay/listStatus";
import Profile from "./components/Profile/Profile";
import Logo from "./images/logo.png";
import iconSearch from "./images/imageSearchIcon.png";
import PaginationPanel from "./components/InfoPagination/PaginationPanel";
import { SearchStatus, useGithubUser } from "./hooks/useGithubUser";

const STATUS_DISPLAY: Record<
  Exclude<SearchStatus, "success">,
  keyof typeof LIST_STATUS
> = {
  idle: "initial_status",
  loading: "loading_status",
  notFound: "no_users_status",
  rateLimited: "rate_limit_status",
  error: "error_status",
};

function App() {
  const [valueInput, setValueInput] = useState("");
  const {
    status,
    user,
    repositories,
    page,
    repositoriesStatus,
    search,
    loadPage,
  } = useGithubUser();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.currentTarget.value.replace(/\s+/g, ""));
  };

  const handleSubmit = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && valueInput !== "") {
      search(valueInput);
      setValueInput("");
    }
  };

  return (
    <>
      <Header
        imageLogo={Logo}
        imageIconSearch={iconSearch}
        handleChangeCallback={handleInputChange}
        value={valueInput}
        handleSubmitCallback={handleSubmit}
      />
      {status === "success" && user ? (
        <div className="_main">
          <Profile
            user={user}
            repositories={repositories}
            repositoriesStatus={repositoriesStatus}
          />
          {user.public_repos !== 0 && (
            <PaginationPanel
              allItemsOfRepo={user.public_repos}
              currentPage={page}
              onPageChange={loadPage}
            />
          )}
        </div>
      ) : (
        <StatusDisplay
          {...LIST_STATUS[
            STATUS_DISPLAY[status === "success" ? "error" : status]
          ]}
        />
      )}
    </>
  );
}

export default App;
