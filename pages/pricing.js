export default function Pricing() {
  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: 10,
    padding: 20,
    marginTop: 20
  };

  const buttonStyle = {
    display: "inline-block",
    padding: "12px 24px",
    fontSize: 16,
    backgroundColor: "#4CAF50",
    color: "white",
    textDecoration: "none",
    borderRadius: 6,
    marginTop: 10
  };

  return (
    <div
      style={{
        maxWidth: 950,
        margin: "40px auto",
        fontFamily: "Arial, sans-serif",
        padding: "0 20px"
      }}
    >
      <h1>Pricing Plans</h1>

      <p>
        Choose the plan that matches your workflow. 
        Built for freelancers, agencies and enterprise teams.
      </p>

      <h2 style={{ marginTop: 40 }}>Individual Plans</h2>

      {/* STARTER */}
      <div style={cardStyle}>
        <h2>Starter</h2>

        <p style={{ fontSize: 22 }}>
          <b>£9.99 / month</b>
        </p>

        <p>
          Best for freelancers getting started
        </p>

        <ul>
          <li>30 AI document generations per month</li>
          <li>PDF Export</li>
          <li>Copy & Text Export</li>
          <li>Single User Access</li>
          <li>Standard Outside IR35 Contract Builder</li>
          <li>Unlimited NDA Generator</li>
          <li>Unlimited Late Payment Letter Generator</li>
          <li>Email Support</li>
        </ul>

        <a
          href="https://payhip.com/order?link=DWVGs&pricing_plan=2VGJjRRnGD"
          style={buttonStyle}
        >
          Buy Starter — £9.99
        </a>
      </div>

      {/* PRO */}
      <div style={cardStyle}>
        <h2>Pro</h2>

        <p style={{ fontSize: 22 }}>
          <b>£29.99 / month</b>
        </p>

        <p>
          <b>£289 / year</b> — Save £70+
        </p>

        <p>
          Best for active contractors and consultants
        </p>

        <ul>
          <li>100 AI document generations per month</li>
          <li>Full Editable DOCX (Microsoft Word)</li>
          <li>PDF + DOCX + Text Export</li>
          <li>Advanced Statement of Work Generator</li>
          <li>Client Profile Storage</li>
          <li>Save client data for future contracts</li>
          <li>Full document editing in MS Word</li>
          <li>Single User Access</li>
          <li>Priority Support</li>
        </ul>

        <a
          href="https://payhip.com/order?link=DWVGs&pricing_plan=20zAXXvwWr"
          style={buttonStyle}
        >
          Buy Pro — £29.99
        </a>
      </div>
{/* BUSINESS */}
      <div style={cardStyle}>
        <h2>Business</h2>

        <p style={{ fontSize: 22 }}>
          <b>£59.99 / month</b>
        </p>

        <p>
          <b>£576 / year</b> — Save £140+
        </p>

        <p>
          Best for growing companies and teams managing contractors
        </p>

        <ul>
          <li>Unlimited AI document generation</li>
          <li>Full DOCX + PDF + Text Export</li>
          <li>Up to 3 Team Seats</li>
          <li>AI Contract Risk Checker (IR35 Audit)</li>
          <li>AI Compliance Checker</li>
          <li>Bulk Document Generation</li>
          <li>Shared Team Access</li>
          <li>Priority Email Support</li>
          <li>Contractor Management Workflow</li>
        </ul>

        <a
          href="https://payhip.com/order?link=DWVGs&pricing_plan=nLWRaagvGa"
          style={buttonStyle}
        >
          Buy Business — £59.99
        </a>
      </div>

      <h2 style={{ marginTop: 50 }}>
        Business & Enterprise Solutions
      </h2>

      {/* AGENCY */}
      <div style={cardStyle}>
        <h2>Agency</h2>

        <p style={{ fontSize: 22 }}>
          <b>£99 / month</b>
        </p>

        <p>
          <b>£1000 / year</b> — Save £180+
        </p>

        <p>
          Best for growing agencies and collaborative teams
        </p>

        <ul>
          <li>Unlimited AI document generation for the team</li>
          <li>Up to 15 Team Seats</li>
          <li>Shared Company Dashboard & Archive</li>
          <li>Premium DOCX & PDF Export with Agency Details</li>
          <li>Automatic Company Details Injection</li>
          <li>AI Contract Risk Checker (IR35 Audits Included)</li>
          <li>Dedicated Account Manager</li>
          <li>SLA Priority Support</li>
        </ul>

        <a
          href="#"
          style={buttonStyle}
        >
          Agency Plan — £99
        </a>
      </div>
{/* WHITE LABEL */}
      <div style={cardStyle}>
        <h2>White Label Enterprise</h2>

        <p style={{ fontSize: 22 }}>
          <b>£199 / month</b>
        </p>

        <p>
          <b>Custom Enterprise Annual Contracts Available</b>
        </p>

        <p>
          Best for enterprise agencies and SaaS resellers
        </p>

        <ul>
          <li>100% White Label Solution</li>
          <li>Full Removal of DocPilot Branding</li>
          <li>Custom Domain Integration</li>
          <li>Custom Branding (Logo + Corporate Colors)</li>
          <li>Unlimited Team Seats</li>
          <li>Client Review & Approval Portal</li>
          <li>API Access (Beta)</li>
          <li>Resell the Platform Under Your Own Brand</li>
          <li>Dedicated Enterprise Support</li>
        </ul>

        <a
          href="#"
          style={buttonStyle}
        >
          Contact Sales
        </a>
      </div>

      <p style={{ marginTop: 40 }}>
        Need a custom enterprise solution? Contact us directly.
      </p>

      <div
        style={{
          marginTop: 30,
          textAlign: "center",
          fontSize: "15px"
        }}
      >
        <a href="/" style={{ marginRight: 15 }}>Home</a>
        <a href="/demo" style={{ marginRight: 15 }}>Demo</a>
        <a href="/pricing" style={{ marginRight: 15 }}>Pricing</a>
        <a
          href="/dashboard"
          style={{
            marginRight: 15,
            fontWeight: "bold",
            color: "#4CAF50"
          }}
        >
          Dashboard
        </a>
        <a href="/terms" style={{ marginRight: 15 }}>Terms</a>
        <a href="/privacy" style={{ marginRight: 15 }}>Privacy</a>
        <a href="/contact">Contact</a>
      </div>
    </div>
  );
}



