# Marinaro Obeid Negocios Inmobiliarios

Sitio web para inmobiliaria con frontend en **Vite + React + Tailwind** y backend en **Node.js + Express**.

Incluye catálogo público de propiedades con filtros y paginación, fichas de detalle, y un **panel de administración** protegido con **JWT** para crear, editar y eliminar inmuebles.

## Estructura del proyecto

```
marinaro-obeid-neg-inm/
├── client/                              # Frontend (Vite + React + Tailwind)
│   ├── public/                          # Archivos estáticos (favicon, logo)
│   └── src/
│       ├── assets/                      # Imágenes y recursos importados
│       ├── components/                  # Componentes del sitio público
│       │   ├── admin/                   # Layout, formulario y rutas protegidas
│       │   ├── Header.jsx
│       │   ├── Hero.jsx
│       │   ├── PropertyCard.jsx
│       │   ├── PropertyFilters.jsx
│       │   ├── PropertiesSection.jsx
│       │   ├── Pagination.jsx
│       │   ├── ContactSection.jsx
│       │   └── ...
│       ├── constants/                   # Constantes (paginación, opciones de formulario)
│       ├── context/                     # AuthContext (sesión JWT)
│       ├── hooks/                       # useContact, useProperty, usePaginatedProperties
│       ├── pages/                       # Páginas públicas
│       │   ├── Home.jsx
│       │   ├── PropertyDetail.jsx
│       │   └── admin/                   # Panel de administración
│       │       ├── AdminLogin.jsx
│       │       ├── AdminPropertyList.jsx
│       │       ├── AdminPropertyNew.jsx
│       │       └── AdminPropertyEdit.jsx
│       ├── services/                    # Llamadas a la API (auth, propiedades)
│       ├── utils/                       # Helpers (precio, formulario, token)
│       ├── App.jsx                      # Rutas de la aplicación
│       ├── main.jsx
│       └── index.css                    # Estilos globales y tema Tailwind
│
├── server/                              # Backend (Node.js + Express)
│   ├── config/                          # Configuración de autenticación
│   ├── data/                            # Persistencia JSON (contacto y propiedades)
│   ├── docs/                            # Documentación de la API
│   ├── middleware/                      # Middleware JWT (requireAuth)
│   ├── repositories/                    # Capa de acceso a datos (propertyRepository)
│   ├── routes/                          # Rutas auth y properties
│   ├── scripts/                         # Utilidades (hash de contraseña)
│   ├── utils/                           # Validación de propiedades
│   ├── .env.example                     # Variables de entorno de ejemplo
│   └── index.js                         # Punto de entrada del servidor
│
├── package.json                         # Scripts para correr cliente y servidor
└── README.md
```

## Requisitos

- Node.js 18 o superior
- npm

## Instalación

```bash
# Instalar dependencias del proyecto raíz, cliente y servidor
npm install
npm install --prefix client
npm install --prefix server

# Configurar variables de entorno del servidor
cp server/.env.example server/.env
```

## Desarrollo

```bash
# Levanta frontend (puerto 5173) y backend (puerto 3001) a la vez
npm run dev
```

O por separado:

```bash
npm run dev:server   # API en http://localhost:3001
npm run dev:client   # Web en http://localhost:5173
```

## Rutas de la aplicación

### Sitio público

| Ruta | Descripción |
|------|-------------|
| `/` | Página de inicio (hero, propiedades, contacto) |
| `/propiedades/:id` | Ficha de detalle de una propiedad |

### Panel de administración

| Ruta | Descripción |
|------|-------------|
| `/admin/login` | Inicio de sesión |
| `/admin` | Listado de propiedades (requiere JWT) |
| `/admin/propiedades/nueva` | Crear propiedad |
| `/admin/propiedades/:id/editar` | Editar propiedad |

## Autenticación (JWT)

El panel admin y las operaciones de escritura en la API requieren un token JWT.

**Credenciales de desarrollo** (definidas en `server/.env`):

| Campo | Valor |
|-------|-------|
| Email | `admin@marinaroobeid.com` |
| Contraseña | `admin123` |

Para cambiar la contraseña:

```bash
cd server
npm run hash-password "tu-nueva-contraseña"
```

Copiá el hash generado en `ADMIN_PASSWORD_HASH` dentro de `server/.env`.

## Variables de entorno (`server/.env`)

| Variable | Descripción |
|----------|-------------|
| `PORT` | Puerto del servidor (default: 3001) |
| `JWT_SECRET` | Secreto para firmar tokens (cambiar en producción) |
| `JWT_EXPIRES_IN` | Duración del token (ej: `8h`) |
| `ADMIN_EMAIL` | Email del administrador |
| `ADMIN_PASSWORD_HASH` | Hash bcrypt de la contraseña |

## API

Documentación completa en [`server/docs/API.md`](server/docs/API.md).

### Autenticación

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| `POST` | `/api/auth/login` | No | Iniciar sesión |
| `GET` | `/api/auth/me` | Sí | Usuario actual |

### Propiedades

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| `GET` | `/api/properties?page=1&limit=9` | No | Listado paginado (9 por página) |
| `GET` | `/api/properties` | Sí | Listado completo (admin) |
| `GET` | `/api/properties/:id` | No | Detalle de una propiedad |
| `POST` | `/api/properties` | Sí | Crear propiedad |
| `PUT` | `/api/properties/:id` | Sí | Editar propiedad completa |
| `PATCH` | `/api/properties/:id` | Sí | Editar campos parciales |
| `DELETE` | `/api/properties/:id` | Sí | Eliminar propiedad |

### Otros

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/contact` | Datos de contacto |
| `GET` | `/api/health` | Estado del servidor |

## Scripts disponibles

Desde la raíz del proyecto:

```bash
npm run dev          # Frontend + backend en desarrollo
npm run dev:client   # Solo frontend
npm run dev:server   # Solo backend
npm run build        # Build de producción del cliente
npm run start        # Servidor backend en producción
```

Desde `server/`:

```bash
npm run hash-password "contraseña"   # Generar hash para ADMIN_PASSWORD_HASH
```

## Personalización

- **Contacto:** `server/data/contact.json`
- **Propiedades:** panel `/admin` o `server/data/properties.json`
- **Estilos:** colores en `client/src/index.css` (variables `@theme`)
- **Paginación:** cantidad por página en `client/src/constants/pagination.js`

## Producción

```bash
npm run build        # Genera client/dist
npm run start        # Levanta solo el backend
```

En producción configurá un reverse proxy para servir el frontend y redirigir `/api` al servidor Express. Cambiá `JWT_SECRET` y la contraseña del admin antes de desplegar.
