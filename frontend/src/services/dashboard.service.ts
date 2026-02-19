import { GET } from "@/api/http";
import { DashboardStats } from "@/types/models/dashboard";
import { ApiResponse } from "@/types/models/misc";

export const dashboardApi = {
  getDashboardStats() {
    return GET<ApiResponse<DashboardStats>>("/dashboard/stats");
  },
};
