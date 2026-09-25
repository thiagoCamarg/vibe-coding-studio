import React from 'react';
import { Rocket, Bot, GitFork, Brain, ArrowUpRight } from 'lucide-react';
import { SERVICES_DATA } from '../data/portfolioData';

interface ServicesSectionProps {
  onSelectServiceForProposal: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForProposal,
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'rocket':
        return <Rocket className="w-5 h-5 text-white/90" />;
      case 'bot':
        return <Bot className="w-5 h-5 text-white/90" />;
      case 'funnel':
        return <GitFork className="w-5 h-5 text-white/90" />;
      case 'brain':
        return <Brain className="w-5 h-5 text-white/90" />;
      default:
        return <Rocket className="w-5 h-5 text-white/90" />;
    }
  };

  return (
    <section id="servicos" className="py-20 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="font-mono text-xs text-text-muted tracking-widest uppercase mb-2">
              01 / ESPECIALIDADES
            </div>
            <h2 className="font-syne text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Tipos de Landing Page
            </h2>
          </div>
          <p className="text-sm sm:text-base text-text-muted max-w-md leading-relaxed font-sans">
            Páginas de vendas, captura de leads, sites institucionais e otimização de performance. Todas construídas com foco exclusivo em conversão e clareza.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_DATA.map((service) => {
            const isFeatured = service.id === 'sales-pages';
            return (
              <div
                key={service.id}
                onClick={() => onSelectServiceForProposal(service.title)}
                className={`group relative rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                  isFeatured
                    ? 'bg-[#18181e] border border-white/20 shadow-lg'
                    : 'bg-[#111115] border border-white/[0.08] hover:border-white/20 hover:bg-[#18181e]'
                }`}
              >
                {isFeatured && (
                  <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-white text-black shadow-sm">
                    Mais Solicitado
                  </span>
                )}
                <div>
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-5 group-hover:border-[#10b981]/30 transition-colors">
                    {getIcon(service.iconName)}
                  </div>

                  {/* Title */}
                  <h3 className="font-syne text-lg font-bold text-white mb-2.5 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-text-muted leading-relaxed mb-6 font-sans">
                    {service.description}
                  </p>
                </div>

                {/* Tags and Action */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {service.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded text-[11px] font-mono bg-white/[0.03] text-text-secondary border border-white/[0.06]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-text-muted group-hover:text-white transition-colors">
                    <span>Prazo: {service.timeline}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#10b981]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

