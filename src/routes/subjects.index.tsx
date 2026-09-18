import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { AppShell, PageHeader, ProgressBar } from "@/components/AppShell";
import { useProgress } from "@/lib/progress";
import { subjects } from "@/lib/study-data";

export const Route = createFileRoute("/subjects/")({
  head: () => ({
    meta: [
      { title: "Subjects — StudyFlow" },
      { name: "description", content: "Browse your subjects and pick a module to study." },
      { property: "og:title", content: "Subjects — StudyFlow" },
      { property: "og:description", content: "Browse your subjects and pick a module to study." },
    ],
  }),
  component: SubjectsPage,
});

function SubjectsPage() {
  const { subjectProgress } = useProgress();

  return (
    <AppShell>
      <PageHeader title="Subjects" subtitle="Choose a subject to see its modules" />
      <div className="space-y-3">
        {subjects.map((s) => {
          const p = subjectProgress(s.id);
          return (
            <Link
              key={s.id}
              to="/subjects/$subjectId"
              params={{ subjectId: s.id }}
              className="glass block rounded-3xl p-4 transition active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-xl">
                  {s.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-base font-extrabold">{s.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{s.blurb}</p>
                </div>
                <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex-1">
                  <ProgressBar percent={p.percent} />
                </div>
                <span className="shrink-0 text-xs font-bold text-primary-deep">
                  {p.done}/{p.total}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </AppShell>
  );
}
