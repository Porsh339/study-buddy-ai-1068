import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Pencil, RotateCcw } from "lucide-react";
import { AppShell, ProgressBar, PageHeader } from "@/components/AppShell";
import { useProgress } from "@/lib/progress";
import { subjects } from "@/lib/study-data";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your Profile — StudyFlow" },
      {
        name: "description",
        content: "Manage your name, subjects, study goals and settings in StudyFlow.",
      },
      { property: "og:title", content: "Your Profile — StudyFlow" },
      {
        property: "og:description",
        content: "Manage your name, subjects, study goals and settings in StudyFlow.",
      },
    ],
  }),
  component: ProfilePage,
});

const goalOptions = [
  "Pass end-of-term exams with 80%+",
  "Study a little every day",
  "Catch up on missed topics",
  "Prepare for a big test",
];

const minuteOptions = [15, 30, 45, 60];

function ProfilePage() {
  const {
    profile,
    updateProfile,
    resetProgress,
    completed,
    averageScore,
    results,
    subjectProgress,
  } = useProgress();

  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState(profile.name);

  const initials = profile.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const toggleSubject = (id: string) => {
    const active = profile.activeSubjects.includes(id);
    if (active && profile.activeSubjects.length === 1) return; // keep at least one
    updateProfile({
      activeSubjects: active
        ? profile.activeSubjects.filter((s) => s !== id)
        : [...profile.activeSubjects, id],
    });
  };

  const saveName = () => {
    const clean = nameDraft.trim();
    if (clean) updateProfile({ name: clean });
    setEditingName(false);
  };

  return (
    <AppShell>
      <PageHeader title="Profile" subtitle="Manage your details, subjects and study goals" />

      <section className="glass flex items-center gap-4 rounded-3xl p-5 shadow-float">
        <span className="grid size-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-lg font-extrabold text-primary-foreground">
          {initials}
        </span>
        <div className="min-w-0 flex-1">
          {editingName ? (
            <div className="flex items-center gap-2">
              <input
                value={nameDraft}
                onChange={(e) => setNameDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveName()}
                autoFocus
                className="glass-soft min-w-0 flex-1 rounded-xl px-3 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="Your name"
              />
              <button
                onClick={saveName}
                className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground"
                aria-label="Save name"
              >
                <Check className="size-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <p className="truncate text-lg font-extrabold">{profile.name}</p>
              <button
                onClick={() => {
                  setNameDraft(profile.name);
                  setEditingName(true);
                }}
                className="text-muted-foreground transition hover:text-primary-deep"
                aria-label="Edit name"
              >
                <Pencil className="size-4" />
              </button>
            </div>
          )}
          <p className="mt-1 text-xs font-medium text-muted-foreground">
            {completed.length} modules done ·{" "}
            {averageScore === null ? "no quizzes yet" : `${averageScore}% avg quiz score`}
          </p>
        </div>
      </section>

      <h2 className="mt-6 text-base font-extrabold">My subjects</h2>
      <p className="mt-0.5 text-xs text-muted-foreground">
        Choose which subjects show up in your study plan.
      </p>
      <div className="mt-3 space-y-2.5">
        {subjects.map((s) => {
          const active = profile.activeSubjects.includes(s.id);
          const p = subjectProgress(s.id);
          return (
            <button
              key={s.id}
              onClick={() => toggleSubject(s.id)}
              className={`glass flex w-full items-center gap-3 rounded-2xl p-3.5 text-left transition active:scale-[0.99] ${
                active ? "" : "opacity-55"
              }`}
            >
              <span className="text-xl">{s.emoji}</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{s.name}</p>
                <div className="mt-1.5">
                  <ProgressBar percent={p.percent} />
                </div>
              </div>
              <span
                className={`grid size-6 shrink-0 place-items-center rounded-full border-2 transition ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground/40 text-transparent"
                }`}
              >
                <Check className="size-3.5" strokeWidth={3} />
              </span>
            </button>
          );
        })}
      </div>

      <h2 className="mt-6 text-base font-extrabold">Study goal</h2>
      <div className="mt-3 grid gap-2">
        {goalOptions.map((g) => (
          <button
            key={g}
            onClick={() => updateProfile({ goal: g })}
            className={`flex items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-semibold transition active:scale-[0.99] ${
              profile.goal === g
                ? "bg-primary text-primary-foreground shadow-float"
                : "glass"
            }`}
          >
            {g}
            {profile.goal === g && <Check className="size-4 shrink-0" />}
          </button>
        ))}
      </div>

      <h2 className="mt-6 text-base font-extrabold">Daily study time</h2>
      <p className="mt-0.5 text-xs text-muted-foreground">
        How many minutes a day do you want to study?
      </p>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {minuteOptions.map((m) => (
          <button
            key={m}
            onClick={() => updateProfile({ dailyMinutes: m })}
            className={`rounded-2xl py-3 text-sm font-bold transition active:scale-[0.97] ${
              profile.dailyMinutes === m
                ? "bg-primary text-primary-foreground shadow-float"
                : "glass"
            }`}
          >
            {m}m
          </button>
        ))}
      </div>

      <h2 className="mt-6 text-base font-extrabold">Settings</h2>
      <div className="glass mt-3 divide-y divide-border/60 rounded-2xl">
        <div className="flex items-center justify-between px-4 py-3.5">
          <div>
            <p className="text-sm font-bold">Quiz attempts</p>
            <p className="text-xs text-muted-foreground">{results.length} quizzes taken</p>
          </div>
          <Link
            to="/quiz"
            className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary-deep"
          >
            Review
          </Link>
        </div>
        <div className="flex items-center justify-between px-4 py-3.5">
          <div>
            <p className="text-sm font-bold">Reset progress</p>
            <p className="text-xs text-muted-foreground">
              Clears modules and quiz scores (keeps your profile)
            </p>
          </div>
          <button
            onClick={() => {
              if (window.confirm("Reset all study progress? Your profile details stay saved.")) {
                resetProgress();
              }
            }}
            className="flex items-center gap-1.5 rounded-lg bg-destructive/10 px-3 py-1.5 text-xs font-bold text-destructive"
          >
            <RotateCcw className="size-3.5" />
            Reset
          </button>
        </div>
      </div>
    </AppShell>
  );
}
