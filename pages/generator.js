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
    const date = new Date().toLocaleDateString('en-GB');

    if (docType === "nda") {
      return `UK NDA AGREEMENT

Date: ${date}

This Non-Disclosure Agreement ("Agreement") is made between:

Disclosing Party: ${form.clientName || "[Client Name]"}
Receiving Party: ${form.freelancerName || "[Your Name]"}

Project: ${form.projectTitle || "[Project Title]"}

Confidential Information:
${form.confidentialInfo || "[Describe confidential information]"}

Governing Law: ${form.governingLaw}

This document is provided for informational purposes only and does not constitute legal advice.`;
    }

    if (docType === "sow") {
      return `STATEMENT OF WORK (SOW)

Date: ${date}

Client: ${form.clientName || "[Client Name]"}
Contractor: ${form.freelancerName || "[Your Name]"}

Project: ${form.projectTitle || "[Project Title]"}

Scope of Work:
${form.scope || "[Describe scope of work]"}

Deadlines / Deliverables:
${form.deadlines || "[List deadlines]"}

Payment: £${form.paymentAmount || "0"}
Payment Terms: ${form.paymentTerms} days

Governing Law: ${form.governingLaw}

This document is provided for informational purposes only and does not constitute legal advice.`;
    }

    // Добавь остальные типы документов по аналогии при необходимости
    return "Document template is under development.";
  }

  const generated = generateText();

  function downloadDocx() {
    if (!generated.trim()) {
      alert("Сначала заполните форму и сгенерируйте документ");
      return;
    }

    const blob = new Blob([generated], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `\( {docType.toUpperCase()}_Document_ \){new Date().toISOString().slice(0,10)}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 30, fontFamily: "Arial" }}>
      <h1 style={{ fontSize: 32 }}>DocPilot AI Generator (UK)</h1>
      <p>Create UK freelance documents in minutes.</p>

      {/* ... весь твой код с select, input и textarea остаётся тем же ... */}

      <h2 style={{ marginTop: 40 }}>Generated document</h2>

      <textarea
        value={generated}
        readOnly
        style={{
          width: "100%",
          padding: 15,
          marginTop: 10,
          minHeight: 300,
          background: "#f8f9fa",
          fontSize: "15px",
          lineHeight: "1.6"
        }}
      />

      <div style={{ marginTop: 15 }}>
        <button 
          onClick={downloadDocx}
          style={{
            padding: "14px 28px",
            fontSize: "17px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          📥 Download as DOCX
        </button>
      </div>

      <p style={{ marginTop: 20, fontSize: 14, color: "#666" }}>
        Disclaimer: This tool provides document templates for informational purposes only and does not constitute legal advice.
      </p>
    </div>
  );
}

