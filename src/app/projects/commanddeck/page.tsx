import Image from "next/image";
import Link from "next/link";

import {
  Activity,
  Bot,
  CircuitBoard,
  Cloud,
  Database,
  LayoutGrid,
  MessageCircle,
  Terminal,
} from "lucide-react";

import { Ambient } from "@/components/ambient";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const pillars = [
  {
    title: "集团总部 (Hub)",
    description: "集中接收 Agent 汇报、存储历史档案并做分析。",
    icon: Cloud,
  },
  {
    title: "前店 (Desktop UI)",
    description: "面向用户的可视化界面，用来观察与下达指令。",
    icon: LayoutGrid,
  },
  {
    title: "后厂 (Main + Agents)",
    description: "执行 Git 操作、运行代码、调度 Agent 进程。",
    icon: Bot,
  },
  {
    title: "通用语 (Protocol)",
    description: "TypeScript/Zod 协议，保证沟通一致性。",
    icon: CircuitBoard,
  },
];

const capabilities = [
  {
    title: "实时监控",
    description: "查看所有 Agent 的运行状态与资源占用。",
    icon: Activity,
  },
  {
    title: "事件时间线",
    description: "追踪每次工具调用与状态变化。",
    icon: Terminal,
  },
  {
    title: "交互对话",
    description: "与指定 Agent 进行对话与任务下发。",
    icon: MessageCircle,
  },
  {
    title: "多项目支持",
    description: "并行管理多个项目与多个 Agent。",
    icon: Database,
  },
];

const stack = [
  "Electron + React",
  "Fastify + WebSocket",
  "SQLite (better-sqlite3)",
  "pnpm + electron-builder",
];

export default function CommandDeckPage() {
  return (
    <div className="min-h-screen">
      <Ambient />
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-20 pt-16">
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="space-y-6">
            <Badge className="rounded-full bg-mist text-xs uppercase tracking-[0.3em] text-graphite">
              Active Project
            </Badge>
            <h1 className="font-display text-4xl text-graphite md:text-5xl">
              CommandDeck
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground">
              为多 Agent 协作系统打造的可视化控制台，强调“前店后厂”的协作模型。
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="rounded-full bg-graphite text-xs uppercase tracking-[0.3em] text-white">
                <Link href="/projects">Back to Projects</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-border/60 bg-transparent text-xs uppercase tracking-[0.3em] text-graphite hover:bg-graphite hover:text-white"
              >
                <Link href="/ludic-systems">Ludic Systems</Link>
              </Button>
            </div>
          </div>
          <Card className="surface-glass border-border/60">
            <CardContent className="flex flex-col items-center gap-4 p-8 text-sm text-muted-foreground">
              <Image
                src="/icons/commanddeck-rsvg.svg"
                alt="CommandDeck icon"
                width={160}
                height={160}
                className="h-40 w-40 rounded-[28px] border border-border/60 bg-background/40 p-2"
                priority
              />
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  Visual Identity
                </p>
                <p className="mt-2 text-graphite">
                  Console-inspired rsvg icon system.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        <section className="grid gap-6 md:grid-cols-2 animate-in fade-in slide-in-from-bottom-6 duration-700">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Card key={pillar.title} className="border-border/60 bg-card/80">
                <CardHeader className="flex flex-row items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-2xl border border-border/60 bg-mist text-graphite">
                    <Icon className="size-5" />
                  </span>
                  <CardTitle className="font-display text-2xl text-graphite">
                    {pillar.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {pillar.description}
                </CardContent>
              </Card>
            );
          })}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] animate-in fade-in slide-in-from-bottom-6 duration-700">
          <Card className="surface-glass border-border/60">
            <CardHeader>
              <CardTitle className="font-display text-2xl text-graphite">
                Core Capabilities
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm text-muted-foreground md:grid-cols-2">
              {capabilities.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="space-y-2">
                    <div className="flex items-center gap-2 text-graphite">
                      <Icon className="size-4" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </div>
                    <p>{item.description}</p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
          <Card className="border-border/60 bg-card/80">
            <CardHeader>
              <CardTitle className="font-display text-2xl text-graphite">
                Stack
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              {stack.map((item) => (
                <Badge key={item} variant="outline" className="rounded-full">
                  {item}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
