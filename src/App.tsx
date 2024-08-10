import { useState } from "react";
import "./fonts/_style_fonts.scss";
import "./styles.css";
import Header from "./components/Header/header";
import CurrentState from "./components/States/CurrentState";
import Profile from "./components/Profile/Profile";
import Logo from "./images/logo.png";
import iconSearch from "./images/imageSearchIcon.png";
import { Props } from "./components/Profile/Profile";
import { Trepo } from "./components/Repositories/ItemRepository";
import { LIST_STATES } from "./components/States/CurrentState";
import { Pagination } from "./components/Pagination/Pagination";
import AmountOfRepoInPagination from "./components/InfoPagination/InfoAboutOffSet";
import styleInfoPagination from "./components/Pagination/style.pagination.module.css";

interface PageClickEvent {
  selected: number;
}

function App() {
  const [valueLinkFetch, setValueLinkFetch] = useState("");
  const [dataFromApi, setDataFromApi] = useState<Props | null>(null);
  const [arrayRepositories, setArrayRepositories] = useState<Trepo[] | []>([]);
  const [valueInput, setValueInput] = useState("");
  const [usersLinkOnGithub, setUsersLinkOnGithub] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [amountOFRepositories, setAmountOFRepositories] = useState(0);

  function setCurrentNameFromInput(currentNameFromInput: string) {
    setValueLinkFetch(currentNameFromInput.split(" ").join(""));
    setUsersLinkOnGithub(currentNameFromInput.split(" ").join(""));
    setValueInput(currentNameFromInput);
  }

  const getValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const nameOfUser: string = e.currentTarget.value;
    setCurrentNameFromInput(nameOfUser);
  };

  async function getInfoAboutRepositories(page?: number, perPage?: 4) {
    try {
      const urlRepo: string = `https://api.github.com/users/${valueLinkFetch}/repos?type=owner&page=${page ? page : 1}&per_page=${perPage}&sort=created`;
      const response = await fetch(urlRepo);

      if (!response.ok) {
        console.log("Request to Repositories is error");
        return;
      }

      const result = await response.json();
      setArrayRepositories(result);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  async function getDataFromApi(e: React.KeyboardEvent) {
    const url = `https://api.github.com/users/${valueLinkFetch}`;

    if (e.key === "Enter" && valueLinkFetch !== "") {
      setValueInput("");

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Request error");
        }
        const data = await response.json();
        setIsLoading(false);
        setDataFromApi(data);
        getInfoAboutRepositories(1, 4);
        setIsFetching(true);
        setAmountOFRepositories(data.public_repos);
      } catch (error) {
        setIsLoading(false);
        setIsFetching(false);
        console.error("Error fetching data:", error);
      }
    }
  }

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 4;

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const pageCount = Math.ceil(amountOFRepositories / itemsPerPage);

  const handlePageClick = (event: PageClickEvent) => {
    const newOffset = (event.selected * itemsPerPage) % amountOFRepositories;
    console.log(
      `User requested page number ${event.selected + 1}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
    let currentPage = event.selected + 1;
    getInfoAboutRepositories(currentPage, 4);
  };

  return (
    <>
      <Header
        imageLogo={Logo}
        imageIconSearch={iconSearch}
        onChange={(e) => getValue(e as React.ChangeEvent<HTMLInputElement>)}
        valueInput={valueInput}
        submit={getDataFromApi}
      />
      {isLoading ? (
        <CurrentState
          className={LIST_STATES.initial_state.className}
          title_image={LIST_STATES.initial_state.title_image}
          image={LIST_STATES.initial_state.image}
          text={LIST_STATES.initial_state.text}
        />
      ) : (
        <div className="_main">
          {isFetching && dataFromApi ? (
            <>
              <Profile
                avatar_url={dataFromApi.avatar_url}
                name={dataFromApi.name}
                userName={usersLinkOnGithub}
                login={dataFromApi.login}
                followers={dataFromApi.followers}
                following={dataFromApi.following}
                repos_url={dataFromApi.repos_url}
                repositories={amountOFRepositories}
                arrOfRepo={arrayRepositories}
                amountOfRepo={amountOFRepositories}
              />
              {amountOFRepositories !== 0 ? (
                <div className={styleInfoPagination.infoPagination}>
                  <AmountOfRepoInPagination
                    itemOffSet={itemOffset}
                    endOffSet={endOffset}
                    allItemsOfRepo={amountOFRepositories}
                  />
                  <Pagination
                    pageCount={pageCount}
                    onChange={handlePageClick}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={2}
                    activeClassName={"page-link active"}
                    pageLinkClassName={""}
                    breakLinkClassName={""}
                    nextLinkClassName={""}
                    previousLinkClassName={""}
                    pageClassName={""}
                    breakClassName={""}
                    nextClassName={"arrowRight"}
                    previousClassName={"arrowLeft"}
                    breakLabel="..."
                  />
                </div>
              ) : (
                ""
              )}
            </>
          ) : (
            <CurrentState
              className={LIST_STATES.no_users_state.className}
              title_image={LIST_STATES.no_users_state.title_image}
              image={LIST_STATES.no_users_state.image}
              text={LIST_STATES.no_users_state.text}
            />
          )}
        </div>
      )}
    </>
  );
}

export default App;
