import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenProposal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenProposal }) => {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#070709] py-14 text-text-muted font-sans text-xs relative overflow-hidden">
      {/* Top Discreet Hairline */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#10b981]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand and Copyright */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2.5">
          <div className="flex items-center gap-3">
            <span className="font-syne font-bold text-sm tracking-tight text-white uppercase">
              Thiago Camargo
            </span>
            <span className="h-3 w-px bg-white/10" />
            <span className="font-mono text-[11px] text-text-muted uppercase tracking-wider">
              Landing Page Studio
            </span>
          </div>
          <p className="text-[12px] text-text-muted/80 max-w-md font-light leading-relaxed">
            © {new Date().getFullYear()} Thiago Camargo. Engenharia de landing pages de alta conversão para negócios que priorizam performance e resultado.
          </p>
        </div>

        {/* Links & CTA */}
        <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-[11px] uppercase tracking-wider">
          <button
            onClick={() => handleScrollTo('servicos')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Serviços
          </button>
          <span className="text-white/15 select-none">/</span>
          <button
            onClick={() => handleScrollTo('cases')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Cases
          </button>
          <span className="text-white/15 select-none">/</span>
          <button
            onClick={() => handleScrollTo('contato')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Contato
          </button>

          <button
            onClick={onOpenProposal}
            className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-semibold text-black bg-white hover:bg-neutral-200 shadow-sm transition-all cursor-pointer hover:scale-[1.02]"
          >
            <span>Solicitar Orçamento</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};

