import {
  DashboardMetrics,
  DashboardRecentRequest,
  MetricCard,
  RecentRequestView,
} from "@/types/models/dashboard";
import { getRequestHealthStatus } from "@/utils/dashboard";

export const getMetricCards = (metrics?: DashboardMetrics): MetricCard[] => {
  return [
    {
      title: "Active Requests",
      value: String(metrics?.activeRequestsCount ?? 0),
      helper: "Currently active",
      trend: (metrics?.activeRequestsCount ?? 0) > 0 ? "up" : "flat",
    },
    {
      title: "Completed Requests",
      value: String(metrics?.completedRequestCount ?? 0),
      helper: "Completed in last 7 days",
      trend: (metrics?.completedRequestCount ?? 0) > 0 ? "up" : "flat",
    },
    {
      title: "Overdue Requests",
      value: String(metrics?.overdueItemsCount ?? 0),
      helper: "Past due date",
      trend: (metrics?.overdueItemsCount ?? 0) > 0 ? "down" : "up",
    },
    {
      title: "Pending Documents",
      value: String(metrics?.pendingDocumentsCount ?? 0),
      helper: "Still waiting from clients",
      trend: (metrics?.pendingDocumentsCount ?? 0) > 0 ? "flat" : "up",
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
