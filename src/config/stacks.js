import { AppConfig, UserSession } from '@stacks/connect';
import { StacksTestnet, StacksMainnet } from '@stacks/network';

// Configuración de la aplicación
const appConfig = new AppConfig(['store_write', 'publish_data']);

// Sesión de usuario
export const userSession = new UserSession({ appConfig });

// Configuración de red
export const network = new StacksTestnet(); // Cambiar a StacksMainnet para producción

// Configuración de la aplicación
export const appDetails = {
  name: 'ArquiFi',
  icon: '/favicon.svg',
};

export default {
  userSession,
  network,
  appDetails,
};