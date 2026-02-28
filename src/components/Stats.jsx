import React from 'react';

const Stats = () => {
  const statsData = [
    { label: "Satisfaction Rate", value: "98%" },
    { label: "Global Partners", value: "150+" },
    { label: "Active Users", value: "12M" },
    { label: "Uptime Guaranteed", value: "99.9%" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-8 mt-20 sm:mt-24 md:mt-36 w-full z-10 relative px-2 sm:px-4">
      {statsData.map((stat, i) => (
        <div 
          key={i} 
          className="stat-card flex flex-col items-center justify-center py-3.5 px-3 sm:py-4 sm:px-3.5 md:py-5 md:px-4 w-[calc(50%-0.5rem)] sm:w-[180px] md:w-[220px] rounded-2xl md:rounded-3xl bg-white/60 border border-orange-100 backdrop-blur-[2px] will-change-transform"
        >
          <span className="text-3xl sm:text-[2rem] md:text-[3rem] leading-none font-extrabold text-orange-500 mb-1.5 md:mb-2 tracking-tight">
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
