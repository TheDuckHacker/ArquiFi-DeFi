// Configuración de Stacks
import { 
  connect, 
  getAccount, 
  getBalance, 
  makeContractCall,
  broadcastTransaction,
  AnchorMode,
  PostConditionMode
} from '@stacks/connect'
import { StacksTestnet, StacksMainnet } from '@stacks/network'

// Configuración de red
export const network = new StacksTestnet({
  url: 'https://stacks-node-api.testnet.stacks.co',
  coreApiUrl: 'https://stacks-node-api.testnet.stacks.co',
  bnsLookupUrl: 'https://stacks-node-api.testnet.stacks.co',
})

// Configuración de contratos inteligentes
export const CONTRACTS = {
  ARQUIPUNTOS: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.arquipuntos',
  REPUTACION: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.reputacion',
  MISIONES: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.misiones',
  GOBIERNO: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.gobierno',
  PRESTAMOS: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.prestamos'
}

// Funciones para conectar wallet
export const connectWallet = async () => {
  try {
    const userSession = await connect({
      appDetails: {
        name: 'ArquiFi',
        icon: window.location.origin + '/logo.png',
      },
      redirectTo: '/',
      onFinish: (userData) => {
        console.log('Wallet conectada:', userData)
        return userData
      },
      userSession: undefined,
    })
    return userSession
  } catch (error) {
    console.error('Error conectando wallet:', error)
    throw error
  }
}

// Obtener balance de STX
export const getSTXBalance = async (address) => {
  try {
    const balance = await getBalance({
      address,
      network
    })
    return balance
  } catch (error) {
    console.error('Error obteniendo balance:', error)
    throw error
  }
}

// Obtener balance de sBTC
export const getSBTCBalance = async (address) => {
  try {
    // Implementar obtención de balance sBTC
    return 0
  } catch (error) {
    console.error('Error obteniendo balance sBTC:', error)
    throw error
  }
}

// Obtener Arquipuntos del usuario
export const getArquipuntos = async (address) => {
  try {
    const result = await makeContractCall({
      contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
      contractName: 'arquipuntos',
      functionName: 'get-balance',
      functionArgs: [address],
      network,
      anchorMode: AnchorMode.Any,
    })
    return result
  } catch (error) {
    console.error('Error obteniendo Arquipuntos:', error)
    throw error
  }
}

// Ganar Arquipuntos
export const earnArquipuntos = async (userSession, amount) => {
  try {
    const result = await makeContractCall({
      contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
      contractName: 'arquipuntos',
      functionName: 'earn-ap',
      functionArgs: [amount],
      network,
      anchorMode: AnchorMode.Any,
      postConditionMode: PostConditionMode.Allow,
    })
    
    const tx = await broadcastTransaction(result, network)
    return tx
  } catch (error) {
    console.error('Error ganando Arquipuntos:', error)
    throw error
  }
}

// Quemar Arquipuntos (para votaciones)
export const burnArquipuntos = async (userSession, amount) => {
  try {
    const result = await makeContractCall({
      contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
      contractName: 'arquipuntos',
      functionName: 'burn-ap',
      functionArgs: [amount],
      network,
      anchorMode: AnchorMode.Any,
      postConditionMode: PostConditionMode.Allow,
    })
    
    const tx = await broadcastTransaction(result, network)
    return tx
  } catch (error) {
    console.error('Error quemando Arquipuntos:', error)
    throw error
  }
}

// Votar en propuesta DAO
export const voteProposal = async (userSession, proposalId, vote, apAmount) => {
  try {
    const result = await makeContractCall({
      contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
      contractName: 'gobierno',
      functionName: 'vote',
      functionArgs: [proposalId, vote, apAmount],
      network,
      anchorMode: AnchorMode.Any,
      postConditionMode: PostConditionMode.Allow,
    })
    
    const tx = await broadcastTransaction(result, network)
    return tx
  } catch (error) {
    console.error('Error votando:', error)
    throw error
  }
}
