import { Button } from "@ui/index";
import { WeekDays } from "./WeekDays";
import { Timeline } from "./Timeline";

export default function Calendar() {
  const current_date = "Monday, September 1 2025";

  return (
    <section className="calendar" aria-labelledby="calendar-title">
      <h2 id="calendar-title" className="calendar_title">
        Calendar
      </h2>

      <Button className="calendar__link" variant="ghost">
        See all
      </Button>

      <p className="calendar__date">{current_date}</p>

      <WeekDays />
      <Timeline />
    </section>
  );
}
