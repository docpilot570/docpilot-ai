// components/Footer.js
export default function Footer() {
  return (
    <footer style={{
      marginTop: "60px",
      padding: "30px 20px",
      backgroundColor: "#f8f8f8",
      borderTop: "1px solid #ddd",
      fontSize: "13px",
      color: "#555",
      textAlign: "center",
      lineHeight: "1.6"
    }}>
      <div style={{maxWidth: "900px", margin: "0 auto"}}>
        <p>
          DocPilot AI generates documents using artificial intelligence. 
          All generated documents are for informational purposes only and 
          <strong> do not constitute legal advice</strong>. 
          Please consult a qualified lawyer before using any document.
        </p>

        <p style={{marginTop: "15px"}}>
          We process your data in accordance with 
          <strong> GDPR (EU) </strong> and 
          <strong> Data Protection Act (UK) </strong>. 
          Your data is secure and not shared with third parties without consent.
        </p>

        <div style={{marginTop: "20px"}}>
          <a href="/" style={{marginRight: 15}}>Home</a>
          <a href="/demo" style={{marginRight: 15}}>Demo</a>
          <a href="/pricing" style={{marginRight: 15}}>Pricing</a>
          <a href="/dashboard" style={{marginRight: 15}}>Dashboard</a>
          <a href="/terms" style={{marginRight: 15}}>Terms</a>
          <a href="/privacy" style={{marginRight: 15}}>Privacy</a>
          <a href="/contact">Contact</a>
        </div>

        <p style={{marginTop: "20px", fontSize: "12px"}}>
          © 2026 DocPilot AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
