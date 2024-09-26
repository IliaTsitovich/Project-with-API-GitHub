import { useState } from 'react'
import Header from './components/Header/header'
import Logo from './images/logo.png'
import iconSearch from './images/imageSearchIcon.png'
import Profile from './components/Profile/Profile';
import "./fonts/_style_fonts.scss";
import "./_style_main.scss";
import { propsProfileComponent } from './components/Profile/Profile';
import { Trepo } from './components/Repositories/ItemRepository'


function App() {

  const [valueLinkFetch, setValueLinkFetch] = useState('');
  const [data, setData] = useState<propsProfileComponent | null>(null);
  const [arrayRepositories, setArrayRepositories] = useState<Trepo[] | undefined>(undefined)
  const [valueInput, setValueInput] = useState('');
  const [userLink, setUserLink]= useState('');
  const [status, setStatus] = useState(false)

  
  function setCurrentNameFromInput(currentNameFromInput:string) {
    setValueLinkFetch(currentNameFromInput.split(' ').join(""))
    setUserLink(currentNameFromInput.split(' ').join(""))
    setValueInput(currentNameFromInput)
  }

  const getValue = (e:Event & {currentTarget: HTMLButtonElement}):void=> {
    const nameOfUser: string = e.currentTarget.value;
    setCurrentNameFromInput(nameOfUser)
  }

  return (
    <>
      <Header
        imageLogo={Logo}
        imageIconSearch={iconSearch}
        onChange={(e: any)=>getValue(e)}
        valueInput={valueInput}
        submit={getDataFromApi}
      />
      
      <div className='_main'>
        {status && data?
          <Profile
            avatar_url={data.avatar_url} 
            name = {data.name}
            userName={userLink}
            login={data.login}
            followers={data.followers}
            following={data.following}
            repos_url={data.repos_url}
            isRepo = {true}
            arrOfRepo={arrayRepositories}
          />
          :
          "Not Found"
        }

      </div>
    </>
  )
}

export default App
