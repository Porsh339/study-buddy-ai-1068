import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, GraduationCap, Home, ListChecks, User } from "lucide-react";
import type { ReactNode } from "react";

const tabs = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/subjects", label: "Subjects", icon: BookOpen, exact: false },
  { to: "/study", label: "Study", icon: GraduationCap, exact: false },
  { to: "/quiz", label: "Quiz", icon: ListChecks, exact: false },
  { to: "/profile", label: "Profile", icon: User, exact: false },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background font-sans text-foreground">
      <div aria-hidden className="pointer-events-none fixed inset-0">
        <div className="blob-a absolute -left-16 -top-10 size-64 rounded-full bg-primary/35 blur-3xl" />
        <div className="blob-b absolute -right-10 top-24 size-60 rounded-full bg-accent/35 blur-3xl" />
        <div className="blob-c absolute bottom-24 left-1/3 size-56 rounded-full bg-highlight/30 blur-3xl" />
        <div className="absolute inset-0 bg-card/20" />
      </div>

      <div className="relative z-10 mx-auto min-h-screen w-full max-w-[520px] px-4 pb-32 pt-5">
        {children}
      </div>

      <nav className="fixed bottom-0 left-1/2 z-20 w-full max-w-[520px] -translate-x-1/2 px-4 pb-4">
        <div className="glass flex items-center justify-between rounded-[26px] px-2 py-2 shadow-float">
          {tabs.map((tab) => {
            const active = tab.exact ? pathname === tab.to : pathname.startsWith(tab.to);
            const Icon = tab.icon;
            return (
              <Link
                key={tab.to}
                to={tab.to}
                className={`flex flex-1 flex-col items-center gap-1 rounded-2xl py-1.5 transition ${
                  active ? "text-primary-deep" : "text-muted-foreground"
                }`}
              >
                <Icon className={`size-5 ${active ? "" : "opacity-70"}`} strokeWidth={active ? 2.4 : 1.9} />
                <span className={`text-[10px] ${active ? "font-bold" : "font-semibold"}`}>{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export function ProgressBar({ percent, tall }: { percent: number; tall?: boolean }) {
  return (
    <div className={`w-full overflow-hidden rounded-full bg-mist ${tall ? "h-2.5" : "h-1.5"}`}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-700"
        style={{ width: `${Math.max(2, Math.min(100, percent))}%` }}
      />
    </div>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="mb-4">
      <h1 className="text-2xl font-extrabold tracking-tight">{title}</h1>
      {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
    </header>
  );
}
