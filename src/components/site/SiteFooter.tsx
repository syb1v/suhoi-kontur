const serviceLinks = [
  ["Дренаж участка", "/drenazh-uchastka"],
  ["Дренаж фундамента", "/drenazh-fundamenta"],
  ["Ливневая канализация", "/livnevaya-kanalizaciya"],
  ["Водопонижение", "/vodoponizhenie"],
  ["Колодцы и септики", "/septiki-i-kolodcy"],
];

const geoLinks = [
  ["Краснодар", "/krasnodar"],
  ["Адыгея", "/adygeya"],
  ["Новороссийск", "/novorossiysk"],
  ["Анапа", "/anapa"],
  ["Геленджик", "/gelendzhik"],
  ["Крымск", "/krymsk"],
];

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap footer-main">
        <div className="footer-brand">
          <a className="brand" href="/">
            <span className="brand-mark"><span>СК</span></span>
            СУХОЙ КОНТУР
          </a>
          <p>
            Инженерные системы дренажа, водоотведения и водопонижения.
            Краснодарский край и Республика Адыгея.
          </p>
        </div>
        <div className="footer-col">
          <h4>Услуги</h4>
          {serviceLinks.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </div>
        <div className="footer-col">
          <h4>География</h4>
          {geoLinks.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </div>
        <div className="footer-col">
          <h4>Контакты</h4>
          <a href="tel:+78000000000">+7 (000) 000-00-00</a>
          <a href="mailto:info@suhoi-kontur.ru">info@suhoi-kontur.ru</a>
          <a href="/#estimate">Выезд инженера — бесплатно</a>
          <a href="/llms.txt">Информация для ИИ-систем</a>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© 2026 ООО «Сухой Контур». Не является публичной офертой.</span>
        <span>
          <a href="/admin">Вход для администратора</a>
        </span>
      </div>
    </footer>
  );
}

export function MobileCta() {
  return (
    <div className="mobile-cta">
      <a className="cta cta-primary" href="/#estimate">Расчёт стоимости</a>
      <a className="cta cta-ghost" href="tel:+78000000000">Позвонить</a>
    </div>
  );
}
