function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

export default async function handler(req, res) {
  const adminSecret = process.env.TELEGRAM_LEADS_SECRET;
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const webhookSecret =
    process.env.TELEGRAM_WEBHOOK_SECRET || process.env.TELEGRAM_LEADS_SECRET;
  const webhookUrl = "https://docpilot-ai-lime.vercel.app/api/telegram-webhook";

  if (req.method === "GET") {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).send(`<!doctype html>
<html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Подключение DocPilot Telegram</title>
<body style="font:16px system-ui;max-width:520px;margin:40px auto;padding:0 18px">
<h2>Подключение Telegram-бота</h2>
<p>Введите текущее значение <b>TELEGRAM_LEADS_SECRET</b> из Environment Variables проекта Vercel. Секрет не отображается на странице и не отправляется в чат.</p>
<form method="post">
<input type="password" name="secret" autocomplete="off" required style="box-sizing:border-box;width:100%;padding:12px;margin:12px 0" placeholder="TELEGRAM_LEADS_SECRET">
<button style="padding:12px 18px">Подключить Telegram</button>
</form></body></html>`);
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  const supplied = String(req.body?.secret || "");
  if (!adminSecret || supplied !== adminSecret) {
    return res.status(401).send("Секрет не совпадает с TELEGRAM_LEADS_SECRET в текущем Deployment Vercel. Проверьте переменную и создайте новый Deployment.");
  }

  if (!botToken || !webhookSecret) {
    return res.status(500).send("Не настроены TELEGRAM_BOT_TOKEN или секрет webhook в Vercel.");
  }

  if (!/^[A-Za-z0-9_-]{1,256}$/.test(webhookSecret)) {
    return res.status(400).send("Формат TELEGRAM webhook secret недопустим. Разрешены только латинские буквы, цифры, дефис и подчёркивание; длина от 1 до 256 символов.");
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/setWebhook`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: webhookUrl,
        secret_token: webhookSecret,
        allowed_updates: ["message"],
        drop_pending_updates: true
      })
    });

    const result = await response.json();

    if (!response.ok || !result.ok) {
      const description = result?.description || `HTTP ${response.status}`;
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Cache-Control", "no-store");
      return res.status(502).send(`<!doctype html><html lang="ru"><meta charset="utf-8"><body style="font:16px system-ui;max-width:520px;margin:40px auto;padding:0 18px"><h2>Telegram отклонил подключение</h2><p>Причина: ${escapeHtml(description)}</p><p>Токен и секреты не отображаются. Передайте мне только этот текст ошибки.</p></body></html>`);
    }

    const infoResponse = await fetch(`https://api.telegram.org/bot${botToken}/getWebhookInfo`);
    const info = await infoResponse.json();

    if (!infoResponse.ok || !info.ok || info.result?.url !== webhookUrl) {
      return res.status(502).send("Telegram принял setWebhook, но проверка getWebhookInfo не подтвердила нужный адрес webhook.");
    }

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).send("<!doctype html><html lang=\"ru\"><meta charset=\"utf-8\"><body style=\"font:16px system-ui;max-width:520px;margin:40px auto;padding:0 18px\"><h2>Telegram подключён</h2><p>Telegram подтвердил адрес webhook. Откройте бота и отправьте /start.</p></body></html>");
  } catch (error) {
    res.setHeader("Cache-Control", "no-store");
    return res.status(502).send("Не удалось связаться с Telegram API. Проверьте доступность Telegram и попробуйте ещё раз.");
  }
}
