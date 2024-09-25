import { FC } from "react";
import InitStateIcon from "../../images/Icon_InitialState.png";
import IconUser from "../../images/Icon_InitialState.png";
import EmptyRepo from "../../images/Union.png";
import "./style.status.module.css";

type Props = {
	className: string;
	image: string;
	title_image: string;
	text: string;
};

export const LIST_STATUS = {
	initial_status: {
		className: "initState statusComponent",
		image: InitStateIcon,
		title_image: "Search Icon Initial state",
		text: "Start with searching a GitHub user",
	},
	no_users_status: {
		className: "noUserState statusComponent",
		image: IconUser, 
		title_image: "Icon of User",
		text: "User not found",
	},
	no_repositories_status: {
		className: "noRepositoriesState statusComponent",
		image: EmptyRepo,
		title_image: "Icon Empty",
		text: "Repository list is empty",
	},
};

const StatusDisplay: FC<Props> = ({ className, image, title_image, text }) => {
	return (
		<div className={className}>
			<img src={image} alt={title_image} />
			<h3>{text}</h3>
		</div>
	);
};

export default StatusDisplay;
