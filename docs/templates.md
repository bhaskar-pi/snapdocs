# Templates

## What is a Template?

A **Template** is a reusable checklist definition.

Examples:

- ITR Documents
- GST Filing Docs
- KYC Documents

---

## Why Templates Exist

- Save time
- Reduce errors
- Standardize workflows

---

## How Templates Work

- Templates define checklist items
- When creating a request:
  → checklist items are copied
  → no live linkage remains

---

## Why Templates Are Decoupled

- Requests must remain immutable
- Template changes should not affect history

---

## Future Enhancements

- Shared templates
- Industry templates

---

## Table: templates

| Column      | Type            | Description   |
| ----------- | --------------- | ------------- |
| id          | UUID (PK)       | Template id   |
| user_id     | UUID (FK)       | Owner         |
| name        | TEXT            | Template name |
| description | TEXT (nullable) | Notes         |
| created_at  | TIMESTAMP       | Created time  |
| updated_at  | TIMESTAMP       | Updated time  |

---

## Table: template_items

| Column      | Type      | Description       |
| ----------- | --------- | ----------------- |
| id          | UUID (PK) | Item id           |
| template_id | UUID (FK) | Parent template   |
| label       | TEXT      | Expected document |
| is_required | BOOLEAN   | Mandatory         |
| position    | INTEGER   | Order             |

---
