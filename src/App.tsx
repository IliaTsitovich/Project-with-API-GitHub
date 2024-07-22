import { useEffect, useState } from 'react'
import Header from './components/Header/header'
import Logo from './images/logo.png'
import iconSearch from './images/imageSearchIcon.png'
import Profile from './components/Profile/Profile';
import "./fonts/_style_fonts.scss";
import "./_style_main.scss";
import { propsProfileComponent } from './components/Profile/Profile';
import { Trepo } from './components/Repositories/ItemRepository'


function App() {

  const [value, setValue] = useState('');
  const [data, setData] = useState<propsProfileComponent | null>(null);
  const [arrayRepositories, setArrayRepositories] = useState<Trepo[] | undefined>(undefined)
  const [valueInput, setValueInput] = useState('');
  const [userLink, setUserLink]= useState('');
  const [status, setStatus] = useState(false)

  const getValue = (e:any):void=> {
    let nameOfUser: string = e.currentTarget.value;
    
    setValue(nameOfUser.split(' ').join(""))
    setUserLink(nameOfUser.split(' ').join(""))
    setValueInput(nameOfUser)
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
  
  async function api(e:any) {
    
    if(e.key === "Enter" && value !== "") {
      console.log('Enter');
      console.log("value is " + value);
      setValueInput("")

    fetch(`https://api.github.com/users/${value}`)
        .then(response => {
        if (!response.ok) {
          setStatus(false)
        } else {
          setStatus(true)
        }
        return response.json();
      })
        .then((data)=>{
          setData(data)
          getInfoAboutRepositories(data)
        })
        .then(()=> setValue(""))
    }
  }

  return (
    <>
      <Header
        imageLogo={Logo}
        imageIconSearch={iconSearch}
        getValue={(e: any)=>getValue(e)}
        valueInput={valueInput}
        submitRequest={api}
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
