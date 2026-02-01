"use client";

import { useParams } from "next/navigation";

import Layout from "@/components/layouts/app-layout";
import PageHeader from "@/components/ui/page-header";
import { useClientDetails } from "@/hooks/clients/use-client-details";
import { SCREEN_PATHS } from "@/types/enums/paths";
import { formatDate } from "@/utils/date";

import ClientInfo from "./client-info";
import ClientRequests from "./document-requests/requests";

import { ContentLoader } from "@/components/ui/loader/content-loader";

const Client = () => {
  const params = useParams<{ clientId: string }>();
  const clientId = params?.clientId;

  const { data, isLoading } = useClientDetails(clientId);
  const client = data?.client;
  const requests = data?.requests ?? [];

  if (isLoading) {
    return <ContentLoader open />;
  }

  return (
    <Layout isLoading={isLoading}>
      <PageHeader
        header={client?.fullName}
        description={`Client since: ${formatDate(client?.createdAt)}`}
        backLink={SCREEN_PATHS.CLIENTS}
        backText="Back to Clients"
      />
      <ClientInfo email={client?.email} phoneNumber={client?.whatsappNumber} />
      <ClientRequests requests={requests} />
    </Layout>
  );
};

export default Client;
