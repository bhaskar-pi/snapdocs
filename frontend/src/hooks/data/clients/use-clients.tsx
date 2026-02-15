import { useQuery } from "@tanstack/react-query";

import { clientsApi } from "@/services/clients.service";
import { ClientRequestDetails } from "@/types/models/client";

export function useClients() {
  return useQuery({
    queryKey: ["clients"],
    queryFn: clientsApi.getClients,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}

export function useClientsSummary() {
  return useQuery({
    queryKey: ["clients", "summaries"],
    queryFn: clientsApi.getClientsSummary,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}

export function useClientDetails(clientId: string) {
  return useQuery({
    queryKey: ["client", "details", clientId],
    queryFn: () => clientsApi.getClientDetails(clientId),
    enabled: !!clientId,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}
