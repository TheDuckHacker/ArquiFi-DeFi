# 🚀 ArquiFi DeFi Social - Guía de Despliegue

## 📋 Información del Proyecto

**Nombre:** ArquiFi DeFi Social  
**Versión:** 1.0.0  
**Plataforma:** Vercel  
**URL:** [https://arquifi-defi-social.vercel.app](https://arquifi-defi-social.vercel.app)

## 🔧 Configuración de Variables de Entorno

### Variables Requeridas en Vercel:

```bash
# ArquiBot - API Key de Groq
VITE_GROQ_API_KEY=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

# Configuración de la App
VITE_APP_NAME=ArquiFi DeFi Social
VITE_APP_VERSION=1.0.0
NODE_ENV=production

# Stacks Configuration
VITE_STACKS_API_URL=https://api.stacks.co
VITE_STACKS_NETWORK=testnet
```

## 🏗️ Comandos de Build

```bash
# Instalar dependencias
npm install

# Build para producción
npm run build

# Preview local
npm run preview
```

## 📁 Estructura del Proyecto

```
arquifi-defi-social/
├── src/
│   ├── components/          # Componentes React
│   ├── pages/              # Páginas de la aplicación
│   ├── config/             # Configuración (Groq, Stacks)
│   ├── hooks/              # Custom hooks
│   └── index.css           # Estilos globales
├── public/                 # Archivos estáticos
├── dist/                   # Build de producción
├── vercel.json            # Configuración de Vercel
├── vite.config.js         # Configuración de Vite
└── package.json           # Dependencias y scripts
```

## 🌐 Funcionalidades Desplegadas

### ✅ Características Principales:
- **Dashboard DeFi** - Portfolio y staking
- **Feed Social** - Publicaciones y comentarios
- **Sistema de Amistades** - Solicitudes y notificaciones
- **ArquiBot IA** - Asistente inteligente con Groq
- **Wallet Integration** - Conexión con Leather
- **Contratos Inteligentes** - Stacks blockchain
- **NFT Marketplace** - Creación y venta de NFTs
- **Gobernanza DAO** - Sistema de votación

### ✅ Tecnologías:
- **Frontend:** React 18 + Vite
- **Styling:** Tailwind CSS
- **Blockchain:** Stacks (Clarity)
- **IA:** Groq API
- **Wallet:** Leather (Stacks)
- **Deployment:** Vercel

## 🔗 Enlaces Importantes

- **Repositorio:** [GitHub](https://github.com/TheDuckHacker/ArquiFi-DeFi)
- **Contratos:** [Stacks Explorer](https://explorer.stacks.co/?chain=testnet)
- **Documentación:** [CONTRATOS_INTELIGENTES.md](./CONTRATOS_INTELIGENTES.md)

## 🚀 Pasos para Despliegue

1. **Conectar repositorio a Vercel**
2. **Configurar variables de entorno**
3. **Build automático**
4. **Verificar funcionalidades**
5. **Configurar dominio personalizado (opcional)**

## 📊 Estado del Despliegue

- ✅ **Build:** Funcionando
- ✅ **Variables de entorno:** Configuradas
- ✅ **Contratos:** Desplegados en Stacks Testnet
- ✅ **ArquiBot:** Funcionando con Groq API
- ✅ **Wallet:** Integración con Leather
- ✅ **Responsive:** Optimizado para móvil y desktop

## 🎯 URL Final

**https://arquifi-defi-social.vercel.app**

---

**Desarrollado por:** ArquiSoft Team  
**Fecha de despliegue:** Octubre 2024  
**Estado:** ✅ Producción
