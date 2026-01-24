import { Plus } from "lucide-react";

import { Icon } from "@/components/common/icon";
import PageHeader from "@/components/common/page-header";
import Layout from "@/components/layouts/app-layout";

const ClientRequests = () => {
  return (
    <Layout>
      <PageHeader
        header="Client Requests"
        description="Manage all document requests in one place"
        button={{
          title: "Create Request",
          icon: <Icon name={Plus} tone="white" />,
        }}
      />
    </Layout>
  );
};

export default ClientRequests;
