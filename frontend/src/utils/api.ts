import { AxiosError } from "axios";

import { ApiError } from "@/types/models/misc";

export const getErrorMessage = (data: AxiosError<ApiError>) => {
  return data?.response?.data?.message || "Something went wrong";
};
