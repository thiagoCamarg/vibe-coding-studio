import React from 'react';
import { FileText, Code2, ShieldCheck, Rocket } from 'lucide-react';
import { PROCESS_STEPS } from '../data/portfolioData';

export const ProcessSection: React.FC = () => {
  const getStepIcon = (name: string) => {
    switch (name) {
      case 'target':
        return <FileText className="w-3.5 h-3.5 text-white/80" />;
      case 'code':
        return <Code2 className="w-3.5 h-3.5 text-white/80" />;
      case 'shield-check':
        return <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />;
      case 'rocket':
        return <Rocket className="w-3.5 h-3.5 text-white/80" />;
      default:
        return <FileText className="w-3.5 h-3.5 text-white/80" />;
    }
  };

  return (
    <section id="como-funciona" className="py-20 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="font-mono text-xs text-text-muted tracking-widest uppercase mb-2">
              02 / METODOLOGIA DE ENTREGA
            </div>
            <h2 className="font-syne text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Do Briefing ao Lançamento
            </h2>
          </div>
          <p className="text-sm sm:text-base text-text-muted max-w-md leading-relaxed font-sans">
            Processo direto e transparente. Você acompanha cada etapa e recebe sua landing page 100% pronta para campanhas de tráfego pago.
          </p>
        </div>

        {/* 4 Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.stepNumber}
              className="group relative rounded-2xl bg-[#111115] border border-white/[0.08] hover:border-white/20 p-6 flex flex-col justify-between transition-all duration-300 hover:bg-[#18181e]"
            >
              <div>
                {/* Header with Step number and stage badge */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-white/[0.04] text-white/80 border border-white/[0.08]">
                    {step.stepNumber}
                  </span>
                  <span className="font-mono text-[10px] tracking-wider text-text-muted uppercase">
                    {step.stageBadge}
                  </span>
                </div>

                {/* Step Title */}
                <h3 className="font-syne text-lg font-bold text-white mb-3 group-hover:text-white transition-colors">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-xs text-text-muted leading-relaxed mb-6 font-sans">
                  {step.description}
                </p>
              </div>

              {/* Step Footer Highlight */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center gap-2 text-[11px] font-mono text-white/80">
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
