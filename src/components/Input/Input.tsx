import { ChangeEvent, FC } from "react";

export type Props = {
  handleChangeCallback: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  classNameInput?: string;
  placeholder?: string;
  autoFocus?: boolean;
};

const Input: FC<Props> = ({
  handleChangeCallback,
  value,
  classNameInput,
  placeholder,
  autoFocus,
}) => {
  return (
    <input
      type="search"
      aria-label="GitHub username"
      autoCapitalize="none"
      autoComplete="off"
      autoCorrect="off"
      spellCheck={false}
      onChange={handleChangeCallback}
      value={value}
      className={classNameInput}
      placeholder={placeholder}
      autoFocus={autoFocus}
    />
  );
};

export default Input;
