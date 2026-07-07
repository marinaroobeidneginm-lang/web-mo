# Publicar en Vercel + Supabase

## 1. Configurar Supabase (base de datos)

En [Supabase Dashboard](https://supabase.com/dashboard) → tu proyecto → **Settings → Database**:

1. Copiá la **Database password** (la que elegiste al crear el proyecto).
2. Usá este connection string (reemplazá la contraseña):

```
postgresql://postgres:TU_CONTRASEÑA@db.qwxnscormzschyukuksj.supabase.co:5432/postgres
```

## 2. Connection string (IMPORTANTE en Windows)

**No uses** `db.xxx.supabase.co:5432` (conexión directa). En muchas redes de Windows solo tiene IPv6 y falla con `P1001`.

1. Entrá a tu proyecto en Supabase.
2. Click **Connect** (arriba).
3. Elegí **Session pooler** (puerto **5432**).
4. Copiá el string completo. Debe verse así:

```
postgresql://postgres.qwxnscormzschyukuksj:[PASSWORD]@aws-X-REGION.pooler.supabase.com:5432/postgres
```

Notas:
- El usuario es `postgres.qwxnscormzschyukuksj` (con el project ref), **no** solo `postgres`.
- El host puede ser `aws-1-...` (no siempre `aws-0-...`). Copialo del dashboard.
- Si la contraseña tiene `$`, `?`, `&` → codificala en [urlencoder.org](https://www.urlencoder.org/).

Pegá el mismo string en `server/.env`:

```env
DATABASE_URL="..."
DIRECT_URL="..."
```

Probá la conexión:

```bash
npm run db:test --prefix server
```

## 3. Migrar y cargar datos

Editá `server/.env` con tu contraseña real:

```env
DATABASE_URL=postgresql://postgres:TU_CONTRASEÑA@db.qwxnscormzschyukuksj.supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:TU_CONTRASEÑA@db.qwxnscormzschyukuksj.supabase.co:5432/postgres
JWT_SECRET=un-secreto-largo-y-aleatorio
ADMIN_EMAIL=admin@marinaroobeid.com
ADMIN_PASSWORD_HASH=... (npm run hash-password --prefix server)
```

Luego ejecutá:

```bash
npm install --prefix server
npm run db:generate --prefix server
npm run db:deploy --prefix server
npm run db:seed --prefix server
```

## Alternativa: crear tablas desde Supabase SQL Editor

Si la conexión desde tu PC sigue fallando, podés crear las tablas manualmente:

1. Supabase Dashboard → **SQL Editor** → New query
2. Pegá el contenido de `server/prisma/migrations/20260706180000_init_postgres/migration.sql`
3. Run

Luego, cuando tengas el pooler string correcto, ejecutá solo el seed:

```bash
npm run db:seed --prefix server
```

---

## 3. Deploy en Vercel

1. Subí el repo a GitHub (si aún no está).
2. En [vercel.com](https://vercel.com) → **Add New Project** → importá el repositorio.
3. En **Environment Variables**, agregá:

| Variable | Valor |
|----------|--------|
| `DATABASE_URL` | Connection string de Supabase (con contraseña) |
| `DIRECT_URL` | Igual que `DATABASE_URL` |
| `JWT_SECRET` | Secreto largo y aleatorio |
| `JWT_EXPIRES_IN` | `8h` |
| `ADMIN_EMAIL` | Email del admin |
| `ADMIN_PASSWORD_HASH` | Hash bcrypt de tu contraseña |
| `SUPABASE_URL` | URL del proyecto (Settings → API) |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave **service_role** (secret, solo backend) |
| `SUPABASE_STORAGE_BUCKET` | `propiedades` |
| `NODE_ENV` | `production` |

4. Deploy. Vercel usará `vercel.json` para:
   - Compilar el frontend (`client/dist`)
   - Ejecutar migraciones (`prisma migrate deploy`)
   - Servir API + sitio desde un solo dominio

## 4. Verificar

- Sitio: `https://tu-proyecto.vercel.app`
- API: `https://tu-proyecto.vercel.app/api/health` → debe mostrar `"database": "connected"`
- Admin: `https://tu-proyecto.vercel.app/admin/login`

## 5. Imágenes en Supabase Storage

El panel admin permite **subir fotos** directamente. Las imágenes se guardan en Supabase Storage y la URL pública queda en el campo `imagen` de cada propiedad.

### Configurar Storage

1. Supabase Dashboard → **Project Settings → API**
   - Copiá **Project URL** → `SUPABASE_URL`
   - Copiá **service_role** (secret) → `SUPABASE_SERVICE_ROLE_KEY`  
     ⚠️ Nunca expongas esta clave en el frontend ni la subas a git.

2. Crear el bucket (automático):

```bash
npm run storage:setup --prefix server
```

O manualmente: **Storage → New bucket** → nombre `propiedades`, marcar **Public bucket**.

3. Agregá las variables en `server/.env` local y en **Vercel → Environment Variables**:

| Variable | Valor |
|----------|--------|
| `SUPABASE_URL` | `https://xxx.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave service_role del dashboard |
| `SUPABASE_STORAGE_BUCKET` | `propiedades` (opcional, este es el default) |

### Uso en el admin

1. Entrá a `/admin` → crear o editar propiedad.
2. Elegí **Subir imagen** (JPG/PNG/WebP, máx. 5 MB).
3. También podés usar **URL externa** si la foto ya está en otro servidor.

La API de subida es `POST /api/uploads/image` (requiere JWT). Solo el backend usa la service role key.

---

**Importante:** No subas `server/.env` a git. La contraseña de la base solo va en variables de entorno de Vercel y en tu `.env` local.
