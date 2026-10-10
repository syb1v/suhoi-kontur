import { ArrowRight, Check, CloudRain, CurrencyRub, Drop, FileText, Funnel, HouseLine, ShieldCheck, Waves } from "@phosphor-icons/react/dist/ssr";
import { Calculator } from "@/components/Calculator";
import { Faq } from "@/components/Faq";
import { ProblemExplorer } from "@/components/ProblemExplorer";
import { CutawayDiagram } from "@/components/SectionDiagram";
import { Reveal } from "@/components/site/Reveal";
import { CaseFigure } from "@/components/site/CaseFigure";
import { HeroDiagram } from "@/components/site/HeroDiagram";
import { MobileCta, SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { getPublicData } from "@/lib/content";
import { publicImage, readPublicText } from "@/lib/visuals";

const serviceIcons = [HouseLine, Drop, CloudRain, Waves, Funnel];

const processSteps = [
  ["Заявка", "Описываете проблему — мы задаём уточняющие вопросы"],
  ["Предварительная схема", "Считаем ориентир и показываем логику системы"],
  ["Выезд инженера", "Замер, рельеф, грунт, точка сброса — 0 ₽"],
  ["Смета и договор", "Фиксируем состав работ и цену в договоре"],
  ["Монтаж", "Работы за 3–7 дней и восстановление поверхности"],
  ["Сдача", "Пролив, проверка уклонов, гарантия 3 года"],
];

const guarantees = [
  { icon: FileText, value: "Договор", label: "Официально с ООО", text: "Работаем по договору с юридическим лицом: состав работ, сроки и ответственность зафиксированы документально." },
  { icon: CurrencyRub, value: "0 ₽", label: "Фиксация сметы", text: "Стоимость в договоре не растёт в процессе работ. Дополнительные объёмы — только с вашего согласия." },
  { icon: ShieldCheck, value: "3 года", label: "Гарантия на систему", text: "Если система не справляется — приезжаем, находим причину и устраняем её по гарантии." },
];

const areas: [string, string][] = [
  ["Краснодар", "/krasnodar"],
  ["Яблоновский", "/adygeya"],
  ["Энем", "/adygeya"],
  ["Тахтамукай", "/adygeya"],
  ["Майкоп", "/adygeya"],
  ["Новороссийск", "/novorossiysk"],
  ["Геленджик", "/gelendzhik"],
  ["Анапа", "/anapa"],
  ["Крымск", "/krymsk"],
  ["Темрюк", "/temryuk"],
];

export default async function Home() {
  const { settings, cases, services } = await getPublicData();
  const heroImage = publicImage("/images/hero.jpg");
  const heroCredit = heroImage ? readPublicText("/images/hero.credit") : null;
  const workPhotos = [
    {
      src: publicImage("/images/work/work-1.jpg"),
      title: "Разработка траншеи",
      text: "Выемка грунта на проектную глубину с контролем уклона под будущую трассу.",
      credit: "Bugsybanana / CC BY-SA 4.0",
      position: "50% 72%",
    },
    {
      src: publicImage("/images/work/work-2.jpg"),
      title: "Укладка трубы и колодца",
      text: "Перфорированная труба в дренажной обсыпке, вывод в смотровой колодец.",
      credit: "Bugsybanana / CC BY-SA 4.0",
      position: "50% 78%",
    },
    {
      src: publicImage("/images/work/work-3.jpg"),
      title: "Проверка проливом",
      text: "Контрольный пролив системы и проверка уклонов перед сдачей объекта.",
      credit: "Фото объекта",
      position: "50% 50%",
    },
  ].filter((photo) => Boolean(photo.src));
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      "Почему вода стоит после дождя?",
      "Чем поверхностный дренаж отличается от глубинного?",
      "Куда можно отвести воду?",
      "Сколько времени занимает монтаж?",
    ].map((name, i) => ({
      "@type": "Question",
      name,
      acceptedAnswer: {
        "@type": "Answer",
        text: [
          "Причина обычно в сочетании глинистого грунта, понижения рельефа и отсутствия организованного водоотвода. Инженер определяет источник воды и проектное решение на осмотре участка.",
          "Поверхностный контур собирает дождевую и талую воду, глубинный работает с водой в грунте и защищает фундамент. На сложных участках применяют оба контура.",
          "Вода отводится в придорожную канаву, действующую ливневую сеть, поглотительный колодец или герметичный колодец с насосом. Точка сброса определяется на замере.",
          "Типовой монтаж занимает 3–7 рабочих дней. Точный срок зависит от длины трассы, грунта и объёма земляных работ, он фиксируется в договоре.",
        ][i],
      },
    })),
  };

  return (
    <main className="site">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SiteHeader phone={settings.phone} />

      <section className="hero">
        {heroImage ? (
          <div className="hero-bg" aria-hidden="true">
            <img src={heroImage} alt="" />
          </div>
        ) : null}
        <div className="wrap hero-inner">
          <div>
            <span className="kicker">Инженерная гидрология · Краснодар и Адыгея</span>
            <h1 className="h-display">
              Вода должна уходить <em>по проекту.</em>
            </h1>
            <p className="lead lead-dark">
              Проектируем и монтируем системы дренажа, ливневого отвода и водопонижения.
              Защищаем фундаменты, подвалы и участки — с договором и гарантией 3 года.
            </p>
            <div className="hero-actions">
              <a className="cta cta-primary" href="#estimate">
                Выезд инженера-замерщика бесплатно
                <ArrowRight size={15} weight="bold" />
              </a>
              <a className="cta cta-ghost" href="#estimate">Рассчитать смету за 1 минуту</a>
            </div>
            <div className="hero-chips">
              <span className="chip"><span className="chip-dot" /><b>10+ лет</b> в гидротехнике</span>
              <span className="chip"><span className="chip-dot" /><b>500+</b> объектов в ЮФО</span>
              <span className="chip"><span className="chip-dot" />проекты <b>от 200 000 ₽</b></span>
            </div>
          </div>
          <HeroDiagram />
        </div>
        {heroCredit ? <span className="hero-credit">{heroCredit}</span> : null}
      </section>

      <section className="stats">
        <div className="wrap stats-grid">
          <p className="stats-note">
            Работаем официально.<br />Состав работ и цена фиксируются в договоре.
          </p>
          <div className="stat"><b>от 3 500 <em>₽/м</em></b><small>базовая ставка комплекса</small></div>
          <div className="stat"><b>3–7 <em>дней</em></b><small>типовой срок монтажа</small></div>
          <div className="stat"><b>3 <em>года</em></b><small>гарантия по договору</small></div>
          <div className="stat"><b>200 000 <em>₽</em></b><small>минимальный объект</small></div>
        </div>
      </section>

      <section className="wrap section">
        <Reveal>
          <div className="section-head">
            <span className="kicker">Диагностика</span>
            <h2 className="h2">Участок уже подаёт сигналы.</h2>
            <p className="lead">
              Выберите симптом — увидите вероятную причину и логику решения.
              Это не диагноз, а инженерная гипотеза, которую проверяем на замере.
            </p>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <ProblemExplorer />
        </Reveal>
      </section>

      <section className="section section-dark" id="services">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <span className="kicker">Что мы делаем</span>
              <h2 className="h2">Система, а не отдельная труба.</h2>
            </div>
          </Reveal>
          {services.length > 0 && (
          <div className="services">
            {services.map((s, i) => {
              const Icon = serviceIcons[i % serviceIcons.length];
              return (
                <Reveal key={s.id} delay={i * 50}>
                  <div className="service-row">
                    <span className="service-num">0{i + 1}</span>
                    <span className="service-icon"><Icon size={26} weight="light" /></span>
                    <div>
                      <h3>{s.title}</h3>
                      <p className="service-note">{s.note}</p>
                    </div>
                    <span className="service-arrow"><ArrowRight size={20} weight="bold" /></span>
                  </div>
                </Reveal>
              );
            })}
          </div>
          )}
        </div>
      </section>

      <section className="section section-mist" id="estimate">
        <div className="wrap">
          <Reveal>
            <div className="quiz-frame">
              <div className="quiz-side">
                <span className="kicker">Калькулятор проекта</span>
                <h2 className="h2">Ориентир за минуту.</h2>
                <p className="lead lead-dark">
                  Ответьте на четыре вопроса — покажем диапазон стоимости
                  и логику расчёта. Предварительная схема составляется удалённо бесплатно.
                </p>
                <div className="quiz-points">
                  <p className="quiz-point"><span className="dot" /><span>Считаем по погонажу и точке сброса, <b>а не по площади участка</b></span></p>
                  <p className="quiz-point"><span className="dot" /><span>Диапазон честный: <b>финальная смета — после замера</b></span></p>
                  <p className="quiz-point"><span className="dot" /><span>Выезд инженера <b>0 ₽</b> в пределах края и Адыгеи</span></p>
                </div>
              </div>
              <div className="quiz-main">
                <Calculator />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {cases.length > 0 && (
      <section className="wrap section" id="cases">
        <Reveal>
          <div className="section-head">
            <span className="kicker">Демонстрационные объекты</span>
            <h2 className="h2">Результат виден после первого дождя.</h2>
            <p className="lead">
              Структура кейса настоящая, данные — демонстрационные.
              Реальные фото, погонаж и сметы добавим через админку.
            </p>
          </div>
        </Reveal>
        <div className="cases">
          {cases.map((c, i) => (
            <Reveal key={c.id} delay={i * 70}>
              <article className="case-card">
                <div className="case-figure">
                  <span className="case-tag">Демо-данные</span>
                  {c.image ? (
                    <img className="case-photo" src={c.image} alt={c.title} loading="lazy" />
                  ) : (
                    <CaseFigure variant={i} />
                  )}
                </div>
                <div className="case-body">
                  <span className="case-site">{c.site}</span>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                  <div className="case-metrics">
                    <div><b>{c.length}</b><small>погонаж</small></div>
                    <div><b>{c.days}</b><small>срок</small></div>
                    <div><b>{c.price}</b><small>смета</small></div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      )}

      <section className="section section-dark" id="technology">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <span className="kicker">Разрез системы</span>
              <h2 className="h2">Каждый слой работает на результат.</h2>
              <p className="lead lead-dark">
                Что находится под землёй и зачем нужен каждый элемент контура.
                Нажмите на слой, чтобы узнать его роль.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <CutawayDiagram />
          </Reveal>
        </div>
      </section>

      {workPhotos.length > 0 && (
        <section className="wrap section" id="work">
          <Reveal>
            <div className="section-head">
              <span className="kicker">Процесс в деталях</span>
              <h2 className="h2">Как система выглядит на объекте.</h2>
              <p className="lead">
                Под землёй всё должно быть сделано точно: проектная глубина, уклон,
                обсыпка и колодец. Показываем этапы, которые определяют результат.
              </p>
            </div>
          </Reveal>
          <div className="work-strip">
            {workPhotos.map((photo, i) => (
              <Reveal key={photo.src} delay={i * 70}>
                <article className="work-card">
                  <div className="work-photo">
                    <img src={photo.src as string} alt={photo.title} loading="lazy" style={{ objectPosition: photo.position }} />
                  </div>
                  <div className="work-caption">
                    <strong>{photo.title}</strong>
                    <p>{photo.text}</p>
                    <span className="work-credit">Фото: {photo.credit}</span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="section section-mist" id="process">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <span className="kicker">Регламент работ</span>
              <h2 className="h2">Прозрачно от заявки до сдачи.</h2>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="timeline">
              {processSteps.map(([title, text], i) => (
                <div className="tl-step" key={title}>
                  <span className="tl-num">0{i + 1}</span>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-dark">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <span className="kicker">Ответственность</span>
              <h2 className="h2">Не обещания, а обязательства.</h2>
            </div>
          </Reveal>
          <div className="guarantees">
            {guarantees.map((g, i) => (
              <Reveal key={g.label} delay={i * 70}>
                <div className="guarantee">
                  <span className="g-icon"><g.icon size={28} weight="light" /></span>
                  <b>{g.value}</b>
                  <span className="g-label">{g.label}</span>
                  <p>{g.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-cyan">
        <div className="wrap b2b">
          <Reveal>
            <div>
              <span className="kicker">Для партнёров</span>
              <h2 className="h2">Дренаж до чистового благоустройства.</h2>
              <p className="lead" style={{ color: "#0a5561", marginTop: 16, maxWidth: 520 }}>
                Субподряд для ландшафтных дизайнеров, архитекторов и прорабов.
                Закрываем подземную часть — вы сдаёте объект в срок.
              </p>
              <div className="b2b-list" style={{ marginTop: 30 }}>
                {["Сохраняем ваши сроки и не перехватываем клиентов", "Агентское вознаграждение по договору", "Один ответственный за весь подземный контур"].map((x) => (
                  <p className="b2b-item" key={x}><span className="check"><Check size={12} weight="bold" /></span>{x}</p>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="b2b-card">
              <span className="kicker">Закрытые условия</span>
              <h3>Обсудить партнёрство</h3>
              <p>Расскажите о проекте — предложим схему взаимодействия и условия вознаграждения.</p>
              <a className="cta cta-primary" href="mailto:partners@suhoi-kontur.ru">
                Обсудить условия
                <ArrowRight size={15} weight="bold" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="wrap section" id="faq">
        <div className="faq-layout">
          <Reveal>
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="kicker">Ответы инженера</span>
              <h2 className="h2">Что важно знать до начала работ.</h2>
              <p className="lead">Короткие ответы на вопросы, которые влияют на схему и бюджет водоотведения.</p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <Faq />
          </Reveal>
        </div>
      </section>

      <section className="section section-mist">
        <div className="wrap geo">
          <Reveal>
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="kicker">География работ</span>
              <h2 className="h2">Работаем там, где отвечаем за результат.</h2>
              <p className="lead">
                Основной маршрут бригады — Краснодар, Адыгея и западная часть края.
                Это позволяет держать сроки и качество на каждом объекте.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div>
              <div className="area-list">
                {areas.map(([name, href], i) => (
                  <a className="area-item" href={href} key={name}>
                    <span className="area-num">{String(i + 1).padStart(2, "0")}</span>
                    {name}
                    <span className="area-arrow">↗</span>
                  </a>
                ))}
              </div>
              <p className="geo-excluded">
                <b>Не работаем:</b> Сочи, Адлер, Красная Поляна и территории южнее Туапсе —
                нерентабельная логистика и особая горная гидрология.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="final-cta">
        <div className="wrap">
          <div>
            <span className="kicker">Первый шаг — бесплатный</span>
            <h2 className="h2">Получите схему водоотведения и расчёт.</h2>
            <p className="lead lead-dark">
              Предварительная схема дренажа и расчёт стоимости составляются удалённо бесплатно.
              Выезд инженера-замерщика — 0 ₽ в пределах Краснодарского края и Адыгеи.
            </p>
          </div>
          <div className="hero-actions" style={{ margin: 0 }}>
            <a className="cta cta-primary" href="#estimate">
              Вызвать инженера-замерщика
              <ArrowRight size={15} weight="bold" />
            </a>
          </div>
        </div>
      </section>

      <SiteFooter phone={settings.phone} email={settings.email} />
      <MobileCta phone={settings.phone} />
    </main>
  );
}
