import { useState } from "react";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

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
    const today = new Date().toLocaleDateString("en-GB");

    if (docType === "nda") {
      return `
UK NDA AGREEMENT

Date: ${today}

This Non-Disclosure Agreement ("Agreement") is made between:

Disclosing Party: ${form.clientName || "[Client Name]"}
Receiving Party: ${form.freelancerName || "[Your Name]"}

Project: ${form.projectTitle || "[Project Title]"}

Confidential Information:
${form.confidentialInfo || "[Describe confidential information]"}

The Receiving Party agrees not to disclose any Confidential Information without written consent.

Governing Law: ${form.governingLaw}

DISCLAIMER: This document is provided for informational purposes only and does not constitute legal advice.
      `.trim();
    }

    if (docType === "sow") {
      return `
STATEMENT OF WORK (SOW)

Date: ${today}

Client: ${form.clientName || "[Client Name]"}
Contractor: ${form.freelancerName || "[Your Name]"}

Project: ${form.projectTitle || "[Project Title]"}

Scope of Work:
${form.scope || "[Describe scope of work]"}

Deliverables / Deadlines:
${form.deadlines || "[Describe deadlines and deliverables]"}

Payment:
Amount: £${form.paymentAmount || "[Amount]"}
Payment Terms: ${form.paymentTerms} days

Governing Law: ${form.governingLaw}

DISCLAIMER: This document is provided for informational purposes only and does not constitute legal advice.
      `.trim();
    }

    if (docType === "agreement") {
      return `
FREELANCE SERVICE AGREEMENT (UK)

Date: ${today}

This Agreement is made between:

Client: ${form.clientName || "[Client Name]"}
Independent Contractor: ${form.freelancerName || "[Your Name]"}

Project: ${form.projectTitle || "[Project Title]"}

Industry / Activity:
${form.scope || "[Describe industry / activity]"}

Project Tasks:
${form.scope || "[Describe project tasks]"}

Substitution Clause (IR35-related):
${form.substitutionClause || "[Describe substitution clause]"}

Payment:
Amount: £${form.paymentAmount || "[Amount]"}
Payment Terms: ${form.paymentTerms} days

The Contractor is engaged as an independent contractor and not as an employee.

Governing Law: ${form.governingLaw}

IMPORTANT NOTE: This contract includes contractor-style clauses but does not guarantee IR35 compliance.

DISCLAIMER: This document is provided for informational purposes only and does not constitute legal advice.
      `.trim();
    }

    if (docType === "latepayment") {
      return `
LATE PAYMENT DEMAND LETTER (UK)

Date: ${today}

To: ${form.clientName || "[Client Name]"}
From: ${form.freelancerName || "[Your Name]"}

Invoice Number: ${form.invoiceNumber || "[Invoice Number]"}
Outstanding Amount: £${form.debtAmount || "[Outstanding Amount]"}

Dear ${form.clientName || "[Client Name]"},

This is a formal reminder that payment for invoice ${form.invoiceNumber || "[Invoice Number]"} remains outstanding.

Please arrange payment of £${form.debtAmount || "[Amount]"} within 7 days.

If payment is not received, I may pursue further action including debt recovery procedures.

Sincerely,
${form.freelancerName || "[Your Name]"}

DISCLAIMER: This document is provided for informational purposes only and does not constitute legal advice.
      `.trim();
    }

    return "";
  }

  const generated = generateText();

  async function downloadDocx() {
    const paragraphs = generated.split("\n").map((line) => {
      return new Paragraph({
        children: [
          new TextRun({
            text: line,
            font: "Calibri",
            size: 24,
          }),
        ],
      });
    });

    const doc = new Document({
      sections: [
        {
          children: paragraphs,
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `docpilot-${docType}.docx`);
  }

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "60px auto",
        padding: 20,
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ fontSize: 42 }}>DocPilot AI Generator (UK)</h1>
      <p>Create UK freelance documents in minutes.</p>

      <label style={{ display: "block", marginTop: 20 }}>
        <b>Select document:</b>
      </label>

      <select
        value={docType}
        onChange={(e) => setDocType(e.target.value)}
        style={{ padding: 12, marginTop: 10, width: "100%" }}
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
        style={{ width: "100%", padding: 12, marginTop: 10 }}
      />

      <input
        name="clientName"
        placeholder="Client name"
        value={form.clientName}
        onChange={handleChange}
        style={{ width: "100%", padding: 12, marginTop: 10 }}
      />

      <input
        name="projectTitle"
        placeholder="Project title"
        value={form.projectTitle}
        onChange={handleChange}
        style={{ width: "100%", padding: 12, marginTop: 10 }}
      />

      <textarea
        name="scope"
        placeholder="Scope / tasks / description"
        value={form.scope}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 10,
          minHeight: 80,
        }}
      />

      <textarea
        name="deadlines"
        placeholder="Deadlines / deliverables schedule (for SOW)"
        value={form.deadlines}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 10,
          minHeight: 80,
        }}
      />

      <textarea
        name="substitutionClause"
        placeholder="Substitution clause details (IR35-related)"
        value={form.substitutionClause}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 10,
          minHeight: 80,
        }}
      />

      <textarea
        name="confidentialInfo"
        placeholder="Confidential information definition (for NDA)"
        value={form.confidentialInfo}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 10,
          minHeight: 80,
        }}
      />

      <input
        name="paymentAmount"
        placeholder="Payment amount (£)"
        value={form.paymentAmount}
        onChange={handleChange}
        style={{ width: "100%", padding: 12, marginTop: 10 }}
      />

      <select
        name="paymentTerms"
        value={form.paymentTerms}
        onChange={handleChange}
        style={{ width: "100%", padding: 12, marginTop: 10 }}
      >
        <option value="7">7 days</option>
        <option value="14">14 days</option>
        <option value="30">30 days</option>
      </select>

      <select
        name="governingLaw"
        value={form.governingLaw}
        onChange={handleChange}
        style={{ width: "100%", padding: 12, marginTop: 10 }}
      >
        <option value="England & Wales">England & Wales</option>
        <option value="Scotland">Scotland</option>
      </select>

      <input
        name="invoiceNumber"
        placeholder="Invoice number (for Late Payment Letter)"
        value={form.invoiceNumber}
        onChange={handleChange}
        style={{ width: "100%", padding: 12, marginTop: 10 }}
      />

      <input
        name="debtAmount"
        placeholder="Outstanding amount (£)"
        value={form.debtAmount}
        onChange={handleChange}
        style={{ width: "100%", padding: 12, marginTop: 10 }}
      />

      <h2 style={{ marginTop: 40 }}>Generated document</h2>

      <textarea
        value={generated}
        readOnly
        style={{
          width: "100%",
          padding: 12,
          marginTop: 10,
          minHeight: 250,
          background: "#f4f4f4",
          fontFamily: "Courier New",
        }}
      />

      <button
        onClick={downloadDocx}
        style={{
          padding: "14px 22px",
          fontSize: 16,
          cursor: "pointer",
          marginTop: 15,
          background: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: 8,
        }}
      >
        📥 Download as DOCX
      </button>

      <p style={{ marginTop: 20, fontSize: 14, color: "#666" }}>
        Disclaimer: This tool provides document templates for informational
        purposes only and does not constitute legal advice.
      </p>

      <p style={{ marginTop: 15 }}>
        <a href="/">← Back to Home</a>
      </p>
    </div>
  );
}

    



      
       
          
