import { 
  AccountsApi, 
  TransactionsApi, 
  SmartContractsApi,
  Configuration 
} from '@stacks/blockchain-api-client';
import { StacksTestnet } from '@stacks/network';

// Configuración de red directa
const network = new StacksTestnet();

// Configuración de la API
const apiConfig = new Configuration({
  baseUrl: network.coreApiUrl,
});

// APIs disponibles
export const accountsApi = new AccountsApi(apiConfig);
export const transactionsApi = new TransactionsApi(apiConfig);
export const smartContractsApi = new SmartContractsApi(apiConfig);

// Funciones de utilidad
export const StacksAPI = {
  // Obtener información de cuenta
  async getAccountInfo(stxAddress) {
    try {
      const account = await accountsApi.getAccountInfo({ principal: stxAddress });
      return account;
    } catch (error) {
      console.error('Error fetching account info:', error);
      return null;
    }
  },

  // Obtener balance de cuenta
  async getAccountBalance(stxAddress) {
    try {
      const balance = await accountsApi.getAccountBalance({ principal: stxAddress });
      return balance;
    } catch (error) {
      console.error('Error fetching account balance:', error);
      return null;
    }
  },

  // Obtener transacciones de cuenta
  async getAccountTransactions(stxAddress, limit = 10) {
    try {
      const transactions = await accountsApi.getAccountTransactions({
        principal: stxAddress,
        limit: limit,
      });
      return transactions.results || [];
    } catch (error) {
      console.error('Error fetching account transactions:', error);
      return [];
    }
  },

  // Formatear cantidad STX
  formatSTXAmount(amountInUStx) {
    if (!amountInUStx) return '0.000000';
    const stx = Number(amountInUStx) / 1000000;
    return stx.toFixed(6);
  },

  // Formatear dirección
  formatAddress(address) {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  },

  // Obtener NFTs (simulado por ahora)
  async getNFTs(stxAddress) {
    // Simulación de NFTs - en producción usarías la API real
    return [
      { 
        id: 1, 
        name: 'ArquiFi DeFi NFT #1', 
        imageUrl: 'https://via.placeholder.com/150/0099ff/FFFFFF?text=DeFi+NFT+1',
        contract: 'SP000000000000000000002Q6VF78.arquifi-nft',
        tokenId: '1'
      },
      { 
        id: 2, 
        name: 'ArquiFi Governance NFT #2', 
        imageUrl: 'https://via.placeholder.com/150/0066cc/FFFFFF?text=Gov+NFT+2',
        contract: 'SP000000000000000000002Q6VF78.arquifi-nft',
        tokenId: '2'
      },
    ];
  }
};

export default StacksAPI;