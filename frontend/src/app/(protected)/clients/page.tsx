import Layout from "@/components/layouts/app-layout";
import { SCREEN_PATHS } from "@/types/enums/paths";

import ClientsTable from "./clients-table";

const ClientsPage = () => {
  return (
    <Layout
      header={{
        title: "Clients",
        description: "Manage all client documents in one place",
        action: {
          label: "Create Request",
          path: SCREEN_PATHS.DOCUMENT_REQUESTS,
        },
      }}
    >
      <ClientsTable />
    </Layout>
  );
};

export default ClientsPage;
