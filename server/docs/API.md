# API de propiedades

## Lectura

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/properties` | Listado completo (admin) |
| GET | `/api/properties?page=1&limit=9` | Listado paginado (filtros: `?tipo=` `?operacion=`) |
| GET | `/api/properties/:id` | Detalle |

## Escritura

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/properties` | Crear propiedad |
| PUT | `/api/properties/:id` | Reemplazar propiedad completa |
| PATCH | `/api/properties/:id` | Actualizar campos parciales |
| DELETE | `/api/properties/:id` | Eliminar propiedad |

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
    "imagen": "https://ejemplo.com/foto.jpg",
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

`titulo`, `tipo`, `operacion`, `precio`, `moneda`, `ubicacion`, `metros`, `descripcion`, `imagen`

Opcionales: `ambientes`, `dormitorios`, `banos`, `caracteristicas`

## Valores permitidos

- **tipo:** Departamento, Casa, PH, Terreno, Comercial
- **operacion:** Venta, Alquiler
- **moneda:** USD, ARS
