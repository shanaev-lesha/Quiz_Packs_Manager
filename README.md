Установка: npm install

Запуск: npm run dev

## Table: question_packs

Хранит наборы вопросов пользователей.

Поля:
- id (uuid, PK)
- user_id (uuid, FK -> users.id)
- title (string, not null)
- description (text, nullable)
- status (string, 'draft' | 'published')
- created_at
- updated_at

Ограничения:
- user_id ссылается на users.id (ON DELETE CASCADE)
- status ограничен значениями: draft, published
- Индекс по user_id для ускорения выборок пакетов пользователя
