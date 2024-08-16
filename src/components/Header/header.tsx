import Image from "../Image/ImageComponent";
import styles from "./styles.header.module.css";
import { Props as TPropsFromInput } from "../Input/Input.tsx";
import Input from "../Input/Input";

type Props = {
  imageLogo: string;
  imageIconSearch: string;
  className?: string;
};

const Header = (props: Props & TPropsFromInput) => {
  const { imageLogo, imageIconSearch, handleChangeCallback } = props;

  return (
    <header>
      <div className={styles.headerContainer}>
        <Image
          image={imageLogo}
          title="LogoGitHub"
          classNameImage={styles.imageLogo}
        />
        <div className={styles.containerForInput}>
          <Image
            image={imageIconSearch}
            title="IconSearch"
            classNameImage={styles.iconSearch}
          />
          <Input
            handleChangeCallback={handleChangeCallback}
            value={props.value}
            handleSubmitCallback={props.handleSubmitCallback}
            classNameInput={styles.headerInput}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
