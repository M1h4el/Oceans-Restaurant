# 🍽️ Oceans Restaurant - Gestión de Pedidos

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-4.4.5-yellow?logo=vite)

Sistema de gestión de pedidos para restaurantes con roles de **dueño** y **meseros**. Frontend desarrollado con React + TypeScript en Vite.js y el Backend usando tecnologías como Node.js (Express + TypeScript).

## Características

- Registro de usuarios autenticados con JWT y capa de seguridad con bcrypt
- Crear y gestionar los productos de tu negocio
- Registrar facturas de compra
- Firebase Storage para el almacenamiento de imágenes en buckets de Google
- MySQL (Railway)
- Componentes de Material UI
- Implementacion de estilos modular con Sass/SCSS modules

## 🚀 Instalación

1. Clona el repositorio:
   ```bash
   git clone git@github.com:tu-usuario/oceans-restaurant.git
2. Instala dependencias:
   ```bash
   cd Oceans Restaurant
   npm install
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   
En otra consola, desde la raiz del proyecto:

4. ```bash
   cd backend
   npm install
   npm run dev

Cabe destacar que se requieren los permisos y credenciales de firebase y la base de datos para poder ejecutar la aplicación con total funcionalidad.

## 💬 Futuras contribuciones

Este es un proyecto que posteriormente será de código abierto. Varias de las implementaciones no se han podido integrar completamente como por ejemplo, el uso de un archivo personalizado para los errores en cada model.ts, validaciones más robustas para controllers.ts, mejoras de diseño y más.

## 👨‍💻 Autor

- **Miguel Solano** — [M1h4el](https://github.com/M1h4el)

