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
      "为多 Agent 协作系统打造的可视化控制台，强调“前店后厂”的协作模型。",
    status: "Active",
    focus: ["实时监控", "事件时间线", "交互对话", "多项目支持"],
    pillars: [
      {
        title: "集团总部 (Hub)",
        description:
          "集中接收 Agent 汇报、存储历史档案，并提供分析能力。",
      },
      {
        title: "前店 (Desktop UI)",
        description:
          "用户面对的可视化界面，用来观察、调度与下达指令。",
      },
      {
        title: "后厂 (Main & Agents)",
        description: "启动 Agent 进程，执行 Git 操作与代码运行。",
      },
      {
        title: "通用语 (Protocol)",
        description: "基于 TypeScript/Zod 的统一协议，保证沟通准确。",
      },
    ],
    capabilities: [
      "Agent 状态实时监控",
      "事件时间线追踪工具调用",
      "与指定 Agent 进行交互对话",
      "多项目与多 Agent 并行管理",
    ],
    stack: [
      "Electron + React",
      "Fastify + WebSocket",
      "SQLite (better-sqlite3)",
      "pnpm + electron-builder",
    ],
    notes: [
      "面向多项目协作环境的统一控制台。",
      "支持本地与云端 Hub 部署模式。",
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
