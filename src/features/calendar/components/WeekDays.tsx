export function WeekDays() {
  const days = [
    { day: "Mon", date: 1 },
    { day: "Tue", date: 2 },
    { day: "Wed", date: 3 },
    { day: "Thu", date: 4 },
    { day: "Fri", date: 5 },
    { day: "Sat", date: 6 },
    { day: "Sun", date: 7 },
  ];

  return (
    <ul className="calendar-week">
      {days.map((item) => (
        <li key={item.date} className="calendar-week__item">
          <button className="calendar-week__day">
            <span className="calendar-week__weekday">{item.day}</span>
            <span className="calendar-week__date">{item.date}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
