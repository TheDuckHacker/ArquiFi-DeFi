import React, { useState, useEffect } from 'react';

const ArquiFiContract = () => {
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

  // Generar recompensas automáticamente
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
      console.log(`Staking ${stakeAmount} STX...`);
      
      // Simular tiempo de transacción
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Actualizar datos
      setUserStake((prev) => (Number(prev) + Number(stakeAmount)).toString());
      setTotalStaked((prev) => (Number(prev) + Number(stakeAmount)).toString());
      
      showNotificationWithMessage(`¡Stake exitoso! ${stakeAmount} STX staked`);
      setStakeAmount('');
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
      console.log(`Unstaking ${unstakeAmount} STX...`);
      
      // Simular tiempo de transacción
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Actualizar datos
      setUserStake((prev) => Math.max(0, Number(prev) - Number(unstakeAmount)).toString());
      setTotalStaked((prev) => Math.max(0, Number(prev) - Number(unstakeAmount)).toString());
      
      showNotificationWithMessage(`¡Unstake exitoso! ${unstakeAmount} STX unstaked`);
      setUnstakeAmount('');
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
      console.log('Claiming rewards...');
      
      // Simular tiempo de transacción
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Calcular recompensas basadas en el stake
      const rewards = Number(userRewards);
      if (rewards > 0) {
        showNotificationWithMessage(`¡Recompensas reclamadas! ${rewards} STX`);
        setUserRewards('0');
      } else {
        showNotificationWithMessage('No hay recompensas disponibles para reclamar');
      }
    } catch (error) {
      console.error('Error claiming rewards:', error);
      showNotificationWithMessage('Error al reclamar recompensas');
    } finally {
      setIsClaiming(false);
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

      {/* Información del contrato */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <p className="text-gray-400 text-xs">
          Contrato: ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.arquifi-defi
        </p>
        <p className="text-gray-400 text-xs">
          Red: Testnet (Simulación)
        </p>
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