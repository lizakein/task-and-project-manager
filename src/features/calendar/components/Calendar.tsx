import { Button } from "@ui/index";
import { WeekDays } from "./WeekDays";
import { Timeline } from "./Timeline";
import "./Calendar.css";

export default function Calendar() {
  const current_date = "Monday, September 1 2025";

  return (
    <section className="calendar" aria-labelledby="calendar-title">
      <div className="calendar__header">
        <h2 id="calendar-title" className="calendar__title">
          Calendar
        </h2>

        <Button className="calendar__link" variant="ghost">
          See all
        </Button>
      </div>

      <p className="calendar__date">{current_date}</p>

      <WeekDays />
      <Timeline />
    </section>
  );
}
