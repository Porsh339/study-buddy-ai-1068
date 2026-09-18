import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpenText, CheckCircle2 } from "lucide-react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { useProgress } from "@/lib/progress";
import { getModule, getSubject, modules } from "@/lib/study-data";

export const Route = createFileRoute("/study/")({
  head: () => ({
    meta: [
      { title: "Study — StudyFlow" },
      { name: "description", content: "Read clear study notes, summarise them and ask the AI tutor." },
      { property: "og:title", content: "Study — StudyFlow" },
      { property: "og:description", content: "Read clear study notes, summarise them and ask the AI tutor." },
    ],
  }),
  component: StudyIndex,
});

function StudyIndex() {
  const { lastModuleId, completed } = useProgress();
  const current = getModule(lastModuleId ?? "") ?? modules[0];

  return (
    <AppShell>
      <PageHeader title="Study" subtitle="Open a module to read notes, summarise and ask your tutor" />

      <Link
        to="/study/$moduleId"
        params={{ moduleId: current.id }}
        className="glass block rounded-3xl p-5 shadow-float"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Pick up where you left off
        </p>
        <p className="mt-1 text-lg font-extrabold">{current.title}</p>
        <p className="text-xs text-muted-foreground">
          {getSubject(current.subjectId)?.name} · {current.minutes} min
        </p>
        <span className="mt-4 block rounded-xl bg-primary py-2.5 text-center text-sm font-bold text-primary-foreground">
          Continue Learning
        </span>
      </Link>

      <h2 className="mt-5 text-base font-extrabold">All modules</h2>
      <div className="mt-3 space-y-2.5">
        {modules.map((m) => (
          <Link
            key={m.id}
            to="/study/$moduleId"
            params={{ moduleId: m.id }}
            className="glass flex items-center gap-3 rounded-2xl p-3.5"
          >
            <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary-deep">
              <BookOpenText className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{m.title}</p>
              <p className="truncate text-xs text-muted-foreground">
                {getSubject(m.subjectId)?.name} · {m.minutes} min
              </p>
            </div>
            {completed.includes(m.id) ? (
              <CheckCircle2 className="size-5 shrink-0 text-success" />
            ) : null}
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
