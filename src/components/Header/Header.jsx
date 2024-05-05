import "./Header.css";
import { discount, robot, arrowUp } from "../../assets";

const Header = () => {
  return (
    <>
      <div className="header app_bg section_padding">
        <div className="side_blur" />
        <div className="header_content ">

          <div className="header_text">
            {/* <div className=""> */}
            <div className="header_text_width">
              <h1 className="h1_poppins">
                Autistic Patients
                <span> Assistive </span>
                Device
              </h1>
            </div>
            {/* </div> */}

            <div className="getstarted">
              <div className="getstarted-bg">
                <div className="getstarted-cont">
                  <div>
                    <span className="getstarted-span">
                      Get
                      <img
                        src={arrowUp}
                        alt="arrowup"
                        className="getstarted-span-img"
                      />
                      Started
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="header_para">
            <p className="p_poppins">
              The device helps in communication, to schedule activity
              and analyze their studying pattern. This Device is build
              to fit the needs of your child.
            </p>
          </div>
        </div>

        <div className="header_img ">

          <div />
        </div>
      </div>
    </>
  );
};

export default Header;
