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

Disclosing Party:
${form.clientName || "[Client Name]"}

Receiving Party:
${form.freelancerName || "[Freelancer Name]"}

Project:
${form.projectTitle || "[Project Title]"}

1. CONFIDENTIAL INFORMATION

"Confidential Information" means all commercial, technical, financial, operational and proprietary information disclosed during the Project.

${form.confidentialInfo || "[Insert confidential information details]"}

2. OBLIGATIONS

The Receiving Party agrees to:

- Keep all Confidential Information strictly confidential;
- Use Confidential Information only for the Project;
- Not disclose Confidential Information without written consent;
- Take reasonable security measures to protect Confidential Information.

3. EXCEPTIONS

This Agreement does not apply to information that:

- Is publicly available;
- Was lawfully obtained from a third party;
- Was already known before disclosure;
- Was independently developed.

4. RETURN OF INFORMATION

Upon request, all Confidential Information shall be returned or permanently deleted.

5. TERM

This Agreement remains effective for five (5) years from the date of disclosure.

6. GOVERNING LAW

This Agreement shall be governed by the laws of ${form.governingLaw}.

7. REMEDIES

The parties acknowledge that breach of this Agreement may cause irreparable harm and entitle the Disclosing Party to injunctive relief.

SIGNATURES

Client: ______________________________

Contractor: __________________________

DISCLAIMER:
This template is provided for informational purposes only and does not constitute legal advice.
`.trim();
  }

  if (docType === "sow") {
    return `
STATEMENT OF WORK (SOW)

Date: ${today}

Client:
${form.clientName || "[Client Name]"}

Contractor:
${form.freelancerName || "[Freelancer Name]"}

Project:
${form.projectTitle || "[Project Title]"}

1. SCOPE OF SERVICES

${form.scope || "[Describe services in detail]"}

2. DELIVERABLES AND DEADLINES

${form.deadlines || "[Describe deliverables and milestones]"}

3. PAYMENT

Contract Value: £${form.paymentAmount || "[Amount]"}

Payment Terms:
${form.paymentTerms} days from invoice date.

4. CLIENT RESPONSIBILITIES

The Client shall provide all necessary information, approvals and feedback required for successful completion of the Project.

5. ACCEPTANCE

Deliverables shall be deemed accepted unless written objections are provided within 7 business days.

6. GOVERNING LAW

This Statement of Work shall be governed by the laws of ${form.governingLaw}.

SIGNATURES

Client: ______________________________

Contractor: __________________________

DISCLAIMER:
This template is provided for informational purposes only and does not constitute legal advice.
`.trim();
  }

  if (docType === "agreement") {
    return `
FREELANCE SERVICE AGREEMENT

Date: ${today}

Client:
${form.clientName || "[Client Name]"}

Independent Contractor:
${form.freelancerName || "[Freelancer Name]"}

Project:
${form.projectTitle || "[Project Title]"}

1. SERVICES

${form.scope || "[Describe services]"}

2. CONTRACTOR STATUS

The Contractor acts as an independent contractor and not as an employee.

The Contractor is responsible for their own taxes, National Insurance contributions and VAT obligations where applicable.

3. SUBSTITUTION

The Contractor may provide a suitably qualified substitute to perform the Services.

${form.substitutionClause || "[Substitution details]"}

4. PAYMENT

Amount: £${form.paymentAmount || "[Amount]"}

Payment Terms:
${form.paymentTerms} days.

5. INTELLECTUAL PROPERTY

Upon full payment, intellectual property rights created under this Agreement shall transfer to the Client.

6. CONFIDENTIALITY

Both parties shall maintain confidentiality regarding all non-public information.

7. GOVERNING LAW

This Agreement shall be governed by the laws of ${form.governingLaw}.

IMPORTANT IR35 NOTICE

This template includes contractor-oriented provisions but does not guarantee IR35 compliance.

SIGNATURES

Client: ______________________________

Contractor: __________________________

DISCLAIMER:
This template is provided for informational purposes only and does not constitute legal, tax or employment advice.
`.trim();
  }

  if (docType === "latepayment") {
    return `
FINAL DEMAND FOR PAYMENT

Date: ${today}

To:
${form.clientName || "[Client Name]"}

From:
${form.freelancerName || "[Your Name]"}

Invoice Number:
${form.invoiceNumber || "[Invoice Number]"}

Outstanding Amount:
£${form.debtAmount || "[Amount]"}

Dear ${form.clientName || "[Client Name]"},

Despite previous reminders, payment remains outstanding.

You are required to pay the outstanding amount of £${form.debtAmount || "[Amount]"} within seven (7) days of the date of this letter.

Failure to pay may result in:

- Debt recovery proceedings;
- Legal action;
- Recovery of statutory interest and costs where applicable.

Please arrange immediate payment to avoid escalation.

Yours faithfully,

${form.freelancerName || "[Your Name]"}

DISCLAIMER:
This template is provided for informational purposes only and does not constitute legal advice.
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

   
