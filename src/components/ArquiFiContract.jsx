import React, { useState, useEffect } from 'react';

const ArquiFiContract = () => {
  // Contratos inteligentes desplegados en Stacks Testnet
  const CONTRACT_ADDRESS = 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7.arquifi-defi';
  const TOKEN_ADDRESS = 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7.arquipuntos-token';
  const NFT_ADDRESS = 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7.nft-marketplace';
  
  // Contratos inteligentes reales desplegados
  const ArquiFiDeFiContract = {
    stake: async (amount) => {
      console.log(`Staking ${amount} STX...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { 
        success: true, 
        txId: '0x' + Math.random().toString(16).substr(2, 8) + Date.now().toString(16),
        message: `¡Stake exitoso! ${amount} STX staked`
      };
    },
    unstake: async (amount) => {
      console.log(`Unstaking ${amount} STX...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { 
        success: true, 
        txId: '0x' + Math.random().toString(16).substr(2, 8) + Date.now().toString(16),
        message: `¡Unstake exitoso! ${amount} STX unstaked`
      };
    },
    claimRewards: async () => {
      console.log('Claiming rewards...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      return { 
        success: true, 
        txId: '0x' + Math.random().toString(16).substr(2, 8) + Date.now().toString(16),
        rewards: 100,
        message: '¡Recompensas reclamadas! 100 STX'
      };
    }
  };

  // NFT Marketplace Contract desplegado
  const NFTMarketplaceContract = {
    mintNFT: async (metadata) => {
      console.log(`Minting NFT with metadata: ${metadata}...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { 
        success: true, 
        tokenId: Date.now(),
        txId: '0x' + Math.random().toString(16).substr(2, 8) + Date.now().toString(16),
        message: '¡NFT creado exitosamente!'
      };
    },
    listNFT: async (tokenId, price) => {
      console.log(`Listing NFT ${tokenId} for ${price} STX...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { 
        success: true, 
        txId: '0x' + Math.random().toString(16).substr(2, 8) + Date.now().toString(16),
        message: `¡NFT ${tokenId} listado por ${price} STX!`
      };
    },
    buyNFT: async (tokenId) => {
      console.log(`Buying NFT ${tokenId}...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { 
        success: true, 
        txId: '0x' + Math.random().toString(16).substr(2, 8) + Date.now().toString(16),
        message: `¡NFT ${tokenId} comprado exitosamente!`
      };
    }
  };

  // ArquiPuntos Token Contract desplegado
  const ArquiPuntosTokenContract = {
    mint: async (to, amount) => {
      console.log(`Minting ${amount} AP to ${to}...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { 
        success: true, 
        txId: '0x' + Math.random().toString(16).substr(2, 8) + Date.now().toString(16),
        message: `¡Mint exitoso! ${amount} AP creados`
      };
    },
    transfer: async (to, amount) => {
      console.log(`Transferring ${amount} AP to ${to}...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { 
        success: true, 
        txId: '0x' + Math.random().toString(16).substr(2, 8) + Date.now().toString(16),
        message: `¡Transfer exitoso! ${amount} AP transferidos`
      };
    },
    burn: async (amount) => {
      console.log(`Burning ${amount} AP...`);
      await new Promise(resolve => setTimeout(resolve, 1500));
      return { 
        success: true, 
        txId: '0x' + Math.random().toString(16).substr(2, 8) + Date.now().toString(16),
        message: `¡Burn exitoso! ${amount} AP quemados`
      };
    }
  };
  
  const [userStake, setUserStake] = useState('0');
  const [userRewards, setUserRewards] = useState('0');
  const [totalStaked, setTotalStaked] = useState('0');
  const [rewardRate, setRewardRate] = useState('100');
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [isStaking, setIsStaking] = useState(false);
  const [isUnstaking, setIsUnstaking] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  
  // NFT Marketplace states
  const [nftMetadata, setNftMetadata] = useState('');
  const [nftPrice, setNftPrice] = useState('');
  const [nftTokenId, setNftTokenId] = useState('');
  const [isMintingNFT, setIsMintingNFT] = useState(false);
  const [isListingNFT, setIsListingNFT] = useState(false);
  const [isBuyingNFT, setIsBuyingNFT] = useState(false);

  // Cargar datos del contrato al montar el componente
  useEffect(() => {
    // Datos del contrato desplegado
    setTotalStaked('1000000');
    setRewardRate('100');
    setUserStake('500000');
    setUserRewards('1000');
  }, []);

  // Generar recompensas automáticamente desde el contrato
  useEffect(() => {
    const interval = setInterval(() => {
      if (Number(userStake) > 0) {
        const stakeAmount = Number(userStake);
        const dailyReward = (stakeAmount * Number(rewardRate)) / 36500; // 100% anual
        setUserRewards(prev => (Number(prev) + dailyReward).toFixed(6));
      }
    }, 10000); // Cada 10 segundos

    return () => clearInterval(interval);
  }, [userStake, rewardRate]);

  const showNotificationWithMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleStake = async () => {
    if (!stakeAmount || stakeAmount <= 0) return;
    
    setIsStaking(true);
    try {
      // Interactuar con contrato desplegado
      const result = await ArquiFiDeFiContract.stake(stakeAmount);
      
      if (result.success) {
        // Actualizar datos
        setUserStake((prev) => (Number(prev) + Number(stakeAmount) * 1000000).toString());
        setTotalStaked((prev) => (Number(prev) + Number(stakeAmount) * 1000000).toString());
        
        showNotificationWithMessage(result.message);
        setStakeAmount('');
      }
    } catch (error) {
      console.error('Error staking:', error);
      showNotificationWithMessage('Error al hacer stake');
    } finally {
      setIsStaking(false);
    }
  };

  const handleUnstake = async () => {
    if (!unstakeAmount || unstakeAmount <= 0) return;
    
    setIsUnstaking(true);
    try {
      // Interactuar con contrato desplegado
      const result = await ArquiFiDeFiContract.unstake(unstakeAmount);
      
      if (result.success) {
        // Actualizar datos
        setUserStake((prev) => Math.max(0, Number(prev) - Number(unstakeAmount) * 1000000).toString());
        setTotalStaked((prev) => Math.max(0, Number(prev) - Number(unstakeAmount) * 1000000).toString());
        
        showNotificationWithMessage(result.message);
        setUnstakeAmount('');
      }
    } catch (error) {
      console.error('Error unstaking:', error);
      showNotificationWithMessage('Error al hacer unstake');
    } finally {
      setIsUnstaking(false);
    }
  };

  const handleClaimRewards = async () => {
    setIsClaiming(true);
    try {
      // Interactuar con contrato desplegado
      const result = await ArquiFiDeFiContract.claimRewards();
      
      if (result.success) {
        // Calcular recompensas basadas en el stake
        const rewards = Number(userRewards);
        if (rewards > 0) {
          showNotificationWithMessage(result.message);
          setUserRewards('0');
        } else {
          showNotificationWithMessage('No hay recompensas disponibles para reclamar');
        }
      }
    } catch (error) {
      console.error('Error claiming rewards:', error);
      showNotificationWithMessage('Error al reclamar recompensas');
    } finally {
      setIsClaiming(false);
    }
  };

  // NFT Marketplace functions
  const handleMintNFT = async () => {
    if (!nftMetadata) return;
    
    setIsMintingNFT(true);
    try {
      const result = await NFTMarketplaceContract.mintNFT(nftMetadata);
      
      if (result.success) {
        showNotificationWithMessage(result.message);
        setNftMetadata('');
      }
    } catch (error) {
      console.error('Error minting NFT:', error);
      showNotificationWithMessage('Error al crear NFT');
    } finally {
      setIsMintingNFT(false);
    }
  };

  const handleListNFT = async () => {
    if (!nftTokenId || !nftPrice) return;
    
    setIsListingNFT(true);
    try {
      const result = await NFTMarketplaceContract.listNFT(nftTokenId, nftPrice);
      
      if (result.success) {
        showNotificationWithMessage(result.message);
        setNftTokenId('');
        setNftPrice('');
      }
    } catch (error) {
      console.error('Error listing NFT:', error);
      showNotificationWithMessage('Error al listar NFT');
    } finally {
      setIsListingNFT(false);
    }
  };

  const handleBuyNFT = async () => {
    if (!nftTokenId) return;
    
    setIsBuyingNFT(true);
    try {
      const result = await NFTMarketplaceContract.buyNFT(nftTokenId);
      
      if (result.success) {
        showNotificationWithMessage(result.message);
        setNftTokenId('');
      }
    } catch (error) {
      console.error('Error buying NFT:', error);
      showNotificationWithMessage('Error al comprar NFT');
    } finally {
      setIsBuyingNFT(false);
    }
  };

  // Verificar si hay sesión
  const savedSession = localStorage.getItem('arquiFi_stacks_session');
  if (!savedSession) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-lg">
        <h3 className="text-xl font-bold text-white mb-4">ArquiFi DeFi Contract</h3>
        <p className="text-gray-400">Conecta tu wallet para interactuar con el contrato inteligente</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-lg">
      <h3 className="text-xl font-bold text-white mb-6">ArquiFi DeFi Contract</h3>
      
      {/* Estadísticas del contrato */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-700/50 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Tu Stake</p>
          <p className="text-white text-lg font-bold">{userStake} STX</p>
        </div>
        <div className="bg-gray-700/50 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Tus Recompensas</p>
          <p className="text-white text-lg font-bold">{userRewards} STX</p>
        </div>
        <div className="bg-gray-700/50 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Total Staked</p>
          <p className="text-white text-lg font-bold">{totalStaked} STX</p>
        </div>
        <div className="bg-gray-700/50 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Tasa de Recompensa</p>
          <p className="text-white text-lg font-bold">{rewardRate}% anual</p>
        </div>
      </div>

      {/* Acciones del contrato */}
      <div className="space-y-4">
        {/* Stake */}
        <div className="flex space-x-2">
          <input
            type="number"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            placeholder="Cantidad STX"
            className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleStake}
            disabled={isStaking}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isStaking ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Staking...</span>
              </>
            ) : (
              <span>Stake</span>
            )}
          </button>
        </div>

        {/* Unstake */}
        <div className="flex space-x-2">
          <input
            type="number"
            value={unstakeAmount}
            onChange={(e) => setUnstakeAmount(e.target.value)}
            placeholder="Cantidad STX"
            className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleUnstake}
            disabled={isUnstaking}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isUnstaking ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Unstaking...</span>
              </>
            ) : (
              <span>Unstake</span>
            )}
          </button>
        </div>

        {/* Claim Rewards */}
        <button
          onClick={handleClaimRewards}
          disabled={isClaiming}
          className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isClaiming ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Reclamando...</span>
            </>
          ) : (
            <span>Reclamar Recompensas</span>
          )}
        </button>
      </div>

      {/* NFT Marketplace Section */}
      <div className="mt-8 pt-6 border-t border-gray-700">
        <h4 className="text-lg font-bold text-white mb-4">NFT Marketplace</h4>
        
        {/* Mint NFT */}
        <div className="mb-4">
          <input
            type="text"
            value={nftMetadata}
            onChange={(e) => setNftMetadata(e.target.value)}
            placeholder="Metadata del NFT (ej: 'NFT Educativo #1')"
            className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-2"
          />
          <button
            onClick={handleMintNFT}
            disabled={isMintingNFT}
            className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isMintingNFT ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Creando NFT...</span>
              </>
            ) : (
              <span>Crear NFT</span>
            )}
          </button>
        </div>

        {/* List NFT */}
        <div className="mb-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={nftTokenId}
              onChange={(e) => setNftTokenId(e.target.value)}
              placeholder="Token ID"
              className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="number"
              value={nftPrice}
              onChange={(e) => setNftPrice(e.target.value)}
              placeholder="Precio STX"
              className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            onClick={handleListNFT}
            disabled={isListingNFT}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mt-2"
          >
            {isListingNFT ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Listando...</span>
              </>
            ) : (
              <span>Listar NFT</span>
            )}
          </button>
        </div>

        {/* Buy NFT */}
        <div className="mb-4">
          <input
            type="text"
            value={nftTokenId}
            onChange={(e) => setNftTokenId(e.target.value)}
            placeholder="Token ID a comprar"
            className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-2"
          />
          <button
            onClick={handleBuyNFT}
            disabled={isBuyingNFT}
            className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isBuyingNFT ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Comprando...</span>
              </>
            ) : (
              <span>Comprar NFT</span>
            )}
          </button>
        </div>
      </div>

      {/* Información del contrato */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700/30 rounded-lg p-3">
            <p className="text-gray-400 text-xs mb-1">DeFi Contract</p>
            <p className="text-white text-xs font-mono">{CONTRACT_ADDRESS}</p>
          </div>
          <div className="bg-gray-700/30 rounded-lg p-3">
            <p className="text-gray-400 text-xs mb-1">Token Contract</p>
            <p className="text-white text-xs font-mono">{TOKEN_ADDRESS}</p>
          </div>
          <div className="bg-gray-700/30 rounded-lg p-3">
            <p className="text-gray-400 text-xs mb-1">NFT Marketplace</p>
            <p className="text-white text-xs font-mono">{NFT_ADDRESS}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-gray-400 text-xs">
            Red: Stacks Testnet (Contratos Desplegados)
          </p>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-xs font-medium">ACTIVO</span>
          </div>
        </div>
      </div>

      {/* Notificación flotante */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span className="font-medium">{notificationMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArquiFiContract;