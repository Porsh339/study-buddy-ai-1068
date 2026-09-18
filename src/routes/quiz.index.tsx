import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ListChecks } from "lucide-react";
import { AppShell, PageHeader, ProgressBar } from "@/components/AppShell";
import { useProgress } from "@/lib/progress";
import { getModule, getSubject, modules } from "@/lib/study-data";

export const Route = createFileRoute("/quiz/")({
  head: () => ({
    meta: [
      { title: "Quizzes — StudyFlow" },
      { name: "description", content: "Test your knowledge with 5-question module quizzes and review weak topics." },
      { property: "og:title", content: "Quizzes — StudyFlow" },
      {
        property: "og:description",
        content: "Test your knowledge with 5-question module quizzes and review weak topics.",
      },
    ],
  }),
  component: QuizIndex,
});

function QuizIndex() {
  const { results, weakTopics, averageScore, moduleScore } = useProgress();

  return (
    <AppShell>
      <PageHeader title="Quiz" subtitle="Five quick questions per module, with instant answers" />

      <section className="glass rounded-3xl bg-gradient-to-br from-primary/12 to-accent/12 p-5">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Average score</p>
            <p className="text-3xl font-extrabold">{averageScore === null ? "—" : `${averageScore}%`}</p>
          </div>
          <div className="grid size-12 place-items-center rounded-2xl bg-card/70 text-primary-deep">
            <ListChecks className="size-5" />
          </div>
        </div>
        <div className="mt-3">
          <ProgressBar percent={averageScore ?? 0} tall />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{results.length} quizzes taken</p>
      </section>

      {weakTopics.length ? (
        <section className="glass mt-4 rounded-3xl p-5">
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-4 text-destructive" />
            <h2 className="text-base font-extrabold">Weak topics</h2>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {weakTopics.map((w) => (
              <span
                key={w.topic}
                className="rounded-full bg-destructive/10 px-3 py-1.5 text-xs font-bold text-destructive"
              >
                {w.topic} · {w.misses}
              </span>
            ))}
          </div>
          {results[0] ? (
            <Link
              to="/quiz/$moduleId"
              params={{ moduleId: results[0].moduleId }}
              search={{ review: true }}
              className="mt-4 block rounded-xl bg-primary py-2.5 text-center text-sm font-bold text-primary-foreground"
            >
              Review Mistakes
            </Link>
          ) : null}
        </section>
      ) : null}

      <h2 className="mt-5 text-base font-extrabold">Module quizzes</h2>
      <div className="mt-3 space-y-2.5">
        {modules.map((m) => {
          const score = moduleScore(m.id);
          return (
            <Link
              key={m.id}
              to="/quiz/$moduleId"
              params={{ moduleId: m.id }}
              className="glass flex items-center gap-3 rounded-2xl p-3.5"
            >
              <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary-deep">
                <ListChecks className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{m.title}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {getSubject(m.subjectId)?.name} · 5 questions
                </p>
              </div>
              <span className="shrink-0 rounded-lg bg-card/80 px-2.5 py-1.5 text-xs font-bold text-primary-deep">
                {score ? `${score.score}/${score.total}` : "Start"}
              </span>
            </Link>
          );
        })}
      </div>

      {results.length ? (
        <>
          <h2 className="mt-5 text-base font-extrabold">Recent results</h2>
          <div className="mt-3 space-y-2">
            {results.slice(0, 5).map((r) => (
              <div key={r.moduleId + r.at} className="glass flex items-center gap-3 rounded-2xl p-3.5">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{getModule(r.moduleId)?.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {new Date(r.at).toLocaleDateString()}
                    {r.wrongTopics.length ? ` · missed ${r.wrongTopics.join(", ")}` : " · perfect score"}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-extrabold text-primary-deep">
                  {r.score}/{r.total}
                </span>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </AppShell>
  );
}
