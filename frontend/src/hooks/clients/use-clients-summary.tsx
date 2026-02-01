import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { clientsApi } from "@/services/clients.service";
import { ClientSummary } from "@/types/models/client";
import { ApiError } from "@/types/models/misc";

export function useClientsSummary() {
  return useQuery<ClientSummary[], AxiosError<ApiError>>({
    queryKey: ["clients", "summaries"],
    queryFn: clientsApi.getClientsSummary,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}
