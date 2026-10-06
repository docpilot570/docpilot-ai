export default function Refund() {
  return (
    <div
      style={{
        maxWidth: 800,
        margin: "40px auto",
        fontFamily: "Arial",
        padding: "0 20px",
        lineHeight: 1.6,
      }}
    >
      <h1>Refund Policy</h1>

      <p>
        DocPilot AI sells digital subscription access to document generation
        tools.
      </p>

      <p>
        Because access is granted immediately after purchase, we generally do
        not offer refunds once a subscription has been activated and the service
        has been used.
      </p>

      <p>
        If you experience a technical issue that prevents access to the service
        you paid for, contact us within 7 days of purchase at{" "}
        <a href="mailto:docpilot.ai.service@gmail.com">
          docpilot.ai.service@gmail.com
        </a>
        . We will review the request and, where appropriate, provide a fix,
        credit, or refund.
      </p>

      <p>
        Subscriptions renew according to the plan you choose (monthly or
        annual). You can cancel future renewals before the next billing date;
        this does not automatically refund the current period.
      </p>

      <p>
        For questions about billing or cancellation, email{" "}
        <a href="mailto:docpilot.ai.service@gmail.com">
          docpilot.ai.service@gmail.com
        </a>
        .
      </p>

      <p style={{ marginTop: 30 }}>
        <a href="/">Back to Home</a>
        {" · "}
        <a href="/pricing">Pricing</a>
        {" · "}
        <a href="/terms">Terms</a>
        {" · "}
        <a href="/privacy">Privacy</a>
      </p>
    </div>
  );
}
