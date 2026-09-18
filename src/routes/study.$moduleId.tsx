import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ChevronLeft, Loader2, MessageCircleQuestion, Sparkles } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useProgress } from "@/lib/progress";
import { getModule, getSubject, moduleNotesText } from "@/lib/study-data";
import { askTutor, summarizeNotes } from "@/lib/ai.functions";

export const Route = createFileRoute("/study/$moduleId")({
  loader: ({ params }) => {
    const mod = getModule(params.moduleId);
    if (!mod) throw notFound();
    return { mod };
  },
  head: ({ loaderData }) => {
    const title = loaderData?.mod.title ?? "Study module";
    return {
      meta: [
        { title: `${title} — StudyFlow` },
        { name: "description", content: `Study notes, AI summary and tutor help for ${title}.` },
        { property: "og:title", content: `${title} — StudyFlow` },
        { property: "og:description", content: `Study notes, AI summary and tutor help for ${title}.` },
      ],
    };
  },
  component: StudyModulePage,
});

type Summary = {
  overview: string;
  keyPoints: string[];
  importantTerms: { term: string; meaning: string }[];
};

function StudyModulePage() {
  const { mod } = Route.useLoaderData();
  const subject = getSubject(mod.subjectId);
  const { setLastModule, markComplete } = useProgress();
  const [question, setQuestion] = useState("");

  useEffect(() => {
    setLastModule(mod.id);
  }, [mod.id, setLastModule]);

  const summarizeFn = useServerFn(summarizeNotes);
  const tutorFn = useServerFn(askTutor);

  const summary = useMutation<Summary>({
    mutationFn: () =>
      summarizeFn({ data: { title: mod.title, notes: moduleNotesText(mod) } }) as Promise<Summary>,
  });

  const tutor = useMutation<{ answer: string }, Error, string>({
    mutationFn: (q: string) =>
      tutorFn({
        data: { question: q, moduleTitle: mod.title, notes: moduleNotesText(mod) },
      }) as Promise<{ answer: string }>,
  });

  return (
    <AppShell>
      <Link
        to="/subjects/$subjectId"
        params={{ subjectId: mod.subjectId }}
        className="mb-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-deep"
      >
        <ChevronLeft className="size-4" /> {subject?.name}
      </Link>

      <header className="glass rounded-3xl p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {mod.topic} · {mod.minutes} min
        </p>
        <h1 className="mt-1 text-2xl font-extrabold leading-tight">{mod.title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{mod.intro}</p>
        <div className="mt-4 flex gap-2.5">
          <button
            onClick={() => summary.mutate()}
            disabled={summary.isPending}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground shadow-float active:scale-[0.98] disabled:opacity-70"
          >
            {summary.isPending ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
            Summarize Notes
          </button>
          <a
            href="#tutor"
            className="glass-soft flex items-center gap-1.5 rounded-xl px-3 py-3 text-sm font-bold text-primary-deep"
          >
            <MessageCircleQuestion className="size-4" /> Ask AI Tutor
          </a>
        </div>
      </header>

      {summary.isError ? (
        <p className="mt-3 rounded-2xl bg-destructive/10 p-3 text-sm font-semibold text-destructive">
          The summary couldn't be created right now. Please try again in a moment.
        </p>
      ) : null}

      {summary.data ? (
        <section className="glass mt-4 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 p-5">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary-deep" />
            <h2 className="text-sm font-extrabold">AI Summary</h2>
          </div>
          <p className="mt-2 text-sm leading-relaxed">{summary.data.overview}</p>
          <p className="mt-4 text-xs font-bold uppercase tracking-wide text-muted-foreground">Key points</p>
          <ul className="mt-2 space-y-1.5">
            {summary.data.keyPoints.map((k, i) => (
              <li key={i} className="flex gap-2 text-sm leading-snug">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {k}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Important terms
          </p>
          <div className="mt-2 space-y-2">
            {summary.data.importantTerms.map((t, i) => (
              <div key={i} className="rounded-2xl bg-card/70 p-3">
                <p className="text-sm font-bold">{t.term}</p>
                <p className="text-xs text-muted-foreground">{t.meaning}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-5 space-y-3">
        {mod.sections.map((s) => (
          <article key={s.heading} className="glass rounded-3xl p-5">
            <h2 className="text-base font-extrabold">{s.heading}</h2>
            <p className="mt-2 text-[15px] leading-7 text-foreground/90">{s.body}</p>
          </article>
        ))}
      </section>

      <section className="glass mt-4 rounded-3xl p-5">
        <h2 className="text-base font-extrabold">Key terms</h2>
        <div className="mt-3 space-y-2">
          {mod.keyTerms.map((t) => (
            <div key={t.term} className="rounded-2xl bg-card/70 p-3">
              <p className="text-sm font-bold">{t.term}</p>
              <p className="text-xs text-muted-foreground">{t.meaning}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="tutor" className="glass mt-4 rounded-3xl p-5">
        <div className="flex items-center gap-2">
          <MessageCircleQuestion className="size-4 text-accent" />
          <h2 className="text-base font-extrabold">Ask AI Tutor</h2>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Stuck on something? Ask in your own words and get a simple explanation with an example.
        </p>
        <form
          className="mt-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (question.trim()) tutor.mutate(question.trim());
          }}
        >
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={3}
            placeholder={`e.g. Explain ${mod.topic.toLowerCase()} in simple words`}
            className="w-full resize-none rounded-2xl border border-border bg-card/80 p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="submit"
            disabled={tutor.isPending || !question.trim()}
            className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl bg-accent py-3 text-sm font-bold text-accent-foreground active:scale-[0.98] disabled:opacity-60"
          >
            {tutor.isPending ? <Loader2 className="size-4 animate-spin" /> : null}
            Ask AI Tutor
          </button>
        </form>
        {tutor.isError ? (
          <p className="mt-3 text-sm font-semibold text-destructive">
            The tutor couldn't answer right now. Please try again in a moment.
          </p>
        ) : null}
        {tutor.data ? (
          <div className="mt-3 whitespace-pre-line rounded-2xl bg-card/80 p-4 text-sm leading-relaxed">
            {tutor.data.answer}
          </div>
        ) : null}
      </section>

      <div className="mt-5 flex gap-2.5">
        <Link
          to="/quiz/$moduleId"
          params={{ moduleId: mod.id }}
          onClick={() => markComplete(mod.id)}
          className="flex-1 rounded-xl bg-primary py-3 text-center text-sm font-bold text-primary-foreground shadow-float active:scale-[0.98]"
        >
          Take Quiz
        </Link>
        <button
          onClick={() => markComplete(mod.id)}
          className="glass-soft rounded-xl px-4 py-3 text-sm font-bold text-primary-deep"
        >
          Mark done
        </button>
      </div>
    </AppShell>
  );
}
