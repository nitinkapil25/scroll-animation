import React from 'react';

const Stats = () => {
  const statsData = [
    { label: "Satisfaction Rate", value: "98%" },
    { label: "Global Partners", value: "150+" },
    { label: "Active Users", value: "12M" },
    { label: "Uptime Guaranteed", value: "99.9%" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-wrap justify-center gap-3 sm:gap-3 md:gap-8 mt-10 sm:mt-14 md:mt-36 w-full z-10 relative px-2 sm:px-4">
      {statsData.map((stat, i) => (
        <div 
          key={i} 
          className="stat-card flex flex-col items-center justify-center py-5 px-4 sm:py-5 sm:px-4 md:py-5 md:px-4 w-full sm:w-[190px] md:w-[220px] min-h-[122px] sm:min-h-[134px] md:min-h-0 rounded-2xl md:rounded-3xl bg-white/60 border border-orange-100 backdrop-blur-[2px] will-change-transform"
        >
          <span className="text-[2.1rem] sm:text-[2.15rem] md:text-[3rem] leading-none font-extrabold text-orange-500 mb-1.5 md:mb-2 tracking-tight">
            {stat.value}
          </span>
          <span className="text-[9px] sm:text-[10px] md:text-sm text-slate-500 uppercase tracking-[0.12em] md:tracking-[0.14em] text-center font-medium">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Stats;
