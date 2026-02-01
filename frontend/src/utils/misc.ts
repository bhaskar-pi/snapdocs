import { RequestStatus } from "@/types/enums/request";

export function getStatusClassName(status?: RequestStatus) {
  switch (status) {
    case RequestStatus.PENDING:
      return "warning";
    case RequestStatus.IN_PROGRESS:
      return "info";
    case RequestStatus.COMPLETED:
      return "success";
    default:
      return "neutral";
  }
}
