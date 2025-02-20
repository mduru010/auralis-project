import { NextResponse } from "next/server";
import textToSpeech, { protos } from "@google-cloud/text-to-speech";
import fs from "fs";
import util from "util";
import path from "path";
import { GoogleAuth } from "google-auth-library";

// Load Google Cloud credentials from env
const credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS
  ? JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS)
  : null;

// Initialize Google Cloud TTS Client
const auth = new GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/cloud-platform"],
});

const client = new textToSpeech.TextToSpeechClient({ auth });

export async function POST(req: Request) {
  try {
    console.log("✅ Received audio request");

    const { text } = await req.json();
    if (!text) {
      console.error("❌ Missing text input");
      return NextResponse.json({ error: "Missing text input" }, { status: 400 });
    }

    console.log("🔄 Sending text to Google Cloud TTS...");
    const request = {
      input: { text },
      voice: { languageCode: "en-US", ssmlGender: protos.google.cloud.texttospeech.v1.SsmlVoiceGender.FEMALE },
      audioConfig: { audioEncoding: protos.google.cloud.texttospeech.v1.AudioEncoding.MP3 },
    };

    const response = await client.synthesizeSpeech(request);

    // Ensure the 'public/audio/' folder exists
    const audioDir = path.join(process.cwd(), "public/audio");
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true });
      console.log("📁 Created 'public/audio/' directory");
    }

    // Save the audio file
    const filePath = path.join(audioDir, "story.mp3");
    const writeFile = util.promisify(fs.writeFile);
    if (response[0].audioContent) {
      await writeFile(filePath, response[0].audioContent, "binary");
    } else {
      throw new Error("Audio content is undefined");
    }

    console.log("✅ Audio file generated successfully!");

    return NextResponse.json({ audioUrl: "/audio/story.mp3" });

  } catch (error) {
    console.error("❌ Error generating audio:", error);
    return NextResponse.json({ error: `Internal Server Error: ${(error as Error).message}` }, { status: 500 });
  }
}
