import OpenAI from "openai";
import "dotenv/config";
import { buildRoastPrompt } from "./prompt.js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateRoast(resumeText: string): Promise<string> {
  const prompt = buildRoastPrompt(resumeText);

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 1.0,
    max_tokens: 600,
  });

  const roastScript = response.choices[0]?.message?.content?.trim();
  if (!roastScript) {
    throw new Error("GPT-4o returned an empty roast script.");
  }

  return roastScript;
}
