import React, { useState } from 'react';

const ArquiFiContract = () => {
  const [userStake, setUserStake] = useState('0');
  const [userRewards, setUserRewards] = useState('0');
  const [totalStaked, setTotalStaked] = useState('0');
  const [rewardRate, setRewardRate] = useState('100');
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');

  const handleStake = async () => {
    if (!stakeAmount || stakeAmount <= 0) return;
    
    try {
      console.log(`Staking ${stakeAmount} STX...`);
      alert(`Staking ${stakeAmount} STX - Esta es una simulación`);
      setStakeAmount('');
      // Simular actualización de datos
      setUserStake((prev) => (Number(prev) + Number(stakeAmount)).toString());
      setTotalStaked((prev) => (Number(prev) + Number(stakeAmount)).toString());
    } catch (error) {
      console.error('Error staking:', error);
      alert('Error al hacer stake');
    }
  };

  const handleUnstake = async () => {
    if (!unstakeAmount || unstakeAmount <= 0) return;
    
    try {
      console.log(`Unstaking ${unstakeAmount} STX...`);
      alert(`Unstaking ${unstakeAmount} STX - Esta es una simulación`);
      setUnstakeAmount('');
      // Simular actualización de datos
      setUserStake((prev) => Math.max(0, Number(prev) - Number(unstakeAmount)).toString());
      setTotalStaked((prev) => Math.max(0, Number(prev) - Number(unstakeAmount)).toString());
    } catch (error) {
      console.error('Error unstaking:', error);
      alert('Error al hacer unstake');
    }
  };

  const handleClaimRewards = async () => {
    try {
      console.log('Claiming rewards...');
      alert('Claiming rewards - Esta es una simulación');
      // Simular reclamación de recompensas
      setUserRewards('0');
    } catch (error) {
      console.error('Error claiming rewards:', error);
      alert('Error al reclamar recompensas');
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
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Stake
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
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Unstake
          </button>
        </div>

        {/* Claim Rewards */}
        <button
          onClick={handleClaimRewards}
          className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
        >
          Reclamar Recompensas
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
    </div>
  );
};

export default ArquiFiContract;