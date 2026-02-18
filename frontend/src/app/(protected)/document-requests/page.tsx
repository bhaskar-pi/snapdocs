import Layout from "@/components/layouts/app-layout";

import DocumentRequests from "./document-requests";

const Page = () => {
  return (
    <Layout
      header={{
        title: "Create Documents Request",
        description:
          "Send a structured document collection request to your client",
      }}
    >
      <DocumentRequests />
    </Layout>
  );
};

export default Page;
