export function formatDate(date?: string | Date) {
  if (!date) return "";

  const value = typeof date === "string" ? new Date(date) : date;

  return value.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
