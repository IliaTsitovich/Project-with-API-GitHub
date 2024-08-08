import { FC } from "react";

type Props = {
  image: string;
  classNameImage: string;
  classNameContainerForImage?: string;
  title: string;
};

const AnyImage: FC<Props> = (props) => {
  const { image, classNameImage, title, classNameContainerForImage } = props;
  return (
    <div className={classNameContainerForImage}>
      <img src={image} alt={title} className={classNameImage} />
    </div>
  );
};

export default AnyImage;
