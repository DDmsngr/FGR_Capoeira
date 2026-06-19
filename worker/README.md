# FGR Admin Worker

Cloudflare Worker — backend для админки сайта FGR. Хранит пароль и GitHub PAT в secrets, проксирует изменения в репозиторий через GitHub Contents API. После коммита автоматический GitHub Actions деплоит сайт на GitHub Pages.

## Эндпоинты

- `POST /api/auth` — `{ password }` → `{ ok: true }` или 401
- `GET /api/data/:type` — вернуть текущие данные секции (с `sha` для optimistic locking)
- `POST /api/save` — `{ type, data, sha? }` → коммит обновлённого JSON
- `POST /api/upload` — `{ filename, base64 }` → коммит в `public/uploads/`, вернуть URL

`type` ∈ `masters | gallery | content | locations | directions | faq`

Все эндпоинты кроме `/api/auth` требуют `Authorization: Bearer <password>`.

## Первичная настройка (~5 минут)

1. Установи зависимости и логин в Cloudflare:
   ```
   cd worker
   npm install
   npx wrangler login
   ```

2. Создай fine-grained GitHub PAT на https://github.com/settings/personal-access-tokens/new:
   - Repository access: только `DDmsngr/FGR_Capoeira`
   - Permissions → Repository → **Contents: Read and write**

3. Установи secrets:
   ```
   npx wrangler secret put ADMIN_PASSWORD
   npx wrangler secret put GITHUB_TOKEN
   ```

4. Задеплой:
   ```
   npm run deploy
   ```
   На выходе будет URL вида `https://fgr-admin-api.<твой-аккаунт>.workers.dev`.

5. В корне проекта (рядом с `package.json` сайта) создай `.env`:
   ```
   VITE_API_URL=https://fgr-admin-api.<твой-аккаунт>.workers.dev
   ```
   И передеплой сайт.

## Локальная разработка

```
npm run dev
```
Worker запустится на `http://localhost:8787`. В `.env.local` сайта поставь `VITE_API_URL=http://localhost:8787`.

Для локального запуска secrets нужно положить в `.dev.vars`:
```
ADMIN_PASSWORD=test
GITHUB_TOKEN=ghp_...
```
Этот файл уже в `.gitignore`.
