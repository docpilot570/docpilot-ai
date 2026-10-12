import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export const config = {
  api: {
    bodyParser: false,
  },
};

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function verifyPaddleSignature(rawBody, signatureHeader, secret) {
  if (!signatureHeader || !secret) return false;

  let ts = "";
  let h1 = "";

  for (const part of signatureHeader.split(";")) {
    const [key, value] = part.split("=");
    if (key.trim() === "ts") ts = value;
    if (key.trim() === "h1") h1 = value;
  }

  if (!ts || !h1) return false;

  const signedPayload = `\( {ts}: \){rawBody}`;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(signedPayload)
    .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(expected, "hex"),
      Buffer.from(h1, "hex")
    );
  } catch {
    return false;
  }
}

function planFromPriceId(priceId) {
  const map = {
    pri_01m3wkg689k7e99g5d8da04xze: "starter",
    pri_01m3wkrah33jw9e7qcym017f0p: "pro",
    pri_01m3wmvrwv3cx7hq1v8wc0109q: "pro",
    pri_01m3wn90z2f0zs463r9g0b3r39: "business",
    pri_01m3wnfv6acnrz992vxmqedrkk: "business",
    pri_01m3wnmkypzkms8sj4r1g9etm1: "agency",
    pri_01m3wnrf39jytfyfa8kw5r5eb8: "agency",
  };
  return map[priceId] || "starter";
}

function daysForPriceId(priceId) {
  const yearly = [
    "pri_01m3wmvrwv3cx7hq1v8wc0109q",
    "pri_01m3wnfv6acnrz992vxmqedrkk",
    "pri_01m3wnrf39jytfyfa8kw5r5eb8",
  ];
  return yearly.includes(priceId) ? 365 : 30;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const rawBody = await getRawBody(req);
    const signature = req.headers["paddle-signature"] || "";

    if (
      !verifyPaddleSignature(
        rawBody,
        signature,
        process.env.PADDLE_WEBHOOK_SECRET
      )
    ) {
      return res.status(401).json({ error: "Invalid signature" });
    }

    const event = JSON.parse(rawBody);
    const eventType = event.event_type;

    if (eventType === "transaction.completed") {
      const data = event.data || {};
      const email = String(
        data.customer?.email ||
          data.details?.customer?.email ||
          ""
      )
        .trim()
        .toLowerCase();

      const priceId =
        data.items?.[0]?.price?.id ||
        data.items?.[0]?.price_id ||
        "";

      if (!email) {
        return res.status(200).json({ ok: true, message: "No email" });
      }

      const plan = planFromPriceId(priceId);
      const days = daysForPriceId(priceId);
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + days);

      const { error } = await supabase.from("customers").upsert(
        {
          email,
          plan,
          active: true,
          expires_at: expiresAt.toISOString(),
        },
        { onConflict: "email" }
      );

      if (error) {
        console.error("Supabase error:", error);
        return res.status(500).json({ error: "Could not save customer" });
      }

      return res.status(200).json({ success: true, email, plan });
    }

    return res.status(200).json({ success: true, message: "Event ignored" });
  } catch (err) {
    console.error("Paddle webhook error:", err);
    return res.status(500).json({ error: "Webhook failed" });
  }
}
