import { DashboardStatus } from "@/types/enums/dashboard";
import { RequestStatus } from "@/types/enums/request";
import { DashboardRecentRequest } from "@/types/models/dashboard";

export const getRequestHealthStatus = (
  req: DashboardRecentRequest,
): DashboardStatus => {
  if (req.status === RequestStatus.COMPLETED) return DashboardStatus.ON_TRACK;

  const due = req?.dueDate ? new Date(req.dueDate) : null;

  if (due && !Number.isNaN(due.getTime())) {
    if (due.getTime() < Date.now()) return DashboardStatus.OVERDUE;

    const threeDaysFromNow = Date.now() + 3 * 24 * 60 * 60 * 1000;

    if (due.getTime() <= threeDaysFromNow) return DashboardStatus.AT_RISK;
  }

  return DashboardStatus.ON_TRACK;
};
