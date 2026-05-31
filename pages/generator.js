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
NON-DISCLOSURE AGREEMENT (NDA)

Date: ${today}

This Non-Disclosure Agreement (the "Agreement") is entered into by and between:

**Disclosing Party:** ${form.clientName || "[Client Name]"}
**Receiving Party:** ${form.freelancerName || "[Freelancer Name]"}

**Project:** ${form.projectTitle || "[Project Title]"}

**1. Confidential Information**
"Confidential Information" means any and all information disclosed by the Disclosing Party to the Receiving Party, whether orally, in writing or by any other means, including but not limited to: business plans, financial data, client lists, technical information, trade secrets, know-how, and any other proprietary information.
\( {form.confidentialInfo ? `\nSpecific Confidential Information includes:\n \){form.confidentialInfo}` : ''}

**2. Obligations**
The Receiving Party agrees that it shall:
• Hold all Confidential Information in strict confidence;
• Not disclose it to any third party without the prior written consent of the Disclosing Party;
• Use the Confidential Information solely for the purpose of the Project;
• Protect the Confidential Information with at least the same degree of care as it uses for its own most valuable information.

**3. Exceptions**
This Agreement shall not apply to information which is publicly known, already known to the Receiving Party, or independently developed.

**4. Return of Information**
Upon request or upon termination of the Project, the Receiving Party shall promptly return or destroy all Confidential Information.

**5. Term**
This Agreement shall remain in effect for a period of **5 years** from the date of last disclosure of Confidential Information.

**6. Governing Law**
This Agreement shall be governed by and construed in accordance with the laws of ${form.governingLaw}.

**7. Remedies**
The parties agree that breach of this Agreement may cause irreparable harm and that the Disclosing Party shall be entitled to seek injunctive relief.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first above written.

DISCLAIMER: This is an AI-generated professional template. It does not constitute legal advice. It is strongly recommended to have this document reviewed by a qualified solicitor.
      `.trim();
    }

    if (docType === "sow") {
      return `
STATEMENT OF WORK (SOW)

Date: ${today}

**Client:** ${form.clientName || "[Client Name]"}
**Contractor:** ${form.freelancerName || "[Freelancer Name]"}

**Project Title:** ${form.projectTitle || "[Project Title]"}

**1. Background**
This Statement of Work is issued pursuant to the Freelance Service Agreement between the parties and defines the specific services, deliverables, and commercial terms for the Project.

**2. Scope of Services**
The Contractor shall perform the following services:
${form.scope || "[Please describe the full scope of work in detail]"}

**3. Deliverables and Timeline**
The Contractor shall deliver the following:
${form.deadlines || "[List all deliverables with expected completion dates and milestones]"}

**4. Client Obligations**
The Client shall provide timely feedback, necessary information, and access required for the successful completion of the Project.

**5. Payment Terms**
Total Contract Value: **£${form.paymentAmount || "[Amount]"}**
Payment shall be made within **${form.paymentTerms} days** of receipt of a correctly issued invoice.

**6. Acceptance**
Deliverables shall be reviewed by the Client within 7 business days. If no written rejection is received, the deliverable shall be deemed accepted.

**7. Governing Law**
This Statement of Work shall be governed by the laws of ${form.governingLaw}.

**Signatures:**

Client: _______________________________ Date: ___________
Contractor: ___________________________ Date: ___________

DISCLAIMER: This is an AI-generated professional template. Professional legal review is recommended.
      `.trim();
    }

    if (docType === "agreement") {
      return `
FREELANCE SERVICE AGREEMENT

Date: ${today}

**Parties:**
**Client:** ${form.clientName || "[Client Name]"}
**Independent Contractor:** ${form.freelancerName || "[Freelancer Name]"}

**1. Services**
The Contractor agrees to provide the following professional services:
${form.scope || "[Detailed description of services to be provided]"}

**2. Term**
This Agreement commences on the date of signing and continues until the services are completed or the Agreement is terminated.

**3. Payment**
Total Fee: **£${form.paymentAmount || "[Amount]"}**
Invoices shall be paid by the Client within **${form.paymentTerms} days** of receipt.

**4. Independent Contractor Status**
The Contractor is engaged as an independent contractor and not as an employee. The Contractor shall be responsible for their own taxes, National Insurance and VAT (if applicable).

**5. Substitution and IR35 Protection**
The Contractor has the unrestricted right to provide a suitably qualified substitute to perform the Services, subject only to the Client’s reasonable approval. The Contractor is free to determine their own working methods, hours and place of work.
${form.substitutionClause ? `\nAdditional details: ${form.substitutionClause}` : ''}

**6. Intellectual Property**
All intellectual property rights created in the course of the Services shall pass to the Client upon full and final payment.

**7. Confidentiality**
Both parties agree to keep each other’s confidential information secure.

**8. Governing Law**
This Agreement shall be governed by the laws of ${form.governingLaw}.

**Signatures:**

Client: _______________________________ Date: ___________
Contractor: ___________________________ Date: ___________

DISCLAIMER: This template is designed to support IR35-friendly working arrangements. It is strongly recommended to obtain professional legal and tax advice.
      `.trim();
    }

    if (docType === "latepayment") {
      return `
FINAL DEMAND FOR PAYMENT

Date: ${today}

**To:** ${form.clientName || "[Client Name]"}

**From:** ${form.freelancerName || "[Your Name]"}

**Invoice Number:** ${form.invoiceNumber || "[Invoice Number]"}
**Amount Outstanding:** **£${form.debtAmount || "[Amount]"}**

Dear ${form.clientName || "[Client Name]"},

This is a **Final Demand** for payment of the above invoice, which remains unpaid despite previous reminders.

You are hereby required to pay the full outstanding amount of **£${form.debtAmount}** within **7 days** of the date of this letter.

Should you fail to make payment by this deadline, I will be forced to take further action, which may include:
• Instructing a debt collection agency
• Commencing legal proceedings to recover the debt, plus statutory interest and legal costs
• Reporting the outstanding debt to credit reference agencies

Please make immediate payment to avoid escalation.

Yours sincerely,

${form.freelancerName || "[Your Name]"}

DISCLAIMER: This is a professional template late payment demand letter. It is for informational purposes only and does not constitute formal legal advice.
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
    saveAs(blob, `DocPilot-\( {docType.toUpperCase()}- \){new Date().toISOString().slice(0,10)}.docx`);
  }

  return (
    <div style={{maxWidth:900, margin:"60px auto", padding:20, fontFamily:"Arial"}}>
      <h1 style={{ fontSize: 42 }}>DocPilot AI Generator (UK)</h1>
      <p>Create professional UK freelance documents in minutes.</p>

      <label style={{ display: "block", marginTop: 20 }}>
        <b>Select document type:</b>
      </label>

      <select
        value={docType}
        onChange={(e) => setDocType(e.target.value)}
        style={{ padding: 12, marginTop: 10, width: "100%" }}
      >
        <option value="nda">NDA - Non-Disclosure Agreement</option>
        <option value="sow">SOW - Statement of Work</option>
        <option value="agreement">Freelance Service Agreement (IR35 friendly)</option>
        <option value="latepayment">Late Payment Demand Letter</option>
      </select>

      <h2 style={{ marginTop: 30 }}>Fill details</h2>

      <input name="freelancerName" placeholder="Your name (Freelancer)" value={form.freelancerName} onChange={handleChange} style={{width:"100%", padding:12, marginTop:10}} />
      <input name="clientName" placeholder="Client name" value={form.clientName} onChange={handleChange} style={{width:"100%", padding:12, marginTop:10}} />
      <input name="projectTitle" placeholder="Project title" value={form.projectTitle} onChange={handleChange} style={{width:"100%", padding:12, marginTop:10}} />

      <textarea name="scope" placeholder="Scope of work / tasks" value={form.scope} onChange={handleChange} style={{width:"100%", padding:12, marginTop:10, minHeight:80}} />
      <textarea name="deadlines" placeholder="Deadlines and deliverables" value={form.deadlines} onChange={handleChange} style={{width:"100%", padding:12, marginTop:10, minHeight:80}} />
      <textarea name="confidentialInfo" placeholder="Confidential information (for NDA)" value={form.confidentialInfo} onChange={handleChange} style={{width:"100%", padding:12, marginTop:10, minHeight:80}} />
      <textarea name="substitutionClause" placeholder="Substitution / IR35 details" value={form.substitutionClause} onChange={handleChange} style={{width:"100%", padding:12, marginTop:10, minHeight:80}} />

      <input name="paymentAmount" placeholder="Payment amount (£)" value={form.paymentAmount} onChange={handleChange} style={{width:"100%", padding:12, marginTop:10}} />
      <input name="invoiceNumber" placeholder="Invoice number (for Late Payment)" value={form.invoiceNumber} onChange={handleChange} style={{width:"100%", padding:12, marginTop:10}} />
      <input name="debtAmount" placeholder="Outstanding amount (£)" value={form.debtAmount} onChange={handleChange} style={{width:"100%", padding:12, marginTop:10}} />

      <select name="paymentTerms" value={form.paymentTerms} onChange={handleChange} style={{width:"100%", padding:12, marginTop:10}}>
        <option value="7">7 days</option>
        <option value="14">14 days</option>
        <option value="30">30 days</option>
      </select>

      <select name="governingLaw" value={form.governingLaw} onChange={handleChange} style={{width:"100%", padding:12, marginTop:10}}>
        <option value="England & Wales">England & Wales</option>
        <option value="Scotland">Scotland</option>
      </select>

      <h2 style={{ marginTop: 40 }}>Generated document</h2>

      <textarea
        value={generated}
        readOnly
        style={{width:"100%", padding:12, marginTop:10, minHeight:300, background:"#f4f4f4", fontFamily:"Courier New", whiteSpace:"pre-wrap"}}
      />

      <button
        onClick={downloadDocx}
        style={{padding:"14px 28px", fontSize:18, cursor:"pointer", marginTop:20, background:"#4CAF50", color:"#fff", border:"none", borderRadius:8}}
      >
        📥 Download as DOCX
      </button>

      <p style={{marginTop:20, fontSize:14, color:"#666"}}>
        Disclaimer: These are professional AI-generated templates. They are for informational purposes only and do not constitute legal advice. We recommend review by a qualified solicitor.
      </p>
    </div>
  );
}

   
