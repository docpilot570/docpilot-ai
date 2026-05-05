export default function Dashboard() {
  return (
    <div style={{
      maxWidth: 900, 
      margin: "40px auto", 
      padding: "0 20px", 
      fontFamily: "Arial, sans-serif"
    }}>
      <h1>My Dashboard</h1>
      <p>Welcome back! Here you can manage your subscriptions and access documents.</p>

      <div style={{
        marginTop: 30, 
        padding: 30, 
        border: "1px solid #4CAF50", 
        borderRadius: 12, 
        backgroundColor: "#f9fff9"
      }}>
        <h2>Active Subscriptions</h2>
        <p style={{color: "#666", fontSize: "17px", lineHeight: "1.6"}}>
          Пока у вас нет активных подписок.<br /><br />
          После первой оплаты мы добавим ваш email и предоставим доступ к шаблонам.
        </p>
      </div>

      <div style={{
        marginTop: 40, 
        padding: 25, 
        backgroundColor: "#f5f5f5", 
        borderRadius: 8
      }}>
        <h3>How it works</h3>
        <ol>
          <li>Купите план на странице Pricing</li>
          <li>Мы получим уведомление и добавим вас вручную</li>
          <li>Здесь появятся ссылки на все шаблоны документов</li>
        </ol>
      </div>

      <div style={{marginTop: 40}}>
        <a href="/pricing" style={{marginRight: 20}}>← Buy a Plan</a>
        <a href="/">Back to Home</a>
      </div>
    </div>
  );
}
