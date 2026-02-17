import Layout from "@/components/layouts/app-layout";
import { SCREEN_PATHS } from "@/types/enums/paths";

const Dashboard = () => {
  return (
    <Layout
      header={{
        title: "Dashboard",
        description: "Hey, what's happening today with your documents",
        action: {
          label: "Create Request",
          path: SCREEN_PATHS.DOCUMENT_REQUESTS,
        },
      }}
    >
      <h1>DashBoard</h1>
    </Layout>
  );
};

export default Dashboard;
