import { FC } from "react";

type Props = {
	image: string;
	classNameImage: string;
	classNameContainerForImage?: string;
	title: string;
};

const Image: FC<Props> = (props) => {
	const { image, classNameImage, title, classNameContainerForImage } = props;
	return (
		<div className={classNameContainerForImage}>
			<img src={image} alt={title} className={classNameImage} />
		</div>
	);
};

export default Image;
