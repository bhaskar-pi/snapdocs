import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { clientsApi } from "@/services/clients.service";
import { Client, ClientFormInput } from "@/types/models/client";
import { ApiError } from "@/types/models/misc";
import { getErrorMessage } from "@/utils/api";

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

export function useDeleteClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (clientId: string) => clientsApi.deleteClient(clientId),

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success(response?.message ?? "Deleted Successfully.");
    },

    onError: (error) => {
      const msg = getErrorMessage(error as AxiosError<ApiError>);
      toast.error(msg ?? "Failed to delete. Please try again");
    },
  });
}

export function useUpdateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      clientId,
      clientDetails,
    }: {
      clientId: string;
      clientDetails: ClientFormInput;
    }) => clientsApi.updateClient(clientId, clientDetails),

    onSuccess: (response, variables) => {
      // Update single client detail cache
      queryClient.invalidateQueries({
        queryKey: ["client", "details", variables.clientId],
      });

      // Update client inside list cache
      queryClient.setQueryData(["clients"], (old: Client[]) => {
        if (!old) return old;

        return old.map((client: Client) =>
          client.id === variables.clientId
            ? { ...client, ...response?.data }
            : client,
        );
      });

      toast.success(response?.message ?? "Details updated successfully.");
    },

    onError(error) {
      const msg = getErrorMessage(error as AxiosError<ApiError>);
      toast.error(msg ?? "Failed to updated details. Please try again");
    },
  });
}
