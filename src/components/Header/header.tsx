import AnyImage from "../Image/ImageComponent"
import styles from './styles.header.module.css';
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
            <div className={styles.header__container}>
               <AnyImage image={imageLogo} title="LogoGitHub" classNameImage={styles.header__image_logo} />
            <div className={styles.header__container_for_input}>
                   <AnyImage image={imageIconSearch} title="IconSearch" classNameImage={styles.header__image_iconSearch} />
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