# Documents

## What is a Document?

A **Document** is an actual uploaded file.

Examples:
- pan.pdf
- form16_v2.pdf
- bank_statement_march.pdf

---

## Why Documents Are Separate

- Files may be re-uploaded
- Corrections are common
- History must be preserved

---

## Why Documents Attach to Checklist Items

Because each file answers:
> “Which requirement does this satisfy?”

This avoids ambiguity.

---

## Storage Design

- Only metadata stored in DB
- Actual files stored in object storage
- Access via signed URLs

---

## Security Principles

- No public access
- File type & size validation
- Ownership enforced

---

## Table: documents

| Column | Type | Description |
|------|------|------------|
| id | UUID (PK) | Document id |
| checklist_item_id | UUID (FK) | Related checklist |
| file_name | TEXT | Original name |
| file_size | INTEGER | Size in bytes |
| mime_type | TEXT | File type |
| storage_path | TEXT | Object storage path |
| uploaded_at | TIMESTAMP | Upload time |

---