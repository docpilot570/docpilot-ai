export default function Home() {
  return (
    <div style={{
      maxWidth: 900,
      margin: "60px auto",
      fontFamily: "Arial, sans-serif",
      padding: "0 20px"
    }}>

      <h1 style={{textAlign: "center", fontSize: 42, marginBottom: 10}}>
        DocPilot AI
      </h1>

      <p style={{textAlign: "center", fontSize: 18, marginTop: 0}}>
        Business documents and reports in 5 minutes
      </p>

      <div style={{textAlign: "center", marginTop: 30}}>
        <a href="/demo">
          <button style={{
            padding: "14px 28px",
            fontSize: 18,
            cursor: "pointer"
          }}>
            Try Demo
          </button>
        </a>
      </div>

      <div style={{
        marginTop: 50,
        padding: 20,
        background: "#f5f5f5",
        borderRadius: 10
      }}>
        <h2>What is DocPilot AI?</h2>
        <p>
          DocPilot AI is an online service that helps you generate business documents using artificial intelligence.
          You can create contracts, invoices, business proposals, letters, reports and more.
        </p>

        <h2>How it works</h2>
        <ol>
          <li>Select document type</li>
          <li>Enter your details</li>
          <li>Generate a ready-to-use document</li>
        </ol>

        <h2>Supported languages</h2>
        <p>English, Ukrainian, Polish, German, Russian</p>
      </div>

      <div style={{marginTop: 50}}>
        <h2>Pricing</h2>
        <p>
          Payment integration via Paysera is in progress. Paid access will be available soon.
        </p>
        <p>
          <a href="/pricing">View pricing plans</a>
        </p>
      </div>

      <div style={{marginTop: 50}}>
        <h2>Contact</h2>
        <p>Email: docpilot.ai.service@gmail.com</p>
      </div>

      <hr style={{marginTop: 50}} />

      <div style={{marginTop: 20, fontSize: 16}}>
        <a href="/demo" style={{marginRight: 15}}>Demo</a>
        <a href="/pricing" style={{marginRight: 15}}>Pricing</a>
        <a href="/terms" style={{marginRight: 15}}>Terms</a>
        <a href="/privacy" style={{marginRight: 15}}>Privacy</a>
        <a href="/contact">Contact</a>
      </div>

    </div>
  );
}
