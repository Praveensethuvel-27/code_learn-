# MERN Coding Learning Platform

## Folder structure

- `backend/`: Express + MongoDB API (MVC)
- `frontend/`: React + MUI app (Monaco editor)

## Backend setup

```bash
cd backend
copy .env.example .env
npm install
npm run seed
npm run dev
```

API runs on `http://localhost:5000`.

## Frontend setup

```bash
cd frontend
copy .env.example .env
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

## Judge0 setup

Set `JUDGE0_URL` (and optionally `JUDGE0_KEY`) in `backend/.env`.

## Seeded admin

After `npm run seed` (backend):

- Email: `admin@mernlearn.local`
- Password: `Admin12345!`

