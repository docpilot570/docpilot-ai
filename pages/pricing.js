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
        maxWidth: 900,
        margin: "40px auto",
        fontFamily: "Arial, sans-serif",
        padding: "0 20px"
      }}
    >
      <h1>Pricing</h1>

      <p>
        Choose the plan that fits your workflow.  
        Payments are processed securely via Payhip (GBP).
      </p>

      <h2 style={{ marginTop: 40 }}>Individual Plans</h2>

      {/* STARTER */}
      <div style={cardStyle}>
        <h2>Starter</h2>
        <p style={{ fontSize: 22 }}>
          <b>£9.99 / month</b>
        </p>

        <ul>
          <li>Basic document generation</li>
          <li>NDA Generator</li>
          <li>SOW Generator</li>
          <li>Invoice Generator</li>
          <li>PDF + DOCX Export</li>
          <li>Copy to Clipboard</li>
          <li>Limited monthly generations</li>
          <li>Standard support</li>
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
          <b>£289 / year</b> — Save £70.88
        </p>

        <ul>
          <li>Everything in Starter</li>
          <li>Unlimited document generation</li>
          <li>Premium templates</li>
          <li>No watermark</li>
          <li>Faster document generation</li>
          <li>Premium PDF formatting</li>
          <li>Priority support</li>
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
          <b>£576 / year</b> — Save £143.88
        </p>

        <ul>
          <li>Everything in Pro</li>
          <li>Commercial usage rights</li>
          <li>Unlimited premium templates</li>
          <li>Advanced business templates</li>
          <li>Premium formatting</li>
          <li>Priority generation queue</li>
          <li>Business document suite</li>
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
      </h2>{/* AGENCY */}
      <div style={cardStyle}>
        <h2>Agency / Team</h2>

        <p style={{ fontSize: 22 }}>
          <b>£100 / month</b>
        </p>

        <p>
          <b>£1000 / year</b> — Save £200
        </p>

        <ul>
          <li>Everything in Business</li>
          <li>Up to 5 team members</li>
          <li>Shared document archive</li>
          <li>Custom company watermarks</li>
          <li>Priority generation queue</li>
          <li>Google Drive integration</li>
          <li>Team collaboration workspace</li>
          <li>Shared access management</li>
        </ul>

        <a
          href="#"
          style={buttonStyle}
        >
          Agency Plan — £100
        </a>
      </div>

      {/* WHITE LABEL */}
      <div style={cardStyle}>
        <h2>White Label Enterprise</h2>

        <p style={{ fontSize: 22 }}>
          <b>£200 / month</b>
        </p>

        <p>
          <b>Custom Enterprise Annual Contracts Available</b>
        </p>

        <ul>
          <li>Everything in Agency Plan</li>
          <li>Full white label deployment</li>
          <li>Complete removal of DocPilot branding</li>
          <li>Runs on your branded subdomain</li>
          <li>Corporate color customization</li>
          <li>Upload your own company logo</li>
          <li>Unlimited team access</li>
          <li>Multi-user simultaneous generation</li>
          <li>Client portal with branded approval workflow</li>
          <li>Send SOW approval links directly to clients</li>
          <li>Dedicated onboarding support</li>
          <li>Enterprise support</li>
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


