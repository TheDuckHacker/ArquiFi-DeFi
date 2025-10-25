import { StacksTestnet, StacksMainnet } from '@stacks/network';

const API_URL = 'https://stacks-node-api.testnet.stacks.co'; // Testnet
// const API_URL = 'https://stacks-node-api.stacks.co'; // Mainnet

export class StacksAPI {
  static async getAccountInfo(address) {
    try {
      const response = await fetch(`${API_URL}/extended/v1/address/${address}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching account info:', error);
      return null;
    }
  }

  static async getAccountBalance(address) {
    try {
      const response = await fetch(`${API_URL}/extended/v1/address/${address}/stx`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching balance:', error);
      return null;
    }
  }

  static async getTransactions(address, limit = 10) {
    try {
      const response = await fetch(`${API_URL}/extended/v1/address/${address}/transactions?limit=${limit}`);
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return [];
    }
  }

  static async getNFTs(address) {
    try {
      const response = await fetch(`${API_URL}/extended/v1/tokens/nft/holdings?principal=${address}`);
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      return [];
    }
  }

  static async getTokenHoldings(address) {
    try {
      const response = await fetch(`${API_URL}/extended/v1/address/${address}/balances`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching token holdings:', error);
      return null;
    }
  }

  static formatSTXAmount(microStacks) {
    return (microStacks / 1000000).toFixed(6);
  }

  static formatAddress(address) {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  }
}
