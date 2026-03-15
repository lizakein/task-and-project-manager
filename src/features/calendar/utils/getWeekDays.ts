export function getWeekDays(date: Date) {
  const day = date.getDay();
  const mondayOffSet = day === 0 ? -6 : 1 - day;

  const monday = new Date(date);
  monday.setDate(date.getDate() + mondayOffSet);

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);

    return {
      date: d,
      day: d.toLocaleDateString("en-US", { weekday: "short" }),
      number: d.getDate(),
    };
  });
}