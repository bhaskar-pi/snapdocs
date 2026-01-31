import Layout from "@/components/layouts/app-layout";
import PageHeader from "@/components/ui/page-header";
import { SCREEN_PATHS } from "@/types/enums/paths";

import DocumentsRequest from "./documents-request";

const Page = () => {
  return (
    <Layout>
      <PageHeader
        header="Create Document Request"
        description="Send a structured document collection request to your client"
        backText="Back to Client Requests"
        backLink={SCREEN_PATHS.CLIENT_REQUESTS}
      />
      <DocumentsRequest />
    </Layout>
  );
};

export default Page;
