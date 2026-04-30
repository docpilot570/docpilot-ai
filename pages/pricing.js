export default function Pricing() {
  return (
    <div style={{maxWidth:800, margin:"40px auto", fontFamily:"Arial", padding:"0 20px"}}>
      <h1>Pricing</h1>

      <p>
        Choose a plan and get access to AI document generation. 
        Payments are processed securely via Payhip.
      </p>

      <div style={{border:"1px solid #ccc", borderRadius:10, padding:20, marginTop:30}}>
        <h2>Starter</h2>
        <p style={{fontSize:22}}><b>€9.99 / month</b></p>
        <p style={{color: "#555", marginBottom: "15px"}}>Access for 30 days</p>
        <ul>
          <li>Up to 30 documents per month</li>
          <li>Multiple languages support</li>
          <li>Email delivery</li>
        </ul>
        <a 
          href="https://payhip.com/order?link=DWVGs&pricing_plan=2VGJjRRnGD"
          style={{
            display: "inline-block",
            padding:"12px 24px", 
            fontSize:16, 
            backgroundColor:"#4CAF50", 
            color:"white", 
            textDecoration:"none",
            borderRadius:6,
            marginTop:10
          }}
        >
          Buy Starter — €9.99
        </a>
      </div>

      <div style={{border:"1px solid #ccc", borderRadius:10, padding:20, marginTop:20}}>
        <h2>Pro</h2>
        <p style={{fontSize:22}}><b>€19.99 / month</b></p>
        <p style={{color: "#555", marginBottom: "15px"}}>Access for 30 days</p>
        <ul>
          <li>Unlimited documents</li>
          <li>Priority processing</li>
          <li>Advanced templates</li>
        </ul>
        <a 
          href="https://payhip.com/order?link=DWVGs&pricing_plan=JrGElEEABn"
          style={{
            display: "inline-block",
            padding:"12px 24px", 
            fontSize:16, 
            backgroundColor:"#4CAF50", 
            color:"white", 
            textDecoration:"none",
            borderRadius:6,
            marginTop:10
          }}
        >
          Buy Pro — €19.99
        </a>
      </div>

      <div style={{border:"1px solid #ccc", borderRadius:10, padding:20, marginTop:20}}>
        <h2>Business</h2>
        <p style={{fontSize:22}}><b>€49.99 / month</b></p>
        <p style={{color: "#555", marginBottom: "15px"}}>Access for 30 days</p>
        <ul>
          <li>Unlimited documents</li>
          <li>Priority processing</li>
          <li>Premium templates</li>
          <li>Business support</li>
        </ul>
        <a 
          href="https://payhip.com/order?link=DWVGs&pricing_plan=N9G84VVLGV"
          style={{
            display: "inline-block",
            padding:"12px 24px", 
            fontSize:16, 
            backgroundColor:"#4CAF50", 
            color:"white", 
            textDecoration:"none",
            borderRadius:6,
            marginTop:10
          }}
        >
          Buy Business — €49.99
        </a>
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
