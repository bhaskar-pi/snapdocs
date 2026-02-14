import {
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
} from "@getbrevo/brevo";
import env from "./env";

const brevoEmail = new TransactionalEmailsApi();

brevoEmail.setApiKey(TransactionalEmailsApiApiKeys.apiKey, env.BREVO_API_KEY);

export { brevoEmail };
