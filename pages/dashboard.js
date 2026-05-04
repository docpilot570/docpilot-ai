export default function Dashboard() {
  возвращаться (
    <div style={{maxWidth: 900, margin: "40px auto", padding: "0 20px", fontFamily: "Arial, sans-serif"}}>
      <h1>Моя панель управления</h1>
      <p>Добро пожаловать обратно! Здесь вы можете управлять своими подписками и получать доступ к документам.</p>

      <div style={{marginTop: 30, padding: 30, border: "1px solid #4CAF50", borderRadius: 12, backgroundColor: "#f9fff9"}}>
        <h2>Активные подписки</h2>
        <p style={{color: "#666", fontSize: "17px"}}>
          Пока у вас нет активных подписок.<br />
          После первой оплаты мы добавим ваш адрес электронной почты и предоставим доступ к шаблонам.
        </p>
      </div>

      <div style={{marginTop: 40, padding: 20, backgroundColor: "#f5f5f5", borderRadius: 8}}>
        <h3>Как это работает</h3>
        <ol>
          <li>План покупки на странице Цены</li>
          <li>Мы получим. и добавим вас в список</li>
          <li>Здесь появляются ссылки на все шаблоны</li>
        </ol>
      </div>

      <div style={{marginTop: 40}}>
        <a href="/pricing" style={{marginRight: 20}}>← Купить тарифный план</a>
        <a href="/">Вернуться на главную</a>
      </div>
    </div>
  );
}
