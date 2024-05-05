import "./Billing.css";
import { bill } from "../../assets";
import Image from "next/image";

const Billing = () => {
  return (
    <div className="billing app_bg section_padding">
      <div className="billing_img">
        <div className="billing_side-blur" />
        <Image src={bill} alt="billing" />
      </div>
      <div className="billing_content">
        <h1>DEVICE OVERLAY</h1>

        <div className="billing_content-imgs">

        </div>
      </div>
    </div>
  );
};

export default Billing;
