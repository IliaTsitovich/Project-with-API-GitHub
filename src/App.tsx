import { useState } from "react";
import Header from "./components/Header/header";
import Logo from "./images/logo.png";
import iconSearch from "./images/imageSearchIcon.png";
import Profile from "./components/Profile/Profile";
import "./fonts/_style_fonts.scss";
import "./_style_main.scss";
import { propsProfileComponent } from './components/Profile/Profile';
import { Trepo } from './components/Repositories/ItemRepository';
import CurrentState from './components/States/CurrentState';
import { LIST_STATES } from './components/States/CurrentState';


function App() {

  const [valueLinkFetch, setValueLinkFetch] = useState('');
  const [data, setData] = useState<propsProfileComponent | null>(null);
  const [valueInput, setValueInput] = useState('');
  const [userLink, setUserLink]= useState('');
  const [status, setStatus] = useState(false);
  const [initState, setInitState] = useState(true)

function setCurrentNameFromInput(currentNameFromInput:string) {
    setValueLinkFetch(currentNameFromInput.split(' ').join(""))
    setUserLink(currentNameFromInput.split(' ').join(""))
    setValueInput(currentNameFromInput)
  }

const getValue = (e:React.ChangeEvent<HTMLInputElement>):void=> {
    const nameOfUser: string = e.currentTarget.value;
    setCurrentNameFromInput(nameOfUser)
  }

async function getInfoAboutRepositories (data: propsProfileComponent) {
  let urlRepo: string = data.repos_url
  fetch(urlRepo)
  .then(response => {
    if (!response.ok) {
      console.log("Request to Repositories is error")
    }
    return response.json();
  })
  .then((result)=>{
    setArrayRepositories(result)
  })
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
            setData(data);
            setStatus(true);
            getInfoAboutRepositories(data)
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Request error");
            setStatus(false);
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
        onChange={(e:React.ChangeEvent)=>getValue(e)}
        valueInput={valueInput}
        submit={getDataFromApi}
      />
<<<<<<< HEAD
<<<<<<< HEAD

      <div className="_main">
        {status && data ? (
=======
      
=======
      {initState? <CurrentState 
            className={LIST_STATES.initial_state.className} 
            title_image={LIST_STATES.initial_state.title_image}
            image={LIST_STATES.initial_state.image}
            text={LIST_STATES.initial_state.text}
            /> 
      :
>>>>>>> 662bc53 (feat(components): added new components States: Init State,No Repo state,No users states)
      <div className='_main'>
        {status && data?
>>>>>>> b52aa19 (fix: rebase conflicts)
          <Profile
            avatar_url={data.avatar_url}
            name={data.name}
            userName={userLink}
            login={data.login}
            followers={data.followers}
            following={data.following}
            repos_url={data.repos_url}
<<<<<<< HEAD
            isRepo={true}
=======
            isRepo = {true}
>>>>>>> b52aa19 (fix: rebase conflicts)
            arrOfRepo={arrayRepositories}
          />
<<<<<<< HEAD
        ) : (
          "Not Found"
        )}
=======
          :
          <CurrentState 
            className={LIST_STATES.no_users_state.className} 
            title_image={LIST_STATES.no_users_state.title_image}
            image={LIST_STATES.no_users_state.image}
            text={LIST_STATES.no_users_state.text}
            />
        }

>>>>>>> 662bc53 (feat(components): added new components States: Init State,No Repo state,No users states)
      </div>
    }
    </>
  );
}

export default App;
