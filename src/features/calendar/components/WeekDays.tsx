import type { FieldState } from "@app-types/fieldState";
import { getWeekDays } from "../utils/getWeekDays";

interface WeekDaysProps {
  selectedDate: FieldState<Date>;
}

export function WeekDays({ selectedDate }: WeekDaysProps) {
  const days = getWeekDays(selectedDate.value);

  return (
    <ul className="calendar-week">
      {days.map((item) => (
        <li key={item.date.toISOString()} className="calendar-week__item">
          <button
            className={`
              calendar-week__day 
              ${selectedDate.value.toISOString() === item.date.toISOString() ? "calendar-week__day--active" : ""}
            `}
            onClick={() => selectedDate.setValue(item.date)}
          >
            <span className="calendar-week__weekday">{item.day}</span>
            <span className="calendar-week__date">{item.number}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
