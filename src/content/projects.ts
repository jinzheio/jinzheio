export type ProjectStatus = "Active" | "Draft" | "Exploring";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  status: ProjectStatus;
  focus: string[];
  pillars: { title: string; description: string }[];
  capabilities: string[];
  stack: string[];
  notes: string[];
  link?: string;
};

export const projects: Project[] = [
  {
    slug: "commanddeck",
    name: "CommandDeck",
    tagline: "Multi-Agent Control Console",
    summary:
      "A visual control console for multi-agent collaboration systems, emphasizing a 'front-store back-factory' collaboration model.",
    status: "Active",
    focus: ["Real-time Monitoring", "Event Timeline", "Interactive Chat", "Multi-project Support"],
    pillars: [
      {
        title: "HQ (Hub)",
        description:
          "Centrally receives agent reports, stores historical archives, and provides analysis capabilities.",
      },
      {
        title: "Front Store (Desktop UI)",
        description:
          "The visual interface for users to observe, schedule, and issue commands.",
      },
      {
        title: "Back Factory (Main & Agents)",
        description: "Launches agent processes, executes Git operations and code running.",
      },
      {
        title: "Common Language (Protocol)",
        description: "Unified protocol based on TypeScript/Zod to ensure communication accuracy.",
      },
    ],
    capabilities: [
      "Real-time agent status monitoring",
      "Event timeline tracking tool calls",
      "Interactive conversation with specific agents",
      "Multi-project and multi-agent parallel management",
    ],
    stack: [
      "Electron + React",
      "Fastify + WebSocket",
      "SQLite (better-sqlite3)",
      "pnpm + electron-builder",
    ],
    notes: [
      "Unified console for multi-project collaboration environments.",
      "Supports both local and cloud Hub deployment modes.",
    ],
  },
  {
    slug: "clawsimple",
    name: "ClawSimple",
    tagline: "Zero-Touch AI Deployment",
    summary: "SaaS platform providing managed hosting and automated deployment for OpenClaw personal AI assistants.",
    status: "Active",
    focus: ["Automated Provisioning", "Zero-Access Security", "Subscription Billing"],
    pillars: [
      {
        title: "Zero-Access Architecture",
        description: "Server passwords displayed once, never stored—no platform backdoors.",
      },
      {
        title: "Cloud Automation",
        description: "Auto-provisioning on Hetzner/DigitalOcean via cloud-init.",
      },
      {
        title: "Stripe Billing",
        description: "Seat-based pricing with automatic resource cleanup for lapsed subscriptions.",
      },
    ],
    capabilities: [
      "One-click Telegram/WhatsApp AI bot deployment",
      "Multi-language support (EN/ZH/JA)",
      "Real-time deployment status tracking",
      "Community-driven feature roadmap",
    ],
    stack: [
      "Next.js 16 + React 19",
      "Neon PostgreSQL + Drizzle ORM",
      "Better Auth + Stripe",
      "Hetzner Cloud API",
    ],
    notes: [
      "Rescue Password system ensures true zero-access security.",
    ],
    link: "https://clawsimple.com",
  },
  {
    slug: "auditmycareer",
    name: "AuditMyCareer",
    tagline: "AI Exposure Index",
    summary: "A 14-question quiz that scores your career's AI replaceability risk and delivers a personalized survival plan.",
    status: "Active",
    focus: ["Replaceability Index", "Four-Axis Scoring Model", "Survival Playbook", "Lifetime Access"],
    pillars: [
      {
        title: "Four-Axis Model",
        description: "Codifiability, value locus, visibility, and tool leverage — each with a risk and safety pole.",
      },
      {
        title: "SOC-2018 Anchoring",
        description: "22 occupation priors mapped to the US Standard Occupational Classification for defensible baselines.",
      },
      {
        title: "Paid Survival Plan",
        description: "Stripe one-time payment unlocks lever math and a 90-day staged intervention plan with email reminders.",
      },
    ],
    capabilities: [
      "14-question career exposure quiz",
      "16 classification types with tiered risk tiers",
      "Personalized survival tips by career stage",
      "Re-audit reminder system every 90 days",
      "Duo comparison for coworker side-by-side",
    ],
    stack: [
      "Astro 6 + React 19",
      "Cloudflare Pages + D1",
      "Tailwind CSS v4",
      "Stripe (one-time)",
    ],
    notes: [
      "Paid content is server-gated behind Stripe verification — never imported from client bundles.",
      "90-day reminder system uses Durable Objects with event-driven arm/reset, no table scans.",
    ],
    link: "https://auditmycareer.com",
  },
];
