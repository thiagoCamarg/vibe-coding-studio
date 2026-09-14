import React from 'react';
import { Zap, DollarSign, Shield, RefreshCw } from 'lucide-react';
import { ADVANTAGES_DATA } from '../data/portfolioData';

export const AdvantagesSection: React.FC = () => {
  const getAdvantageIcon = (iconName: string) => {
    switch (iconName) {
      case 'zap':
        return <Zap className="w-5 h-5 text-[#c0c1ff]" />;
      case 'dollar':
        return <DollarSign className="w-5 h-5 text-[#4cd7f6]" />;
      case 'shield':
        return <Shield className="w-5 h-5 text-[#4edea3]" />;
      case 'refresh':
        return <RefreshCw className="w-5 h-5 text-[#c0c1ff]" />;
      default:
        return <Zap className="w-5 h-5 text-[#c0c1ff]" />;
    }
  };

  return (
    <section id="vantagens" className="py-20 border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="font-mono text-xs text-[#06b6d4] tracking-wider mb-2">
            // 04. VANTAGEM COMPETITIVA
          </div>
          <h2 className="font-syne text-3xl sm:text-4xl lg:text-[40px] font-bold text-white tracking-tight mb-4">
            Por Que Escolher Vibe Coding Para o Seu Negócio?
          </h2>
          <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed font-sans">
            O modelo tradicional de software é lento, inchado e custa fortunas antes do primeiro cliente testar. Aqui construímos com velocidade de startup.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ADVANTAGES_DATA.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-xl bg-[#121216]/90 border border-white/[0.08] hover:border-[#6366f1]/40 p-6 flex flex-col justify-between transition-all duration-300 hover:bg-[#18181f] shadow-lg"
            >
              <div>
                {/* Icon box */}
                <div className="w-10 h-10 rounded-lg bg-[#18181f] border border-white/10 flex items-center justify-center mb-5 group-hover:border-[#6366f1]/40 transition-colors">
                  {getAdvantageIcon(item.iconName)}
                </div>

                {/* Title */}
                <h3 className="font-syne text-lg font-bold text-white mb-3 group-hover:text-[#c0c1ff] transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#94a3b8] leading-relaxed mb-6 font-sans">
                  {item.description}
                </p>
              </div>

              {/* Tag pill at bottom */}
              <div className="pt-4 border-t border-white/[0.06]">
                <span className="inline-block text-[10px] font-mono font-semibold tracking-wider text-[#4edea3] uppercase">
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
