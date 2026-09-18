import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ChevronLeft, RotateCcw, X } from "lucide-react";
import { AppShell, ProgressBar } from "@/components/AppShell";
import { useProgress } from "@/lib/progress";
import { getModule } from "@/lib/study-data";

export const Route = createFileRoute("/quiz/$moduleId")({
  validateSearch: (search: Record<string, unknown>) => ({
    review: search.review === true || search.review === "true" ? true : undefined,
  }),
  loader: ({ params }) => {
    const mod = getModule(params.moduleId);
    if (!mod) throw notFound();
    return { mod };
  },
  head: ({ loaderData }) => {
    const title = loaderData?.mod.title ?? "Quiz";
    return {
      meta: [
        { title: `${title} quiz — StudyFlow` },
        { name: "description", content: `Five questions on ${title} with instant results and explanations.` },
        { property: "og:title", content: `${title} quiz — StudyFlow` },
        {
          property: "og:description",
          content: `Five questions on ${title} with instant results and explanations.`,
        },
      ],
    };
  },
  component: QuizPage,
});

function QuizPage() {
  const { mod } = Route.useLoaderData();
  const { review } = Route.useSearch();
  const { recordResult, moduleScore } = useProgress();
  const previous = moduleScore(mod.id);

  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(Boolean(review && previous));

  const question = mod.quiz[index];
  const total = mod.quiz.length;

  function next() {
    const chosen = [...answers, picked!];
    setAnswers(chosen);
    setPicked(null);
    if (index + 1 < total) {
      setIndex(index + 1);
      return;
    }
    const wrong = mod.quiz.filter((q, i) => chosen[i] !== q.answerIndex);
    recordResult({
      moduleId: mod.id,
      score: total - wrong.length,
      total,
      wrongTopics: [...new Set(wrong.map((q) => q.topic))],
      wrongQuestionIds: wrong.map((q) => q.id),
      at: Date.now(),
    });
    setFinished(true);
  }

  function restart() {
    setIndex(0);
    setPicked(null);
    setAnswers([]);
    setFinished(false);
  }

  if (finished) {
    const result = answers.length
      ? {
          score: mod.quiz.filter((q, i) => answers[i] === q.answerIndex).length,
          wrongIds: mod.quiz.filter((q, i) => answers[i] !== q.answerIndex).map((q) => q.id),
        }
      : { score: previous?.score ?? 0, wrongIds: previous?.wrongQuestionIds ?? [] };
    const percent = Math.round((result.score / total) * 100);
    const missed = mod.quiz.filter((q) => result.wrongIds.includes(q.id));

    return (
      <AppShell>
        <Link to="/quiz" className="mb-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-deep">
          <ChevronLeft className="size-4" /> Quizzes
        </Link>

        <section className="glass rounded-3xl bg-gradient-to-br from-primary/12 to-accent/12 p-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {mod.title}
          </p>
          <p className="mt-2 text-5xl font-extrabold">
            {result.score}
            <span className="text-2xl text-muted-foreground">/{total}</span>
          </p>
          <p className="mt-1 text-sm font-semibold text-primary-deep">
            {percent >= 80 ? "Great work!" : percent >= 50 ? "Solid effort — keep going" : "Let's review this one"}
          </p>
          <div className="mt-4">
            <ProgressBar percent={percent} tall />
          </div>
        </section>

        <h2 className="mt-5 text-base font-extrabold">
          {missed.length ? "Review mistakes" : "All answers correct"}
        </h2>
        <div className="mt-3 space-y-2.5">
          {missed.map((q) => (
            <div key={q.id} className="glass rounded-2xl p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-destructive">{q.topic}</p>
              <p className="mt-1 text-sm font-bold">{q.question}</p>
              <p className="mt-2 text-sm text-success">Correct: {q.options[q.answerIndex]}</p>
              <p className="mt-1 text-sm text-muted-foreground">{q.explanation}</p>
            </div>
          ))}
          {!missed.length ? (
            <div className="glass rounded-2xl p-4 text-sm text-muted-foreground">
              Nothing to review here — try the next module.
            </div>
          ) : null}
        </div>

        <div className="mt-5 flex gap-2.5">
          <button
            onClick={restart}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground shadow-float active:scale-[0.98]"
          >
            <RotateCcw className="size-4" /> Retake Quiz
          </button>
          <Link
            to="/study/$moduleId"
            params={{ moduleId: mod.id }}
            className="glass-soft rounded-xl px-4 py-3 text-sm font-bold text-primary-deep"
          >
            Back to notes
          </Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <Link to="/quiz" className="mb-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-deep">
        <ChevronLeft className="size-4" /> Quizzes
      </Link>

      <div className="glass rounded-3xl p-5">
        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <span className="truncate">{mod.title}</span>
          <span className="shrink-0">
            Question {index + 1} of {total}
          </span>
        </div>
        <div className="mt-3">
          <ProgressBar percent={((index + (picked !== null ? 1 : 0)) / total) * 100} tall />
        </div>
        <h1 className="mt-4 text-lg font-extrabold leading-snug">{question.question}</h1>

        <div className="mt-4 space-y-2.5">
          {question.options.map((opt, i) => {
            const isPicked = picked === i;
            const isCorrect = i === question.answerIndex;
            const state =
              picked === null
                ? "idle"
                : isCorrect
                  ? "correct"
                  : isPicked
                    ? "wrong"
                    : "idle";
            return (
              <button
                key={i}
                disabled={picked !== null}
                onClick={() => setPicked(i)}
                className={`flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left text-sm font-semibold transition active:scale-[0.99] ${
                  state === "correct"
                    ? "border-success bg-success/10 text-success"
                    : state === "wrong"
                      ? "border-destructive bg-destructive/10 text-destructive"
                      : "border-border bg-card/70"
                }`}
              >
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/10 text-[11px] font-extrabold text-primary-deep">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="min-w-0 flex-1">{opt}</span>
                {state === "correct" ? <Check className="size-4 shrink-0" /> : null}
                {state === "wrong" ? <X className="size-4 shrink-0" /> : null}
              </button>
            );
          })}
        </div>

        {picked !== null ? (
          <div className="mt-4 rounded-2xl bg-card/80 p-4">
            <p className="text-sm font-bold">
              {picked === question.answerIndex ? "Correct!" : "Not quite."}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{question.explanation}</p>
          </div>
        ) : null}

        <button
          disabled={picked === null}
          onClick={next}
          className="mt-4 w-full rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground shadow-float active:scale-[0.98] disabled:opacity-50"
        >
          {index + 1 === total ? "See Results" : "Next question"}
        </button>
      </div>
    </AppShell>
  );
}
