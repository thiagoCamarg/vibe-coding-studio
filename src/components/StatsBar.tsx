import React from 'react';

export const StatsBar: React.FC = () => {
  const stats = [
    {
      value: '5 a 7 Dias',
      label: 'Prazo Médio de Entrega',
      sublabel: 'Do briefing ao deploy final',
    },
    {
      value: '95+',
      label: 'Google PageSpeed',
      sublabel: 'Carregamento instantâneo',
    },
    {
      value: '-70%',
      label: 'Custo vs Agências',
      sublabel: 'Sem taxas de intermediação',
    },
    {
      value: '100%',
      label: 'Código Próprio',
      sublabel: 'Sem mensalidades recorrentes',
    },
  ];

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-20">
      <div className="rounded-2xl bg-[#111115] border border-white/[0.08] p-6 sm:p-8 shadow-xl backdrop-blur-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 divide-y sm:divide-y-0 lg:divide-x divide-white/[0.08]">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${idx !== 0 ? 'lg:pl-6 pt-6 sm:pt-0' : ''}`}
            >
              <span className="font-syne text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-white leading-none mb-2">
                {item.value}
              </span>
              <p className="text-xs font-mono uppercase tracking-wider text-white/90 font-medium">
                {item.label}
              </p>
              <p className="text-xs text-text-muted font-sans mt-0.5">
                {item.sublabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
