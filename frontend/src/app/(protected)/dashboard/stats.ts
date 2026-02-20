import {
  DashboardMetrics,
  DashboardRecentRequest,
  MetricCard,
  RecentRequestView,
} from "@/types/models/dashboard";
import { getRequestHealthStatus } from "@/utils/dashboard";

export const getMetricCards = (metrics?: DashboardMetrics): MetricCard[] => {
  const active = metrics?.activeRequestsCount ?? 0;
  const completed = metrics?.completedRequestCount ?? 0;
  const overdue = metrics?.overdueItemsCount ?? 0;
  const pending = metrics?.pendingDocumentsCount ?? 0;

  const hasAnyRequests = active > 0 || completed > 0;

  return [
    {
      title: "Active Requests",
      value: String(active),
      helper: "Currently active",
      trend: active > 0 ? "up" : "flat",
    },
    {
      title: "Completed Requests",
      value: String(completed),
      helper: "Completed in last 7 days",
      trend: completed > 0 ? "up" : "flat",
    },
    {
      title: "Overdue Requests",
      value: String(overdue),
      helper: "Past due date",
      trend: !hasAnyRequests
        ? "flat" // NEW USER
        : overdue > 0
          ? "down"
          : "up",
    },
    {
      title: "Pending Documents",
      value: String(pending),
      helper: "Still waiting from clients",
      trend: !hasAnyRequests
        ? "flat" // NEW USER
        : pending > 0
          ? "flat"
          : "up",
    },
  ];
};

/**
 * Maps recent requests from API shape → UI display shape.
 */
export const mapRecentRequests = (
  requests: DashboardRecentRequest[] = [],
): RecentRequestView[] => {
  return requests.map((r) => ({
    clientName: r.clientName,
    requestTitle: r.requestTitle,
    createdAt: r.createdAt,
    status: getRequestHealthStatus(r),
  }));
};
