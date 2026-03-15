import { getWeekDays } from "../utils/getWeekDays";

interface WeekDaysProps {
  selectedDate: Date;
  onSelect: (date: Date) => void;
}

export function WeekDays({ selectedDate, onSelect }: WeekDaysProps) {
  const days = getWeekDays(selectedDate);

  return (
    <ul className="calendar-week">
      {days.map((item) => (
        <li key={item.date.toISOString()} className="calendar-week__item">
          <button
            className={`
              calendar-week__day 
              ${selectedDate.toISOString() === item.date.toISOString() ? "calendar-week__day--active" : ""}
            `}
            onClick={() => onSelect(item.date)}
          >
            <span className="calendar-week__weekday">{item.day}</span>
            <span className="calendar-week__date">{item.number}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
