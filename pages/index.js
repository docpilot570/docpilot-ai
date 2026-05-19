export default function Home() {
  const linkStyle = {
    marginRight: 15,
    textDecoration: "none",
    color: "#000",
  };

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "60px auto",
        fontFamily: "Arial, sans-serif",
        padding: "0 20px",
      }}
    >
      <h1 style={{ textAlign: "center", fontSize: 42, marginBottom: 10 }}>
        DocPilot AI
      </h1>

      <p style={{ textAlign: "center", fontSize: 18, marginTop: 0 }}>
        UK freelancer contracts and business documents in 5 minutes
      </p>

      <div style={{ textAlign: "center", marginTop: 30 }}>
        <a href="/demo">
          <button
            style={{
              padding: "14px 28px",
              fontSize: 18,
              cursor: "pointer",
              marginRight: 12,
            }}
          >
            Try Demo
          </button>
        </a>

        <a href="/generator">
          <button
            style={{
              padding: "14px 28px",
              fontSize: 18,
              cursor: "pointer",
              background: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: 6,
            }}
          >
            UK Freelancer Generator (DOCX)
          </button>
        </a>
      </div>

      <div
        style={{
          marginTop: 50,
          padding: 20,
          background: "#f5f5f5",
          borderRadius: 10,
        }}
      >
        <h2>What is DocPilot AI?</h2>
        <p>
          DocPilot AI is an online service that helps freelancers and sole
          traders generate UK business documents in minutes.
        </p>

        <p>
          Includes: UK NDA, Statement of Work (SOW), Freelance Service Agreement
          (IR35-friendly clauses), Late Payment Demand Letter.
        </p>

        <h2>How it works</h2>
        <ol>
          <li>Select document type</li>
          <li>Enter your details</li>
          <li>Download as DOCX</li>
        </ol>

        <h2>Supported markets</h2>
        <p>United Kingdom (England & Wales / Scotland)</p>
      </div>

      <div style={{ marginTop: 50 }}>
        <h2>Pricing</h2>
        <p>Choose your plan to unlock premium UK freelancer templates.</p>
        <p>
          <a href="/pricing">View pricing plans</a>
        </p>
      </div>

      <div style={{ marginTop: 50 }}>
        <h2>Contact</h2>
        <p>Email: docpilot.ai.service@gmail.com</p>
      </div>

      <hr style={{ marginTop: 50 }} />

      <div style={{ marginTop: 20, fontSize: 16, textAlign: "center" }}>
        <a href="/demo" style={linkStyle}>
          Demo
        </a>

        <a href="/pricing" style={linkStyle}>
          Pricing
        </a>

        <a href="/dashboard" style={linkStyle}>
          Dashboard
        </a>

        <a href="/generator" style={linkStyle}>
          Generator
        </a>

        <a href="/terms" style={linkStyle}>
          Terms
        </a>

        <a href="/privacy" style={linkStyle}>
          Privacy
        </a>

        <a href="/contact" style={{ textDecoration: "none", color: "#000" }}>
          Contact
        </a>
      </div>
    </div>
  );
}
