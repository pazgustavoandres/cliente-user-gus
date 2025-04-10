# Cliente de Usuarios

Aplicación web para la gestión de usuarios, desarrollada con React y Vite.

## URLs de Producción

- **Aplicación Cliente**: [https://clientesgus.netlify.app/](https://clientesgus.netlify.app/)
- **API Backend**: [https://api-user-ui1c.onrender.com/api](https://api-user-ui1c.onrender.com/api)

## Despliegue

La aplicación está desplegada en:
- **Frontend**: Netlify
- **Backend**: Render
- **Base de Datos**: Render

## Funcionalidades Implementadas

- Gestión de usuarios (CRUD)
- Integración con API REST
- Persistencia de datos
- Interfaz de usuario responsiva

## Tecnologías Utilizadas

- React
- Vite
- Axios para peticiones HTTP
- CSS para estilos

## Configuración del Entorno

Las variables de entorno necesarias están configuradas en el archivo `.env`:

```
VITE_API_URL=https://api-user-ui1c.onrender.com/api
```

## Verificación de Integración

La aplicación ha sido probada y verifica:
- ✅ Despliegue correcto del cliente
- ✅ Funcionamiento del backend
- ✅ Persistencia de datos
- ✅ Integración cliente-backend

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
