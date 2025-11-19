import { convertToModelMessages, streamText, UIMessage } from 'ai';

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: "deepseek/deepseek-v3.2-exp",
    system: "You are an expert software engineer. Provide clear, concise, and helpful responses.",
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
