import { AppConfig, UserSession } from '@stacks/connect';
import { StacksTestnet, StacksMainnet } from '@stacks/network';

// Configuración de la aplicación con permisos completos
const appConfig = new AppConfig([
  'store_write', 
  'publish_data',
  'publish_data_unsigned',
  'store_write_unsigned'
]);

// Sesión de usuario
export const userSession = new UserSession({ appConfig });

// Configuración de red - Testnet para desarrollo
export const network = new StacksTestnet({
  coreApiUrl: 'https://stacks-node-api.testnet.stacks.co',
  broadcastApiUrl: 'https://stacks-node-api.testnet.stacks.co',
  lookupApiUrl: 'https://stacks-node-api.testnet.stacks.co',
  eventApiUrl: 'https://stacks-node-api.testnet.stacks.co',
});

// Configuración de la aplicación
export const appDetails = {
  name: 'ArquiFi',
  icon: '/favicon.svg',
  manifestPath: '/manifest.json',
};

export default {
  userSession,
  network,
  appDetails,
};