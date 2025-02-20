import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("✅ Received Request:", body); // Log the request data

    const { genre, topic, length } = body;

    if (!process.env.OPENAI_API_KEY) {
      console.error("❌ Missing OpenAI API Key");
      return NextResponse.json({ error: "Missing OpenAI API Key" }, { status: 500 });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    console.log("🔄 Sending request to OpenAI...");
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an expert storyteller. Generate a short, engaging story with full characters and immersive settings." },
        { role: "user", content: `Write a ${length}-word ${genre} story about ${topic}. Make it engaging and immersive.` }
      ],
      max_tokens: length === "short" ? 500 : length === "medium" ? 1000 : 2000,
    });

    console.log("✅ OpenAI Response:", response);

    if (!response.choices || response.choices.length === 0) {
      console.error("❌ No story generated.");
      return NextResponse.json({ error: "No story generated." }, { status: 500 });
    }

    return NextResponse.json({ story: response.choices[0]?.message?.content || "Story generation failed." });

  } catch (error) {
    console.error("❌ Error generating story:", error);
    return NextResponse.json({ error: `Internal Server Error: ${(error as Error).message}` }, { status: 500 });
  }
}
