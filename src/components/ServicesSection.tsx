import React, { useState } from 'react';
import { Rocket, Bot, GitFork, Brain, Check, ArrowRight, ChevronRight, Clock, ShieldCheck } from 'lucide-react';
import { SERVICES_DATA } from '../data/portfolioData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectServiceForProposal: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForProposal,
}) => {
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'rocket':
        return <Rocket className="w-5 h-5 text-[#c0c1ff]" />;
      case 'bot':
        return <Bot className="w-5 h-5 text-[#4cd7f6]" />;
      case 'funnel':
        return <GitFork className="w-5 h-5 text-[#4edea3]" />;
      case 'brain':
        return <Brain className="w-5 h-5 text-[#c0c1ff]" />;
      default:
        return <Rocket className="w-5 h-5 text-[#c0c1ff]" />;
    }
  };

  return (
    <section id="servicos" className="py-20 border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="font-mono text-xs text-[#06b6d4] tracking-wider mb-2">
              // 01. SERVIÇOS &amp; ENTREGAS
            </div>
            <h2 className="font-syne text-3xl sm:text-4xl font-bold text-white tracking-tight">
              O Que Posso Construir Para o Seu Negócio
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#94a3b8] max-w-md leading-relaxed font-sans">
            Produtos digitais completos, rápidos e enxutos projetados para testar tração, automatizar processos e gerar faturamento imediato.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              onClick={() => setActiveModalService(service)}
              className="group relative rounded-xl bg-[#121216]/90 border border-white/[0.08] hover:border-[#6366f1]/40 p-6 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:bg-[#18181f] cursor-pointer shadow-lg"
            >
              <div>
                {/* Icon square */}
                <div className="w-10 h-10 rounded-lg bg-[#18181f] border border-white/10 flex items-center justify-center mb-5 group-hover:border-[#6366f1]/50 group-hover:bg-[#201f28] transition-colors">
                  {getIcon(service.iconName)}
                </div>

                {/* Title */}
                <h3 className="font-syne text-lg font-bold text-white mb-2.5 group-hover:text-[#c0c1ff] transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#94a3b8] leading-relaxed mb-6 font-sans">
                  {service.description}
                </p>
              </div>

              {/* Tags and Deliverables preview */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {service.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded text-[11px] font-mono bg-white/[0.04] text-[#c7c4d7] border border-white/[0.06] group-hover:border-[#06b6d4]/30 group-hover:text-[#acedff] transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#94a3b8] group-hover:text-white">
                  <span>Ver entregáveis &amp; prazos</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-[#06b6d4]" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Service Details Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#121216] border border-white/15 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#18181f] border border-white/10 flex items-center justify-center">
                  {getIcon(activeModalService.iconName)}
                </div>
                <div>
                  <h3 className="font-syne text-xl font-bold text-white">
                    {activeModalService.title}
                  </h3>
                  <p className="text-xs font-mono text-[#10b981] flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" />
                    Prazo estimado: {activeModalService.timeline}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModalService(null)}
                className="text-gray-400 hover:text-white p-1 rounded-lg bg-white/5 hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-[#94a3b8] mb-6 font-sans leading-relaxed">
              {activeModalService.description}
            </p>

            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase text-[#06b6d4] tracking-wider mb-3">
                O que está incluso na entrega:
              </h4>
              <ul className="space-y-2.5">
                {activeModalService.deliverables.map((deliv, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-[#e5e1e4]">
                    <Check className="w-4 h-4 text-[#10b981] flex-shrink-0 mt-0.5" />
                    <span>{deliv}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {activeModalService.tags.map((tag, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded text-xs font-mono bg-white/[0.05] text-[#acedff] border border-white/10">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setActiveModalService(null)}
                className="px-4 py-2 rounded-lg text-xs font-mono text-[#94a3b8] hover:text-white"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  const title = activeModalService.title;
                  setActiveModalService(null);
                  onSelectServiceForProposal(title);
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#6366f1] to-[#4f46e5] hover:brightness-110 shadow-[0_0_15px_rgba(99,102,241,0.4)]"
              >
                <span>Solicitar Este Pacote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
