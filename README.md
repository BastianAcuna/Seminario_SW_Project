# USM App — Instrucciones de instalación y ejecución

Este repositorio contiene dos partes principales:

- `backend`: API en Node/Express que usa una base de datos SQLite (`products.db`).
- `front`: aplicación front-end en React + Vite + TypeScript.

A continuación se explica cómo preparar el entorno y ejecutar ambas partes en desarrollo.

## Requisitos

- Node.js (recomendado: 16.x o superior) y `npm`.
- Opcional: `npx` / `nodemon` para desarrollo con reinicio automático.

## Estructura relevante

- `backend/` — código del servidor (archivo principal: `server.js`).
- `backend/products.db` — archivo SQLite con datos de ejemplo.
- `front/` — código del cliente (Vite + React + TypeScript).

## Inicializar el proyecto (paso a paso)

1. Backend

```bash
# ir al directorio del backend
cd backend

# instalar dependencias
npm install

# iniciar el servidor
# (usa el puerto 3001 por defecto, o establece PORT)
node server.js

# alternativa (desarrollo con reinicio automático)
# npm i -g nodemon   # instalar globalmente (opcional)
# npx nodemon server.js
```

Notas:

- El servidor expone la API bajo `/api/products` (por ejemplo: `http://localhost:3001/api/products`).
- `server.js` respeta la variable de entorno `PORT` si quieres cambiar el puerto.

2. Frontend

```bash
# ir al directorio del frontend
cd ../front

# instalar dependencias
npm install

# iniciar servidor de desarrollo (Vite)
npm run dev
```

Notas:

- El servidor de desarrollo de Vite usa por defecto `http://localhost:5173` (puerto puede variar).
- Si el frontend necesita consumir la API, asegúrate de que el `backend` esté en ejecución y que la URL del API apunte a `http://localhost:3001` (o al puerto que hayas configurado).

3. Ejecutar todo junto

Abre dos terminales y ejecuta el backend y el frontend según los pasos anteriores. Primero el backend, luego el frontend.

## Base de datos

El proyecto incluye `backend/products.db`, una base de datos SQLite. No es necesaria una configuración adicional para pruebas locales; simplemente asegúrate de que `server.js` tenga acceso a ese archivo.

Si necesitas recrear o resetear la BD, puedes hacerlo con herramientas SQLite manualmente (p. ej. `sqlite3 products.db`) o añadiendo scripts/migraciones según convenga.
