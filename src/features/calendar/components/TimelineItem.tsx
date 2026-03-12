interface TimelineItemProps {
  time: string;
  title: string;
  description: string;
}

export function TimelineItem({ time, title, description }: TimelineItemProps) {
  return (
    <li className="timeline__item">
      <time className="timeline__time">{time}</time>

      <article className="timeline__card">
        <h3 className="timeline__title">{title}</h3>
        <p className="timeline__description">{description}</p>
      </article>
    </li>
  );
}
