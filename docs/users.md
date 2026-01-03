# Users

## What is a User?

A **User** is a professional (CA, lawyer, consultant) who uses SnapDocs.

Users:

- Own all data
- Create clients
- Create requests
- Track document progress

---

## Why Users Exist

- Clear data ownership
- Enables multi-user orgs later
- Prevents data leakage

---

## Key Design Decisions

- Users are internal (they log in)
- Clients are external (they usually don’t)
- Users never upload client documents directly

---

## Future Scope (Not Now)

- Organizations
- Roles (admin/member)
- Team collaboration

---

## Table: users

| Column       | Type          | Description        |
| ------------ | ------------- | ------------------ |
| id           | UUID (PK)     | Primary identifier |
| email        | TEXT (UNIQUE) | Login email        |
| password     | TEXT          | Hashed password    |
| first_name   | TEXT          | Display name       |
| last_name    | TEXT          | Display name       |
| phone_number | TEXT          | contact number     |
| created_at   | TIMESTAMP     | Created time       |
| updated_at   | TIMESTAMP     | Updated time       |
