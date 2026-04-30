export default function Cancel() {
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
        Payment Cancelled ❌
      </h1>

      <p style={{ fontSize: "18px" }}>
        Your payment was cancelled. No charges were made.
      </p>

      <div
        style={{
          background: "#fef3c7",
          padding: "20px",
          borderRadius: "12px",
          marginTop: "20px",
        }}
      >
        <p style={{ margin: 0, fontSize: "16px" }}>
          If you experienced any issue during checkout, you can try again or
          contact support.
        </p>
      </div>

      <p style={{ marginTop: "20px", fontSize: "16px" }}>
        Support email:
        <br />
        <b>support@docpilot-ai.com</b>
      </p>

      <a
        href="/pricing"
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
        Return to Pricing
      </a>
    </div>
  );
}
