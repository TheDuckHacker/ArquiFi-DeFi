import React from 'react';

const Profile = () => {
  return (
    <div className="p-6 bg-background-dark min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex p-4">
          <div className="flex w-full flex-col gap-4 md:flex-row md:justify-between md:items-center">
            <div className="flex gap-4">
              <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32" 
                   style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC6aCU2S6kEpfbvTQWiSmBwW-7zeaH_aBmkd6travrShoPi1lEN83phNv276mZUE-YAwBWIdIDvc0Rlw-u19PyPA0XgXIbPy5LRBcsuMiHqJn2muqLjwlI3qml4OdsQUjfHzMMfcbg_jaQkE5KySmpmt4_3F65NBRq7jJEb-MKHm2kADE_JjRMaJpK6DSDrKtlGAAxC2neInAWmPQUnSFBq4hW8THLnoi-gifDEcuHSLqcpSw9oKKu9qZHAsQFzOztgIlKB8s6O9Mc")'}}>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">SatoshiN</p>
                <p className="text-[#9aaebc] text-base font-normal leading-normal">@satoshi</p>
                <p className="text-[#9aaebc] text-base font-normal leading-normal">Reputation: Visionario</p>
                <p className="text-green-400 text-sm font-normal leading-normal">Status: Online</p>
              </div>
            </div>
            <div className="flex w-full max-w-[480px] gap-3 md:w-auto">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#27323a] text-white text-sm font-bold leading-normal tracking-[0.015em] flex-1 md:flex-auto">
                <span className="truncate">Follow</span>
              </button>
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] flex-1 md:flex-auto">
                <span className="truncate">Message</span>
              </button>
            </div>
          </div>
        </div>

        {/* Reputation Progress Bar */}
        <div className="flex flex-col gap-3 p-4">
          <div className="flex gap-6 justify-between">
            <p className="text-white text-base font-medium leading-normal">Reputation Progression</p>
            <p className="text-white text-sm font-normal leading-normal">80%</p>
          </div>
          <div className="rounded-lg bg-[#413E40] h-4">
            <div className="h-4 rounded-lg bg-primary" style={{width: '80%'}}></div>
          </div>
          <div className="flex justify-between text-xs text-[#9aaebc]">
            <span>Novato</span>
            <span>Explorador</span>
            <span>Arquitecto</span>
            <span className="font-bold text-white">Visionario</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-4 p-4">
          <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-[#413E40]">
            <p className="text-white text-base font-medium leading-normal">Social</p>
            <p className="text-white tracking-light text-2xl font-bold leading-tight">1,200 XP</p>
            <p className="text-green-400 text-base font-medium leading-normal">+10%</p>
          </div>
          <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-[#413E40]">
            <p className="text-white text-base font-medium leading-normal">DeFi</p>
            <p className="text-white tracking-light text-2xl font-bold leading-tight">5,000 XP</p>
            <p className="text-green-400 text-base font-medium leading-normal">+25%</p>
          </div>
          <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-[#413E40]">
            <p className="text-white text-base font-medium leading-normal">Gobernanza</p>
            <p className="text-white tracking-light text-2xl font-bold leading-tight">800 XP</p>
            <p className="text-green-400 text-base font-medium leading-normal">+5%</p>
          </div>
        </div>

        {/* Badges */}
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Badges</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-3 p-4">
          <div className="flex flex-col gap-3 text-center group">
            <div className="p-2 border-2 border-primary rounded-full aspect-square flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_15px_5px] group-hover:shadow-primary/50">
              <span className="material-symbols-outlined text-4xl">rocket_launch</span>
            </div>
            <p className="text-white text-sm font-medium">Pioneer</p>
          </div>
          <div className="flex flex-col gap-3 text-center group">
            <div className="p-2 border-2 border-primary rounded-full aspect-square flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_15px_5px] group-hover:shadow-primary/50">
              <span className="material-symbols-outlined text-4xl">trending_up</span>
            </div>
            <p className="text-white text-sm font-medium">Trader</p>
          </div>
          <div className="flex flex-col gap-3 text-center group">
            <div className="p-2 border-2 border-primary rounded-full aspect-square flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_15px_5px] group-hover:shadow-primary/50">
              <span className="material-symbols-outlined text-4xl">groups</span>
            </div>
            <p className="text-white text-sm font-medium">Community</p>
          </div>
        </div>

        {/* Connections */}
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Connections</h2>
        <div className="flex flex-wrap gap-4 p-4">
          <div className="flex items-center gap-3 bg-[#413E40] rounded-lg p-4">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold">CT</span>
            </div>
            <div>
              <p className="text-white font-semibold">@crypto_trader</p>
              <p className="text-[#9aaebc] text-sm">Mutual connections: 5</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-[#413E40] rounded-lg p-4">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">DM</span>
            </div>
            <div>
              <p className="text-white font-semibold">@defi_master</p>
              <p className="text-[#9aaebc] text-sm">Mutual connections: 12</p>
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Recent Activity</h2>
        <div className="space-y-4 p-4">
          <div className="flex items-center gap-4 bg-[#413E40] rounded-lg p-4">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div>
              <p className="text-white font-semibold">Completed Stacking Mission</p>
              <p className="text-[#9aaebc] text-sm">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-[#413E40] rounded-lg p-4">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <div>
              <p className="text-white font-semibold">Connected with @crypto_trader</p>
              <p className="text-[#9aaebc] text-sm">5 hours ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-[#413E40] rounded-lg p-4">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div>
              <p className="text-white font-semibold">Earned Pioneer Badge</p>
              <p className="text-[#9aaebc] text-sm">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
