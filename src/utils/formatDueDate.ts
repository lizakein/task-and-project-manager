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
    formatted = new Date(dueDate).toLocaleDateString("ru-RU", options);
  } else formatted = new Date(dueDate).toLocaleDateString("ru-RU");

  return { formatted, isoDate };
}