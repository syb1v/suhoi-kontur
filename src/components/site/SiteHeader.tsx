import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export function SiteHeader() {
  return (
    <header className="topbar">
      <div className="wrap topbar-inner">
        <a className="brand" href="/">
          <span className="brand-mark"><span>СК</span></span>
          СУХОЙ КОНТУР
        </a>
        <nav className="nav">
          <a href="/#services">Услуги</a>
          <a href="/#technology">Технология</a>
          <a href="/#cases">Объекты</a>
          <a href="/#process">Как работаем</a>
          <a href="/#faq">Вопросы</a>
        </nav>
        <div className="top-actions">
          <a className="phone" href="tel:+78000000000">+7 (000) 000-00-00</a>
          <a className="cta cta-primary" href="/#estimate">
            Вызвать инженера
            <ArrowRight size={15} weight="bold" />
          </a>
        </div>
      </div>
    </header>
  );
}
