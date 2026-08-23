import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const supabaseUrl = process.env.SUPABASE_URL || "";
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  // Debug: show if env vars exist (not the values)
  const debug = {
    hasUrl: Boolean(supabaseUrl),
    hasKey: Boolean(supabaseKey),
    urlHost: supabaseUrl ? supabaseUrl.replace("https://", "").split(".")[0] : null,
    keyStartsWith: supabaseKey ? supabaseKey.slice(0, 10) : null,
  };

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({
      hasAccess: false,
      message: "Missing Supabase env vars",
      debug,
    });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const email = String(req.body?.email || "")
      .trim()
      .toLowerCase();

    // 1) Try to read ALL rows (no filter)
    const all = await supabase.from("customers").select("email, plan, active, expires_at");

    // 2) Try exact email
    const byEmail = await supabase
      .from("customers")
      .select("email, plan, active, expires_at")
      .eq("email", email);

    return res.status(200).json({
      hasAccess: false,
      searchedEmail: email,
      debug,
      allError: all.error ? all.error.message : null,
      allCount: all.data ? all.data.length : 0,
      allRows: all.data || [],
      byEmailError: byEmail.error ? byEmail.error.message : null,
      byEmailRows: byEmail.data || [],
    });
  } catch (error) {
    return res.status(500).json({
      hasAccess: false,
      message: "Exception",
      details: String(error),
      debug,
    });
  }
}
