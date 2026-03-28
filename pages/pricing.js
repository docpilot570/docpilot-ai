export default function Pricing() {
  return (
    <div style={{maxWidth:800, margin:"40px auto", fontFamily:"Arial", padding:"0 20px"}}>
      <h1>Pricing</h1>

      <p>
        Choose a plan and get access to AI document generation.
        Payments are processed securely via Paysera.
      </p>

      <div style={{border:"1px solid #ccc", borderRadius:10, padding:20, marginTop:30}}>
        <h2>Starter</h2>
        <p style={{fontSize:22}}><b>€9.99 / month</b></p>
        <ul>
          <li>Up to 30 documents per month</li>
          <li>Multiple languages support</li>
          <li>Email delivery</li>
        </ul>
        <button style={{padding:"12px 20px", fontSize:16, cursor:"pointer"}}>
          Buy Starter (Paysera)
        </button>
      </div>

      <div style={{border:"1px solid #ccc", borderRadius:10, padding:20, marginTop:20}}>
        <h2>Pro</h2>
        <p style={{fontSize:22}}><b>€19.99 / month</b></p>
        <ul>
          <li>Unlimited documents</li>
          <li>Priority processing</li>
          <li>Advanced templates</li>
        </ul>
        <button style={{padding:"12px 20px", fontSize:16, cursor:"pointer"}}>
          Buy Pro (Paysera)
        </button>
      </div>

      <p style={{marginTop:30}}>
        Need a custom plan for your business? Contact us via email.
      </p>

      <div style={{marginTop:30}}>
        <a href="/">Back to Home</a>
      </div>
    </div>
  );
}
