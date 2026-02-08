import { useQuery } from "@tanstack/react-query";

import { clientsApi } from "@/services/clients.service";
import { Client } from "@/types/models/client";

export function useClients() {
  return useQuery<Client[]>({
    queryKey: ["clients"],
    queryFn: clientsApi.getClients,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}
