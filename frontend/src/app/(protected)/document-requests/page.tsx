import Layout from "@/components/layouts/app-layout";
import PageHeader from "@/components/ui/page-header";

import DocumentRequests from "./document-requests";

const Page = () => {
  return (
    <Layout>
      <PageHeader
        header="Create Documents Request"
        description="Send a structured document collection request to your client"
      />
      <DocumentRequests />
    </Layout>
  );
};

export default Page;
