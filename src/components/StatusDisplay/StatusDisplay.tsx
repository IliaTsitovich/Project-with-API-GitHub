import { FC } from "react";
import "./style.states.css";

type Props = {
  className: string;
  image: string;
  title_image: string;
  text: string;
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
