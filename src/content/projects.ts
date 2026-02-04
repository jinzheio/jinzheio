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
];
