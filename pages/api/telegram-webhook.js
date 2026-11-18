import { createHash } from "crypto";
import { buildLeadResults, getSearchThemes, getThemeQuery } from "../../lib/serper-lead-finder";

function formatLeadResults(results, theme) {
  if (!results.length) {
    return "По запросу " + theme.toUpperCase() + " результатов с подходящими ссылками не найдено. Попробуйте позже или другой запрос.";
  }

  const lines = [
    "DocPilot Lead Finder — результаты поиска",
    "Направление: " + theme.toUpperCase(),
    "Найдено страниц: " + results.length,
    ""
  ];

  results.slice(0, 5).forEach((lead, index) => {
    lines.push(
      (index + 1) + ". " + lead.title,
      "Приоритет: " + lead.priority + " (" + lead.score + "/10)",
      "Возможная потребность: " + lead.suggestedProducts.join(", "),
      lead.signals.length ? "Сигналы: " + lead.signals.join("; ") : "Сигналы: пока не выявлены",
      lead.snippet ? lead.snippet.slice(0, 420) : "",
      lead.url,
      ""
    );
  });

  return lines.join("\n").slice(0, 3900);
}

async function sendTelegram(token, chatId, text) {
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true })
  });
  const result = await response.json();
  if (!response.ok || !result.ok) throw new Error("Telegram sendMessage failed");
}

async function runSearch(theme) {
  const apiKey = process.env.SERPER_API_KEY;
  if (!apiKey) throw new Error("SERPER_NOT_CONFIGURED");

  const query = getThemeQuery(theme);
  const response = await fetch("https://google.serper.dev/search", {
    method: "POST",
    headers: { "X-API-KEY": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({ q: query, gl: "gb", hl: "en", num: 10 })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail = String(data?.message || data?.error || data?.detail || "").slice(0, 180);
    const safeDetail = detail.replace(new RegExp(apiKey.replace(/[.*+?^${}()|[\\]\\]/g, "\\\\  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error("SERPER_HTTP_" + response.status);"), "g"), "[redacted]");
    const error = new Error("SERPER_HTTP_" + response.status);
    error.publicDetail = safeDetail;
    throw error;
  }

  return buildLeadResults(data.organic, theme);
}

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
  const command = String(message?.text || "").trim().split(/\s+/)[0].split("@")[0].toLowerCase();

  if (!chatId || !command) {
    return res.status(200).json({ ok: true, ignored: true });
  }

  // Restrict paid search requests to the configured owner chat.
  const ownerChatId = process.env.TELEGRAM_CHAT_ID;
  if (["/nda", "/ir35", "/sow", "/search"].includes(command) &&
      (!ownerChatId || String(chatId) !== String(ownerChatId))) {
    return res.status(200).json({ ok: true, ignored: true });
  }

  let reply;
  if (command === "/start") {
    reply = "Привет! Это DocPilot Lead Finder.\n\nБот подключён. Для тестового поиска используй:\n/nda — NDA\n/ir35 — IR35\n/sow — SOW\n/help — помощь";
  } else if (command === "/help") {
    reply = "Команды поиска по компаниям Великобритании:\n/nda — поиск по NDA и конфиденциальности\n/ir35 — поиск по IR35 и подрядчикам\n/sow — поиск по Statement of Work\n\nПоиск выполняется по публичным веб-источникам. Бот не отправляет сообщения и заявки в LinkedIn.";
  } else {
    const theme = command === "/nda" ? "nda" : command === "/ir35" ? "ir35" : command === "/sow" ? "sow" : null;
    if (!theme) {
      reply = "Неизвестная команда. Используй /help.";
    } else if (!process.env.SERPER_API_KEY) {
      reply = "Поиск пока не настроен: в окружении сервера отсутствует SERPER_API_KEY.";
    } else {
      try {
        await sendTelegram(token, chatId, "Ищу потенциальные коммерческие возможности в Великобритании по направлению " + theme.toUpperCase() + "…");
        const results = await runSearch(theme);
        reply = formatLeadResults(results, theme);
      } catch (error) {
        console.error("Lead search failed:", error?.message || "unknown");
        const errorCode = String(error?.message || "UNKNOWN_ERROR");
        console.error("Lead search diagnostic:", errorCode);
        if (errorCode === "SERPER_NOT_CONFIGURED") {
          reply = "Поиск не настроен: отсутствует SERPER_API_KEY.";
        } else if (/^SERPER_HTTP_\d{3}$/.test(errorCode)) {
          reply = "Serper отклонил запрос (HTTP " + errorCode.slice(-3) + ")." + (error?.publicDetail ? "\\nОтвет Serper: " + error.publicDetail : "") + "\\nКлюч доступа бот не показывает.";
        } else {
          reply = "Не удалось связаться с Serper или обработать ответ (" + errorCode.slice(0, 80) + "). Ключ доступа не выводится. Пришлите мне этот текст ошибки.";
        }
      }
    }
  }

  try {
    await sendTelegram(token, chatId, reply);
    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(502).json({ ok: false, message: "Telegram reply failed" });
  }
}
