import React from 'react';

export const StatsBar: React.FC = () => {
  const stats = [
    {
      value: '5 a 10 Dias',
      label: 'Tempo Médio de Entrega do MVP',
      accentColor: 'text-[#e5e1e4]',
    },
    {
      value: '10x Mais',
      label: 'Rápido que Desenvolvimento Tradicional',
      accentColor: 'text-[#c0c1ff]',
    },
    {
      value: '-70%',
      label: 'Custo Comparado a Agências Convencionais',
      accentColor: 'text-[#4cd7f6]',
    },
    {
      value: '100% Seu',
      label: 'Código Limpo, Repo & Infra no Seu Controle',
      accentColor: 'text-[#4edea3]',
    },
  ];

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-20">
      <div className="rounded-2xl bg-[#121216]/90 border border-white/[0.08] backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 divide-y sm:divide-y-0 lg:divide-x divide-white/[0.08]">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${idx !== 0 ? 'lg:pl-6 pt-6 sm:pt-0' : ''}`}
            >
              <div className="flex items-baseline gap-2">
                <span className={`font-syne text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight ${item.accentColor} leading-none mb-2`}>
                  {item.value}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#94a3b8] font-sans leading-snug">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
