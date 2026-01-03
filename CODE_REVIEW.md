# 🧠 SnapDocs – Code Review Guidelines (Solo Developer)

This document defines how all code in this repository must be reviewed.
The goal is **correctness, clarity, security, and long-term maintainability** — not cleverness.

Assume:
- I am a solo developer or small team (2-4)
- This is an early-stage SaaS
- I want honest feedback, not politeness

Reviewer (human or AI) must follow this strictly.

---

## 🔴 REVIEW MINDSET (IMPORTANT)

- Be **critical but fair**
- Prefer **simple and boring solutions**
- Flag anything that will hurt me in 6–12 months
- Avoid premature optimization
- If something is unclear, assume future-me will suffer

---

# 1️⃣ ARCHITECTURE & STRUCTURE REVIEW

### Check:
- Is business logic separated from HTTP / framework code?
- Are routes/controllers thin?
- Are services reusable (API, cron, future GraphQL)?
- Is the folder structure consistent and predictable?

### Red flags:
- DB logic inside routes
- Express/Fastify objects leaking into services
- Duplicate logic across files
- God files (>300 lines)

---

# 2️⃣ BACKEND API DESIGN

### Check:
- REST endpoints are consistent and predictable
- Clear naming (`/clients`, `/requests`, `/documents`)
- Proper HTTP methods used (GET, POST, PUT, DELETE)
- Status codes are correct and meaningful

### Red flags:
- Inconsistent endpoint naming
- Overloaded endpoints
- Returning raw DB errors to clients
- Missing pagination for lists

---

# 3️⃣ DATA MODEL & DATABASE

### Check:
- Tables reflect real domain concepts
- Relationships are explicit and correct
- Nullable fields are intentional
- Indexes exist on frequently queried fields

### Red flags:
- Overloaded tables
- JSON blobs where relations are needed
- Missing ownership fields (user_id / org_id)
- No soft-delete strategy (if required)

---

# 4️⃣ SECURITY (NON-NEGOTIABLE)

### Check:
- Authentication enforced on all protected routes
- Authorization checks (user owns the resource)
- Passwords hashed (bcrypt or equivalent)
- JWT secrets not hardcoded
- No secrets committed to repo

### Red flags:
- Trusting client-provided IDs blindly
- Missing auth middleware
- Sensitive data in responses
- File access without validation

---

# 5️⃣ FILE UPLOAD & STORAGE

### Check:
- File size limits enforced
- File type validation exists
- Uploads use signed URLs or controlled endpoints
- Files are private by default

### Red flags:
- Public buckets
- No size/type validation
- Direct client access to storage keys

---

# 6️⃣ ERROR HANDLING

### Check:
- Centralized error handling
- Clear, user-safe error messages
- Internal errors not leaked
- Logs contain enough context

### Red flags:
- `try/catch` everywhere without strategy
- Returning stack traces
- Silent failures
- Inconsistent error formats

---

# 7️⃣ TYPESCRIPT QUALITY

### Check:
- Types are explicit at boundaries
- No excessive `any`
- Interfaces represent real domain objects
- Enums used where appropriate

### Red flags:
- `any` everywhere
- Type assertions without explanation
- Ignoring TS errors
- Inconsistent typing style

---

# 8️⃣ ENVIRONMENT & CONFIGURATION

### Check:
- All secrets come from environment variables
- Sensible defaults exist
- App runs in dev & prod without changes
- `.env` is ignored by Git

### Red flags:
- Hardcoded values
- Config spread across files
- Different behavior without explanation

---

# 9️⃣ PERFORMANCE (REALISTIC, NOT HYPE)

### Check:
- Obvious N+1 queries avoided
- Pagination on large lists
- Heavy operations moved to background jobs
- No blocking operations in request cycle

### Red flags:
- Premature caching
- Micro-optimizations with no data
- Blocking loops
- Loading unnecessary data

---

# 🔟 LOGGING & OBSERVABILITY

### Check:
- Logs exist for important actions
- Errors are logged with context
- No sensitive data in logs

### Red flags:
- `console.log` everywhere
- No logs on failures
- Logging passwords/tokens

---

# 1️⃣1️⃣ DEPENDENCIES & PACKAGE HEALTH

### Check:
- Dependencies vs devDependencies used correctly
- No unused dependencies
- Versions are reasonable (no wild ranges)
- `private: true` set if not publishing

### Red flags:
- Heavy libraries for small tasks
- Duplicate functionality
- Unused packages

---

# 1️⃣2️⃣ FRONTEND REVIEW (`app/`)

## 12.1 COMPONENT STRUCTURE

### Check:
- Components are small and focused
- Pages orchestrate, components render
- No business logic in UI components

### Red flags:
- Huge components (>300 lines)
- API logic duplicated across components
- Deep prop drilling

---

## 12.2 DATA FETCHING

### Check:
- API calls centralized
- Loading & error states handled
- No hardcoded backend assumptions

### Red flags:
- Fetch calls scattered everywhere
- Ignored errors
- Tight coupling to API shape

---

## 12.3 STATE MANAGEMENT

### Check:
- Local state preferred
- Global state only when needed
- Predictable state flow

### Red flags:
- Overuse of global state
- Unclear state ownership
- Side effects in render paths

---

## 12.4 UI / UX QUALITY

### Check:
- Calm, professional UI
- Accessibility basics followed
- Consistent design language

### Red flags:
- Flashy or distracting UI
- Inconsistent spacing/colors
- Over-animated interactions

---

# 12.5 FRONTEND–BACKEND CONTRACT 

### Check:
- API responses are stable and predictable
- No frontend-specific hacks in backend
- Error shapes are consistent

### Red flags:
- Backend shaped around UI quirks
- Inconsistent response formats

---

# 1️⃣3️⃣ PRODUCT & UX LOGIC (IMPORTANT)

### Check:
- Code aligns with product intent
- Core flows are simple
- No unnecessary options
- Defaults make sense

### Red flags:
- Feature creep
- Complex configuration early
- Over-flexibility without use cases

---

# 1️⃣4️⃣ SOLO/SMALL TEAM DEVELOPER's REALITY CHECK

Reviewer must ask:
- Will I understand this in 6 months?
- Can I debug this at 2 AM?
- Is this simpler than the previous version?
- Did I add complexity without validation?

If answer is **no** → flag it.

---

# 1️⃣5️⃣ DOCUMENTATION & COMMENTS

### Check:
- Non-obvious logic is commented
- Public functions have clear intent
- README stays accurate

### Red flags:
- Obvious comments
- No explanation for complex logic
- Dead comments

---

# ✅ FINAL REVIEW VERDICT FORMAT

Reviewer must conclude with:

- ✅ What is good and should stay
- ⚠️ What is acceptable but risky
- ❌ What must change before merge
- 💡 One improvement suggestion (optional)

No sugarcoating.

---

## 🧠 CORE PRINCIPLE

> This codebase should optimize for **clarity, safety, and calm development**,  
> not cleverness or premature scale.

---

## 🏁 REVIEWER PROMISE

If you see something that:
- Will break later
- Will confuse future-me
- Violates fundamentals

**Call it out clearly.**
