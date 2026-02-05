"use client";

import { useParams } from "next/navigation";

import Layout from "@/components/layouts/app-layout";
import PageHeader from "@/components/ui/page-header";
import { useClientDetails } from "@/hooks/clients/use-client-details";
import { SCREEN_PATHS } from "@/types/enums/paths";

import ClientInfo from "./client-info";
import ClientRequests from "./document-requests/requests";

const Client = () => {
  const params = useParams<{ clientId: string }>();
  const clientId = params?.clientId;

  const { data, isLoading } = useClientDetails(clientId);
  const client = data?.client;
  const requests = data?.requests ?? [];

  return (
    <Layout isLoading={isLoading}>
      <PageHeader backLink={SCREEN_PATHS.CLIENTS} backText="Back to Clients" />
      <ClientInfo client={client} />
      <ClientRequests requests={requests} />
    </Layout>
  );
};

export default Client;
