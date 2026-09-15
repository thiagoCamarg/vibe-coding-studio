import React from 'react';
import { FileText, Code2, ShieldCheck, Rocket } from 'lucide-react';
import { PROCESS_STEPS } from '../data/portfolioData';

export const ProcessSection: React.FC = () => {
  const getStepIcon = (name: string) => {
    switch (name) {
      case 'target':
        return <FileText className="w-3.5 h-3.5 text-[#06b6d4]" />;
      case 'code':
        return <Code2 className="w-3.5 h-3.5 text-[#6366f1]" />;
      case 'shield-check':
        return <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />;
      case 'rocket':
        return <Rocket className="w-3.5 h-3.5 text-[#c0c1ff]" />;
      default:
        return <FileText className="w-3.5 h-3.5 text-[#06b6d4]" />;
    }
  };

  return (
    <section id="como-funciona" className="py-20 border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="font-mono text-xs text-[#06b6d4] tracking-wider mb-2">
              // 02. PROCESSO DE ENTREGA ÁGIL
            </div>
            <h2 className="font-syne text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Do Briefing à Página No Ar em 4 Passos
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#94a3b8] max-w-md leading-relaxed font-sans">
            Sem burocracia, sem surpresas. Você aprova cada etapa e no final sua landing page já está pronta pra receber tráfego pago.
          </p>
        </div>

        {/* 4 Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.stepNumber}
              className="group relative rounded-xl bg-[#121216]/90 border border-white/[0.08] hover:border-[#06b6d4]/40 p-6 flex flex-col justify-between transition-all duration-300 hover:bg-[#18181f] shadow-lg"
            >
              <div>
                {/* Header with Step number and stage badge */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-white/[0.05] text-white/90 border border-white/10">
                    {step.stepNumber}
                  </span>
                  <span className="font-mono text-[10px] tracking-wider text-[#94a3b8] uppercase">
                    {step.stageBadge}
                  </span>
                </div>

                {/* Step Title */}
                <h3 className="font-syne text-lg font-bold text-white mb-3 group-hover:text-[#acedff] transition-colors">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-xs text-[#94a3b8] leading-relaxed mb-6 font-sans">
                  {step.description}
                </p>
              </div>

              {/* Step Footer Highlight */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center gap-2 text-[11px] font-mono text-[#c7c4d7]">
                {getStepIcon(step.iconName)}
                <span>{step.footerHighlight}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
