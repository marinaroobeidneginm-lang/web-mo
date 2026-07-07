# API

## Autenticación (JWT)

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/api/auth/login` | No | Iniciar sesión |
| GET | `/api/auth/me` | Sí | Usuario actual |

### Login

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@marinaroobeid.com","password":"admin123"}'
```

Respuesta:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "email": "admin@marinaroobeid.com" }
}
```

En peticiones protegidas enviar: `Authorization: Bearer <token>`

---

## Subida de imágenes (Storage)

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/api/uploads/image` | Sí | Subir imagen a Supabase Storage |

Body: `multipart/form-data` con campo `image` (JPG, PNG o WebP, máx. 5 MB).

Respuesta:

```json
{
  "url": "https://xxx.supabase.co/storage/v1/object/public/propiedades/1234-uuid.jpg",
  "path": "1234-uuid.jpg"
}
```

Usá la `url` en el array `imagenes` al crear o editar una propiedad (mínimo 1, máximo 10).

---

# API de propiedades

## Lectura

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/properties` | Listado completo (**requiere JWT**, admin) |
| GET | `/api/properties?page=1&limit=9` | Listado paginado público (filtros: `?tipo=` `?operacion=`) |
| GET | `/api/properties/:id` | Detalle |

## Escritura

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/properties` | Crear propiedad (**requiere JWT**) |
| PUT | `/api/properties/:id` | Reemplazar propiedad completa (**requiere JWT**) |
| PATCH | `/api/properties/:id` | Actualizar campos parciales (**requiere JWT**) |
| DELETE | `/api/properties/:id` | Eliminar propiedad (**requiere JWT**) |

## Ejemplo: crear

```bash
curl -X POST http://localhost:3001/api/properties \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Departamento en Yerba Buena",
    "tipo": "Departamento",
    "operacion": "Alquiler",
    "precio": 550000,
    "moneda": "ARS",
    "ubicacion": "Yerba Buena, Tucumán",
    "metros": 60,
    "ambientes": 2,
    "dormitorios": 1,
    "banos": 1,
    "descripcion": "Departamento luminoso con balcón.",
    "imagenes": [
      "https://ejemplo.com/foto-1.jpg",
      "https://ejemplo.com/foto-2.jpg"
    ],
    "caracteristicas": ["Balcón", "Cochera"]
  }'
```

## Ejemplo: editar (parcial)

```bash
curl -X PATCH http://localhost:3001/api/properties/1 \
  -H "Content-Type: application/json" \
  -d '{"precio": 190000}'
```

## Campos obligatorios (POST y PUT)

`titulo`, `tipo`, `operacion`, `precio`, `moneda`, `ubicacion`, `metros`, `descripcion`, `imagenes` (array de URLs, 1–10)

Opcionales: `ambientes`, `dormitorios`, `banos`, `caracteristicas`

## Valores permitidos

- **tipo:** Departamento, Casa, PH, Terreno, Comercial
- **operacion:** Venta, Alquiler
- **moneda:** USD, ARS
