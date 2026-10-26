export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      success: false,
      message: "Разрешён только POST-запрос.",
    });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const secret = process.env.TELEGRAM_LEADS_SECRET;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const suppliedSecret = req.headers["x-leads-secret"];

  if (!token || !secret || !chatId) {
    return res.status(500).json({
      success: false,
      message:
        "Настройки Telegram не заполнены. Проверьте переменные окружения Vercel.",
    });
  }

  if (
    typeof suppliedSecret !== "string" ||
    suppliedSecret !== secret
  ) {
    return res.status(401).json({
      success: false,
      message: "Доступ запрещён: неверный секретный ключ.",
    });
  }

  const message =
    "✅ Бот DocPilot Lead Finder подключён!\n\n" +
    "Тестовое сообщение успешно отправлено.\n\n" +
    "Следующий этап — настройка поиска потенциальных клиентов " +
    "для DocPilot AI и формирования ежедневных отчётов.";

  try {
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      }
    );

    const telegramResult = await telegramResponse.json();

    if (!telegramResponse.ok || !telegramResult.ok) {
      console.error(
        "Ошибка Telegram API:",
        telegramResult.error_code || "неизвестная ошибка"
      );

      return res.status(502).json({
        success: false,
        message:
          "Telegram не принял сообщение. Проверьте токен и идентификатор чата.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Тестовое сообщение успешно отправлено в Telegram.",
    });
  } catch (error) {
    console.error("Ошибка отправки в Telegram:", error.message);

    return res.status(502).json({
      success: false,
      message:
        "Не удалось связаться с Telegram. Попробуйте позже.",
    });
  }
}
