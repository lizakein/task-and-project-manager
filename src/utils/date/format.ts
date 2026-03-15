export function formatDueDate(dueDate: string | null) {
  if (!dueDate) return { formatted: "", isoDate: "" };

  const date = new Date(dueDate);
  const isoDate = date.toISOString();

  let formatted;

  if (dueDate.length > 10) {
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
    };
    formatted = new Date(dueDate).toLocaleDateString("en-US", options).toLocaleLowerCase();
  } else formatted = new Date(dueDate).toLocaleDateString("en-US");

  return { formatted, isoDate };
}

export function formatFullDate(date: Date) {
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  const month = date.toLocaleDateString("en-US", { month: "long" });

  return `${weekday}, ${month} ${date.getDate()} ${date.getFullYear()}`;
}
