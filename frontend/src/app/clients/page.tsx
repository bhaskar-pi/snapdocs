import { Plus } from "lucide-react";

import Layout from "@/components/layouts/app-layout";
import { Icon } from "@/components/ui/icon";
import PageHeader from "@/components/ui/page-header";
import { SCREEN_PATHS } from "@/types/enums/paths";

const ClientRequests = () => {
  return (
    <Layout>
      <PageHeader
        header="Client Requests"
        description="Manage all document requests in one place"
        button={{
          title: "Create Request",
          icon: <Icon name={Plus} />,
          path: SCREEN_PATHS.DOCUMENTS_REQUEST,
        }}
      />
    </Layout>
  );
};

export default ClientRequests;
