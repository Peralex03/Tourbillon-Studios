import { NextResponse } from "next/server";

/**
 * Lead submission endpoint.
 * Receives quiz answers + contact info, sends a formatted message
 * to the Tourbillon Telegram bot.
 *
 * Env vars required (set in Vercel + GitHub Secrets):
 *   - TELEGRAM_BOT_TOKEN
 *   - TELEGRAM_CHAT_ID
 */

interface LeadPayload {
  answers: Record<string, string>;
  locale?: string;
  source?: string;
}

export async function POST(req: Request) {
  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const { answers = {}, locale = "fr", source = "quiz" } = body;

  // Basic anti-spam — require email + a project type
  if (!answers.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  if (!answers.name || answers.name.length < 2) {
    return NextResponse.json({ error: "invalid_name" }, { status: 400 });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
    return NextResponse.json({ error: "server_misconfigured" }, { status: 500 });
  }

  // Format the message for Telegram
  const lines = [
    `🚀 Nouveau lead — Tourbillon Studios`,
    ``,
    `Source : ${source} (${locale})`,
    `Date : ${new Date().toLocaleString("fr-CH", { dateStyle: "short", timeStyle: "short" })}`,
    ``,
    `— Contact —`,
    `Nom : ${answers.name}`,
    `Email : ${answers.email}`,
    answers.company ? `Entreprise : ${answers.company}` : null,
    ``,
    `— Projet —`,
    answers.projectType ? `Type : ${answers.projectType}` : null,
    answers.scale ? `Échelle : ${answers.scale}` : null,
    answers.complexity ? `Complexité : ${answers.complexity}` : null,
    answers.speed ? `Délai : ${answers.speed}` : null,
    answers.plan ? `Plan : ${answers.plan}` : null,
    answers.size ? `Équipe : ${answers.size}` : null,
    ``,
    answers.message ? `— Message —\n${answers.message}` : null,
  ].filter(Boolean) as string[];

  const text = lines.join("\n");

  // Miroir vers l'app Tourbillon Leads (best-effort : ne bloque jamais le lead)
  const ingestUrl = process.env.LEADS_INGEST_URL;
  const ingestSecret = process.env.LEADS_INGEST_SECRET;
  if (ingestUrl && ingestSecret) {
    fetch(ingestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-ingest-secret": ingestSecret,
      },
      body: JSON.stringify({ answers, locale, source }),
    }).catch((err) => console.error("Leads-app mirror failed", err));
  }

  try {
    const tgRes = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          disable_web_page_preview: true,
        }),
      }
    );

    if (!tgRes.ok) {
      const errBody = await tgRes.text();
      console.error("Telegram send failed", tgRes.status, errBody);
      return NextResponse.json({ error: "telegram_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Telegram fetch error", err);
    return NextResponse.json({ error: "network_error" }, { status: 502 });
  }
}
