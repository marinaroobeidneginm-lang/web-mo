# Marinaro Obeid Negocios Inmobiliarios

Web inmobiliaria con:

- **Frontend:** Vite + React + Tailwind
- **Backend:** Node.js + Express
- **DB:** PostgreSQL (Supabase) con Prisma ORM
- **Admin:** autenticación JWT y CRUD de propiedades
- **Imágenes:** subida a **Supabase Storage** desde el panel admin (opcional URL externa)

## Estructura del proyecto

```
marinaro-obeid-neg-inm/
├── api/
│   └── index.js                          # Entry para Vercel Functions (API)
├── client/                               # Frontend (Vite + React + Tailwind)
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── admin/
│       │   ├── Header.jsx
│       │   ├── Hero.jsx
│       │   ├── PropertiesSection.jsx
│       │   ├── PropertyCard.jsx
│       │   ├── PropertyFilters.jsx
│       │   ├── Pagination.jsx
│       │   └── ContactSection.jsx
│       ├── context/                      # AuthContext (JWT)
│       ├── hooks/
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── PropertyDetail.jsx
│       │   └── admin/
│       ├── services/                     # apiClient, authApi, propertyApi, uploadApi
│       └── utils/
├── server/                               # Backend (Express + Prisma + Supabase)
│   ├── app.js                            # App Express
│   ├── index.js                          # Arranque local (npm run dev/start)
│   ├── config/                           # Config JWT
│   ├── lib/                              # prisma.js, supabase.js
│   ├── middleware/                       # requireAuth
│   ├── prisma/                           # schema, migrations, seed
│   ├── repositories/                     # Acceso a datos
│   ├── routes/                           # auth, properties, uploads
│   ├── scripts/                          # hash-password, db:test, storage:setup
│   ├── utils/                            # validación/normalización
│   └── data/                             # JSON seed (properties/contact)
├── vercel.json                           # Deploy (frontend estático + API)
├── DEPLOY.md                             # Guía de Vercel + Supabase
└── README.md
```

## Requisitos

- Node.js 18+
- npm

## Instalación (local)

```bash
npm install
npm install --prefix client
npm install --prefix server

cp server/.env.example server/.env
```

## Desarrollo

```bash
npm run dev
```

O por separado:

```bash
npm run dev:server   # http://localhost:3001
npm run dev:client   # http://localhost:5173
```

## Rutas principales

### Sitio público

- `/` — Home
- `/propiedades/:id` — Detalle

### Admin

- `/admin/login` — Login
- `/admin` — Listado (JWT)
- `/admin/propiedades/nueva`
- `/admin/propiedades/:id/editar`

## Variables de entorno del server

Se configuran en `server/.env` (ver plantilla en `server/.env.example`).

Claves principales:

- `DATABASE_URL`, `DIRECT_URL` (Supabase pooler + `sslmode=require`)
- `JWT_SECRET`, `JWT_EXPIRES_IN`
- `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_STORAGE_BUCKET`

## Base de datos (Prisma)

```bash
npm run db:test --prefix server
npm run db:deploy --prefix server
npm run db:seed --prefix server
```

## Storage (imágenes)

Crear/verificar el bucket:

```bash
npm run storage:setup --prefix server
```

La API de subida es `POST /api/uploads/image` (requiere JWT).

## API

La documentación completa está en:

- `server/docs/API.md`

## Deploy (Vercel + Supabase)

La guía paso a paso está en `DEPLOY.md`.
