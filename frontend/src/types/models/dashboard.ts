import { DashboardStatus } from "../enums/dashboard";
import { RequestStatus } from "../enums/request";

export interface MetricCard {
  title: string;
  value: string;
  helper: string;
  trend?: "up" | "down" | "flat";
}

/**
 * Shape used by Dashboard UI for recent requests.
 */
export interface RecentRequestView {
  clientName: string;
  requestTitle: string;
  createdAt: string;
  status: DashboardStatus;
}

export interface DashboardMetrics {
  activeRequestsCount: number;
  completedRequestCount: number;
  pendingDocumentsCount: number;
  overdueItemsCount: number;
}

export interface DashboardRecentRequest {
  requestId: string;
  clientId: string;
  clientName: string;
  requestTitle: string;
  createdAt: string;
  dueDate?: string;
  status: RequestStatus;
}

export interface DashboardStats {
  metrics: DashboardMetrics;
  recentRequests: DashboardRecentRequest[];
}
