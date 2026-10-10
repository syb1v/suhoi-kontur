# Сухой Контур

SEO-платформа инженерной компании по дренажу и водоотведению (Краснодар, Адыгея, запад Краснодарского края).

## Локальный запуск

```bash
npm install
cp .env.example .env.local
npm run dev
```

Открыть `http://localhost:3000`.

## Рабочая область

- `/admin/login` — вход администратора
- `/admin` — заявки, статусы, заметки и first-party аналитика

Пароль задаётся переменной `ADMIN_PASSWORD` (локально — в `.env.local`, по умолчанию `sk-admin-2026`).
Сессия подписывается `SESSION_SECRET` и хранится в httpOnly cookie на 30 дней.
Для production задайте собственные значения и не используйте локальный пароль.

## Маршруты

- `/` — посадочная страница, интерактивный разбор проблем, квиз-калькулятор, кейсы, FAQ, география
- `/drenazh-uchastka`, `/drenazh-fundamenta`, `/livnevaya-kanalizaciya`, `/vodoponizhenie`, `/septiki-i-kolodcy` — услуги
- `/krasnodar`, `/adygeya`, `/novorossiysk`, `/anapa`, `/gelendzhik`, `/krymsk`, `/temryuk` — регионы
- `/llms.txt` — машиночитаемое описание компании для ИИ-систем
- `/sitemap.xml`, `/robots.txt`

## API

- `POST /api/leads` — приём заявки из квиза (валидация, honeypot, сохранение в базу)
- `POST /api/events` — first-party аналитика (просмотры, шаги квиза, клики по телефону и CTA)
- `POST /api/admin/login`, `POST /api/admin/logout` — сессии администратора

## Данные

Локально используется SQLite через Drizzle ORM (`data/suhoi-kontur.db`, создаётся автоматически).
Схема: заявки (`leads`) и события аналитики (`analytics_events`). Таблицы готовы к переносу на PostgreSQL.

## Интеграции

- Telegram-уведомления включаются через `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID` (без них тихо пропускаются).
- Яндекс Метрика и CRM ожидают credentials — см. `BACKLOG.md`.
