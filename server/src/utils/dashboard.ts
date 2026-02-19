import { DashboardStatus } from "@enums/dashboard";

export function getClientDashboardStatus({
  overdueRequiredItems,
  pendingItems,
  soonestDueDate,
}: {
  overdueRequiredItems: number;
  pendingItems: number;
  soonestDueDate: Date | null;
}): DashboardStatus {
  if (overdueRequiredItems > 0) return DashboardStatus.OVERDUE;

  if (pendingItems <= 0) return DashboardStatus.ON_TRACK;
  if (!soonestDueDate) return DashboardStatus.AT_RISK;

  const threeDaysFromNow = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
  return soonestDueDate <= threeDaysFromNow
    ? DashboardStatus.AT_RISK
    : DashboardStatus.ON_TRACK;
}
