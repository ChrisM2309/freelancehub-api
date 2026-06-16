# FreelanceHub API

API REST desarrollada con NestJS para gestionar usuarios, autenticacion y servicios.

**Autor:** Christopher Marroquin

## Requisitos

- Node.js 18 o superior
- PostgreSQL
- npm

## Configuracion

1. Crea el archivo `.env` a partir de `.env.example`.
2. Configura tus credenciales de base de datos y JWT.
3. Instala dependencias:

```bash
npm install
```

## Levantar el proyecto

```bash
npm run start:dev
```

La API quedara disponible en:

```bash
http://localhost:3000
```

## Swagger

Abre la documentacion en:

```bash
http://localhost:3000/api
```

Endpoints principales:

- `POST /auth/login`
- `GET /public/services`
- `POST /services`

Para rutas protegidas:

1. Inicia sesion en `POST /auth/login`.
2. Copia el `access_token`.
3. En Swagger, haz clic en `Authorize`.
4. Pega el token como `Bearer <token>`.

## Probar en Postman

### Login

**POST** `http://localhost:3000/auth/login`

```json
{
  "email": "test@correo.com",
  "password": "password123"
}
```

### Ver servicios publicos

**GET** `http://localhost:3000/public/services`

No requiere token.

### Crear servicio

**POST** `http://localhost:3000/services`

Headers:

```http
Authorization: Bearer <token>
Content-Type: application/json
```

Body:

```json
{
  "title": "Desarrollo de Landing Page",
  "category": "Desarrollo Web",
  "description": "Hacer la landing de tu empresa en 2 semanas",
  "price": 250
}
```
