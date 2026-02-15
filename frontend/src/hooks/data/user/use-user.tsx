import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { usersApi } from "@/services/user.service";
import { useAuthStore } from "@/store/auth.store";
import { ApiError } from "@/types/models/misc";
import { User } from "@/types/models/user";
import { getErrorMessage } from "@/utils/api";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => usersApi.getUser(),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};

export const useUpdateUser = () => {
  const setUser = useAuthStore((store) => store.setUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: User) => usersApi.updateUser(user),

    onSuccess(response) {
      queryClient.invalidateQueries({ queryKey: ["user"] });

      setUser(response.data);
      toast.success(response.message);
    },

    onError(error) {
      const errorMsg = getErrorMessage(error as AxiosError<ApiError>);
      toast.error(errorMsg ?? "Failed to update profile. Please try again.");
    },
  });
};
