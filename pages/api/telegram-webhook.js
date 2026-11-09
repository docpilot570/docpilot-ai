import { createHash } from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  const adminSecret = process.env.TELEGRAM_LEADS_SECRET;
  const secret = adminSecret ? createHash("sha256").update(adminSecret).digest("hex") : "";
  const supplied = req.headers["x-telegram-bot-api-secret-token"];

  if (!secret || supplied !== secret) {
    return res.status(401).json({ ok: false, message: "Unauthorized" });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    return res.status(500).json({ ok: false, message: "Telegram bot token is not configured" });
  }

  const message = req.body?.message;
  const chatId = message?.chat?.id;
  const command = String(message?.text || "").trim();

  if (!chatId || !command) {
    return res.status(200).json({ ok: true, ignored: true });
  }

  let reply;
  if (command === "/start" || command.startsWith("/start@")) {
    reply = "Привет! Это DocPilot Lead Finder.\n\nБот подключён. Система поиска потенциальных клиентов DocPilot AI находится в настройке.\n\n/help — информация о боте";
  } else if (command === "/help" || command.startsWith("/help@")) {
    reply = "DocPilot Lead Finder предназначен для поиска коммерческих возможностей, оценки потенциальных клиентов и отправки подборок в этот чат. Автоматические сообщения и заявки в LinkedIn отправляться не будут.";
  } else {
    reply = "Пока доступны команды /start и /help.";
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: reply })
    });
    const result = await response.json();

    if (!response.ok || !result.ok) {
      return res.status(502).json({ ok: false, message: "Telegram reply failed" });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(502).json({ ok: false, message: "Could not contact Telegram" });
  }
}
