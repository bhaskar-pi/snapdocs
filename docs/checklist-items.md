# Checklist Items (MOST IMPORTANT)

## What is a Checklist Item?

A **Checklist Item** represents ONE expected document.

Example:
- PAN Card
- Aadhaar Card
- Bank Statement

---

## Core Concept (CRITICAL)

> Checklist items define **expectation**.  
> Documents define **proof**.

This separation is intentional.

---

## Why Checklist Items Exist

Without them, we cannot:
- Track missing documents
- Show progress (3 of 5 received)
- Send targeted reminders
- Handle partial completion

---

## Lifecycle

- Pending
- Received

---

## Relationships

- One request → many checklist items
- One checklist item → many documents

---

## UI Mapping

- Rendered as checklist
- Each item shows upload status

---

## What Checklist Items Are NOT

- Not files
- Not reusable across requests
- Not client-level data
