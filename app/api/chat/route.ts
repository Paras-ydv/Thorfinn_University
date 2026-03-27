import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Thorfinn University's AI assistant. Help students with admissions, courses, departments, placements, campus life, and general university queries. Be concise, friendly, and helpful. University facts: Founded 1965, 12000+ students, 94% placement rate, top departments: CSE, ECE, ME, MBA, CSBS. Keep responses under 100 words.`;

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        reply: "AI assistant is not configured. Please add GROQ_API_KEY to your environment variables.",
      });
    }

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.slice(-6).map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
      { role: "user", content: message },
    ];

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages,
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Groq error:", err);
      return NextResponse.json({ reply: "AI service temporarily unavailable. Please try again." });
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "I couldn't process that request.";
    return NextResponse.json({ reply });
  } catch (e) {
    console.error("Chat API error:", e);
    return NextResponse.json({ reply: "Something went wrong. Please try again." }, { status: 500 });
  }
}
