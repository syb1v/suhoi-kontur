# Визуальные материалы: слоты, промпты, лицензии

## Куда класть файлы

| Файл | Где используется | Размер | Формат |
| --- | --- | --- | --- |
| `public/images/hero.jpg` | фон первого экрана | 2400×1400 | jpg |
| `public/images/technology/trench.jpg` | секция «Разрез системы» | 1600×900 | jpg |
| `public/images/cases/case-1.jpg` … `case-3.jpg` | запасные фото кейсов (если не загружены из админки) | 1200×800 | jpg |

Правила:
1. После добавления файла сайт подхватит его автоматически — имя и путь должны совпадать с таблицей.
2. Если файла нет, показывается текущая чертёжная графика — сайт не ломается.
3. Фото кейсов удобнее загружать через админку (`/admin/content`) — они имеют приоритет над файлами.
4. Лицензии и источники скачанных изображений фиксируются в `public/images/CREDITS.md`.
5. Если `hero.jpg` — чужое фото с CC-лицензией, рядом создаётся `public/images/hero.credit`
   с подписью автора: она выводится в углу первого экрана. При замене на собственное фото
   удалите `hero.credit`, и подпись исчезнет.

## Уже подключённые фотографии

Фотополоса «Процесс в деталях» показывает реальные кадры монтажа из `public/images/work/`
(источник и лицензия — в `public/images/CREDITS.md`). Третий слот `work-3.jpg` свободен.
Перед production эти кадры заменяются собственными фотографиями объектов.

## Промпты для генератора

Общий стиль для всех: документальная инженерная фотография, натуральный дневной свет,
приглушённые цвета, без людей и лиц, без текста и логотипов, без мультяшности.

### hero.jpg — фон первого экрана

RU: Аэросъёмка загородного участка с коттеджем после дождя: вокруг дома прорыта узкая дренажная
траншея с уложенной перфорированной трубой, рядом аккуратные отвалы грунта. Верхний ракурс,
пасмурное небо, холодные серо-голубые тона, кинематографичная глубина, место слева для текста.

EN: Aerial documentary photo of a suburban plot with a house after rain: a narrow drainage trench
with perforated pipe laid around the house, neat soil piles nearby. Top-down angle, overcast sky,
cool grey-blue tones, cinematic depth, empty space on the left for a headline.

Негатив: people, faces, text, logos, cartoon, oversaturated colors, sunny tropical look.

### technology/trench.jpg — разрез/траншея

RU: Открытая дренажная траншея крупным планом: дно выстелено геотекстилем, поверх —
мытый щебень, в щебне лежит перфорированная дренажная труба в фильтре, рядом рулетка
и лопата. Реалистичная строительная фотография, мягкий дневной свет, без людей.

EN: Close-up of an open drainage trench: geotextile lining the bottom, washed gravel layer,
perforated drainage pipe embedded in gravel, a tape measure and shovel nearby. Realistic
construction photography, soft daylight, no people.

Негатив: people, faces, text, logos, cartoon, plastic-looking CGI, oversaturated colors.

### cases/case-1.jpg … case-3.jpg — фото объектов

RU: Комплексное фото придомовой территории после завершения дренажных работ: сухой газон,
ровная отмостка, аккуратные дренажные решётки вдоль дорожки, дом на заднем плане.
Документальная съёмка, естественный свет, без людей.

EN: Completed drainage project photo: dry lawn, neat paving, drainage grates along the path,
house in the background. Documentary style, natural light, no people.

Для кейсов допускаются пары «до/после»: `case-1-before.jpg` / `case-1-after.jpg`
(загружаются через админку как два отдельных изображения в разные кейсы либо на будущей галерее).

## Бесплатные источники без ограничений

- Wikimedia Commons (фильтр: Public Domain / CC0) — https://commons.wikimedia.org
- Unsplash License (бесплатно, без обязательной атрибуции) — https://unsplash.com
- Pexels License — https://www.pexels.com
- Pixabay Content License — https://pixabay.com
- Openverse (агрегатор CC0/PD) — https://openverse.org

Требования:
- для CC-BY и CC-BY-SA обязательна атрибуция в `public/images/CREDITS.md` (автор + ссылка + лицензия);
- для CC0/PD атрибуция не требуется, но мы всё равно указываем источник;
- нельзя использовать логотипы, узнаваемые лица и чужие бренды в кадре.
