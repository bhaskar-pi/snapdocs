import PageHeader from "@/components/common/page-header";
import Layout from "@/components/layouts/app-layout";
import { SCREEN_PATHS } from "@/types/enums/paths";

const CreateDocumentRequest = () => {
  return (
    <Layout>
      <PageHeader
        header="Create Document Request"
        description="Send a structured document collection request to your client"
        backText="Back to Client Requests"
        backLink={SCREEN_PATHS.CLIENT_REQUESTS}
      />
    </Layout>
  );
};

export default CreateDocumentRequest;
