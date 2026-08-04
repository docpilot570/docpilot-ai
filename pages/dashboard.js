export default function Dashboard() {
  return (
    <div style={{
      maxWidth: 900,
      margin: "40px auto",
      padding: "0 20px",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1>My Dashboard</h1>

      <p>
        Welcome back! Here you can manage your subscription and access your business document templates.
      </p>

      <div style={{
        marginTop: 30,
        padding: 30,
        border: "1px solid #4CAF50",
        borderRadius: 12,
        backgroundColor: "#f9fff9"
      }}>
        <h2>Active Subscription</h2>

        <p style={{
          color: "#666",
          fontSize: "17px",
          lineHeight: "1.6"
        }}>
          You don't have an active subscription yet.
          <br /><br />

          Choose one of our subscription plans to get started.

          <br /><br />

          Once your payment is confirmed, we'll activate your account and provide access to all document templates included in your plan.
        </p>
      </div>

      <div style={{
        marginTop: 40,
        padding: 25,
        backgroundColor: "#f5f5f5",
        borderRadius: 8
      }}>
        <h3>How it works</h3>

        <ol>
          <li>Choose the subscription plan that best fits your needs.</li>
          <li>Complete your payment securely.</li>
          <li>We'll verify your payment and activate your account.</li>
          <li>Your document templates will become available in this dashboard.</li>
        </ol>
      </div>

      <div style={{ marginTop: 40 }}>
        <a href="/pricing" style={{ marginRight: 20 }}>
          ← View Pricing
        </a>

        <a href="/">
          Back to Home
        </a>
      </div>
    </div>
  );
}

