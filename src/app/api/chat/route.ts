import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  const { message, lessonTitle, lessonDay } = await req.json() as {
    message: string;
    lessonTitle: string;
    lessonDay: number;
  };

  if (!message?.trim()) {
    return new Response('Message required', { status: 400 });
  }

  const system = `You are an AI practice partner embedded in AI Compass — a 7-day AI literacy course for small business owners.

The user is currently on Day ${lessonDay}: "${lessonTitle}".

Your role:
- Help them practice and apply what they just learned in this lesson
- Give concise, practical responses — you're a sparring partner, not a lecturer
- If their prompt is vague, show them how to make it more specific
- Celebrate good prompting technique naturally, not effusively
- Keep responses under 200 words unless they ask for something longer
- You're here to make their business work better with AI

Tone: direct, grounded, like a knowledgeable colleague — not a chatbot.`;

  const stream = await client.messages.stream({
    model: 'claude-opus-4-6',
    max_tokens: 1024,
    thinking: { type: 'adaptive' },
    system,
    messages: [{ role: 'user', content: message }],
  });

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
      'Cache-Control': 'no-cache',
    },
  });
}
