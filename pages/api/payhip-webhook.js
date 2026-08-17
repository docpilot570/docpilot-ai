import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function verifyPayhipSignature(signature) {
  if (!signature || !process.env.PAYHIP_API_KEY) {
    return false;
  }

  const expectedSignature = crypto
    .createHash("sha256")
    .update(process.env.PAYHIP_API_KEY)
    .digest("hex");

  return signature === expectedSignature;
}

function getPlanFromItems(items = []) {
  const productName = String(items[0]?.product_name || "").toLowerCase();

  if (productName.includes("agency")) {
    return "agency";
  }

  if (productName.includes("business")) {
    return "business";
  }

  if (productName.includes("pro")) {
    return "pro";
  }

  return "starter";
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const payload = req.body;

    if (!payload) {
      return res.status(400).json({
        error: "Empty webhook payload",
      });
    }

    if (!verifyPayhipSignature(payload.signature)) {
      return res.status(401).json({
        error: "Invalid Payhip signature",
      });
    }

    const eventType = payload.type;

    if (eventType === "paid") {
      const email = String(payload.email || "")
        .trim()
        .toLowerCase();

      if (!email) {
        return res.status(400).json({
          error: "Customer email is missing",
        });
      }

      const plan = getPlanFromItems(payload.items);

      const expiresAt = new Date();

      expiresAt.setDate(expiresAt.getDate() + 30);

      const { error } = await supabase
        .from("customers")
        .upsert(
          {
            email,
            plan,
            active: true,
            expires_at: expiresAt.toISOString(),
          },
          {
            onConflict: "email",
          }
        );

      if (error) {
        console.error("Supabase error:", error);

        return res.status(500).json({
          error: "Could not save customer",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Customer access activated",
      });
    }

    if (eventType === "refunded") {
      const email = String(payload.email || "")
        .trim()
        .toLowerCase();

      if (email) {
        await supabase
          .from("customers")
          .update({
            active: false,
          })
          .eq("email", email);
      }

      return res.status(200).json({
        success: true,
        message: "Refund processed",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Event received",
    });
  } catch (error) {
    console.error("Payhip webhook error:", error);

    return res.status(500).json({
      error: "Webhook processing failed",
    });
  }
}
