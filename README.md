# ==========================================
#  NXTWAVE GROWTHOS : SYSTEM DOCUMENTATION
# ==========================================

NxtWave GrowthOS is a highly gamified, cyberpunk-themed learning and referral platform designed for the AI Deployment Workshop. It replaces standard web forms and static dashboards with an immersive terminal operating system experience. 

Explorers (users) create custom pixel-art avatars, earn XP, complete quests, and build a network via a viral referral loop.

--------------------------------------------
> TECHNICAL ARCHITECTURE
--------------------------------------------

* Framework: Next.js 16 (App Router)
* Language: TypeScript
* Styling: Tailwind CSS (Custom extended config for pixel fonts, neon glows, and terminal colors)
* Animations: Framer Motion (Page transitions, cinematic sequences)
* Database & ORM: Prisma ORM (PostgreSQL) with built-in offline mock fallbacks
* Dynamic Media: @vercel/og (Satori) for dynamic Open Graph link previews, html2canvas for ID Card exporting

--------------------------------------------
> CORE MODULES
--------------------------------------------

[ STUDENT PORTAL ]
* Dashboard: Central hub showing current level, rank, XP bar, next milestone, and recent activity.
* Quests (/quests): Daily and milestone-based tasks that yield XP.
* Crew (/crew): Visualization of the user's referral network and network multipliers.
* Workshop: Interactive modules and deployment environments for AI learning.
* Project (/project): Tracking for the capstone AI deployment project.
* Leaderboard (/leaderboard): Real-time global ranking system sorted by XP and Crew Size.
* Profile Card (/card): A stylized ID card that can be downloaded as a .png or shared natively.

[ ADMINISTRATOR PORTAL ]
* Telemetry & Risk (/admin/risk): Monitoring systems for fraudulent signups, bot traffic, and drop-off rates.
* Graph & Funnel (/admin/graph): Visualizations of the viral coefficient (K-factor) and user conversion funnel.
* Experiments (/admin/experiments): A/B testing control panel to tweak XP values and feature flags on the fly.

--------------------------------------------
> UNIQUE CAPABILITIES
--------------------------------------------

1. Resilient Offline Mode
Because the platform might face database provisioning limitations in certain deployment environments, critical APIs (/api/character, /api/registrations) are wrapped in connection failure fallbacks. If Prisma fails to connect to the database, the system intercepts the 500 error, injects a mock payload into the application state, and allows the user to proceed seamlessly.

2. Dynamic Open Graph Avatars
When a user shares their link, the backend does not rely on static images. The /api/og/join/route.tsx endpoint intercepts the request, queries the database for the user's specific avatar configuration (skin tone, hair style, outfit color), and paints an SVG wrapped in a stylized 1200x630 pixel terminal window entirely on the server using Satori.

3. Fluid Pixel UI System
* CyberGrid: A 3D CSS perspective grid that simulates a retro-futuristic landscape with radial fadeouts to eliminate harsh horizon lines.
* CrtOverlay: Global overlay components that add slight scanlines and edge vignettes to sell the OS aesthetic.
* Grid Confinement: Mobile-first fluid grids that aggressively restrict horizontal overflow to prevent UI blowouts.

--------------------------------------------
> LOCAL DEVELOPMENT
--------------------------------------------

[ Prerequisites ]
* Node.js 18+
* npm or pnpm
* A valid PostgreSQL Database (or rely on the offline fallback system)

[ Setup Instructions ]
1. Clone the repository and install dependencies
   npm install

2. Configure Environment Variables
   Create a .env file based on the required Prisma schema connection string:
   DATABASE_URL="postgresql://user:password@localhost:5432/growthos"

3. Initialize Database
   npx prisma generate
   npx prisma db push

4. Start Development Server
   npm run dev

The system will initialize and become available at http://localhost:3000.
