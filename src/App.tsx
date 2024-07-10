import { useEffect, useState } from 'react'
import Header from './components/Header/header'
import Logo from './images/logo.png'
import iconSearch from './images/imageSearchIcon.png'



function App() {

  const [value, setValue] = useState('');

  const getValue = (e:any):void=> {
    let nameOfUser: string = e.currentTarget.value
    
    setValue(nameOfUser.split(' ').join(""))
  }

    useEffect(()=>{
      console.log(value);
    },[value])

    

  return (
    <>
      <Header
        imageLogo={Logo}
        imageIconSearch={iconSearch}
        getValue={(e:any)=>getValue(e)}
      />
    </>
  )
}

export default App
