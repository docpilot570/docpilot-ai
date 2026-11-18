import { createHash, timingSafeEqual } from "crypto";
import { buildLeadResults, getSearchThemes, getThemeQuery } from "../../lib/serper-lead-finder";

function safeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || !a || !b) return false;
  // Compare fixed-length hashes to avoid leaking secret length or partial matches.
  const left = createHash("sha256").update(a).digest();
  const right = createHash("sha256").update(b).digest();
  return timingSafeEqual(left, right);
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  const expectedSecret = process.env.TELEGRAM_LEADS_SECRET;
  if (!safeEqual(req.headers["x-leads-secret"], expectedSecret)) {
    return res.status(401).json({ ok: false, message: "Unauthorized" });
  }

  const apiKey = process.env.SERPER_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      ok: false,
      message: "SERPER_API_KEY is not configured in the deployment environment.",
    });
  }

  const theme = String(req.body?.theme || "").toLowerCase();
  const query = getThemeQuery(theme);
  if (!query) {
    return res.status(400).json({
      ok: false,
      message: "Choose one theme: nda, ir35, or sow.",
      themes: getSearchThemes(),
    });
  }

  try {
    const upstream = await fetch("https://google.serper.dev/search", {
      method: "POST",
      headers: {
        "X-API-KEY": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: query,
        gl: "gb",
        hl: "en",
        num: 10,
      }),
    });

    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      console.error("Serper request failed:", upstream.status);
      return res.status(502).json({
        ok: false,
        message: "Serper search request failed.",
        upstreamStatus: upstream.status,
      });
    }

    const results = buildLeadResults(data.organic, theme);
    return res.status(200).json({
      ok: true,
      market: "United Kingdom",
      theme,
      query,
      resultCount: results.length,
      results,
    });
  } catch (error) {
    console.error("Serper connection error:", error?.message || "unknown");
    return res.status(502).json({
      ok: false,
      message: "Could not connect to Serper.",
    });
  }
}
