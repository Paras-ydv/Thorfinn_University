import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are the official AI assistant for Thorfinn University. Answer questions about the university concisely and helpfully.

Key facts:
- Founded: 1965 | Campus: 200 acres, Tech City, India
- Students: 12,000+ | Faculty: 500+ | Alumni: 50,000+
- Accreditation: NAAC A++, NBA
- Departments: CSE, ECE, Mechanical, Civil, MBA, CSBS
- Programs: B.Tech (4 yrs, JEE Main), M.Tech (2 yrs, GATE), MBA (2 yrs, CAT/MAT), Ph.D (3-5 yrs)
- Placement rate: 94% | Highest package: 45 LPA | Average: 12.4 LPA
- Top recruiters: Google, Microsoft, Amazon, Goldman Sachs, McKinsey
- Admissions 2026 deadline: March 31, 2026
- Contact: info@thorfinn.edu | +91 80 2345 6789

Keep responses under 80 words. Be factual and professional.`;

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        reply: "The AI assistant is not configured. Please add GROQ_API_KEY to environment variables.",
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
        model: "llama-3.1-8b-instant",
        messages,
        max_tokens: 200,
        temperature: 0.5,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Groq API error:", err);
      return NextResponse.json({ reply: "The assistant is temporarily unavailable. Please try again shortly." });
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content?.trim() || "I could not process that request.";
    return NextResponse.json({ reply });
  } catch (e) {
    console.error("Chat route error:", e);
    return NextResponse.json({ reply: "An error occurred. Please try again." }, { status: 500 });
  }
}
