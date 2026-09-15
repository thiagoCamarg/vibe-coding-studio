import React from 'react';
import { ArrowRight, Github, Twitter, Code2, Heart } from 'lucide-react';

interface FooterProps {
  onOpenProposal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenProposal }) => {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#0a0a0c] py-12 text-[#94a3b8] font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand and Copyright */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <div className="flex items-center gap-2 text-white font-semibold text-sm">
            <span className="text-[#06b6d4]">&lt;/</span>Thiago_Camargo<span className="text-[#06b6d4]">&gt;</span>
            <span className="text-[#e5e1e4]">Landing Page Studio</span>
          </div>
          <p className="text-[11px] text-[#94a3b8] font-sans">
            © 2025 Thiago Camargo. Landing pages de alta conversão para quem precisa de resultado, não de reunião.
          </p>
        </div>

        {/* Links & CTA */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          <button
            onClick={() => handleScrollTo('servicos')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            serviços
          </button>
          <span className="text-white/20 select-none">•</span>
          <button
            onClick={() => handleScrollTo('cases')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            cases
          </button>
          <span className="text-white/20 select-none">•</span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            github
          </a>
          <span className="text-white/20 select-none">•</span>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            x.com
          </a>

          <button
            onClick={onOpenProposal}
            className="ml-2 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
          >
            <span>Solicitar Orçamento</span>
            <ArrowRight className="w-3 h-3 text-[#06b6d4]" />
          </button>
        </div>

      </div>
    </footer>
  );
};
