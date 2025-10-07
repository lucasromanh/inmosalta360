# 🏠 InmoSalta360# React + TypeScript + Vite



**Plataforma inmobiliaria completa para Salta Capital**This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.



Una aplicación web moderna desarrollada con React + TypeScript que ofrece una experiencia completa para la gestión y búsqueda de propiedades inmobiliarias en Salta, Argentina.Currently, two official plugins are available:



## ✨ Características Principales- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh

- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### 🏘️ Para Usuarios

- **Catálogo de Propiedades**: Navegación intuitiva con filtros avanzados## React Compiler

- **Vista de Mapa Interactivo**: Explora propiedades por ubicación geográfica

- **Detalles Completos**: Galería de imágenes, características y amenidadesThe React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

- **Búsqueda Personalizada**: Filtra por tipo, precio, ubicación y características

- **Responsive Design**: Optimizado para desktop, tablet y móvil## Expanding the ESLint configuration



### 🎛️ Para AdministradoresIf you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

- **Dashboard Profesional**: Panel de control con métricas y estadísticas

- **Gestión de Propiedades**: CRUD completo con formularios avanzados```js

- **Sistema de Notificaciones**: Alertas en tiempo real de consultas y actividadexport default defineConfig([

- **Analytics Avanzado**: KPIs, análisis por zona y predicciones de mercado  globalIgnores(['dist']),

- **CRM Integrado**: Gestión de clientes y seguimiento de leads  {

    files: ['**/*.{ts,tsx}'],

## 🚀 Tecnologías    extends: [

      // Other configs...

### Frontend

- **React 19.1.1** - Framework principal      // Remove tseslint.configs.recommended and replace with this

- **TypeScript** - Tipado estático      tseslint.configs.recommendedTypeChecked,

- **Vite 7.1.9** - Build tool y development server      // Alternatively, use this for stricter rules

- **React Router DOM 7.9.3** - Enrutamiento SPA      tseslint.configs.strictTypeChecked,

- **TailwindCSS 4.1.14** - Framework de estilos      // Optionally, add this for stylistic rules

- **Axios** - Cliente HTTP para APIs      tseslint.configs.stylisticTypeChecked,



### Arquitectura      // Other configs...

- **Hooks personalizados** para lógica reutilizable    ],

- **Context API** para gestión de estado global    languageOptions: {

- **Componentes modulares** y reutilizables      parserOptions: {

- **Rutas protegidas** con autenticación        project: ['./tsconfig.node.json', './tsconfig.app.json'],

- **Responsive design** mobile-first        tsconfigRootDir: import.meta.dirname,

      },

## 🛠️ Instalación y Configuración      // other options...

    },

### Prerrequisitos  },

- Node.js 18+ ])

- npm o yarn```

- Git

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

### Instalación

```js

1. **Clonar el repositorio**// eslint.config.js

   ```bashimport reactX from 'eslint-plugin-react-x'

   git clone https://github.com/tu-usuario/inmosalta360.gitimport reactDom from 'eslint-plugin-react-dom'

   cd inmosalta360

   ```export default defineConfig([

  globalIgnores(['dist']),

2. **Instalar dependencias**  {

   ```bash    files: ['**/*.{ts,tsx}'],

   npm install    extends: [

   ```      // Other configs...

      // Enable lint rules for React

3. **Ejecutar en modo desarrollo**      reactX.configs['recommended-typescript'],

   ```bash      // Enable lint rules for React DOM

   npm run dev      reactDom.configs.recommended,

   ```    ],

    languageOptions: {

4. **Abrir en el navegador**      parserOptions: {

   ```        project: ['./tsconfig.node.json', './tsconfig.app.json'],

   http://localhost:5173        tsconfigRootDir: import.meta.dirname,

   ```      },

      // other options...

### Scripts Disponibles    },

  },

```bash])

npm run dev        # Servidor de desarrollo```

npm run build      # Build para producción
npm run preview    # Preview del build
npm run lint       # Linter de código
```

## 🎯 Funcionalidades Destacadas

### 📊 Dashboard Administrativo
- **Métricas en tiempo real**: Propiedades, consultas, contratos, ingresos
- **Sistema de notificaciones**: Campana clickeable con alertas contextuales  
- **Tabs organizadas**: Overview, Analytics avanzado, Gestión de propiedades
- **Quick Actions**: Accesos rápidos a funciones principales
- **Gestión de usuario**: Perfil, configuración y logout

### 🗺️ Mapa Interactivo
- **Visualización geográfica** de todas las propiedades
- **Marcadores clickeables** con información detallada
- **Filtros dinámicos** por tipo y rango de precio
- **Tooltips informativos** con imágenes y características
- **Sidebar con lista** sincronizada con el mapa

### 🏠 Gestión de Propiedades
- **Formulario completo** con validaciones
- **Galería de imágenes** múltiple
- **Características detalladas**: dormitorios, baños, superficie
- **Amenidades**: 14+ opciones seleccionables
- **Vista previa** y confirmación de guardado

## 🔐 Autenticación

Sistema de autenticación simulado para desarrollo:

**Credenciales de prueba:**
- **Email**: lucas@mail.com
- **Password**: 12341234

## 🌟 Próximas Funcionalidades

- [ ] Integración con API backend real
- [ ] Sistema de favoritos
- [ ] Chat en tiempo real
- [ ] Notificaciones push
- [ ] Integración con WhatsApp Business
- [ ] Sistema de citas y visitas
- [ ] Calculadora de hipotecas
- [ ] Tours virtuales 360°

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: Amazing Feature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Lucas** - Desarrollador Full Stack

## 🙏 Agradecimientos

- Diseño inspirado en las mejores plataformas inmobiliarias
- Iconos y UX optimizada para el mercado argentino
- Datos de ejemplo basados en el mercado inmobiliario de Salta

---

⭐ **¡Si te gusta este proyecto, dale una estrella!** ⭐