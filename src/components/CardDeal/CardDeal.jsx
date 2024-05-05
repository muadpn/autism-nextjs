import "./CardDeal.css";
import { card } from "../../assets";
import Image from "next/image";

const CardDeal = () => {
  return (
    <div className="carddeal app_bg section_padding">
      <div className="carddeal_content">
        <h1>Optimize education through adaptive teaching modes
          and trend analysis for continuous improvement.</h1>

        <button className="custom_button" type="button">
          Get Started
        </button>
      </div>

      <div className="carddeal_img">
        <Image src={card} alt="card" />
      </div>
    </div>
  );
};

export default CardDeal;
