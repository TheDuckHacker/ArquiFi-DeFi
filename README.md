# 🚀 ArquiFi - Plataforma DeFi con Stacks Blockchain

¡Bienvenido a ArquiFi! Esta es una plataforma de finanzas descentralizadas (DeFi) construida con React, Vite, Tailwind CSS y **Stacks Blockchain**, diseñada para ofrecer una experiencia de usuario moderna y fluida con funcionalidades blockchain reales.

## ✨ Características Principales

### 🔗 **Integración con Stacks Blockchain**
- **Autenticación Real**: Conexión con wallets de Stacks (Hiro Wallet, Xverse)
- **Datos en Tiempo Real**: Balance STX, transacciones y NFTs desde la blockchain
- **Contratos Inteligentes**: Interacción con smart contracts desplegados en Stacks
- **Red Testnet**: Configurado para desarrollo y pruebas

### 🎨 **Interfaz Moderna**
- **Diseño Glassmorphism**: Efectos de vidrio y gradientes elegantes
- **Responsive Design**: Adaptado para dispositivos móviles y de escritorio
- **Navegación Intuitiva**: Barra de navegación completa con estado de wallet
- **Logo Personalizado**: Logo de ArquiFi integrado consistentemente

### 💰 **Funcionalidades DeFi**
- **Staking de STX**: Stake y unstake de tokens STX
- **Sistema de Recompensas**: Recompensas automáticas por staking
- **Gestión de NFTs**: Visualización de colección de NFTs
- **Historial de Transacciones**: Transacciones en tiempo real desde la blockchain

## 🛠️ Tecnologías Utilizadas

### **Frontend**
- **React 18**: Biblioteca de JavaScript para interfaces de usuario
- **Vite**: Herramienta de construcción rápida para proyectos web modernos
- **Tailwind CSS**: Framework CSS para diseño rápido y personalizable
- **React Router DOM**: Para la gestión de rutas y navegación

### **Blockchain & Smart Contracts**
- **Stacks Blockchain**: Plataforma blockchain para contratos inteligentes
- **Clarity**: Lenguaje de programación para smart contracts
- **Clarinet**: Herramienta de desarrollo para contratos Clarity
- **Stacks.js**: SDK de JavaScript para interactuar con Stacks

### **APIs y Servicios**
- **Stacks API**: API oficial de Hiro para datos de blockchain
- **@stacks/connect**: Biblioteca para autenticación con wallets
- **@stacks/transactions**: Para transacciones blockchain

## 🚀 Cómo Empezar

### 1. Clonar el Repositorio

```bash
git clone https://github.com/TheDuckHacker/ArquiFi.git
cd ArquiFi
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
VITE_STACKS_NETWORK=testnet
VITE_CONTRACT_ADDRESS=ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM
VITE_CONTRACT_NAME=arquifi-defi
```

### 4. Ejecutar la Aplicación

```bash
npm run dev
```

La aplicación se abrirá automáticamente en tu navegador en `http://localhost:5173`.

## 📱 Uso de la Aplicación

### **Conectar Wallet**
1. Haz clic en el botón de conexión en la barra de navegación
2. Selecciona tu wallet preferida (Hiro Wallet, Xverse, etc.)
3. Autoriza la conexión con ArquiFi
4. ¡Tu dashboard se actualizará automáticamente!

### **Interactuar con el Contrato**
1. Ve a la sección "ArquiFi DeFi Contract" en el dashboard
2. Ingresa la cantidad de STX que deseas stake
3. Haz clic en "Stake" para enviar la transacción
4. Reclama tus recompensas cuando estén disponibles

## 🔧 Desarrollo de Smart Contracts

### **Instalar Clarinet**

```bash
# macOS
brew install clarinet

# Linux/Windows
curl -L https://github.com/hirosystems/clarinet/releases/latest/download/clarinet-installer.sh | bash
```

### **Ejecutar Contratos Localmente**

```bash
# Iniciar simulación local
clarinet simulate

# Desplegar en testnet
clarinet deploy --testnet
```

### **Estructura de Contratos**

```
contracts/
├── arquifi-defi.clar    # Contrato principal de DeFi
└── README.md           # Documentación de contratos
```

## 🌐 Despliegue

### **Desplegar en Testnet**

1. **Configurar Clarinet**:
```bash
clarinet deploy --testnet
```

2. **Actualizar Configuración**:
   - Actualiza `VITE_CONTRACT_ADDRESS` con la dirección del contrato desplegado
   - Cambia `VITE_STACKS_NETWORK` a `testnet`

3. **Desplegar Frontend**:
```bash
npm run build
# Subir archivos de build/ a tu servicio de hosting
```

### **Desplegar en Mainnet**

1. **Cambiar a Mainnet**:
```bash
clarinet deploy --mainnet
```

2. **Actualizar Configuración**:
   - Cambia `VITE_STACKS_NETWORK` a `mainnet`
   - Actualiza la dirección del contrato

## 📊 Casos de Uso Implementados

### **Stacks API**
- ✅ Recuperar información de wallet (balance, transacciones)
- ✅ Obtener transacciones recientes
- ✅ Visualizar NFTs del usuario

### **Stacks.js**
- ✅ Autenticación de usuarios con wallet
- ✅ Interacción con smart contracts (lectura)
- ✅ Gestión de sesión de usuario

### **Clarity**
- ✅ Contrato inteligente de staking
- ✅ Sistema de recompensas
- ✅ Funciones de lectura y escritura

## 🔒 Seguridad

- **Validación de Entrada**: Todas las entradas del usuario son validadas
- **Manejo de Errores**: Sistema robusto de manejo de errores
- **Transacciones Seguras**: Verificación de transacciones antes de enviar
- **Red Testnet**: Desarrollo seguro en red de pruebas

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si tienes alguna sugerencia, mejora o encuentras un error:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## 🔗 Enlaces Útiles

- [Documentación de Stacks](https://docs.hiro.so/stacks)
- [Clarity Book](https://book.clarity-lang.org/)
- [Stacks Explorer](https://explorer.stacks.co/)
- [Hiro Platform](https://www.hiro.so/platform)
- [Clarity Tools](https://clarity.tools/)

## 📞 Soporte

Si tienes preguntas o necesitas ayuda:

- **GitHub Issues**: [Crear un issue](https://github.com/TheDuckHacker/ArquiFi/issues)
- **Discord**: [Stacks Discord](https://discord.gg/stacks)
- **Twitter**: [@Stacks](https://twitter.com/stacks)

---

**¡Gracias por explorar ArquiFi con Stacks Blockchain! 🚀**