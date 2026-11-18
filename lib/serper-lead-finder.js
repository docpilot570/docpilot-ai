const SEARCH_THEMES = {
  nda: {
    label: "NDA",
    query: '("need an NDA" OR "non-disclosure agreement" OR "confidentiality agreement") (company OR agency OR startup) UK',
    products: ["NDA Agreement"],
  },
  ir35: {
    label: "IR35",
    query: '("outside IR35" OR "inside IR35" OR "IR35 compliance") (contractor OR recruitment OR agency) UK',
    products: ["IR35 Agreement"],
  },
  sow: {
    label: "SOW",
    query: '("statement of work" OR "SOW") (agency OR contractor OR outsourcing) UK',
    products: ["Statement of Work (SOW)"],
  },
};

const COMMERCIAL_SIGNALS = [
  { pattern: /hiring|recruiting|vacancy|job opening|recruitment/i, points: 3, reason: "Hiring or recruitment activity" },
  { pattern: /contractor|freelance|consultant|outsourcing/i, points: 2, reason: "Contractor or outsourced-work context" },
  { pattern: /request for proposal|rfp|tender|procurement|supplier/i, points: 4, reason: "Procurement or supplier request" },
  { pattern: /statement of work|\bsow\b|scope of work/i, points: 3, reason: "Explicit statement-of-work context" },
  { pattern: /non-disclosure|\bnda\b|confidentiality agreement/i, points: 3, reason: "Explicit confidentiality-document context" },
  { pattern: /ir35|off-payroll/i, points: 3, reason: "Explicit IR35 or off-payroll context" },
  { pattern: /agency|consultancy|consulting|staffing/i, points: 1, reason: "Potential business customer type" },
];

export function getSearchThemes() {
  return Object.entries(SEARCH_THEMES).map(([id, theme]) => ({
    id,
    label: theme.label,
    products: theme.products,
  }));
}

export function buildLeadResults(organic, themeId) {
  const theme = SEARCH_THEMES[themeId];
  if (!theme) return [];

  return (Array.isArray(organic) ? organic : []).map((item) => {
    const title = String(item.title || "").slice(0, 300);
    const snippet = String(item.snippet || "").slice(0, 1200);
    const text = title + " " + snippet;
    const matchedSignals = COMMERCIAL_SIGNALS.filter((signal) => signal.pattern.test(text));
    const score = Math.min(10, matchedSignals.reduce((total, signal) => total + signal.points, 0));

    return {
      title,
      url: typeof item.link === "string" ? item.link : "",
      snippet,
      sourceDate: String(item.date || ""),
      position: Number(item.position) || null,
      theme: theme.label,
      suggestedProducts: theme.products,
      score,
      signals: matchedSignals.map((signal) => signal.reason),
      priority: score >= 7 ? "high" : score >= 4 ? "medium" : "low",
    };
  }).filter((item) => item.title && item.url);
}

export function getThemeQuery(themeId) {
  return SEARCH_THEMES[themeId]?.query || null;
}
