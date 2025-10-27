# 🚀 ArquiFi - Plataforma DeFi Educativa con Stacks

## 📋 Descripción del Proyecto

**ArquiFi** es una plataforma DeFi (Finanzas Descentralizadas) educativa construida sobre la blockchain de Stacks que combina educación financiera, gamificación y contratos inteligentes para crear una experiencia de aprendizaje interactiva y rentable.

## 🎯 Características Principales

### 🔗 **Integración con Stacks Blockchain**
- **Autenticación** con Stacks Wallet (Hiro Wallet, Xverse)
- **Datos en tiempo real** de la blockchain de Stacks
- **Transacciones** simuladas con contratos inteligentes
- **NFTs** educativos y de logros

### 💰 **Funcionalidades DeFi**
- **Staking** de STX con recompensas automáticas
- **Unstaking** flexible de tokens
- **Claim** de recompensas acumuladas
- **APY** calculado en tiempo real

### 🎮 **Sistema de Gamificación**
- **ArquiPuntos (AP)** - Token de utilidad interno
- **Misiones educativas** que otorgan recompensas
- **Rankings** de usuarios
- **Logros** y certificaciones NFT

### 🎨 **NFT Marketplace**
- **Creación** de NFTs educativos
- **Listado** para venta en el marketplace
- **Compra/venta** de NFTs
- **Comisión** del 5% por transacción

## 🏗️ Arquitectura Técnica

### **Frontend**
- **React.js** con Vite para desarrollo rápido
- **Tailwind CSS** para diseño responsive
- **React Router DOM** para navegación
- **Stacks.js** para integración blockchain

### **Contratos Inteligentes (Clarity) - DESPLEGADOS**

#### 1. **ArquiFi DeFi Contract** 
**Dirección:** `SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7.arquifi-defi`
```clarity
;; Funcionalidades principales:
- stake-stx: Staking de tokens STX
- unstake-stx: Retiro de tokens staked
- claim-rewards: Reclamar recompensas acumuladas
- get-user-stake: Consultar stake del usuario
- get-user-rewards: Consultar recompensas pendientes
```

#### 2. **ArquiPuntos Token Contract**
**Dirección:** `SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7.arquipuntos-token`
```clarity
;; Funcionalidades principales:
- mint: Crear nuevos tokens AP (solo owner)
- transfer: Transferir tokens entre usuarios
- burn: Quemar tokens para reducir supply
- approve: Aprobar gastos de terceros
- get-balance: Consultar balance de usuario
```

#### 3. **NFT Marketplace Contract**
**Dirección:** `SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7.nft-marketplace`
```clarity
;; Funcionalidades principales:
- mint-nft: Crear NFTs educativos
- list-nft: Listar NFT para venta
- buy-nft: Comprar NFT del marketplace
- delist-nft: Quitar NFT de venta
- transfer-nft: Transferir NFT entre usuarios
```

## 🚀 Instalación y Configuración

### **Prerrequisitos**
- Node.js 16+ 
- npm o yarn
- Stacks Wallet (Hiro Wallet o Xverse)

