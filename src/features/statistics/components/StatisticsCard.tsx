interface StatisticsCardProps {
  title: string;
  completedTasks: number;
  allTasks: number;
}

export default function StatisticsCard({
  title,
  completedTasks,
  allTasks,
}: StatisticsCardProps) {
  return (
    <article className="statistics-card">
      <p className="statistics-card__title">{title}</p>

      <p className="statistics-card__value">
        {completedTasks}/{allTasks}
      </p>
    </article>
  );
}
