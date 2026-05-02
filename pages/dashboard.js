export default function Dashboard() {
  return (
    <div style={{maxWidth: 800, margin: "40px auto", padding: "0 20px", fontFamily: "Arial"}}>
      <h1>My Account / Dashboard</h1>
      
      <p>Здесь будет твой личный кабинет с доступом к шаблонам.</p>
      
      <div style={{marginTop: 30, padding: 20, border: "1px solid #ddd", borderRadius: 8}}>
        <h2>Как получить доступ:</h2>
        <p>После оплаты мы добавим ваш email в список активных пользователей.</p>
        <p>Пока доступ выдаётся вручную в течение 1–24 часов.</p>
      </div>

      <div style={{marginTop: 40}}>
        <a href="/pricing" style={{marginRight: 20}}>← Back to Pricing</a>
        <a href="/">Back to Home</a>
      </div>
    </div>
  );
}
