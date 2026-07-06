# Publicar en Vercel + Supabase

## 1. Configurar Supabase (base de datos)

En [Supabase Dashboard](https://supabase.com/dashboard) → tu proyecto → **Settings → Database**:

1. Copiá la **Database password** (la que elegiste al crear el proyecto).
2. Usá este connection string (reemplazá la contraseña):

```
postgresql://postgres:TU_CONTRASEÑA@db.qwxnscormzschyukuksj.supabase.co:5432/postgres
```

## 2. Migrar y cargar datos (una sola vez, en tu PC)

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
| `NODE_ENV` | `production` |

4. Deploy. Vercel usará `vercel.json` para:
   - Compilar el frontend (`client/dist`)
   - Ejecutar migraciones (`prisma migrate deploy`)
   - Servir API + sitio desde un solo dominio

## 4. Verificar

- Sitio: `https://tu-proyecto.vercel.app`
- API: `https://tu-proyecto.vercel.app/api/health` → debe mostrar `"database": "connected"`
- Admin: `https://tu-proyecto.vercel.app/admin/login`

## 5. Imágenes en Supabase Storage (próximo paso)

Hoy las propiedades usan URLs en el campo `imagen`. Para subir fotos a Supabase Storage:

1. En Supabase → **Storage** → crear bucket `propiedades` (público).
2. Subí las imágenes y copiá la URL pública.
3. Pegala en el panel admin al crear/editar propiedades.

---

**Importante:** No subas `server/.env` a git. La contraseña de la base solo va en variables de entorno de Vercel y en tu `.env` local.
