import { useState } from "react";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel
} from "docx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

export default function Generator() {

  const [docType, setDocType] = useState("nda");

  const [form, setForm] = useState({

    freelancerName: "",
    clientName: "",
    projectTitle: "",

    scope: "",
    deliverables: "",
    milestones: "",

    paymentAmount: "",
    paymentTerms: "14",

    governingLaw: "England & Wales",

    confidentialInfo: "",

    substitutionClause: "",

    invoiceNumber: "",
    debtAmount: "",

    proposalObjective: "",
    proposalTimeline: "",
    proposalBudget: "",

    invoiceDueDate: "",

    businessAddress: "",

  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function visibleFields() {

    if (docType === "nda") {
      return [
        "freelancerName",
        "clientName",
        "projectTitle",
        "confidentialInfo"
      ];
    }

    if (docType === "sow") {
      return [
        "freelancerName",
        "clientName",
        "projectTitle",
        "scope",
        "deliverables",
        "milestones",
        "paymentAmount"
      ];
    }

    if (docType === "agreement") {
      return [
        "freelancerName",
        "clientName",
        "projectTitle",
        "scope",
        "substitutionClause",
        "paymentAmount"
      ];
    }

    if (docType === "latepayment") {
      return [
        "freelancerName",
        "clientName",
        "invoiceNumber",
        "debtAmount"
      ];
    }

    if (docType === "invoice") {
      return [
        "freelancerName",
        "clientName",
        "invoiceNumber",
        "paymentAmount",
        "invoiceDueDate",
        "businessAddress"
      ];
    }

    if (docType === "proposal") {
      return [
        "freelancerName",
        "clientName",
        "projectTitle",
        "proposalObjective",
        "proposalTimeline",
        "proposalBudget"
      ];
    }

    return [];
  }

  function fieldLabel(name) {

    const labels = {

      freelancerName: "Your Name",

      clientName: "Client Name",

      projectTitle: "Project Title",

      scope: "Scope of Work",

      deliverables: "Deliverables",

      milestones: "Milestones",

      paymentAmount: "Payment Amount (£)",

      confidentialInfo: "Confidential Information",

      substitutionClause: "Substitution Clause",

      invoiceNumber: "Invoice Number",

      debtAmount: "Outstanding Amount",

      proposalObjective: "Proposal Objective",

      proposalTimeline: "Timeline",

      proposalBudget: "Budget",

      invoiceDueDate: "Due Date",

      businessAddress: "Business Address"

    };

    return labels[name];
  }

  function renderField(field) {

    const textareaFields = [
      "scope",
      "deliverables",
      "milestones",
      "confidentialInfo",
      "substitutionClause",
      "proposalObjective"
    ];

    if (textareaFields.includes(field)) {
      return (
        <textarea
          name={field}
          value={form[field]}
          onChange={handleChange}
          placeholder={fieldLabel(field)}
          style={{
            width: "100%",
            padding: 12,
            marginTop: 10,
            minHeight: 90,
            borderRadius: 8
          }}
        />
      );
    }

    return (
      <input
        name={field}
        value={form[field]}
        onChange={handleChange}
        placeholder={fieldLabel(field)}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 10,
          borderRadius: 8
        }}
      />
    );
  }

  function generateText() {

    const today = new Date().toLocaleDateString("en-GB");
if (docType === "nda") {
      return `
PROFESSIONAL NON-DISCLOSURE AGREEMENT (NDA)

Date: ${today}

PARTIES

Disclosing Party:
${form.clientName || "[Client Name]"}

Receiving Party:
${form.freelancerName || "[Freelancer Name]"}

Project:
${form.projectTitle || "[Project Title]"}

1. DEFINITION OF CONFIDENTIAL INFORMATION

Confidential Information means all commercial, financial, technical, legal, strategic, software, customer, supplier, operational and proprietary information disclosed in connection with the Project.

Specific Confidential Information:
${form.confidentialInfo || "[Insert confidential information]"}

2. PERMITTED DISCLOSURE

Confidential Information may only be disclosed to employees, advisers or subcontractors strictly requiring access for execution of the Project and bound by equivalent confidentiality obligations.

3. OBLIGATIONS OF RECEIVING PARTY

The Receiving Party shall:

- Maintain strict confidentiality
- Use information solely for Project execution
- Prevent unauthorized access
- Apply commercially reasonable security safeguards

4. DATA PROTECTION

Both parties agree to comply with UK GDPR, Data Protection Act 2018 and any applicable privacy legislation.

5. EXCLUSIONS

This Agreement does not apply to information that:

- Is publicly available
- Was already lawfully known
- Was independently developed
- Was lawfully obtained from third parties

6. RETURN OR DESTRUCTION

Upon written request, all confidential information must be immediately returned, deleted or permanently destroyed.

7. SURVIVAL CLAUSE

Confidentiality obligations survive termination of the Project and remain enforceable for five (5) years.

8. ENTIRE AGREEMENT

This Agreement constitutes the complete understanding between the parties concerning confidentiality obligations.

9. INJUNCTIVE RELIEF

Unauthorized disclosure may cause irreparable harm and entitle the disclosing party to seek injunctive relief without limitation.

10. GOVERNING LAW

This Agreement shall be governed by the laws of ${form.governingLaw}.

SIGNATURES

Client: _______________________

Contractor: ___________________

DISCLAIMER:
Template provided for informational purposes only. Legal review recommended.
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
${form.projectTitle || "[Project Name]"}

1. PROJECT BACKGROUND

This Statement of Work defines commercial terms, deliverables, timelines and project responsibilities.

2. SCOPE OF SERVICES

${form.scope || "[Describe services]"}

3. DELIVERABLES

${form.deliverables || "[Insert deliverables]"}

4. PROJECT MILESTONES

${form.milestones || "[Insert milestones]"}

5. ACCEPTANCE CRITERIA

Deliverables shall be deemed accepted unless written rejection is submitted within seven (7) business days.

6. CHANGE REQUESTS

All material changes affecting cost, timing, scope or deliverables must be approved in writing.

7. CLIENT RESPONSIBILITIES

The Client shall:

- Provide access to required systems
- Deliver timely feedback
- Supply information necessary for project completion
- Cooperate professionally

8. PAYMENT SCHEDULE

Total Project Value:
£${form.paymentAmount || "[Amount]"}

Payment Terms:
${form.paymentTerms} days after invoice date.

9. GOVERNING LAW

Governed under laws of ${form.governingLaw}

SIGNATURES

Client: _______________________

Contractor: ___________________

DISCLAIMER:
Template provided for informational purposes only.
`.trim();
    }


    if (docType === "agreement") {
      return `
FREELANCE SERVICE AGREEMENT (IR35 ORIENTED)

Date: ${today}

Client:
${form.clientName || "[Client Name]"}

Independent Contractor:
${form.freelancerName || "[Contractor Name]"}

Project:
${form.projectTitle || "[Project Title]"}

1. SERVICES

${form.scope || "[Insert services]"}

2. RIGHT OF SUBSTITUTION

The Contractor may provide a suitably qualified substitute to perform services.

${form.substitutionClause || "[Substitution details]"}

3. NO MUTUALITY OF OBLIGATION

The Client is not obligated to provide future work.

The Contractor is not obligated to accept future work.

4. CONTRACTOR CONTROL

The Contractor determines independently how, when and where work is performed.

5. INDEPENDENT BUSINESS STATUS

Contractor operates as an independent business entity and is not an employee, worker or agent.

6. EQUIPMENT AND INSURANCE

The Contractor supplies all equipment and maintains business insurance where necessary.

7. TAX RESPONSIBILITY

Contractor remains fully responsible for all taxes, VAT and National Insurance obligations.

8. INTELLECTUAL PROPERTY

IP rights transfer only upon full payment.

9. TERMINATION CLAUSE

Either party may terminate upon material breach or written agreement.

10. LIMITATION OF LIABILITY

Neither party shall be liable for indirect or consequential damages.

11. PAYMENT

Amount:
£${form.paymentAmount || "[Amount]"}

Payment Terms:
${form.paymentTerms} days.

12. GOVERNING LAW

Governed under laws of ${form.governingLaw}

IMPORTANT IR35 NOTICE

Template contains contractor-oriented provisions but does not guarantee IR35 compliance.

SIGNATURES

Client: _______________________

Contractor: ___________________

DISCLAIMER:
Legal and tax review recommended.
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

NOTICE

This letter constitutes formal final demand for immediate payment.

Despite previous reminders, the outstanding balance remains unpaid.

You are required to pay the full amount of:

£${form.debtAmount || "[Amount]"}

within seven (7) calendar days from receipt of this notice.

STATUTORY RIGHTS

Where applicable, statutory interest and compensation may be claimed under relevant UK Late Payment legislation.

FAILURE TO PAY MAY RESULT IN:

- Debt collection proceedings
- Legal proceedings
- Court judgment
- Recovery of legal fees and statutory interest

PRE-ACTION NOTICE

This notice may be relied upon in legal proceedings as evidence that reasonable collection attempts were made prior to litigation.

Signed:

${form.freelancerName || "[Your Name]"}

DISCLAIMER:
Template provided for informational purposes only.
`.trim();
    }


    if (docType === "invoice") {
      return `
COMMERCIAL INVOICE

Invoice Number:
${form.invoiceNumber || "[Invoice Number]"}

Date:
${today}

From:

${form.freelancerName || "[Business Name]"}

Business Address:

${form.businessAddress || "[Business Address]"}

Bill To:

${form.clientName || "[Client Name]"}

DESCRIPTION OF SERVICES

Professional consulting / freelance services delivered as agreed.

TOTAL AMOUNT DUE

£${form.paymentAmount || "[Amount]"}

PAYMENT DUE DATE

${form.invoiceDueDate || "[Insert Due Date]"}

PAYMENT TERMS

Payment due within ${form.paymentTerms} days.

BANK DETAILS

[Insert payment details]

LATE PAYMENT

Late payment may incur statutory interest and collection costs.

Thank you for your business.

Generated by DocPilot AI
`.trim();
    }


    if (docType === "proposal") {
      return `
BUSINESS PROPOSAL

Date:
${today}

Prepared For:

${form.clientName || "[Client Name]"}

Prepared By:

${form.freelancerName || "[Your Business Name]"}

Project:

${form.projectTitle || "[Project Title]"}

EXECUTIVE SUMMARY

This proposal outlines the professional services offered in relation to the project.

OBJECTIVE

${form.proposalObjective || "[Insert objective]"}

PROJECT APPROACH

The project shall be executed using best commercial practices, structured planning and professional delivery standards.

TIMELINE

${form.proposalTimeline || "[Insert timeline]"}

PROJECT INVESTMENT

£${form.proposalBudget || "[Budget]"}

DELIVERABLES

The final deliverables shall be provided in accordance with agreed milestones.

COMMERCIAL TERMS

- Fixed scope unless amended in writing
- Payment according to invoice schedule
- Change requests billed separately

VALIDITY

This proposal remains valid for thirty (30) days.

We appreciate the opportunity to work together.

Signed:

${form.freelancerName || "[Your Name]"}

Generated by DocPilot AI
`.trim();
    }

    return "";
  }

  const generated = generateText();
async function downloadDocx() {

    const lines = generated.split("\n");

    const paragraphs = lines.map((line) => {

      const upper = line === line.toUpperCase() && line.length > 3;

      if (upper) {
        return new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [
            new TextRun({
              text: line,
              bold: true
            })
          ],
          spacing: {
            after: 200
          }
        });
      }

      return new Paragraph({
        children: [
          new TextRun({
            text: line,
            size: 22
          })
        ],
        spacing: {
          after: 120
        }
      });
    });

    const doc = new Document({
      sections: [
        {
          children: paragraphs
        }
      ]
    });

    const blob = await Packer.toBlob(doc);

    saveAs(
      blob,
      `DocPilot-${docType}-${new Date().toISOString().slice(0,10)}.docx`
    );
  }


  function downloadPdf() {

    const pdf = new jsPDF();

    const lines = generated.split("\n");

    let y = 20;

    pdf.setFont("helvetica");

    lines.forEach((line) => {

      const upper = line === line.toUpperCase() && line.length > 3;

      if (upper) {
        pdf.setFontSize(14);
      } else {
        pdf.setFontSize(11);
      }

      const wrapped = pdf.splitTextToSize(line, 180);

      pdf.text(wrapped, 15, y);

      y += wrapped.length * 7;

      if (y > 270) {
        pdf.addPage();
        y = 20;
      }
    });

    pdf.save(
      `DocPilot-${docType}-${new Date().toISOString().slice(0,10)}.pdf`
    );
  }


  function copyDocument() {
    navigator.clipboard.writeText(generated);
    alert("Document copied");
  }


  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "40px auto",
        padding: "30px",
        fontFamily: "Arial",
        background: "#fafafa"
      }}
    >

      <h1
        style={{
          fontSize: 42,
          marginBottom: 10
        }}
      >
        DocPilot AI Professional
      </h1>

      <p
        style={{
          marginBottom: 25,
          color: "#555"
        }}
      >
        Professional UK Legal & Business Document Generator
      </p>


      <select
        value={docType}
        onChange={(e)=>setDocType(e.target.value)}
        style={{
          width: "100%",
          padding: 14,
          borderRadius: 8
        }}
      >
        <option value="nda">NDA Agreement</option>
        <option value="sow">Statement of Work</option>
        <option value="agreement">IR35 Agreement</option>
        <option value="latepayment">Late Payment Letter</option>
        <option value="invoice">Invoice Generator</option>
        <option value="proposal">Business Proposal</option>
      </select>


      <h2
        style={{
          marginTop: 30
        }}
      >
        Fill Document Details
      </h2>


      {visibleFields().map((field)=>(
        <div key={field}>
          {renderField(field)}
        </div>
      ))}


      <select
        name="paymentTerms"
        value={form.paymentTerms}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: 14,
          marginTop: 15,
          borderRadius: 8
        }}
      >
        <option value="7">7 Days</option>
        <option value="14">14 Days</option>
        <option value="30">30 Days</option>
      </select>


      <select
        name="governingLaw"
        value={form.governingLaw}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: 14,
          marginTop: 15,
          borderRadius: 8
        }}
      >
        <option value="England & Wales">England & Wales</option>
        <option value="Scotland">Scotland</option>
      </select>


      <h2
        style={{
          marginTop: 40
        }}
      >
        Generated Document
      </h2>


      <textarea
        value={generated}
        readOnly
        style={{
          width: "100%",
          minHeight: 420,
          padding: 20,
          marginTop: 10,
          background: "#f4f4f4",
          whiteSpace: "pre-wrap",
          fontFamily: "Courier New",
          borderRadius: 8
        }}
      />


      <div
        style={{
          marginTop: 25
        }}
      >

        <button
          onClick={downloadDocx}
          style={{
            padding: "14px 28px",
            background: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 18
          }}
        >
          📥 DOCX
        </button>


        <button
          onClick={downloadPdf}
          style={{
            padding: "14px 28px",
            background: "#ff9800",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 18,
            marginLeft: 10
          }}
        >
          📄 PDF
        </button>


        <button
          onClick={copyDocument}
          style={{
            padding: "14px 28px",
            background: "#2196F3",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 18,
            marginLeft: 10
          }}
        >
          📋 Copy
        </button>

      </div>


      <p
        style={{
          marginTop: 30,
          fontSize: 13,
          color: "#666"
        }}
      >
        Professional templates generated by DocPilot AI.
        These documents are provided for informational purposes only and do not constitute legal advice.
      </p>

    </div>
  );
}
