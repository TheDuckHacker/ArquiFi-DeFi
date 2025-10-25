# ArquiFi Navigation Component

Una barra de navegación moderna y responsive para la plataforma ArquiFi, construida con React y Tailwind CSS.

## 🚀 Instalación y Configuración

### 1. Instalar dependencias
```bash
npm install
```

### 2. Ejecutar en modo desarrollo
```bash
npm run dev
```

### 3. Abrir en el navegador
El proyecto se abrirá automáticamente en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
arquifi-navigation/
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── index.css
    ├── App.jsx
    └── components/
        └── NavigationBar.jsx
```

## 🎯 Características

- **Diseño Responsive**: Se adapta a diferentes tamaños de pantalla
- **Navegación Intuitiva**: Enlaces claros con iconos descriptivos
- **Indicadores de Estado**: XP y RP del usuario
- **Notificaciones**: Sistema de notificaciones con indicador visual
- **Perfil de Usuario**: Avatar del usuario con iniciales
- **Tema Oscuro**: Diseño moderno con colores oscuros

## 🎨 Componentes

### NavigationBar
Componente principal que incluye:
- Logo y marca de ArquiFi
- Enlaces de navegación (Inicio, Social, Billetera, etc.)
- Indicadores de XP y RP
- Sistema de notificaciones
- Avatar del usuario

### NavLink
Componente reutilizable para los enlaces de navegación con:
- Iconos personalizables
- Estado activo/inactivo
- Efectos hover
- Transiciones suaves

## 🚀 Scripts Disponibles

- `npm run dev` - Ejecutar en modo desarrollo
- `npm run build` - Construir para producción
- `npm run preview` - Previsualizar build de producción
- `npm run lint` - Ejecutar linter

## 🎨 Personalización

### Colores
Los colores se pueden personalizar en `tailwind.config.js`:

```javascript
colors: {
  primary: '#3b82f6',    // Azul principal
  secondary: '#1e40af',   // Azul secundario
  accent: '#10b981',     // Verde de acento
}
```

### Iconos
Los iconos se pueden cambiar fácilmente en el componente `NavLink`:

```jsx
<NavLink icon="🏠" text="Inicio" />
<NavLink icon="👥" text="Social" />
```

## 📱 Responsive Design

- **Desktop**: Navegación completa con todos los elementos
- **Tablet**: Enlaces de navegación con iconos solamente
- **Mobile**: Navegación colapsada (hamburger menu)

## 🔧 Tecnologías

- **React 18**: Framework de JavaScript
- **Vite**: Herramienta de construcción rápida
- **Tailwind CSS**: Framework de CSS
- **PostCSS**: Procesador de CSS

## 🎨 Diseño

El diseño está inspirado en la imagen proporcionada con:
- Fondo oscuro (#111827)
- Enlaces con iconos y texto
- Indicadores de estado (XP/RP)
- Sistema de notificaciones
- Avatar del usuario

## 🚀 Solución de Problemas

### Si no se abre en localhost:
1. Verifica que tengas Node.js instalado
2. Ejecuta `npm install` para instalar dependencias
3. Ejecuta `npm run dev`
4. Abre `http://localhost:3000` en tu navegador

### Si hay errores de dependencias:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Si Tailwind no funciona:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```