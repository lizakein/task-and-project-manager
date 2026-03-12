interface StatisticsCardProps {
  title: string;
  value: string;
}

export default function StatisticsCard({ title, value }: StatisticsCardProps) {
  return (
    <article className="statistics-card">
      <p className="statistics-card__title">{title}</p>

      <p className="statistics-card__value">{value}</p>
    </article>
  );
}
