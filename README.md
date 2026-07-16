# ANGL Consulting — angl-consulting.com

Багатомовний сайт бухгалтерської консультації (uk / en / ru).
Vite + React 18 + react-router-dom v6, TypeScript, Tailwind, shadcn/ui.

## Хостинг і деплой

Сайт хоститься на **Cloudflare Workers** (static assets). Деплой
**автоматичний**: пуш у гілку `main` → Cloudflare Workers Builds збирає й
викочує (`npm run build` → `npx wrangler deploy`). Ручний деплой за потреби —
той самий `npx wrangler deploy`.

Редагування контенту йде через **Lovable**, який комітить у цей же репозиторій;
відповідно кожна правка з Lovable теж автоматично потрапляє на прод.

Конфіг у `wrangler.jsonc`:

- `not_found_handling: "404-page"` — неіснуючі URL віддають справжній 404
  (по одному 404 на мову: `dist/404.html`, `dist/en/404.html`, `dist/ru/404.html`).
- `html_handling: "drop-trailing-slash"` — `/services/` → 307 → `/services`,
  щоб хост збігався з canonical.

`www → apex` (301) і старі `/services/N-N → слаг` (301) налаштовані на рівні
зони Cloudflare (Redirect Rules) та у `public/_redirects` відповідно.

## Збірка

```sh
npm install
npm run build     # vite build → SSR-збірка → пререндер усіх 90 сторінок у dist/
npm run dev       # локальна розробка
npm test          # спершу збирає (pretest), потім проганяє vitest
```

`npm run build` пише real HTML для кожного маршруту (без нього Googlebot бачив
би порожній `<div id="root">`), генерує `public/sitemap.xml` та
`public/_redirects` із самих маршрутів застосунку.

## Де що лежить для SEO

- `src/lib/useSeo.tsx` — per-route title/description/canonical/hreflang через `@unhead`.
- `src/lib/jsonLd.ts` — структуровані дані (Organization / Service / BreadcrumbList).
- `src/i18n/routing.ts` — мова з URL (`/`=uk, `/en/`, `/ru/`), без localStorage.
- `src/i18n/catalogSlugs.ts` — стабільні ЧПУ-слаги послуг.
- `scripts/sitemap.ts`, `scripts/prerender.mjs` — генерація sitemap та пререндер.
