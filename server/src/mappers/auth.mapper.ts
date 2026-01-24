import { Session } from "@database/schema/sessions.schema";

export function getSessionDto(session: Session) {
  return {
    id: session.id,
    userId: session.userId,
  };
}
