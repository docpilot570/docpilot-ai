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
PROFESSIONAL NON-DISCLOSURE AGREEMENT (NDA)

Date: ${today}

Disclosing Party:
${form.clientName || "[Client Name]"}

Receiving Party:
${form.freelancerName || "[Freelancer Name]"}

Project:
${form.projectTitle || "[Project Title]"}

1. DEFINITION OF CONFIDENTIAL INFORMATION

"Confidential Information" means all commercial, financial, technical, operational, business, customer, supplier, marketing, software, product, strategic and proprietary information disclosed by either party in connection with the Project.

Specific Confidential Information:

${form.confidentialInfo || "[Insert confidential information details]"}

2. PERMITTED DISCLOSURE

Confidential Information may only be disclosed to professional advisers, employees, contractors or affiliates who require access for the purposes of the Project and who are bound by confidentiality obligations.

3. OBLIGATIONS

The Receiving Party shall:

- Keep Confidential Information strictly confidential.
- Use Confidential Information solely for the Project.
- Implement reasonable security measures.
- Prevent unauthorized disclosure.

4. DATA PROTECTION

Both parties shall comply with all applicable UK GDPR and Data Protection Act 2018 requirements when processing personal data.

5. EXCEPTIONS

This Agreement does not apply to information which:

- Is publicly available.
- Was already known before disclosure.
- Is received lawfully from a third party.
- Is independently developed.

6. RETURN OR DESTRUCTION

Upon request, the Receiving Party shall promptly return, destroy or permanently delete all Confidential Information.

7. SURVIVAL CLAUSE

Confidentiality obligations shall survive termination of the Project and remain effective for five (5) years following the final disclosure.

8. INJUNCTIVE RELIEF

The parties acknowledge that unauthorized disclosure may cause irreparable harm and that injunctive relief may be sought without prejudice to other remedies.

9. ENTIRE AGREEMENT

This Agreement constitutes the entire understanding between the parties regarding confidentiality.

10. GOVERNING LAW

This Agreement shall be governed by the laws of ${form.governingLaw}.

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

1. PROJECT BACKGROUND

This Statement of Work defines the services, deliverables, commercial arrangements and responsibilities associated with the Project.

2. SCOPE OF SERVICES

${form.scope || "[Describe services in detail]"}

3. DELIVERABLES

${form.deadlines || "[Describe deliverables]"}

4. MILESTONES

Key project milestones shall be agreed between the parties and tracked throughout the Project.

5. ACCEPTANCE CRITERIA

Deliverables shall be deemed accepted unless written rejection is received within seven (7) business days.

6. CHANGE REQUESTS

Any material changes to scope, timeline, deliverables or pricing must be agreed in writing before implementation.

7. CLIENT RESPONSIBILITIES

The Client shall:

- Provide timely information.
- Provide feedback.
- Supply necessary access and approvals.
- Cooperate reasonably with the Contractor.

8. PAYMENT SCHEDULE

Contract Value: £${form.paymentAmount || "[Amount]"}

Payment Terms:
${form.paymentTerms} days from invoice date.

9. GOVERNING LAW

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
FREELANCE SERVICE AGREEMENT (IR35-ORIENTED)

Date: ${today}

Client:
${form.clientName || "[Client Name]"}

Independent Contractor:
${form.freelancerName || "[Freelancer Name]"}

Project:
${form.projectTitle || "[Project Title]"}

1. SERVICES

${form.scope || "[Describe services]"}

2. INDEPENDENT BUSINESS STATUS

The Contractor operates an independent business and is not an employee, worker, partner or agent of the Client.

3. RIGHT OF SUBSTITUTION

The Contractor may provide a suitably qualified substitute to perform all or part of the Services.

${form.substitutionClause || "[Substitution details]"}

4. NO MUTUALITY OF OBLIGATION

The Client is under no obligation to provide future work and the Contractor is under no obligation to accept future work.

5. CONTRACTOR CONTROL

The Contractor shall determine how, when and where the Services are performed.

6. EQUIPMENT AND INSURANCE

The Contractor shall provide their own equipment and maintain appropriate business insurance where required.

7. TAX RESPONSIBILITY

The Contractor remains solely responsible for taxes, National Insurance contributions and VAT obligations.

8. PAYMENT

Amount: £${form.paymentAmount || "[Amount]"}

Payment Terms:
${form.paymentTerms} days.

9. INTELLECTUAL PROPERTY

Upon receipt of full payment, intellectual property rights created specifically for the Project shall transfer to the Client.

10. CONFIDENTIALITY

Both parties agree to protect confidential information.

11. TERMINATION

Either party may terminate this Agreement upon written notice where there is material breach or by mutual agreement.

12. LIMITATION OF LIABILITY

Neither party shall be liable for indirect, consequential or special damages except where prohibited by law.

13. GOVERNING LAW

This Agreement shall be governed by the laws of ${form.governingLaw}.

IMPORTANT IR35 NOTICE

This template contains provisions commonly associated with independent contractor engagements but does not guarantee IR35 compliance.

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

This letter constitutes a FINAL DEMAND FOR PAYMENT.

Despite previous reminders, the above invoice remains unpaid.

You are required to pay the outstanding balance of £${form.debtAmount || "[Amount]"} within seven (7) days from the date of this letter.

STATUTORY INTEREST

Where applicable, statutory interest and compensation may be claimed under relevant UK late payment legislation.

FAILURE TO PAY

Failure to make payment may result in:

- Debt recovery proceedings.
- Referral to a collection agency.
- Court proceedings.
- Recovery of interest and costs.

PRE-LEGAL ACTION NOTICE

This correspondence may be relied upon as evidence that reasonable attempts were made to recover the debt before commencing legal proceedings.

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

   
