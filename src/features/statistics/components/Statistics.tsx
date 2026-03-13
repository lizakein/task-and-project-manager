import { useMemo } from "react";
import { useTasksStore } from "@store/hooks";
import { getTasksStats } from "@features/tasks/model/getTasksStats";
import StatisticsCard from "./StatisticsCard";
import "./Statistics.css";

export default function Statistics() {
  const { tasks } = useTasksStore();
  const stats = useMemo(() => getTasksStats(tasks), [tasks]);

  return (
    <section className="statistics">
      <ul className="statistics__list">
        <li className="statistics__item">
          <StatisticsCard
            title="Today todos"
            completedTasks={stats.today.completed}
            allTasks={stats.today.total}
          />
        </li>

        <li className="statistics__item">
          <StatisticsCard
            title="Week todos"
            completedTasks={stats.week.completed}
            allTasks={stats.week.total}
          />
        </li>

        <li className="statistics__item">
          <StatisticsCard
            title="Month todos"
            completedTasks={stats.month.completed}
            allTasks={stats.month.total}
          />
        </li>
      </ul>
    </section>
  );
}
