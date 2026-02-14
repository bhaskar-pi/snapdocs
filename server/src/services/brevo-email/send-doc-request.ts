import { brevoEmail } from "@config/brevo";
import { SendDocRequestEmailParams } from "@models/email";

export async function sendDocumentRequestEmail(
  params: SendDocRequestEmailParams,
) {
  await brevoEmail.sendTransacEmail({
    templateId: 1,
    to: [{ email: params.clientEmail, name: params.clientName }],
    params: {
      clientName: params.clientName,
      userName: params.userName,
      requestTitle: params.requestTitle,
      docCount: params.docCount,
      uploadLink: params.uploadLink,
    },
  });
}
