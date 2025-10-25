import { AppConfig, UserSession } from '@stacks/connect';

const appConfig = new AppConfig(['store_write', 'publish_data']);
export const userSession = new UserSession({ appConfig });

export const getNetwork = () => {
  // Usar testnet para desarrollo
  return new StacksTestnet();
};

export const getStacksNetwork = () => {
  return getNetwork();
};
