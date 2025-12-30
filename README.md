# 📋 Prueba Técnica React Junior - Sistema de Gestión de Acciones

> Aplicación web desarrollada con React que implementa un sistema completo de gestión de acciones con autenticación, listado paginado y operaciones CRUD. Desarrollado como parte de una prueba técnica para demostrar competencias en desarrollo frontend moderno.

[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

<img src="/public/Demo.png" alt="Demo Screenshot" width="700" />

---

## 📑 Tabla de Contenidos

- [Demo en Vivo](#-demo-en-vivo)
- [Características](#-características)
- [Tecnologías Utilizadas](#️-tecnologías-utilizadas)
- [Prerequisitos](#-prerequisitos)
- [Instalación](#-instalación)
- [Ejecución del Proyecto](#️-ejecución-del-proyecto)
- [Decisiones Técnicas](#-decisiones-técnicas)
- [Supuestos y Consideraciones](#-supuestos-y-consideraciones)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Testing QA](#-testing-qa)
- [Autor](#-autor)

---

## 🌐 Demo en Vivo

🔗 **[Ver aplicación desplegada](https://techitianreact.netlify.app)**

**Credenciales de prueba:**

- Email: `a.berrio@yopmail.com`
- Password: `AmuFK8G4Bh64Q1uX+IxQhw==`

> **Nota**: La API puede tardar ~30 segundos en activarse en la primera petición (cold start).

---

## ✨ Características

### Funcionalidades Principales

- 🔐 **Sistema de Autenticación** - Login seguro con JWT y protección de rutas
- 📊 **Listado Paginado** - Tabla interactiva con datos del servidor
- ➕ **Creacion de acciones** - Crear categoria
- 📱 **Diseño Responsive** - Optimizado para móviles, tablets y desktop
- ⚡ **Optimización de Rendimiento** - Caching inteligente con React Query

### Características Técnicas

- ✅ Validación robusta de formularios con Zod
- 🎨 UI moderna con Shadcn/ui y Tailwind CSS
- 🔄 Manejo de estados asíncronos (loading, error, success)
- 🛡️ Interceptores HTTP para autenticación automática
- 💾 Persistencia de sesión en localStorage
- 🎯 TypeScript

---

## 🛠️ Tecnologías Utilizadas

### Core

- **React** - Librería principal para UI con Hooks modernos
- **Vite** - Build tool ultra-rápido para desarrollo
- **React Router DOM** - Enrutamiento SPA con protección de rutas

### Gestión de Estado y Datos

- **Zustand** - Estado global minimalista y performante
- **React Query (TanStack Query)** - Sincronización y caching de datos del servidor
- **Axios** - Cliente HTTP con interceptores y manejo de errores

### UI y Estilos

- **Tailwind CSS** - Framework CSS utility-first
- **Shadcn/ui** - Componentes accesibles y personalizables
- **Lucide React** - Iconografía moderna y consistente

### Formularios y Validación

- **React Hook Form** - Formularios performantes con mínimos re-renders
- **Zod** - Schema validation type-safe

### Tablas

- **TanStack Table (React Table)** - Tabla headless con paginación, ordenamiento y filtros

### Herramientas de Desarrollo

- **ESLint** - Linting y buenas prácticas de código
- **Prettier** - Formateo consistente de código
- **Git** - Control de versiones

---

## 📋 Prerequisitos

Antes de comenzar, asegúrate de tener instalado:

| Herramienta | Versión Mínima | Verificar        |
| ----------- | -------------- | ---------------- |
| Node.js     | >= 16.x        | `node --version` |
| npm         | >= 8.x         | `npm --version`  |
| Git         | >= 2.x         | `git --version`  |

> **Recomendación**: Usa Node.js v18 LTS o superior para mejor compatibilidad.

---

## 🚀 Instalación

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/bnescor/prueba-tecnica-react.git
cd prueba-tecnica-react
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

_O si prefieres yarn:_

```bash
yarn install
```

### 3️⃣ Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
New-Item -Path . -Name ".env" -ItemType "File"
```

Edita el archivo `.env` con las URLs de las APIs:

```env
VITE_API_AUTH_URL=https://dev.apinetbo.bekindnetwork.com
VITE_API_CORE_URL=https://dev.api.bekindnetwork.com
```

> **Nota**: Las variables en Vite deben tener el prefijo `VITE_` para ser accesibles desde el cliente.

> **Importante**: Aunque estas APIs son públicas, usar variables de entorno permite cambiar fácilmente entre diferentes entornos (desarrollo, staging, producción) sin modificar el código fuente.

---

## ▶️ Ejecución del Proyecto

### 🔧 Modo Desarrollo

```bash
npm run dev
```

## La aplicación estará disponible en **localhost** (Vite)

## 💡 Decisiones Técnicas

### Arquitectura y Patrones

#### 1. Gestión de Estado Global - **Zustand**

**¿Por qué Zustand y no Redux/Context API?**

- ✅ **Simplicidad**: API minimalista sin boilerplate
- ✅ **Performance**: Re-renders optimizados automáticamente
- ✅ **Bundle size**: ~1KB vs ~50KB de Redux
- ✅ **DevTools**: Soporte nativo para debugging

```javascript
// Ejemplo de store simple y efectivo
const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
```

**Trade-off considerado**: Para aplicaciones más grandes con lógica compleja, Redux Toolkit podría ser mejor, pero para este caso Zustand es perfecto.

---

#### 2. Server State Management - **React Query**

**¿Por qué React Query?**

- ✅ **Caching automático**: Reduce peticiones redundantes
- ✅ **Sincronización**: Actualización automática en background
- ✅ **Estados de carga/error**: Manejo declarativo out-of-the-box
- ✅ **Optimistic Updates**: Para mejor UX en mutaciones

**Decisión clave**: Separar estado del servidor (React Query) del estado de UI (Zustand) para mejor separación de responsabilidades.

---

#### 3. Validación de Formularios - **React Hook Form + Zod**

**¿Por qué esta combinación?**

- ✅ **Performance**: Re-renders mínimos vs Formik
- ✅ **Type-safety**: Zod proporciona validación tipada
- ✅ **DX mejorado**: Esquemas reutilizables y claros

```javascript
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Ingrese el email")
    .email("Formato de email inválido"),
  password: z.string().min(6, "Ingrese la contraseña"),
});
```

---

#### 4. Componentes UI - **Shadcn/ui**

**¿Por qué Shadcn y no una librería de componentes completa?**

- ✅ **Propiedad del código**: Componentes copiados a tu proyecto
- ✅ **Personalización total**: Sin limitaciones de la librería
- ✅ **Sin dependencias pesadas**: Solo instalas lo que usas
- ✅ **Accesibilidad**: Basado en Radix UI (ARIA compliant)

**Trade-off**: Requiere más setup inicial vs librerías como MUI o Ant Design, pero mayor control.

---

#### 5. Manejo de Rutas Protegidas

**Implementación con Higher-Order Component (HOC)**

```javascript
// Patrón usado para proteger rutas
export default function PrivateRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
```

**Razón**: Centraliza la lógica de autenticación y evita duplicación de código en cada ruta.

---

#### 6. Variables de Entorno

**¿Por qué usar variables de entorno para APIs públicas?**

- ✅ **Flexibilidad multi-entorno**: Dev, staging, producción
- ✅ **Cambios sin deployar**: Modificar URLs sin tocar código
- ✅ **Buenas prácticas**: Preparado para escalar a APIs privadas
- ✅ **CI/CD friendly**: Facilita pipelines de despliegue

---

## 📝 Supuestos y Consideraciones

### Supuestos Realizados

1. **Autenticación JWT**: Se asume que el backend retorna un token válido en formato `{ token: "..." }`
2. **Formato de respuesta API**: Endpoints retornan JSON con estructura:
   ```json
   {
     "data": [...],
     "pageNumber": 0,
     "pageSize": 10,
     "totalElements": 20,
     "totalPages": 4
   }
   ```
3. **Paginación servidor**: Backend soporta parámetros `?pageNumber=1&pageSize=10`
4. **CORS configurado**: Las APIs permiten peticiones desde cualquier origen
5. **Refresh tokens**: No implementado (se asume sesión por token único)

### Limitaciones Conocidas

- ⚠️ **Sin manejo de roles**: Todos los usuarios autenticados tienen los mismos permisos
- ⚠️ **localStorage para tokens**: En producción se recomienda httpOnly cookies
- ⚠️ **Sin refresh de tokens**: Sesión expira según el JWT (requiere re-login)
- ⚠️ **Sin tests automatizados**: Por tiempo, solo testing manual (ver QA_CHECKLIST.md)
- ⚠️ **Sin i18n**: Aplicación solo en español

### Mejoras Futuras (Roadmap)

- [ ] **WebSockets**: Notificaciones en tiempo real
- [ ] **Testing**: Implementar Jest + React Testing Library + Cypress E2E
- [ ] **Filtros avanzados**: Ordenamiento y búsqueda por múltiples campos
- [ ] **Exportación**: Descargar datos en CSV/Excel
- [ ] **Dark mode**: Tema oscuro con persistencia
- [ ] **Internacionalización**: Soporte multi-idioma con react-i18next

---

## 📁 Estructura del Proyecto

```
prueba-tecnica-react-junior/
│
├── public/                    # Assets estáticos
│
├── src/
│   ├── api/                   # Configuración de servicios HTTP
│   │   ├── axios.ts           # Instancia de Axios con interceptores
│   │   ├── auth.api.ts        # Endpoints de autenticación
│   │   └── actions.api.ts     # Endpoints obtener los datos de la categorias con su respectivo paginacion
│   │
│   ├── components/            # Componentes reutilizables
│   │   ├── ui/                # Componentes de Shadcn/ui
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── table.tsx
│   │   │   └── ...
│   │
│   ├── hooks/                 # Custom React Hooks
│   │   ├── useLogin.ts        # Hook para autenticación
│   │   ├── useCrearAction.ts  # Hook para creacion de acciones
│   │   └── useActions.ts      # Hook para la paginacion o obtencion de categorias
│   │
│   ├── lib/                   # Utilidades y helpers
│   │   ├── navbar.data.ts     # Lista de ruta disponible con su informacion
│   │   ├── querryClient.ts    # Configuracion de parametro de react querry
│   │   └── utils.ts           # Funciones auxiliares
│   │
│   ├── pages/                 # Páginas/Vistas principales
│   │   ├── Login.tsx          # Página de autenticación
│   │   ├── Dashboard.tsx      # Página de home
│   │   ├── ComingSoon.tsx     # Página generica con mensaje de agregacion de contenido a esa ruta
│   │   ├── Category.jsx       # Página de categorias
│   │   └── NotFound.jsx       # Página 404
│   │
│   ├── routes/                # Configuración de rutas
│   │   ├── PrivateLayout.tsx  # Ruta con layout con el navbar
│   │   └── ProtectedRoute.tsx # HOC para rutas protegidas
│   │
│   ├── store/                 # Estado global (Zustand)
│   │   └── auth.store.ts      # Store de autenticación
│   │
│   ├── App.jsx                # Componente raíz
│   ├── main.jsx               # Entry point
│   └── index.css              # Estilos globales (Tailwind)
│
└── QA_CHECKLIST.md            # ✅ Checklist de pruebas funcionales
```

### Convenciones de Código

- **Componentes**: PascalCase (`FormLogin.tsx`)
- **Utilidades**: camelCase (`utils.ts`)
- **Constantes**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Hooks personalizados**: Prefijo `use` (`useLogin.ts`)

---

## 🧪 Testing QA

### Manual Testing

Este proyecto incluye un checklist completo de pruebas funcionales documentado en **[QA_CHECKLIST.md](./QA_CHECKLIST.md)**.

**Casos de prueba cubiertos:**

- ✅ Autenticación (login exitoso/fallido)
- ✅ Validación de formularios
- ✅ Listado y visualización de datos
- ✅ Paginación (navegación y límites)
- ✅ Creacion de acciones
- ✅ Persistencia de sesión
- ✅ Manejo de errores

### Ejecutar Checklist

1. Abre el archivo `QA_CHECKLIST.md`
2. Sigue los pasos de cada caso de prueba
3. Marca con ✅ los tests que pasen

> **Nota**: Los tests automatizados están en el roadmap de mejoras futuras.

---

## 👤 Autor

## **Brian Escorcia** - Frontend Developer

Brian Escorcia - Frontend Developer

- 💼 LinkedIn: [Brian Escorcia](https://www.linkedin.com/in/brian-escorcia-gonzalez)
- 📧 Email: Naziegonzalez@gmail.com

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 🙏 Agradecimientos

- [Documentación oficial de React](https://react.dev/)
- [Shadcn/ui](https://ui.shadcn.com/) por los componentes base
- [TanStack Query](https://tanstack.com/query) por la excelente documentación
- Comunidad de desarrolladores en Stack Overflow
- Equipo de BeKind Network por proporcionar las APIs

---

## 📌 Notas Adicionales

### ¿Por qué este proyecto destaca?

✨ **Arquitectura escalable** - Estructura clara y mantenible
✨ **Mejores prácticas** - Código limpio siguiendo estándares de la industria
✨ **Performance optimizado** - Técnicas modernas de optimización
✨ **Documentación completa** - README detallado + checklist de QA
✨ **Decisiones justificadas** - Cada elección técnica tiene su razón de ser

---

**¿Preguntas o sugerencias?**
Abre un [issue](https://github.com/BrianEscorcia/prueba-tecnica-react-junior/issues) o contáctame directamente.
