import { DateString } from "./date";

export interface Session {
  id: string;
  userId: string;
  refreshTokenHash: string | null;
  createdAt: DateString;
  expiresAt: DateString;
  revokedAt: DateString | null;
}
