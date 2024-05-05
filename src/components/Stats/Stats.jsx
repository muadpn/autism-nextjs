import "./Stats.css";
import { stats } from "../../constants";

const Stats = () => {
  return (
    <div className="stats app_bg section_padding">
      {stats.map((stat, index) => {
        return (
          <div key={stat.id + index} className="stats_content">
            <h4>{stat.value}</h4>
            <p>{stat.title}</p>
            {!(index === stats.length-1) && <h5> | </h5>}
          </div>
        );
      })}
    </div>
  );
};

export default Stats;
