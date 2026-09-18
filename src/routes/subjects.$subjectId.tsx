import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CheckCircle2, ChevronLeft, Clock } from "lucide-react";
import { AppShell, ProgressBar } from "@/components/AppShell";
import { useProgress } from "@/lib/progress";
import { getSubject, getSubjectModules } from "@/lib/study-data";

export const Route = createFileRoute("/subjects/$subjectId")({
  loader: ({ params }) => {
    const subject = getSubject(params.subjectId);
    if (!subject) throw notFound();
    return { subject };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.subject.name ?? "Subject";
    return {
      meta: [
        { title: `${name} modules — StudyFlow` },
        { name: "description", content: `Study ${name} modules step by step and track your progress.` },
        { property: "og:title", content: `${name} modules — StudyFlow` },
        { property: "og:description", content: `Study ${name} modules step by step and track your progress.` },
      ],
    };
  },
  component: SubjectPage,
});

function SubjectPage() {
  const { subject } = Route.useLoaderData();
  const list = getSubjectModules(subject.id);
  const { completed, subjectProgress, moduleScore } = useProgress();
  const p = subjectProgress(subject.id);

  return (
    <AppShell>
      <Link to="/subjects" className="mb-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-deep">
        <ChevronLeft className="size-4" /> Subjects
      </Link>

      <section className="glass rounded-3xl p-5">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{subject.emoji}</span>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-extrabold">{subject.name}</h1>
            <p className="truncate text-xs text-muted-foreground">{subject.blurb}</p>
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar percent={p.percent} tall />
        </div>
        <p className="mt-2 text-xs font-semibold text-muted-foreground">
          {p.done} of {p.total} modules completed
        </p>
      </section>

      <h2 className="mt-5 text-base font-extrabold">Modules</h2>
      <div className="mt-3 space-y-2.5">
        {list.map((m, i) => {
          const done = completed.includes(m.id);
          const score = moduleScore(m.id);
          return (
            <div key={m.id} className="glass rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <div className="grid size-8 shrink-0 place-items-center rounded-xl bg-primary/10 text-xs font-extrabold text-primary-deep">
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{m.title}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="size-3" /> {m.minutes} min · {m.topic}
                  </p>
                </div>
                {done ? <CheckCircle2 className="size-5 shrink-0 text-success" /> : null}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Link
                  to="/study/$moduleId"
                  params={{ moduleId: m.id }}
                  className="flex-1 rounded-xl bg-primary py-2.5 text-center text-sm font-bold text-primary-foreground shadow-soft active:scale-[0.98]"
                >
                  {done ? "Review Module" : "Start Module"}
                </Link>
                <Link
                  to="/quiz/$moduleId"
                  params={{ moduleId: m.id }}
                  className="glass-soft rounded-xl px-3 py-2.5 text-sm font-bold text-primary-deep"
                >
                  {score ? `${score.score}/${score.total}` : "Quiz"}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
