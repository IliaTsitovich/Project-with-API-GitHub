import AnyImage from "../Image/ImageComponent"
import './_style_header.scss'


import Input from "../Input/Input"

type PropsForHeader = {
    imageLogo: string,
    imageIconSearch: string,
    className?: string,
    getValue?: Function,
    valueInput: string,
    submitRequest: Function
}

const Header: React.FC<PropsForHeader> = ({...props})=> {

    const {imageLogo, imageIconSearch, getValue} = {...props}

    return (
        <header>
            <div className="header__header_container">
               <AnyImage image={imageLogo} title="LogoGitHub" classNameImage="header__image_logo" />
            <div className="header__container_for_input">
                   <AnyImage image={imageIconSearch} title="IconSearch" classNameImage="header__image_iconSearch" />
                   <Input onChange = {getValue} valueInput = {props.valueInput} submit ={props.submitRequest}/>
            </div>
            </div>
        </header>
    )
}

export default Header;