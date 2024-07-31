import { useState } from "react";
import "./fonts/_style_fonts.scss";
import './styles.css';
import Header from "./components/Header/header";
import CurrentState from './components/States/CurrentState';
import Profile from "./components/Profile/Profile";
import Logo from "./images/logo.png";
import iconSearch from "./images/imageSearchIcon.png";
import { Props } from './components/Profile/Profile';
import { Trepo } from './components/Repositories/ItemRepository';
import { LIST_STATES } from './components/States/CurrentState';


function App() {

  const [valueLinkFetch, setValueLinkFetch] = useState('');
  const [data, setData] = useState<Props | null>(null);
  const [arrayRepositories, setArrayRepositories] = useState<Trepo[] | []>([])
  const [valueInput, setValueInput] = useState('');
  const [usersLinkOnGithub, setUsersLinkOnGithub]= useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

function setCurrentNameFromInput(currentNameFromInput:string) {
    setValueLinkFetch(currentNameFromInput.split(' ').join(""))
    setUsersLinkOnGithub(currentNameFromInput.split(' ').join(""))
    setValueInput(currentNameFromInput)
  }

const getValue = (e:React.ChangeEvent<HTMLInputElement>):void=> {
    const nameOfUser: string = e.currentTarget.value;
    setCurrentNameFromInput(nameOfUser)
  }

async function getInfoAboutRepositories(data: Props) {
    try {
      const urlRepo: string = data.repos_url;
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
            setIsLoading(false)
            setData(data);
            getInfoAboutRepositories(data)
            setIsFetching(true);
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsFetching(false);
        } finally {
            setValueLinkFetch("");
        }
    }
}

  return (
    <>
      <Header
        imageLogo={Logo}
        imageIconSearch={iconSearch}
        onChange={(e)=>getValue(e as React.ChangeEvent<HTMLInputElement>)}
        valueInput={valueInput}
        submit={getDataFromApi}
      />
      {isLoading? <CurrentState 
            className={LIST_STATES.initial_state.className} 
            title_image={LIST_STATES.initial_state.title_image}
            image={LIST_STATES.initial_state.image}
            text={LIST_STATES.initial_state.text}
            /> 
      :
      <div className='_main'>
        {isFetching && data?
          <Profile
            avatar_url={data.avatar_url}
            name={data.name}
            userName={usersLinkOnGithub}
            login={data.login}
            followers={data.followers}
            following={data.following}
            repos_url={data.repos_url}
            isRepo={true}
            arrOfRepo={arrayRepositories}
          />
          :
          <CurrentState 
            className={LIST_STATES.no_users_state.className} 
            title_image={LIST_STATES.no_users_state.title_image}
            image={LIST_STATES.no_users_state.image}
            text={LIST_STATES.no_users_state.text}
          />
        }

      </div>
    }
    </>
  );
}

export default App;
