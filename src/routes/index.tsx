import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, MessageCircleQuestion, ArrowRight } from "lucide-react";
import { AppShell, ProgressBar } from "@/components/AppShell";
import { useProgress } from "@/lib/progress";
import { getModule, getSubject, modules, subjects } from "@/lib/study-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StudyFlow — Your study dashboard" },
      {
        name: "description",
        content: "Track subjects, modules, quiz scores and weak topics in one simple student dashboard.",
      },
      { property: "og:title", content: "StudyFlow — Your study dashboard" },
      {
        property: "og:description",
        content: "Track subjects, modules, quiz scores and weak topics in one simple student dashboard.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { profile, lastModuleId, completed, subjectProgress, averageScore, weakTopics } = useProgress();
  const current = getModule(lastModuleId ?? "") ?? modules[0];
  const currentSubject = getSubject(current.subjectId)!;
  const subjectModules = currentSubject.moduleIds;
  const position = subjectModules.indexOf(current.id) + 1;
  const overall = Math.round((completed.length / modules.length) * 100);
  const initials = profile.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const recommended = modules.filter((m) => !completed.includes(m.id)).slice(0, 2);

  return (
    <AppShell>
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-lg font-extrabold text-primary-foreground shadow-soft">
            S
          </div>
          <div className="min-w-0 leading-tight">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Welcome back
            </p>
            <p className="truncate text-base font-extrabold">{profile.name}</p>
          </div>
        </div>
        <Link
          to="/profile"
          className="glass grid size-10 shrink-0 place-items-center rounded-full"
          aria-label="Profile"
        >
          <span className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-[10px] font-bold text-primary-foreground">
            {initials}
          </span>
        </Link>
      </header>

      <section className="glass mt-5 rounded-3xl p-5 shadow-float">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-muted-foreground">
              {currentSubject.name} · {current.title}
            </p>
            <p className="mt-0.5 text-2xl font-extrabold">
              Module {position} of {subjectModules.length}
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary-deep">
            {overall}% done
          </span>
        </div>
        <div className="mt-4">
          <ProgressBar percent={overall} tall />
        </div>
        <div className="mt-4 flex gap-2.5">
          <Link
            to="/study/$moduleId"
            params={{ moduleId: current.id }}
            className="flex-1 rounded-xl bg-primary py-3 text-center text-sm font-bold text-primary-foreground shadow-float transition active:scale-[0.98]"
          >
            Continue Learning
          </Link>
          <Link
            to="/quiz/$moduleId"
            params={{ moduleId: current.id }}
            className="glass-soft rounded-xl px-3 py-3 text-sm font-bold text-primary-deep"
          >
            Take Quiz
          </Link>
        </div>
      </section>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {subjects.map((s) => {
          const p = subjectProgress(s.id);
          return (
            <Link
              key={s.id}
              to="/subjects/$subjectId"
              params={{ subjectId: s.id }}
              className="glass rounded-2xl p-4 transition active:scale-[0.99]"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{s.emoji}</span>
                <p className="text-sm font-bold">{s.name}</p>
              </div>
              <p className="mt-2 text-xs font-medium text-muted-foreground">
                {p.done} of {p.total} modules
              </p>
              <div className="mt-2">
                <ProgressBar percent={p.percent} />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <h2 className="text-base font-extrabold">Recommended for you</h2>
        <Link to="/subjects" className="text-xs font-semibold text-primary-deep">
          See all
        </Link>
      </div>
      <div className="mt-3 space-y-2.5">
        {recommended.map((m, i) => (
          <Link
            key={m.id}
            to="/study/$moduleId"
            params={{ moduleId: m.id }}
            className="glass flex items-center gap-3 rounded-2xl p-3.5"
          >
            <div
              className={`grid size-9 shrink-0 place-items-center rounded-xl ${
                i === 0 ? "bg-primary/10 text-primary-deep" : "bg-accent/10 text-accent"
              }`}
            >
              {i === 0 ? <Sparkles className="size-4" /> : <MessageCircleQuestion className="size-4" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{m.title}</p>
              <p className="truncate text-xs text-muted-foreground">
                {m.topic} · {m.minutes} min read
              </p>
            </div>
            <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
          </Link>
        ))}
      </div>

      <div className="glass mt-5 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/15 p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-bold">Quiz results</p>
          <span className="rounded-full bg-card/70 px-2 py-0.5 text-xs font-bold text-primary-deep">
            {averageScore === null ? "No quizzes yet" : `${averageScore}% avg`}
          </span>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="min-w-0 truncate text-xs font-semibold text-muted-foreground">
            {weakTopics.length ? `Weakest: ${weakTopics[0].topic}` : "Take a quiz to spot weak topics"}
          </span>
          <Link
            to="/quiz"
            className="ml-auto shrink-0 rounded-lg bg-card/80 px-3 py-1.5 text-xs font-bold text-primary-deep shadow-sm"
          >
            Review Mistakes
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
