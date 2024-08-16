import { useState } from "react";
import "./main-styles.css";
import Header from "./components/Header/header";
import StatusDisplay from "./components/StatusDisplay/StatusDisplay";
import Profile from "./components/Profile/Profile";
import Logo from "./images/logo.png";
import iconSearch from "./images/imageSearchIcon.png";
import { Props } from "./components/Profile/Profile";
import { Trepo } from "./components/Repositories/ItemRepository";
import { LIST_STATUS } from "./components/StatusDisplay/StatusDisplay";
import PaginationPanel from "./components/InfoPagination/PaginationPanel";
import { API_BASE_URL, fetchHelper } from "./config";

function App() {
	const [valueLinkFetch, setValueLinkFetch] = useState("");
	const [dataFromApi, setDataFromApi] = useState<Props | null>(null);
	const [arrayRepositories, setArrayRepositories] = useState<Trepo[] | []>([]);
	const [valueInput, setValueInput] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [amountOfRepositories, setAmountOFRepositories] = useState(0);

	const setCurrentNameFromInput = (currentNameFromInput: string) => {
		const formattedName = currentNameFromInput.replace(/\s+/g, "");
		setValueLinkFetch(formattedName);
		setValueInput(formattedName);
	};

	const getUserNameFromInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const nameOfUser = e.currentTarget.value;
		setCurrentNameFromInput(nameOfUser);
	};

	const getInfoAboutRepositories = async (
		page: number = 1,
		perPage: number = 4
	) => {
		try {
			const urlFetchRepositories: string = `${API_BASE_URL}users/${valueLinkFetch}/repos?type=owner&page=${page}&per_page=${perPage}&sort=created`;
			const result = await fetchHelper(urlFetchRepositories);
			setArrayRepositories(result);
		} catch (error) {
			console.error("An error occurred:", error);
		}
	};

	const getUserInfo = async (e: React.KeyboardEvent) => {
		const url = `${API_BASE_URL}users/${valueLinkFetch}`;

		if (e.key === "Enter" && valueLinkFetch !== "") {
			try {
				const data = await fetchHelper(url);
				setIsLoading(false);
				setDataFromApi(data);
				await getInfoAboutRepositories();
				setAmountOFRepositories(data.public_repos);
			} catch (error) {
				setIsLoading(false);
				console.error("Error fetching data:", error);
			} finally {
				setValueInput("");
			}
		}
	};

	return (
		<>
			<Header
				imageLogo={Logo}
				imageIconSearch={iconSearch}
				handleChangeCallback={(e) => getUserNameFromInput(e)}
				value={valueInput}
				handleSubmitCallback={getUserInfo}
			/>
			{isLoading ? (
				<StatusDisplay
					className={LIST_STATUS.initial_status.className}
					title_image={LIST_STATUS.initial_status.title_image}
					image={LIST_STATUS.initial_status.image}
					text={LIST_STATUS.initial_status.text}
				/>
			) : (
				<div className="_main">
					{dataFromApi ? (
						<>
							<Profile
								avatar_url={dataFromApi.avatar_url}
								name={dataFromApi.name}
								html_url={dataFromApi.html_url}
								login={dataFromApi.login}
								followers={dataFromApi.followers}
								following={dataFromApi.following}
								repos_url={dataFromApi.repos_url}
								repositories={amountOfRepositories}
								arrOfRepo={arrayRepositories}
							/>
							{amountOfRepositories !== 0 && (
								<PaginationPanel
									allItemsOfRepo={amountOfRepositories}
									getRepositoriesFromCurrentPage={getInfoAboutRepositories}
								/>
							)}
						</>
					) : (
						<StatusDisplay
							className={LIST_STATUS.no_users_status.className}
							title_image={LIST_STATUS.no_users_status.title_image}
							image={LIST_STATUS.no_users_status.image}
							text={LIST_STATUS.no_users_status.text}
						/>
					)}
				</div>
			)}
		</>
	);
}

export default App;
