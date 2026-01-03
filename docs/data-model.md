# SnapDocs – Data Model (Source of Truth)

## Core Hierarchy

```mermaid
graph TD
    U[User]
    C[Client]
    R[Request]
    CI[Checklist Item]
    D[Document]

    U -->|owns| C
    C -->|has many| R
    R -->|contains| CI
    CI -->|uploads| D
```
---

```mermaid
graph TD
    U[User]
    C[Client<br/>Rahul Sharma]
    R[Request<br/>ITR Filing 2024]
    CI[Checklist Item<br/>PAN Card]
    D1[Document<br/>pan.pdf]
    D2[Document<br/>pan_corrected.pdf]

    U --> C
    C --> R
    R --> CI
    CI --> D1
    CI --> D2
```

---

## Why This Model Exists

This model mirrors **real-world professional workflows**, not technical shortcuts.

---

## Intent vs Proof

- Checklist Item = Intent
- Document = Proof

This enables:

- Progress tracking
- Reminders
- Audits
- Clean UI

---

## What This Model Solves

- Multiple requests per client
- Partial document submission
- Re-uploads
- History preservation

---

## What This Model Avoids

- Document confusion
- Schema rewrites
- Ambiguous status
- Over engineering

---

## Long-Term Readiness

- Multi-user orgs
- Teams
- Advanced analytics
- Compliance requirements

Without breaking changes.
