import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatFullDate } from "@utils/date/format";
import { Button } from "@ui/index";
import { WeekDays } from "./WeekDays";
import { Timeline } from "./Timeline";
import "./Calendar.css";

export default function Calendar() {
  const navigate = useNavigate();

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const currentDate = formatFullDate(today);

  return (
    <section className="calendar" aria-labelledby="calendar-title">
      <div className="calendar__header">
        <h2 id="calendar-title" className="calendar__title">
          Calendar
        </h2>

        <Button
          className="calendar__link"
          variant="ghost"
          onClick={() => navigate("/calendar")}
        >
          See all
        </Button>
      </div>

      <p className="calendar__date">{currentDate}</p>

      <WeekDays selectedDate={selectedDate} onSelect={setSelectedDate} />
      <Timeline />
    </section>
  );
}
