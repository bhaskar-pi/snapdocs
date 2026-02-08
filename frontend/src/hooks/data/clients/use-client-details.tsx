import { useQuery } from "@tanstack/react-query";

import { clientsApi } from "@/services/clients.service";
import { ClientRequestDetails } from "@/types/models/client";

export function useClientDetails(clientId: string) {
  return useQuery<ClientRequestDetails>({
    queryKey: ["client", "details", clientId],
    queryFn: () => clientsApi.getClientDetails(clientId),
    enabled: !!clientId,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}
