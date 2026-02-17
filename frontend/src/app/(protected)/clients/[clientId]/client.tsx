"use client";

import { useParams } from "next/navigation";

import Layout from "@/components/layouts/app-layout";
import { useClientDetails } from "@/hooks/data/clients/use-clients";
import { SCREEN_PATHS } from "@/types/enums/paths";

import ClientInfo from "./client-info";
import ClientRequests from "./document-requests/requests";

const Client = () => {
  const params = useParams<{ clientId: string }>();
  const clientId = params?.clientId;

  const { data: clientDetails, isLoading } = useClientDetails(clientId);
  const client = clientDetails?.data?.client;
  const requests = clientDetails?.data.requests ?? [];

  return (
    <Layout
      header={{
        backTitle: `clients / ${client?.fullName}`,
        back: SCREEN_PATHS.CLIENTS,
      }}
      isLoading={isLoading}
    >
      <ClientInfo client={client} />
      <ClientRequests requests={requests} />
    </Layout>
  );
};

export default Client;
