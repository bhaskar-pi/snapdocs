export enum RequestStatus {
  // Request is being created by the user
  // Not visible to the client yet
  // Fully editable
  // DRAFT = "draft",

  // Request has been sent to the client
  // Client has not uploaded any documents yet
  // Reminders can be sent
  PENDING = "pending",

  // Client has started uploading documents
  // At least one document is received, but not all
  IN_PROGRESS = "in_progress",

  // All required documents have been received
  // Request is considered done and usually becomes read-only
  COMPLETED = "completed",

  // Due date has passed without completing the request
  // Client uploads may be blocked or flagged
  // EXPIRED = "expired",

  // Request was manually cancelled by the user
  // No further action is allowed
  // CANCELLED = "cancelled",
}

export enum ChecklistItemStatus {
  PENDING = "pending",
  RECEIVED = "received",
}
