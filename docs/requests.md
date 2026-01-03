# Requests (Core Entity)

## What is a Request?

A **Request** represents a single document collection task.

Examples:
- ITR Filing 2024
- GST Q2 Documents
- Audit FY 2023–24

---

## Why Requests Exist

Professionals request documents:
- Multiple times
- For different purposes
- Over long periods

Requests preserve **context and history**.

---

## Request Lifecycle

- Draft
- Sent
- Completed
- Overdue

---

## Relationships

- One client → many requests
- One request → many checklist items

---

## UI Mapping

### Client Details Page
- Shows all requests for that client

### Request Details Page
- Shows checklist & documents

---

## What Requests Do NOT Do

- Store documents directly
- Define document structure

---

## Table: requests

| Column | Type | Description |
|------|------|------------|
| id | UUID (PK) | Request identifier |
| user_id | UUID (FK) | Owner |
| client_id | UUID (FK) | Related client |
| title | TEXT | Request title |
| description | TEXT (nullable) | Extra context |
| status | ENUM | DRAFT / SENT / COMPLETED / OVERDUE |
| due_date | DATE (nullable) | Deadline |
| sent_at | TIMESTAMP (nullable) | When sent |
| completed_at | TIMESTAMP (nullable) | When finished |
| created_at | TIMESTAMP | Created time |
| updated_at | TIMESTAMP | Updated time |

---