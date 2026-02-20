export function formatDate(date?: string | Date) {
  if (!date) return "";

  const value = typeof date === "string" ? new Date(date) : date;

  return value.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Formats a date string into a compact, human-readable format.
 *
 * @param value - ISO date string (e.g. "2026-02-19T10:30:00Z"),
 * nullable or undefined.
 *
 * @returns
 * - Formatted date string like: `"Feb 19, 10:30 AM"`
 * - `"—"` when the value is missing or invalid.
 *
 * @example
 * formatCompactDateTime("2026-02-19T10:30:00Z")
 * // "Feb 19, 10:30 AM"
 *
 * @example
 * formatCompactDateTime(null)
 * // "—"
 */
export const formatCompactDateTime = (value?: string | null) => {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleString(undefined, {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Converts a date string into a human-readable relative time
 * compared to the current moment.
 *
 * @param value - ISO date string (e.g. "2026-02-19T10:30:00Z"),
 * nullable or undefined.
 *
 * @returns
 * - Relative time text such as:
 *   "just now", "5 min ago", "2 hrs ago", "3 days ago"
 * - "—" when the value is missing or invalid.
 *
 * @example
 * formatRelativeTimeFromNow("2026-02-19T10:30:00Z")
 * // "5 min ago"
 *
 * @example
 * formatRelativeTimeFromNow(null)
 * // "—"
 */
export const formatRelativeTimeFromNow = (value?: string | null) => {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  const diffMs = Date.now() - date.getTime();

  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hr${hours > 1 ? "s" : ""} ago`;
  if (days === 1) return "1 day ago";

  return `${days} days ago`;
};
