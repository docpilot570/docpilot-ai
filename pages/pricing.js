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
      </h2>


