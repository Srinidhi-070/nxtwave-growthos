# AI-Generated Decisions Log

As part of the GrowthOS build process, several architectural and feature-level decisions were evaluated. Below is the log of AI suggestions that were considered, alongside the rationale for why they were accepted or rejected.

### 1. Database Architecture: PostgreSQL vs SQLite
- **AI Suggestion:** Use Supabase (PostgreSQL) immediately to ensure scalability and support for complex cohort aggregations.
- **Decision:** **Rejected for Prototype / Accepted for Production**
- **Why:** To ensure this repository can be run frictionlessly by reviewers immediately after cloning, we opted for Prisma with a local SQLite database (`dev.db`). This ensures the "working application" constraint is met with zero environment configuration. PostgreSQL is supported simply by swapping the Prisma provider string before final deployment.

### 2. Dashboard Metrics: Real-time calculation vs Pre-aggregated views
- **AI Suggestion:** Create materialized views or use cron jobs to pre-aggregate metrics (like Funnel and Cohorts) to prevent the dashboard from causing heavy DB load.
- **Decision:** **Rejected**
- **Why:** The scale of the simulation (5,000–15,000 events) is small enough that dynamic grouping in the Next.js API route is extremely fast. Introducing cron jobs or materialized views violates the "Prefer a modular monolith over premature microservices" principle for this stage of the project.

### 3. Referral Graph Visualization Library
- **AI Suggestion:** Use D3.js to manually draw a highly customized, force-directed graph.
- **Decision:** **Rejected**
- **Why:** D3 requires a massive amount of boilerplate for a simple node-edge view. We chose `@xyflow/react` (React Flow) instead because it is a lightweight, typed React library that perfectly handles interactive node layouts and integrates easily with Next.js, satisfying the requirement without over-engineering.

### 4. Risk Engine: IP-Based Auto-Bans
- **AI Suggestion:** Automatically block accounts that share the same IP address or device fingerprint.
- **Decision:** **Rejected**
- **Why:** The product principles strictly dictate: "Never auto-ban based on IP alone. High risk should move the reward to HOLD and create a review item." A composite scoring mechanism was implemented instead, appending flags to a manual review queue.

### 5. Experiment Assignment Logic
- **AI Suggestion:** Assign users to A/B variants using `Math.random()` on the client side and store it in a cookie.
- **Decision:** **Rejected**
- **Why:** The prompt required "stable user assignment" and server-side validation. We implemented a deterministic MD5 hash of `userId + experimentKey` to ensure the same user always sees the same variant across sessions, devices, and requests without relying on fragile client cookies.

### 6. AI Insights Engine Implementation
- **AI Suggestion:** Directly integrate the OpenAI SDK to generate the AI Growth Analyst text on the fly.
- **Decision:** **Rejected**
- **Why:** The requirements dictate a "deterministic mock provider so the demo works without a paid model API," while also strictly enforcing bounding rules (citing specific evidence numbers, ensuring human approval). We built an interface (`AIProvider`) and implemented `MockAIProvider` to strictly output the exact contract required, leaving `RealAIProvider` as a stub for future integration.
