import { useState } from "react";

export default function Generator() {
  const [docType, setDocType] = useState("nda");
  const [form, setForm] = useState({
    freelancerName: "",
    clientName: "",
    projectTitle: "",
    scope: "",
    paymentAmount: "",
    paymentTerms: "14",
    governingLaw: "England & Wales",
    substitutionClause: "",
    deadlines: "",
    confidentialInfo: "",
    debtAmount: "",
    invoiceNumber: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function generateText() {
    if (docType === "nda") {
      return `
UK NDA AGREEMENT

This Non-Disclosure Agreement ("Agreement") is made between:
Disclosing Party: ${form.clientName}
Receiving Party: ${form.freelancerName}

Project: ${form.projectTitle}

Confidential Information:
${form.confidentialInfo}

Governing Law: ${form.governingLaw}

This document is provided for informational purposes only and does not constitute legal advice.
      `;
    }

    if (docType === "sow") {
      return `
STATEMENT OF WORK (SOW)

Client: ${form.clientName}
Contractor: ${form.freelancerName}

Project: ${form.projectTitle}

Scope of Work:
${form.scope}

Deadlines / Deliverables:
${form.deadlines}

Payment: £${form.paymentAmount}
Payment Terms: ${form.paymentTerms} days

Governing Law: ${form.governingLaw}

This document is provided for informational purposes only and does not constitute legal advice.
      `;
    }

    if (docType === "agreement") {
      return `
FREELANCE SERVICE AGREEMENT (UK)

This Agreement is made between:
Client: ${form.clientName}
Independent Contractor: ${form.freelancerName}

Industry / Activity:
${form.scope}

Project Tasks:
${form.scope}

Substitution Clause (IR35-related):
${form.substitutionClause}

Payment:
£${form.paymentAmount}
Payment Terms: ${form.paymentTerms} days

Governing Law: ${form.governingLaw}

This contract is intended as a contractor-style agreement but does not guarantee IR35 compliance.
This document is provided for informational purposes only and does not constitute legal advice.
      `;
    }

    if (docType === "latepayment") {
      return `
LATE PAYMENT DEMAND LETTER (UK)

To: ${form.clientName}

From: ${form.freelancerName}

Invoice Number: ${form.invoiceNumber}
Outstanding Amount: £${form.debtAmount}

Dear ${form.clientName},

This is a formal reminder that payment for invoice ${form.invoiceNumber} remains outstanding.
Please arrange payment of £${form.debtAmount} within 7 days.

If payment is not received, further action may be taken.

Sincerely,
${form.freelancerName}
      `;
    }

    return "";
  }

  const generated = generateText();

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 30, fontFamily: "Arial" }}>
      <h1 style={{ fontSize: 32 }}>DocPilot AI Generator (UK)</h1>
      <p>Create UK freelance documents in minutes.</p>

      <label style={{ display: "block", marginTop: 20 }}>
        <b>Select document:</b>
      </label>

      <select
        value={docType}
        onChange={(e) => setDocType(e.target.value)}
        style={{ padding: 10, marginTop: 10, width: "100%" }}
      >
        <option value="nda">UK NDA (Non-Disclosure Agreement)</option>
        <option value="sow">Statement of Work (SOW)</option>
        <option value="agreement">Freelance Service Agreement (IR35-friendly)</option>
        <option value="latepayment">Late Payment Demand Letter</option>
      </select>

      <h2 style={{ marginTop: 30 }}>Fill details</h2>

      <input
        name="freelancerName"
        placeholder="Your name (Freelancer / Contractor)"
        value={form.freelancerName}
        onChange={handleChange}
        style={{ width: "100%", padding: 10, marginTop: 10 }}
      />

      <input
        name="clientName"
        placeholder="Client name"
        value={form.clientName}
        onChange={handleChange}
        style={{ width: "100%", padding: 10, marginTop: 10 }}
      />

      <input
        name="projectTitle"
        placeholder="Project title"
        value={form.projectTitle}
        onChange={handleChange}
        style={{ width: "100%", padding: 10, marginTop: 10 }}
      />

      <textarea
        name="scope"
        placeholder="Scope / tasks / description"
        value={form.scope}
        onChange={handleChange}
        style={{ width: "100%", padding: 10, marginTop: 10, minHeight: 80 }}
      />

      <textarea
        name="deadlines"
        placeholder="Deadlines / deliverables schedule"
        value={form.deadlines}
        onChange={handleChange}
        style={{ width: "100%", padding: 10, marginTop: 10, minHeight: 80 }}
      />

      <textarea
        name="substitutionClause"
        placeholder="Substitution clause details (IR35-related)"
        value={form.substitutionClause}
        onChange={handleChange}
        style={{ width: "100%", padding: 10, marginTop: 10, minHeight: 80 }}
      />

      <textarea
        name="confidentialInfo"
        placeholder="Confidential information definition"
        value={form.confidentialInfo}
        onChange={handleChange}
        style={{ width: "100%", padding: 10, marginTop: 10, minHeight: 80 }}
      />

      <input
        name="paymentAmount"
        placeholder="Payment amount (£)"
        value={form.paymentAmount}
        onChange={handleChange}
        style={{ width: "100%", padding: 10, marginTop: 10 }}
      />

      <select
        name="paymentTerms"
        value={form.paymentTerms}
        onChange={handleChange}
        style={{ width: "100%", padding: 10, marginTop: 10 }}
      >
        <option value="7">7 days</option>
        <option value="14">14 days</option>
        <option value="30">30 days</option>
      </select>

      <select
        name="governingLaw"
        value={form.governingLaw}
        onChange={handleChange}
        style={{ width: "100%", padding: 10, marginTop: 10 }}
      >
        <option value="England & Wales">England & Wales</option>
        <option value="Scotland">Scotland</option>
      </select>

      <input
        name="invoiceNumber"
        placeholder="Invoice number (for late payment letter)"
        value={form.invoiceNumber}
        onChange={handleChange}
        style={{ width: "100%", padding: 10, marginTop: 10 }}
      />

      <input
        name="debtAmount"
        placeholder="Outstanding amount (£)"
        value={form.debtAmount}
        onChange={handleChange}
        style={{ width: "100%", padding: 10, marginTop: 10 }}
      />

      <h2 style={{ marginTop: 40 }}>Generated document</h2>

      <textarea
        value={generated}
        readOnly
        style={{
          width: "100%",
          padding: 10,
          marginTop: 10,
          minHeight: 250,
          background: "#f4f4f4",
        }}
      />

      <p style={{ marginTop: 20, fontSize: 14, color: "#666" }}>
        Disclaimer: This tool provides document templates for informational purposes only and does not constitute legal advice.
      </p>
    </div>
  );
}