### **Instalación**
```bash
# Clonar el repositorio
git clone https://github.com/TheDuckHacker/ArquiFi-DeFi
cd ArquiFi

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### **Configuración de Variables de Entorno**
```bash
# Crear archivo .env en la raíz del proyecto
VITE_GROQ_API_KEY=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
```

**Para activar ArquiBot (Asistente IA):**
1. Ve a [Groq Console](https://console.groq.com/keys)
2. Crea una cuenta gratuita
3. Genera una API key
4. Crea un archivo `.env` en la raíz del proyecto
5. Agrega tu API key: `VITE_GROQ_API_KEY=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`
6. Reinicia el servidor de desarrollo

**Sin API key:** ArquiBot funcionará con respuestas predefinidas.

## 📱 Páginas y Funcionalidades

### **1. Dashboard Principal** ✅
- **Portfolio** con balance STX en tiempo real
- **Transacciones** recientes de la blockchain
- **NFTs** del usuario
- **Estadísticas** de ArquiPuntos
- **Información de wallet** conectada (Leather)

### **2. Contratos Inteligentes** ✅
- **Staking/Unstaking** de STX
- **Claim** de recompensas
- **Mint/Transfer** de ArquiPuntos
- **Crear/Comprar** NFTs

### **3. Sistema de Juegos** ✅
- **Juegos educativos** con recompensas AP
- **Rankings** de usuarios
- **Misiones** diarias y semanales
- **Logros** desbloqueables

### **4. Capa Educativa** ✅
- **Cursos** de finanzas descentralizadas
- **Tutoriales** de Stacks blockchain
- **Certificaciones** NFT
- **Progreso** de aprendizaje

### **5. P2P Trading** ✅
- **Intercambio** directo entre usuarios
- **Ofertas** de compra/venta
- **Historial** de transacciones
- **Reputación** de usuarios

### **6. Gobernanza DAO** ✅
- **Propuestas** de la comunidad
- **Votación** con tokens AP
- **Implementación** de cambios
- **Transparencia** total

### **7. Feed Social** ✅
- **Publicaciones** automáticas
- **Sistema de comentarios** funcional
- **Sistema de amistades** (como Instagram)
- **Solicitudes de amistad** con notificaciones
- **Imágenes** dinámicas con picsum.photos
- **Interacciones** (like, comentar, compartir)

### **8. ArquiBot - Asistente IA** ✅
- **Agente inteligente** con Groq API
- **Conocimiento completo** de la plataforma
- **Ayuda contextual** según la página actual
- **Recomendaciones personalizadas** basadas en el perfil
- **Resolución de problemas** técnicos
- **Botones de acción rápida** para consultas comunes
- **Historial de conversación** para contexto continuo
- **Respuestas inteligentes** en tiempo real

## 🔧 Configuración de Stacks

### **Red de Prueba (Testnet)**
```javascript
const network = {
  url: 'https://stacks-node-api.testnet.stacks.co',
  chainId: 2147483648
};
```

### **Autenticación**
```javascript
import { AppConfig, UserSession } from '@stacks/connect';

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });
```

## 🎮 Cómo Usar ArquiFi

### **1. Conectar Wallet**
1. Abrir ArquiFi en el navegador
2. Hacer clic en "Conectar Wallet"
3. Seleccionar Hiro Wallet o Xverse
4. Autorizar la conexión

### **2. Hacer Staking**
1. Ir a la sección "Contratos"
2. Ingresar cantidad de STX a stakear
3. Hacer clic en "Stake"
4. Confirmar transacción en wallet

### **3. Ganar ArquiPuntos**
1. Completar misiones educativas
2. Participar en juegos
3. Hacer staking de STX
4. Contribuir a la gobernanza

### **4. Crear NFTs**
1. Ir a "NFT Marketplace"
2. Ingresar metadata del NFT
3. Hacer clic en "Crear NFT"
4. Confirmar transacción

### **5. Usar ArquiBot**
1. Hacer clic en el icono flotante del robot
2. Escribir tu pregunta o usar botones de acción rápida
3. Recibir respuestas inteligentes y contextuales
4. Usar "Ayuda página" para información específica
5. Preguntar sobre estrategias de ganancia de AP

## 📊 Modelo de Negocio

### **Flujos de Ingresos**
- **Comisiones** del marketplace (5%)
- **Servicios premium** de educación
- **Certificaciones** NFT pagadas
- **Publicidad** de proyectos DeFi

### **Tokenomics**
- **Supply inicial**: 1,000,000 ArquiPuntos
- **Distribución**: 60% usuarios, 30% desarrollo, 10% reserva
- **Utilidad**: Acceso premium, gobernanza, recompensas

## 🛠️ Tecnologías Utilizadas

### **Frontend**
- React.js 18+
- Vite (Build tool)
- Tailwind CSS
- React Router DOM
- Stacks.js

### **Blockchain**
- Stacks Blockchain
- Clarity (Smart contracts)
- Stacks Connect (Wallet integration)

### **APIs**
- Stacks API (Blockchain data)
- Groq API (ArquiBot - Asistente IA)

### **Deployment**
- Vercel (Frontend)
- Netlify (Alternative)

## 🚀 Deployment

### **✅ Vercel (Producción)**
**URL:** https://arquifi-axxpi8wy2-carla-loayzas-projects.vercel.app

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Configuración de Variables de Entorno en Vercel:**
- `VITE_GROQ_API_KEY` - API key de Groq para ArquiBot
- `VITE_APP_NAME` - ArquiFi DeFi Social
- `VITE_APP_VERSION` - 1.0.0
- `NODE_ENV` - production
- `VITE_STACKS_API_URL` - https://api.stacks.co
- `VITE_STACKS_NETWORK` - testnet

### **Netlify (Alternativo)**
```bash
# Build
npm run build

