import { FC } from "react";

export type Props = {
	handleChangeCallback: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmitCallback: (event: React.KeyboardEvent) => void;
	value: string;
	classNameInput?: string;
};

const Input: FC<Props> = ({
	handleChangeCallback,
	handleSubmitCallback,
	value,
	classNameInput,
}) => {
	return (
		<input
			type="text"
			onChange={handleChangeCallback}
			value={value}
			onKeyDown={handleSubmitCallback}
			className={classNameInput}
		/>
	);
};

export default Input;
