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
