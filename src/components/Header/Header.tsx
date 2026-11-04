import { FC, FormEvent, MouseEvent } from "react";
import Image from "../Image/ImageComponent";
import styles from "./styles.header.module.css";
import { Props as InputProps } from "../Input/Input";
import Input from "../Input/Input";

type Props = Pick<InputProps, "handleChangeCallback" | "value"> & {
  imageLogo: string;
  imageIconSearch: string;
  showSearch: boolean;
  handleSubmitCallback: (event: FormEvent<HTMLFormElement>) => void;
  handleLogoClick: () => void;
};

const Header: FC<Props> = ({
  imageLogo,
  imageIconSearch,
  showSearch,
  handleChangeCallback,
  handleSubmitCallback,
  handleLogoClick,
  value,
}) => {
  const onLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    handleLogoClick();
  };

  return (
    <header>
      <div className={styles.headerContainer}>
        <a
          href={import.meta.env.BASE_URL}
          aria-label="Go to the start page"
          className={styles.logoLink}
          onClick={onLogoClick}
        >
          <Image image={imageLogo} title="" classNameImage={styles.imageLogo} />
        </a>
        {showSearch && (
          <form
            role="search"
            className={styles.containerForInput}
            onSubmit={handleSubmitCallback}
          >
            <Image
              image={imageIconSearch}
              title=""
              classNameImage={styles.iconSearch}
            />
            <Input
              handleChangeCallback={handleChangeCallback}
              value={value}
              classNameInput={styles.headerInput}
              placeholder="Search another user"
            />
          </form>
        )}
      </div>
    </header>
  );
};

export default Header;
