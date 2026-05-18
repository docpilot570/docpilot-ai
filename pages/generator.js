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
    // ... (твой текущий код generateText остаётся без изменений)
    if (docType === "nda") {
      return `UK NDA AGREEMENT\n\nThis Non-Disclosure Agreement ("Agreement") is made between:\nDisclosing Party: ${form.clientName}\nReceiving Party: ${form.freelancerName}\n\nProject: \( {form.projectTitle}\n\nConfidential Information:\n \){form.confidentialInfo}\n\nGoverning Law: ${form.governingLaw}\n\nThis document is provided for informational purposes only and does not constitute legal advice.`;
    }
    // ... остальные условия (sow, agreement, latepayment) оставь как было
    if (docType === "sow") {
      return `STATEMENT OF WORK (SOW)\n\nClient: ${form.clientName}\nContractor: ${form.freelancerName}\n\nProject: \( {form.projectTitle}\n\nScope of Work:\n \){form.scope}\n\nDeadlines / Deliverables:\n\( {form.deadlines}\n\nPayment: £ \){form.paymentAmount}\nPayment Terms: ${form.paymentTerms} days\n\nGoverning Law: ${form.governingLaw}\n\nThis document is provided for informational purposes only and does not constitute legal advice.`;
    }
    // Добавь остальные if по аналогии, если нужно

    return "";
  }

  const generated = generateText();

  // Функция скачивания DOCX
  function downloadDocx() {
    if (!generated) {
      alert("Сначала сгенерируй документ");
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

      {/* ... весь твой текущий код с select и inputs остаётся ... */}

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

      <div style={{ marginTop: 15 }}>
        <button 
          onClick={downloadDocx}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginRight: "10px"
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

