import { createOpenAI } from "@ai-sdk/openai";
import { createServerFn } from "@tanstack/react-start";
import { streamText, Output } from "ai";
import { z } from "zod";

function getModel() {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new Error("AI is not configured yet.");
  const lovable = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey: key,
    headers: { "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
  });
  return lovable.responses("openai/gpt-6-astra");
}

const reasoning = {
  openai: {
    forceReasoning: true,
    reasoningEffort: "low",
    store: false,
  },
} as const;

const SummaryInput = z.object({
  title: z.string(),
  notes: z.string(),
});

export const summarizeNotes = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => SummaryInput.parse(input))
  .handler(async ({ data }) => {
    const result = streamText({
      model: getModel(),
      output: Output.object({
        schema: z.object({
          overview: z.string(),
          keyPoints: z.array(z.string()),
          importantTerms: z.array(z.object({ term: z.string(), meaning: z.string() })),
        }),
      }),
      system:
        "You are a study coach for school students. Write in plain, simple language. Keep the overview to 2 sentences, give 5 to 7 key points of one sentence each, and 3 to 5 important terms with short meanings.",
      prompt: `Summarise these study notes for the module "${data.title}":\n\n${data.notes}`,
      providerOptions: reasoning,
    });

    return await result.output;
  });

const TutorInput = z.object({
  question: z.string().min(1),
  moduleTitle: z.string(),
  notes: z.string(),
});

export const askTutor = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => TutorInput.parse(input))
  .handler(async ({ data }) => {
    const result = streamText({
      model: getModel(),
      system:
        "You are a friendly AI tutor for school students. Explain simply, step by step, and always include a short everyday example. Keep answers under 180 words. Use short paragraphs, no markdown headings.",
      prompt: `Module: ${data.moduleTitle}\n\nStudy notes for context:\n${data.notes}\n\nStudent question: ${data.question}`,
      providerOptions: reasoning,
    });

    return { answer: await result.text };
  });
