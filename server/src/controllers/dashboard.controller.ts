import { AuthenticatedUser } from "@models/user";
import {
  getDashboardMetricsByUserId,
  getRecentRequestsByUserId,
} from "@repositories/dashboard.repository";

export const getDashboardStatsHandler = async ({
  authUser,
}: {
  authUser: AuthenticatedUser;
}) => {
  const [metrics, recentRequests] = await Promise.all([
    getDashboardMetricsByUserId(authUser.id),
    getRecentRequestsByUserId(authUser.id, 8),
  ]);

  return {
    message: "Dashboard stats retrieved successfully.",
    statusCode: 200,
    data: {
      metrics,
      recentRequests,
    },
  };
};
