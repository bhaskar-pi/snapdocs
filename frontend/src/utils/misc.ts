import { ChecklistItemStatus, RequestStatus } from "@/types/enums/request";

export function getStatusClassName(
  status?: RequestStatus | ChecklistItemStatus,
) {
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
