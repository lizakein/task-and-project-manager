import StatisticsCard from "./StatisticsCard";
import "./Statistics.css";

export default function Statistics() {
  return (
    <section className="statistics">
      <ul className="statistics__list">
        <li className="statistics__item">
          <StatisticsCard title="Today todos" value="2/5" />
        </li>

        <li className="statistics__item">
          <StatisticsCard title="Week todos" value="8/18" />
        </li>

        <li className="statistics__item">
          <StatisticsCard title="Month todos" value="22/57" />
        </li>
      </ul>
    </section>
  );
}
