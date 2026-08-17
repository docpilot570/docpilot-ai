export default function Success() {
  return (
    <div
      style={{
        padding: "50px 20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "700px",
        margin: "0 auto",
        lineHeight: 1.6,
        textAlign: "center",
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
          padding: "25px",
          borderRadius: "12px",
          marginTop: "25px",
        }}
      >
        <p style={{ fontSize: "17px" }}>
          Your payment has been received successfully.
        </p>

        <p style={{ fontSize: "17px" }}>
          Your access will be activated automatically.
        </p>

        <p style={{ fontSize: "17px" }}>
          Please use the email address you used during checkout to access your
          account.
        </p>
      </div>

      <a
        href="/dashboard"
        style={{
          display: "inline-block",
          marginTop: "25px",
          padding: "12px 22px",
          background: "#4CAF50",
          color: "white",
          borderRadius: "8px",
          textDecoration: "none",
        }}
      >
        Go to Dashboard
      </a>

      <br />

      <a
        href="/"
        style={{
          display: "inline-block",
          marginTop: "20px",
          color: "#333",
        }}
      >
        Back to Home
      </a>
    </div>
  );
}

