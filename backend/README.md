# Admin Panel для Капоэйра

Полнофункциональная админ-панель для управления контентом сайта FGR Capoeira с автоматическим коммитом в GitHub.

## Структура

```
Капоэйра/
├── src/
│   ├── data/
│   │   ├── locations.ts    (расписание, метро, локации)
│   │   ├── masters.ts      (профили мастеров)
│   │   ├── gallery.ts      (галерея изображений)
│   │   └── content.ts      (текст About, статистика)
│   ├── pages/
│   │   ├── AdminPage.tsx   (админ-панель React)
│   │   └── MastersPage.tsx
│   └── components/
├── backend/
│   ├── server.js           (Express API)
│   ├── utils/
│   │   ├── fileHandler.js  (чтение/запись JSON)
│   │   └── git.js          (автокоммит в GitHub)
│   ├── package.json
│   └── .env.example
└── vite.config.js
```

## Быстрый старт

### 1. Фронтенд (React)

```bash
cd Капоэйра

# Установить зависимости (если ещё не установлены)
npm install

# Запустить dev сервер
npm run dev
```

Админка доступна по: **`#/admin`**

### 2. Backend (Express)

```bash
cd Капоэйра/backend

# Установить зависимости
npm install

# Создать .env файл
cp .env.example .env

# ВАЖНО: Отредактировать .env:
# - VITE_ADMIN_PASSWORD — пароль админки
# - GITHUB_TOKEN — Personal Access Token с правами на push
# - GITHUB_REPO — ваш репозиторий (DDmsngr/FGR_Capoeira)

# Запустить backend
npm start
# или для разработки с hot-reload:
npm run dev
```

Backend запустится на `http://localhost:3001`

## Использование

### Вход в админку

1. Откройте `http://localhost:5173/#/admin` (или `#/admin` на боевом сервере)
2. Введите пароль из `.env` (`VITE_ADMIN_PASSWORD`)

### Редактирование контента

**3 вкладки:**

- **Мастера** — редактировать профили инструкторов (имя, звание, биография, фото)
- **Галерея** — управлять изображениями в галерее
- **Контент** — основные тексты (About section)

### Сохранение

1. Отредактируйте данные в форме
2. Нажмите **"Сохранить и коммитить"**
3. Backend:
   - Обновит JSON файлы в `src/data/`
   - Создаст коммит в Git: `Update [type] data via admin panel`
   - Запушит в GitHub автоматически

### Проверка изменений

После сохранения:
- Обновите страницу (Ctrl+R) — фронт перезагрузит данные
- Проверьте коммиты на GitHub: `git log --oneline src/data/`

## GitHub интеграция

### Получить Personal Access Token

1. Перейти на https://github.com/settings/tokens
2. Нажать "Generate new token (classic)"
3. Выбрать scope: `repo` (full control of private repositories)
4. Скопировать токен и поместить в `.env`:
   ```
   GITHUB_TOKEN=ghp_xxxxxxxxxxxxx
   ```

### Первый коммит

Убедитесь, что репозиторий инициализирован и имеет ремоут:

```bash
cd Капоэйра
git remote -v
# должно быть:
# origin  https://github.com/DDmsngr/FGR_Capoeira.git (fetch)
# origin  https://github.com/DDmsngr/FGR_Capoeira.git (push)
```

Если нет ремота:

```bash
git remote add origin https://github.com/DDmsngr/FGR_Capoeira.git
git branch -M main
git push -u origin main
```

## Безопасность

⚠️ **Текущая реализация использует простой пароль** — для продакшена нужна нормальная аутентификация:

- JWT токены
- OAuth через GitHub
- Двухфакторная аутентификация

## Структура API

```
POST   /api/content/:type/save     Сохранить данные + коммитить
GET    /api/content/:type          Получить текущие данные
GET    /api/health                 Проверка статуса
```

Все эндпоинты требуют заголовок:
```
Authorization: Bearer VITE_ADMIN_PASSWORD
```

## Troubleshooting

### "Ошибка подключения"

- Убедитесь, что backend запущен: `http://localhost:3001/api/health`
- Проверьте, что CORS включён (должен быть по умолчанию)
- Фронт делает запросы на `http://localhost:3001/api`

### "Git error: fatal: not a repository"

Backend запущен не в папке проекта. Убедитесь, что `backend/server.js` может найти `src/data/`:

```bash
# Должны быть видны эти папки из backend/:
ls ../src/data/
# masters.ts, gallery.ts, content.ts, locations.ts
```

### "Ошибка при коммите: Permission denied"

- Проверьте, что `GITHUB_TOKEN` в `.env` правильный
- Token должен иметь scope `repo`
- Убедитесь, что `GITHUB_REPO` совпадает с вашим репозиторием

## Шаги для проверки

✓ Админка доступна по `#/admin`
✓ Можно войти с паролем
✓ Можно редактировать каждый тип контента
✓ При сохранении файлы обновляются в `src/data/`
✓ Коммиты появляются на GitHub
✓ Фронт перезагружает данные после сохранения

## Будущие улучшения

- [ ] Upload изображений вместо ссылок
- [ ] История версий (git rollback)
- [ ] Мульти-пользовательское редактирование (с конфликтами)
- [ ] Draft/Preview режим
- [ ] Webhook для автообновления на боевом сервере
- [ ] Статистика просмотров через аналитику
