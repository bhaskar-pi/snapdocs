import { Plus } from "lucide-react";

import Layout from "@/components/layouts/app-layout";
import { Icon } from "@/components/ui/icon";
import PageHeader from "@/components/ui/page-header";
import { SCREEN_PATHS } from "@/types/enums/paths";

import ClientsTable from "./clients-table";

const Clients = () => {
  return (
    <Layout>
      <PageHeader
        header="Clients"
        description="Manage all client documents in one place"
        button={{
          title: "Create Request",
          icon: <Icon name={Plus} />,
          path: SCREEN_PATHS.DOCUMENT_REQUESTS,
        }}
      />
      <ClientsTable />
    </Layout>
  );
};

export default Clients;
