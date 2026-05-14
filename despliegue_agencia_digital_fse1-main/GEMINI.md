# SEOGrowthers Hub - Instrucciones del Proyecto

Este documento establece las bases, tecnologías y convenciones para el desarrollo de la plataforma SEOGrowthers.

## 🛠 Stack Tecnológico

- **Frontend:** [React 19](https://react.dev/) con [TypeScript](https://www.typescriptlang.org/).
- **Entorno de Construcción:** [Vite 6](https://vitejs.dev/).
- **Estilos:** 
  - **Tailwind CSS:** Utilizado principalmente para layouts y utilidades rápidas (actualmente vía CDN en `index.html`).
  - **Vanilla CSS:** Para componentes de marca y diseño editorial (definido en `<style>` de `index.html` y variables CSS).
- **Backend & Autenticación:** [Firebase 12](https://firebase.google.com/).
- **Inteligencia Artificial:** [Gemini API](https://ai.google.dev/) (SDK `@google/genai`).
- **Iconografía:** [Lucide React](https://lucide.dev/).
- **Animaciones:** `motion`.
- **Enrutamiento:** `react-router-dom` (HashRouter).

## 📏 Reglas de Desarrollo

### 1. General
- **Idioma:** Todas las interacciones con la IA, mensajes de error y documentación interna deben ser en **español**.
- **Seguridad:** Nunca incluir claves de API o secretos en el código. Usar variables de entorno (`.env`).

### 2. Arquitectura de Archivos
- `components/`: Componentes UI reutilizables.
- `views/`: Páginas completas de la aplicación.
- `services/`: Lógica de integración con APIs externas (Firebase, Gemini).
- `contexts/`: Proveedores de estado global (Auth, Theme).
- `constants/`: Datos estáticos y configuraciones.

### 3. Convenciones de Naming
- **Componentes y Vistas:** PascalCase (ej. `NewsCard.tsx`, `Home.tsx`).
- **Funciones y Variables:** camelCase (ej. `fetchData`, `isLoaded`).
- **Archivos de Estilos:** kebab-case.

### 4. Estilos y Diseño
- Priorizar el uso de **variables CSS** definidas en `:root` para mantener la consistencia de marca (colores `--primary`, `--bg-black`, etc.).
- Usar clases de Tailwind para espaciado y layout.
- Mantener la estética "Editorial/Tech" (fuentes Inter y Fira Code, cursivas pesadas, bordes definidos).

## 🚀 Flujo de Trabajo
1. **Investigación:** Analizar el impacto de los cambios en `services/` y `contexts/`.
2. **Implementación:** Seguir el patrón de componentes funcionales de React.
3. **Validación:** Comprobar la respuesta en dispositivos móviles (responsive) y la integridad de los tipos de TypeScript.
