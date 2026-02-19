import { AxiosError } from "axios";

import { ApiError } from "@/types/models/misc";

export const getErrorMessage = (data: AxiosError<ApiError>) => {
  return data?.response?.data?.message;
};

export function isUploadTokenExpired(error: unknown): boolean {
  const err = error as AxiosError<unknown>;

  return (
    err?.response?.status === 410 ||
    (typeof err?.response?.data === "object" &&
      err?.response?.data !== null &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (err.response.data as any).code === "TOKEN_EXPIRED")
  );
}
