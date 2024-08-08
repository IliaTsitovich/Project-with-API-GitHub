import { FC } from "react";

export type Props = {
  onChange: (event: React.ChangeEvent) => void;
  submit: (event: React.KeyboardEvent) => void;
  valueInput: string;
};

const Input: FC<Props> = (props) => {
  return (
    <input
      type="text"
      onChange={props.onChange}
      value={props.valueInput}
      onKeyDown={props.submit}
    />
  );
};

export default Input;
