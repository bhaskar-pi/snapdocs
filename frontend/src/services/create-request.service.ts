import { POST } from "@/api/http";
import { ClientRequest } from "@/types/models/client";

export const createRequestApi = {
  sendRequest(data: ClientRequest) {
    return POST(`/user/send-docs-request`, data);
  },
};
