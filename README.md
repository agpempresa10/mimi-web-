# MIMI moda y complementos (MYC)

Web de una tienda de ropa. Angular 21 + Tailwind (frontend) y Spring Boot 3.5 (backend, Java 21, sin base de datos: el catálogo está en `TiendaController`).

Pantallas: inicio, tienda (filtro por categoría), ficha de producto (color y talla) y carrito (se guarda en el navegador).

## Arrancar en local

Terminal 1 (backend, puerto 8090):

    cd backend
    ./mvnw spring-boot:run

Terminal 2 (frontend, puerto 4210):

    cd frontend
    npm install
    npm start

Abre http://localhost:4210

## Dónde cambiar cosas

- Nombre de la tienda, contacto, categorías y productos (precios, colores, tallas): `backend/src/main/java/com/tienda/ropa/TiendaController.java`
- Colores y tipografías: `frontend/tailwind.config.js` y `frontend/src/index.html`
- Nombre en cabecera y pie: `frontend/src/app/components/header` y `footer`
- Las fotos de producto son de momento degradados con un icono; cuando tengas fotos reales, ponlas en `frontend/public/img/` y se sustituyen en `producto-card.ts` y `producto.ts`
