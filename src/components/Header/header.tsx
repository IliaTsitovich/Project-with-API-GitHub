import AnyImage from "../Image/ImageComponent"
import './_style_header.scss'
import  {Props as TPropsFromInput} from "../Input/Input.tsx"

import Input from "../Input/Input"

type Props = {
    imageLogo: string,
    imageIconSearch: string,
    className?: string,
}

const Header: React.FC<Props & TPropsFromInput> = (props)=> {

    const {imageLogo, imageIconSearch, onChange} = props

    return (
        <header>
            <div className="header__header_container">
               <AnyImage image={imageLogo} title="LogoGitHub" classNameImage="header__image_logo" />
            <div className="header__container_for_input">
                   <AnyImage image={imageIconSearch} title="IconSearch" classNameImage="header__image_iconSearch" />
                   <Input 
                    onChange = {onChange} 
                    valueInput = {props.valueInput} 
                    submit ={props.submit}/>
            </div>
            </div>
        </header>
    )
}

export default Header;