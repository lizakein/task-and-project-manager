import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTasksStore } from "@store/hooks";
import { formatFullDate } from "@utils/date/format";
import { Button } from "@ui/index";
import { WeekDays } from "./WeekDays";
import { Timeline } from "./Timeline/Timeline";
import "./Calendar.css";

export default function Calendar() {
  const navigate = useNavigate();

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const currentDate = formatFullDate(today);

  const { tasks } = useTasksStore();

  const timelineTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        if (!task.dueDate) return false;

        const date = new Date(task.dueDate);
        return date.toDateString() === selectedDate.toDateString();
      })
      .sort((a, b) => {
        const aHasTime = a.dueDate!.length > 10;
        const bHasTime = b.dueDate!.length > 10;

        if (!aHasTime && bHasTime) return -1;
        if (aHasTime && !bHasTime) return 1;

        if (aHasTime && bHasTime) {
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }

        return 0;
      });
  }, [tasks, selectedDate]);

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

      <p className="calendar__date">{currentDate.formatted}</p>

      <WeekDays selectedDate={selectedDate} onSelect={setSelectedDate} />
      <Timeline tasks={timelineTasks} />
    </section>
  );
}
