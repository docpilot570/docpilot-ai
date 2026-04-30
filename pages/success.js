export default function Success() {
  return (
    <div
      style={{
        padding: "50px 20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "700px",
        margin: "0 auto",
        lineHeight: 1.6,
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
        Payment Successful ✅
      </h1>

      <p style={{ fontSize: "18px" }}>
        Thank you for choosing <b>DocPilot AI</b>.
      </p>

      <div
        style={{
          background: "#f3f4f6",
          padding: "20px",
          borderRadius: "12px",
          marginTop: "20px",
        }}
      >
        <p style={{ margin: 0, fontSize: "16px" }}>
          Your payment has been received successfully.
        </p>
        <p style={{ margin: "10px 0 0 0", fontSize: "16px" }}>
          You will receive an email confirmation with next steps shortly.
        </p>
      </div>

      <p style={{ marginTop: "20px", fontSize: "16px" }}>
        If you have any questions, contact our support team:
        <br />
        <b>support@docpilot-ai.com</b>
      </p>

      <a
        href="/"
        style={{
          display: "inline-block",
          marginTop: "25px",
          padding: "12px 18px",
          background: "black",
          color: "white",
          borderRadius: "10px",
          textDecoration: "none",
        }}
      >
        Back to Home
      </a>
    </div>
  );
}
