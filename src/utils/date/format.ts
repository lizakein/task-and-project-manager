function toDate(input: Date | string | null): Date | null {
  if (!input) return null;
  return input instanceof Date ? input : new Date(input);
}

export function formatDueDate(input: string | null) {
  const date = toDate(input);
  if (!date) return { formatted: "", isoDate: "" };

  let formatted: string;

  if (input && input.length > 10) {
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
    };
    formatted = date.toLocaleDateString("en-US", options).toLocaleLowerCase();
  } else formatted = date.toLocaleDateString("en-US");

  return { formatted, isoDate: date.toISOString() };
}

export function formatFullDate(input: Date | string | null) {
  const date = toDate(input);
  if (!date) return { formatted: "", isoDate: "" };

  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  const month = date.toLocaleDateString("en-US", { month: "long" });

  return {
    formatted: `${weekday}, ${month} ${date.getDate()} ${date.getFullYear()}`,
    isoDate: date.toISOString()
  };
}

export function formatTime(input: Date | string | null) {
  const date = toDate(input);
  if (!date) return { formatted: "", isoDate: "" };

  return {
    formatted: date.toLocaleTimeString("en-US", { timeStyle: "short" })
      .toLowerCase(),
    isoDate: date.toISOString()
  };
}

export function formatTimelineTime(input: string | null) {
  if (!input) return { formatted: "", isoDate: "" };

  const date = toDate(input);
  if (!date) return { formatted: "", isoDate: "" };

  const hasTime = input.length > 10;

  const formatted = hasTime ? date.toLocaleTimeString("en-US", { timeStyle: "short" }).toLowerCase() : "All day";

  return {
    formatted,
    isoDate: date.toISOString()
  };
}