# Deploy a Netlify
# Subir carpeta dist/ a Netlify
```

## 📈 Roadmap

### **Fase 1** ✅
- [x] Frontend básico
- [x] Integración con Stacks
- [x] Contratos desplegados
- [x] Autenticación de wallet

### **Fase 2** ✅
- [x] Despliegue de contratos reales
- [x] Integración completa con blockchain
- [x] Sistema de recompensas real
- [x] Marketplace funcional
- [x] ArquiBot con IA (Groq API)
- [x] Sistema de amistades y notificaciones
- [x] Feed social con imágenes
- [x] Despliegue en Vercel

### **Fase 3** 📋
- [ ] Mobile app
- [ ] Integración con más blockchains
- [ ] Programa de afiliados
- [ ] Certificaciones oficiales
- [ ] Despliegue en Mainnet
- [ ] Auditoría de seguridad completa

## 🤝 Contribución

### **Cómo Contribuir**
1. Fork el repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

### **Reportar Bugs**
- Usar GitHub Issues
- Incluir pasos para reproducir
- Especificar versión y navegador

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👥 Equipo

**ArquiSoft** - Equipo de desarrollo
- Desarrolladores full-stack
- Especialistas en blockchain
- Diseñadores UX/UI

## 📞 Contacto

- **Website**: [ArquiFi DeFi Social](https://arquifi-axxpi8wy2-carla-loayzas-projects.vercel.app/)
- **GitHub**: [ArquiFi-DeFi](https://github.com/TheDuckHacker/ArquiFi-DeFi)
- **Email**: loayzaleiguezc@gmail.com
- **Documentación**: [CONTRATOS_INTELIGENTES.md](./CONTRATOS_INTELIGENTES.md)

## 🙏 Agradecimientos

- **Stacks Foundation** por el ecosistema blockchain
- **Hiro Systems** por las herramientas de desarrollo
- **Comunidad Stacks** por el apoyo y feedback

---

## 🎯 Estado Actual del Proyecto

### **✅ FUNCIONANDO EN PRODUCCIÓN**
- **URL**: https://arquifi-axxpi8wy2-carla-loayzas-projects.vercel.app
- **Estado**: ✅ Completamente funcional
- **ArquiBot**: ✅ Con IA real (Groq API)
- **Wallet**: ✅ Integración con Leather
- **Contratos**: ✅ Desplegados en Stacks Testnet
- **Feed Social**: ✅ Sistema de amistades funcional
- **Notificaciones**: ✅ Sistema completo implementado

### **🔧 Tecnologías Implementadas**
- **Frontend**: React 18 + Vite + Tailwind CSS
- **Blockchain**: Stacks (Clarity contracts)
- **IA**: Groq API para ArquiBot
- **Wallet**: Leather (Stacks)
- **Deployment**: Vercel
- **Imágenes**: picsum.photos

### **📊 Métricas del Proyecto**
- **Líneas de código**: 5000+
- **Componentes React**: 25+
- **Páginas**: 10+
- **Contratos desplegados**: 3
- **Funcionalidades**: 50+

---

**¡ArquiFi - Aprende, Gana y Construye el Futuro DeFi!** 🚀