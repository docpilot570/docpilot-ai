import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const email = String(req.body?.email || "")
      .trim()
      .toLowerCase();

    if (!email) {
      return res.status(400).json({
        error: "Email is required",
        hasAccess: false,
      });
    }

    const { data, error } = await supabase
      .from("customers")
      .select("email, plan, active, expires_at")
      .eq("email", email)
      .eq("active", true)
      .maybeSingle();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({
        error: "Could not check access",
        hasAccess: false,
      });
    }

    if (!data) {
      return res.status(200).json({
        hasAccess: false,
        message: "No active subscription found",
      });
    }

    const now = new Date();
    const expiresAt = data.expires_at ? new Date(data.expires_at) : null;

    if (expiresAt && expiresAt < now) {
      return res.status(200).json({
        hasAccess: false,
        message: "Subscription expired",
      });
    }

    return res.status(200).json({
      hasAccess: true,
      plan: data.plan || "starter",
      expires_at: data.expires_at,
    });
  } catch (error) {
    console.error("Check access error:", error);
    return res.status(500).json({
      error: "Access check failed",
      hasAccess: false,
    });
  }
}
