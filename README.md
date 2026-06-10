# Marinaro Obeid Negocios Inmobiliarios

Sitio web para inmobiliaria con frontend en **Vite + React + Tailwind** y backend en **Node.js + Express**.

## Estructura del proyecto

```
marinaro-obeid-neg-inm/
├── client/                 # Frontend (Vite + React + Tailwind)
│   └── src/
│       ├── assets/         # Imágenes, iconos y recursos estáticos
│       ├── components/     # Componentes reutilizables
│       ├── hooks/          # Custom hooks (fetch de datos)
│       └── pages/          # Páginas de la aplicación
├── server/                 # Backend (Node.js + Express)
│   ├── data/               # Datos de contacto y propiedades (JSON)
│   └── index.js            # API REST
└── package.json            # Scripts para correr todo junto
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

## API

| Endpoint              | Descripción                    |
|-----------------------|--------------------------------|
| `GET /api/contact`    | Datos de contacto              |
| `GET /api/properties` | Listado de propiedades         |
| `GET /api/properties/:id` | Detalle de una propiedad   |
| `GET /api/health`     | Estado del servidor            |

## Personalización

- **Contacto:** editar `server/data/contact.json`
- **Propiedades:** editar `server/data/properties.json`
- **Estilos:** colores en `client/src/index.css` (variables `@theme`)
