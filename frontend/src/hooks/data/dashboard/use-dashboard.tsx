import { useQuery } from "@tanstack/react-query";

import { dashboardApi } from "@/services/dashboard.service";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: dashboardApi.getDashboardStats,
    staleTime: 1000 * 60 * 2,
    retry: false,
  });
}
