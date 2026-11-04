import { ChangeEvent, FormEvent, useState } from "react";
import "./main-styles.css";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import StatusDisplay from "./components/StatusDisplay/StatusDisplay";
import { LIST_STATUS } from "./components/StatusDisplay/listStatus";
import Profile from "./components/Profile/Profile";
import Logo from "./images/logo.png";
import iconSearch from "./images/imageSearchIcon.png";
import PaginationPanel from "./components/InfoPagination/PaginationPanel";
import { SearchStatus, useGithubUser } from "./hooks/useGithubUser";

const STATUS_DISPLAY: Record<
  Exclude<SearchStatus, "idle" | "success">,
  keyof typeof LIST_STATUS
> = {
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
    reset,
  } = useGithubUser();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.currentTarget.value.replace(/\s+/g, ""));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (valueInput === "") return;
    search(valueInput);
    setValueInput("");
  };

  const handleLogoClick = () => {
    reset();
    setValueInput("");
  };

  const renderContent = () => {
    if (status === "idle") {
      return (
        <Hero
          handleChangeCallback={handleInputChange}
          handleSubmitCallback={handleSubmit}
          handleExampleClick={search}
          value={valueInput}
        />
      );
    }

    if (status === "success" && user) {
      return (
        <main className="_main">
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
        </main>
      );
    }

    const displayKey = STATUS_DISPLAY[status === "success" ? "error" : status];
    return <StatusDisplay {...LIST_STATUS[displayKey]} />;
  };

  return (
    <>
      <Header
        imageLogo={Logo}
        imageIconSearch={iconSearch}
        showSearch={status !== "idle"}
        handleChangeCallback={handleInputChange}
        handleSubmitCallback={handleSubmit}
        handleLogoClick={handleLogoClick}
        value={valueInput}
      />
      {renderContent()}
    </>
  );
}

export default App;
