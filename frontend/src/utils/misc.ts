import { DashboardStatus } from "@/types/enums/dashboard";
import { ChecklistItemStatus, RequestStatus } from "@/types/enums/request";

export function getStatusClassName(
  status?: RequestStatus | ChecklistItemStatus,
): "neutral" | "success" | "warning" | "danger" | "info" {
  switch (status) {
    case RequestStatus.PENDING:
      return "neutral";

    case RequestStatus.IN_PROGRESS:
      return "warning";

    case RequestStatus.COMPLETED:
    case ChecklistItemStatus.RECEIVED:
      return "success";

    default:
      return "neutral";
  }
}

export const getDashboardStatusClassName = (status: DashboardStatus) => {
  switch (status) {
    case DashboardStatus.ON_TRACK:
      return "status-success";
    case "At Risk":
      return "status-warning";
    case "Overdue":
      return "status-danger";
    default:
      return "status-neutral";
  }
};
