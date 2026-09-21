import React from 'react';
import { Zap, DollarSign, Shield, RefreshCw } from 'lucide-react';
import { ADVANTAGES_DATA } from '../data/portfolioData';

export const AdvantagesSection: React.FC = () => {
  const getAdvantageIcon = (iconName: string) => {
    switch (iconName) {
      case 'zap':
        return <Zap className="w-5 h-5 text-white/90" />;
      case 'dollar':
        return <DollarSign className="w-5 h-5 text-white/90" />;
      case 'shield':
        return <Shield className="w-5 h-5 text-white/90" />;
      case 'refresh':
        return <RefreshCw className="w-5 h-5 text-white/90" />;
      default:
        return <Zap className="w-5 h-5 text-white/90" />;
    }
  };

  return (
    <section id="vantagens" className="py-20 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="font-mono text-xs text-text-muted tracking-widest uppercase mb-2">
            04 / DIFERENCIAIS TÉCNICOS
          </div>
          <h2 className="font-syne text-3xl sm:text-4xl lg:text-[40px] font-bold text-white tracking-tight mb-4">
            Por Que Escolher Desenvolvimento Sob Medida?
          </h2>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed font-sans">
            Sem templates lentos do WordPress ou taxas abusivas de grandes agências. Você obtém um código enxuto, rápido e com atendimento direto pelo desenvolvedor.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ADVANTAGES_DATA.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl bg-[#111115] border border-white/[0.08] hover:border-white/20 p-6 flex flex-col justify-between transition-all duration-300 hover:bg-[#18181e]"
            >
              <div>
                {/* Icon box */}
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-5 group-hover:border-white/20 transition-colors">
                  {getAdvantageIcon(item.iconName)}
                </div>

                {/* Title */}
                <h3 className="font-syne text-lg font-bold text-white mb-3 group-hover:text-white transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-text-muted leading-relaxed mb-6 font-sans">
                  {item.description}
                </p>
              </div>

              {/* Tag pill at bottom */}
              <div className="pt-4 border-t border-white/[0.08]">
                <span className="inline-block text-[10px] font-mono font-medium tracking-wider text-white/80 uppercase">
                  {item.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
