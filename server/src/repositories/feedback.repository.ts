import { db } from "@database/drizzle";
import {
  FeedbackInsert,
  feedbackTable,
} from "@database/schema/feedback.schema";

export async function createFeedback(feedback: FeedbackInsert) {
  await db.insert(feedbackTable).values(feedback);
}
