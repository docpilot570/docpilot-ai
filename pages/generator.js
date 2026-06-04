import { useState } from "react";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export default function Generator() {
  const [docType, setDocType] = useState("nda");

  const [form, setForm] = useState({
    freelancerName: "",
    companyName: "",
    companyAddress: "",
    clientName: "",
    clientAddress: "",
    projectTitle: "",
    scope: "",
    deadlines: "",
    deliverables: "",
    milestones: "",
    confidentialInfo: "",
    substitutionClause: "",
    paymentAmount: "",
    paymentTerms: "14",
    governingLaw: "England & Wales",
    invoiceNumber: "",
    invoiceDate: "",
    dueDate: "",
    debtAmount: "",
    proposalObjective: "",
    proposalTimeline: "",
    proposalBudget: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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

"Confidential Information" means all commercial, financial, technical, strategic, operational, customer, supplier, product, software, marketing and proprietary information disclosed in connection with the Project.

Specific Confidential Information:

${form.confidentialInfo || "[Insert confidential information details]"}

2. PERMITTED DISCLOSURE

Confidential Information may only be disclosed to employees, advisers, consultants or subcontractors who require access for Project purposes and who are bound by confidentiality obligations.

3. CONFIDENTIALITY OBLIGATIONS

The Receiving Party shall:

- Keep information confidential.
- Use information solely for the Project.
- Prevent unauthorised disclosure.
- Apply reasonable security measures.

4. DATA PROTECTION

Both parties shall comply with UK GDPR and Data Protection Act 2018 requirements.

5. EXCEPTIONS

This Agreement shall not apply where information:

- Is publicly available.
- Was already known.
- Is received lawfully from a third party.
- Is independently developed.

6. RETURN OR DESTRUCTION

Upon request, Confidential Information shall be returned, destroyed or permanently deleted.

7. SURVIVAL CLAUSE

Confidentiality obligations survive termination and remain effective for five (5) years.

8. INJUNCTIVE RELIEF

The parties acknowledge that unauthorised disclosure may cause irreparable harm and entitle the disclosing party to injunctive relief.

9. ENTIRE AGREEMENT

This Agreement constitutes the entire understanding regarding confidentiality.

10. GOVERNING LAW

This Agreement shall be governed by the laws of ${form.governingLaw}.

SIGNATURES

Client: ______________________________

Contractor: __________________________

DISCLAIMER:
This document template is provided for informational purposes only and does not constitute legal advice.
`.trim();
    }

    if (docType === "sow") {
      return `
STATEMENT OF WORK (SOW)

Date: ${today}

Client:
${form.clientName || "[Client Name]"}

Contractor:
${form.freelancerName || "[Contractor Name]"}

Project:
${form.projectTitle || "[Project Title]"}

1. PROJECT BACKGROUND

This Statement of Work defines the services, deliverables, milestones and commercial terms applicable to the Project.

2. SCOPE OF SERVICES

${form.scope || "[Describe services in detail]"}

3. DELIVERABLES

${form.deliverables || "[Describe deliverables]"}

4. MILESTONES

${form.milestones || "[Describe milestones]"}

5. ACCEPTANCE CRITERIA

Deliverables shall be deemed accepted unless written rejection is received within seven (7) business days.

6. CHANGE REQUESTS

Any change affecting scope, budget, deliverables or schedule must be agreed in writing.

7. CLIENT RESPONSIBILITIES

The Client shall:

- Provide timely information.
- Provide approvals and feedback.
- Grant required access.
- Cooperate reasonably.

8. PAYMENT SCHEDULE

Project Value:

£${form.paymentAmount || "[Amount]"}

Payment Terms:

${form.paymentTerms} days from invoice date.

9. GOVERNING LAW

This Statement of Work shall be governed by the laws of ${form.governingLaw}.

SIGNATURES

Client: ______________________________

Contractor: __________________________

DISCLAIMER:
This document template is provided for informational purposes only and does not constitute legal advice.
`.trim();
    }
if (docType === "agreement") {
      return `
FREELANCE SERVICE AGREEMENT (IR35-ORIENTED)

Date: ${today}

Client:
${form.clientName || "[Client Name]"}

Independent Contractor:
${form.freelancerName || "[Contractor Name]"}

Project:
${form.projectTitle || "[Project Title]"}

1. SERVICES

${form.scope || "[Describe services]"}

2. INDEPENDENT BUSINESS STATUS

The Contractor operates as an independent business and is not an employee, worker, partner or agent of the Client.

3. RIGHT OF SUBSTITUTION

The Contractor may provide a suitably qualified substitute to perform the Services.

${form.substitutionClause || "[Substitution details]"}

4. NO MUTUALITY OF OBLIGATION

The Client is under no obligation to offer additional work and the Contractor is under no obligation to accept additional work.

5. CONTRACTOR CONTROL

The Contractor shall determine how, where and when the Services are performed.

6. EQUIPMENT AND INSURANCE

The Contractor shall provide their own equipment and maintain appropriate business insurance.

7. TAX RESPONSIBILITY

The Contractor shall remain solely responsible for taxes, National Insurance contributions and VAT obligations.

8. PAYMENT

Amount:

£${form.paymentAmount || "[Amount]"}

Payment Terms:

${form.paymentTerms} days.

9. INTELLECTUAL PROPERTY

Intellectual Property created specifically for the Project shall transfer upon full payment.

10. CONFIDENTIALITY

Both parties agree to maintain confidentiality of non-public information.

11. TERMINATION

Either party may terminate this Agreement by written notice in the event of material breach.

12. LIMITATION OF LIABILITY

Neither party shall be liable for indirect or consequential losses except where prohibited by law.

13. GOVERNING LAW

This Agreement shall be governed by the laws of ${form.governingLaw}.

IMPORTANT IR35 NOTICE

This Agreement includes contractor-oriented provisions but does not guarantee IR35 compliance.

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

You are required to pay the outstanding balance of:

£${form.debtAmount || "[Amount]"}

within seven (7) days from the date of this letter.

STATUTORY INTEREST

Where applicable, statutory interest and compensation may be claimed under UK legislation.

FAILURE TO PAY

Failure to make payment may result in:

- Debt recovery proceedings
- Referral to a collection agency
- Court proceedings
- Recovery of interest and legal costs

PRE-LEGAL ACTION NOTICE

This correspondence may be relied upon as evidence that reasonable attempts were made to recover the debt before commencing legal proceedings.

Yours faithfully,

${form.freelancerName || "[Your Name]"}

DISCLAIMER:
This template is provided for informational purposes only and does not constitute legal advice.
`.trim();
    }

    if (docType === "invoice") {
      return `
PROFESSIONAL INVOICE

Invoice Number:
${form.invoiceNumber || "[Invoice Number]"}

Invoice Date:
${form.invoiceDate || "[Invoice Date]"}

Due Date:
${form.dueDate || "[Due Date]"}

Supplier:

${form.freelancerName || "[Your Name]"}

${form.companyName || "[Company Name]"}

Client:

${form.clientName || "[Client Name]"}

Project:

${form.projectTitle || "[Project Title]"}

DESCRIPTION OF SERVICES

${form.scope || "[Description of services]"}

TOTAL AMOUNT DUE

£${form.paymentAmount || "[Amount]"}

PAYMENT TERMS

${form.paymentTerms} days.

Thank you for your business.
`.trim();
    }

    if (docType === "proposal") {
      return `
BUSINESS PROPOSAL

Date: ${today}

Prepared For:

${form.clientName || "[Client Name]"}

Prepared By:

${form.freelancerName || "[Your Name]"}

Project:

${form.projectTitle || "[Project Title]"}

EXECUTIVE SUMMARY

${form.proposalObjective || "[Project objective]"}

PROPOSED SOLUTION

${form.scope || "[Describe proposed solution]"}

DELIVERABLES

${form.deliverables || "[Deliverables]"}

TIMELINE

${form.proposalTimeline || "[Timeline]"}

PROJECT INVESTMENT

£${form.proposalBudget || form.paymentAmount || "[Amount]"}

WHY US

We will provide professional services, transparent communication, timely delivery and ongoing support.

NEXT STEPS

Upon acceptance, a formal agreement and project schedule will be issued.

Thank you for considering this proposal.
`.trim();
    }

    return "";
  }
const generated = generateText();
async function copyDocument() {
  try {
    await navigator.clipboard.writeText(generated);
    alert("Document copied to clipboard");
  } catch (err) {
    alert("Failed to copy document");
  }
}
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

    saveAs(
      blob,
      `DocPilot-${docType}-${new Date()
        .toISOString()
        .slice(0, 10)}.docx`
    );
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
      <h1 style={{ fontSize: 42 }}>
        DocPilot AI Generator (UK)
      </h1>

      <p>
        Create professional UK freelance documents in minutes.
      </p>

      <label style={{ display: "block", marginTop: 20 }}>
        <b>Select document type:</b>
      </label>

      <select
        value={docType}
        onChange={(e) => setDocType(e.target.value)}
        style={{
          padding: 12,
          marginTop: 10,
          width: "100%",
        }}
      >
        <option value="nda">
          NDA - Non-Disclosure Agreement
        </option>

        <option value="sow">
          SOW - Statement of Work
        </option>

        <option value="agreement">
          Freelance Service Agreement (IR35)
        </option>

        <option value="latepayment">
          Late Payment Demand Letter
        </option>

        <option value="invoice">
          Professional Invoice
        </option>

        <option value="proposal">
          Business Proposal
        </option>
      </select>

      <h2 style={{ marginTop: 30 }}>
        Fill details
      </h2>

      <input
        name="freelancerName"
        placeholder="Freelancer / Contractor Name"
        value={form.freelancerName}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 10,
        }}
      />

      <input
        name="companyName"
        placeholder="Company Name"
        value={form.companyName}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 10,
        }}
      />

      <input
        name="clientName"
        placeholder="Client Name"
        value={form.clientName}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 10,
        }}
      />

      <input
        name="projectTitle"
        placeholder="Project Title"
        value={form.projectTitle}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 10,
        }}
      />

      <textarea
        name="scope"
        placeholder="Scope of work"
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
        name="deliverables"
        placeholder="Deliverables"
        value={form.deliverables}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 10,
          minHeight: 80,
        }}
      />

      <textarea
        name="milestones"
        placeholder="Milestones"
        value={form.milestones}
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
        placeholder="Deadlines"
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
        name="confidentialInfo"
        placeholder="Confidential Information"
        value={form.confidentialInfo}
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
        placeholder="Substitution Clause"
        value={form.substitutionClause}
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
        placeholder="Amount (£)"
        value={form.paymentAmount}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 10,
        }}
      />

      <input
        name="invoiceNumber"
        placeholder="Invoice Number"
        value={form.invoiceNumber}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 10,
        }}
      />

      <input
        name="invoiceDate"
        placeholder="Invoice Date"
        value={form.invoiceDate}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 10,
        }}
      />

      <input
        name="dueDate"
        placeholder="Due Date"
        value={form.dueDate}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 10,
        }}
      />

      <input
        name="debtAmount"
        placeholder="Outstanding Amount (£)"
        value={form.debtAmount}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 10,
        }}
      />

      <textarea
        name="proposalObjective"
        placeholder="Proposal Objective"
        value={form.proposalObjective}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 10,
          minHeight: 80,
        }}
      />

      <textarea
        name="proposalTimeline"
        placeholder="Proposal Timeline"
        value={form.proposalTimeline}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 10,
          minHeight: 80,
        }}
      />

      <input
        name="proposalBudget"
        placeholder="Proposal Budget (£)"
        value={form.proposalBudget}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 10,
        }}
      />

      <select
        name="paymentTerms"
        value={form.paymentTerms}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 10,
        }}
      >
        <option value="7">7 days</option>
        <option value="14">14 days</option>
        <option value="30">30 days</option>
      </select>

      <select
        name="governingLaw"
        value={form.governingLaw}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 10,
        }}
      >
        <option value="England & Wales">
          England & Wales
        </option>

        <option value="Scotland">
          Scotland
        </option>
      </select>

      <h2 style={{ marginTop: 40 }}>
        Generated Document
      </h2>

      <textarea
        value={generated}
        readOnly
        style={{
          width: "100%",
          padding: 12,
          marginTop: 10,
          minHeight: 350,
          background: "#f4f4f4",
          fontFamily: "Courier New",
          whiteSpace: "pre-wrap",
        }}
      />

      <button
        onClick={downloadDocx}
        style={{
          padding: "14px 28px",
          fontSize: 18,
          cursor: "pointer",
          marginTop: 20,
          background: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: 8,
        }}
      >
        📥 Download DOCX
      </button>
          <button
  onClick={copyDocument}
  style={{
    padding: "14px 28px",
    fontSize: 18,
    cursor: "pointer",
    marginTop: 20,
    marginLeft: 10,
    background: "#2196F3",
    color: "#fff",
    border: "none",
    borderRadius: 8,
  }}
>
  📋 Copy Document
</button>
      
      <p
        style={{
          marginTop: 20,
          fontSize: 14,
          color: "#666",
        }}
      >
        Disclaimer: Templates are provided for informational
        purposes only and do not constitute legal advice.
      </p>
    </div>
  );
}
