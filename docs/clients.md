# Clients

## What is a Client?

A **Client** is a real-world person or business from whom documents are collected.

Examples:

- Individual taxpayer
- Company
- Legal client

---

## Why Clients Are Separate from Users

- Clients are external
- One user manages many clients
- Clients do not own data

---

## Client Capabilities

- Can have multiple requests over time
- Has contact info for reminders
- Has historical record

---

## UI Mapping

### Clients Page

- List of all clients

### Client Details Page

- Client info
- All requests created for this client

---

## What Clients Do NOT Contain

- Documents
- Checklist items
- Status logic

All workflow lives in **requests**.

---

## Table: clients

| Column     | Type            | Description       |
| ---------- | --------------- | ----------------- |
| id         | UUID (PK)       | Client identifier |
| user_id    | UUID (FK)       | Owner user        |
| name       | TEXT            | Client name       |
| email      | TEXT            | Contact email     |
| phone      | TEXT (nullable) | Optional          |
| notes      | TEXT (nullable) | Internal notes    |
| created_at | TIMESTAMP       | Created time      |
| updated_at | TIMESTAMP       | Updated time      |

---
