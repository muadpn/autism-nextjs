import { features } from "../../constants";
import "./Business.css";

const Business = () => {
  return (
    <div className="business app_bg section_padding">
      <div className="business_content">
        <h1>All in one Assistance.</h1>
        <p>
          Experience the future of autism support with our all-in-one assistance device.
          Featuring scheduling, AAC communication, and teaching mode with analysis,
          all customizable through this web application.
          Empower individuals with autism to thrive and excel in their daily lives.
        </p>
        <button className="custom_button" type="button">
          Tutorial
        </button>
      </div>

      <div className="business_features">
        {features.map((feature, index) => {
          return (
            <div key={feature.id + index} className="business_features-content">
              <img src={feature.icon} alt="icon" />
              <div className="business_features_text">
                <h4>{feature.title}</h4>
                <p>{feature.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Business;
