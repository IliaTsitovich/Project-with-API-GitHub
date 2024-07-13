import { useEffect, useState } from 'react'
import Header from './components/Header/header'
import Logo from './images/logo.png'
import iconSearch from './images/imageSearchIcon.png'
import Profile from './components/Profile/Profile';
import "./fonts/_style_fonts.scss";
import "./_style_main.scss";
import { propsProfileComponent } from './components/Profile/Profile';



function App() {

  const [value, setValue] = useState('');
  const [data, setData] = useState<propsProfileComponent | null>(null);
  const [valueInput, setValueInput] = useState('');
  const [userLink, setUserLink]= useState('');
  const [status, setStatus] = useState(false)

  const getValue = (e:any):void=> {
    let nameOfUser: string = e.currentTarget.value;
    
    setValue(nameOfUser.split(' ').join(""))
    setUserLink(nameOfUser.split(' ').join(""))
    setValueInput(nameOfUser)
  }


    useEffect(()=>{
      console.log(value);
    },[value])

    useEffect(()=>{
      console.log(data);
    },[data])

    useEffect(()=>{
      console.log(`${status? "Получили ответ запроса" : "ошибка запроса или ничего не найдено"}`);
    },[status])

   function api(e:any) {
    
    let url = `https://api.github.com/users/${value}`
 
    if(e.key === "Enter" && value !== "") {
      console.log('Enter');
      console.log("value is " + value);
      setValueInput("")

    fetch(url)
        .then(response => {
        if (!response.ok) {
          alert("Request error")
          setStatus(false)
        } else {
          setStatus(true)
        }
        return response.json();
      })
        .then((data)=>{setData(data)})
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
      <div className='mainInfo'>
        {status && data?
          <Profile
            avatar_url={data.avatar_url} 
            name = {data.name}
            userName={userLink}
            login={data.login}
            followers={data.followers}
            following={data.following}
          />
          :
          // заглушка пока что - при поиске пользователя "ss" - получаем ошибку(для проверки)
          "Ничего не найдено (заглушка)"
        }

      </div>
    </>
  )
}

export default App
