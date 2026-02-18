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
