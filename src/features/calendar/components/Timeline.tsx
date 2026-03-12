import { TimelineItem } from "./TimelineItem";

export function Timeline() {
  return (
    <ul className="timeline">
      <TimelineItem
        time="08:00 am"
        title="Task 1"
        description="Description 1"
      />

      <TimelineItem
        time="09:10 am"
        title="Task 2"
        description="Description 2"
      />

      <TimelineItem
        time="01:30 pm"
        title="Task 3"
        description="Description 3"
      />
    </ul>
  );
}
