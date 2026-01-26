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
    slug: "project-01",
    name: "Project 01",
    tagline: "Draft Landing Page",
    summary: "占位项目页：用于放置下一个个人项目的定位与故事。",
    status: "Draft",
    focus: ["故事定位", "用户旅程", "实验性设计"],
    pillars: [
      {
        title: "核心命题",
        description: "这页会回答：为什么要做、给谁做、如何做。",
      },
      {
        title: "体验策略",
        description: "把功能写成叙事，把细节做成仪式。",
      },
    ],
    capabilities: ["目标用户画像", "关键场景", "MVP 范围", "下一步计划"],
    stack: ["待补充"],
    notes: ["把这里替换成真实项目介绍即可。"],
  },
  {
    slug: "project-02",
    name: "Project 02",
    tagline: "Draft Landing Page",
    summary: "占位项目页：用于放置长期构思中的下一项实验。",
    status: "Exploring",
    focus: ["长期主义", "系统性试验", "开放式问题"],
    pillars: [
      {
        title: "研究方向",
        description: "明确正在探索的问题与假设。",
      },
      {
        title: "实验节奏",
        description: "以月度/季度节奏迭代，累积长期曲线。",
      },
    ],
    capabilities: ["问题定义", "原型节奏", "评估指标"],
    stack: ["待补充"],
    notes: ["可将此页替换成真实项目。"],
  },
];
