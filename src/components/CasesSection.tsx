import React, { useState } from 'react';
import { Zap, ExternalLink, ArrowRight, Play, Eye, Layers, Sparkles, Image as ImageIcon, Maximize2 } from 'lucide-react';
import { ProjectCase } from '../types';

interface CasesSectionProps {
  cases: ProjectCase[];
  imageUrls: {
    caseAnalytics: string;
    caseTaskFlow: string;
    caseNeuroDoc: string;
  };
  onOpenCaseModal: (projectCase: ProjectCase) => void;
  onSelectCaseForProposal: (caseTitle: string) => void;
  onOpenImageManager: () => void;
}

export const CasesSection: React.FC<CasesSectionProps> = ({
  cases,
  imageUrls,
  onOpenCaseModal,
  onSelectCaseForProposal,
  onOpenImageManager,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'vendas' | 'captura' | 'institucional'>('all');

  const filteredCases = selectedCategory === 'all' 
    ? cases 
    : cases.filter(c => c.category === selectedCategory);

  const salesCase = cases.find(c => c.id === 'curso-online-sales') || cases[0];
  const captureCase = cases.find(c => c.id === 'saas-waitlist') || cases[1];
  const institutionalCase = cases.find(c => c.id === 'escritorio-institucional') || cases[2];

  return (
    <section id="cases" className="py-20 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="font-mono text-xs text-text-muted tracking-widest uppercase mb-2">
              03 / TRABALHOS SELECIONADOS
            </div>
            <h2 className="font-syne text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Cases de Alta Conversão
            </h2>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/25 text-xs font-mono text-[#10b981]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
            <span>Responsivos &amp; Produção</span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-10 pb-4 border-b border-white/[0.08]">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-text-muted hover:text-white bg-[#111115] border border-white/[0.08]'
              }`}
            >
              Todos ({cases.length})
            </button>
            <button
              onClick={() => setSelectedCategory('vendas')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                selectedCategory === 'vendas'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-text-muted hover:text-white bg-[#111115] border border-white/[0.08]'
              }`}
            >
              Páginas de Vendas
            </button>
            <button
              onClick={() => setSelectedCategory('captura')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                selectedCategory === 'captura'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-text-muted hover:text-white bg-[#111115] border border-white/[0.08]'
              }`}
            >
              Captura de Leads
            </button>
            <button
              onClick={() => setSelectedCategory('institucional')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                selectedCategory === 'institucional'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-text-muted hover:text-white bg-[#111115] border border-white/[0.08]'
              }`}
            >
              Institucional
            </button>
          </div>

          <button
            onClick={onOpenImageManager}
            className="flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-white transition-colors cursor-pointer"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Editar Links das Telas</span>
          </button>
        </div>

        {/* Case Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Case 1: Odonto & Estética */}
          {(selectedCategory === 'all' || selectedCategory === 'vendas') && (
            <div className="group rounded-2xl bg-[#111115] border border-white/[0.08] hover:border-white/20 p-6 flex flex-col justify-between transition-all duration-300">
              <div>
                {/* Header Pills */}
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-white/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                    <span>{salesCase.categoryLabel}</span>
                  </div>
                  <button 
                    onClick={() => onOpenCaseModal(salesCase)}
                    className="text-text-muted hover:text-white transition-colors p-1"
                    title="Ampliar mockup"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Title & Description */}
                <h3 className="font-syne text-xl sm:text-2xl font-bold text-white mb-2.5">
                  {salesCase.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-5 font-sans">
                  {salesCase.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {salesCase.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded text-xs font-mono bg-white/[0.03] text-text-secondary border border-white/[0.06]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* UI Screen Mockup with Live Interactive Preview trigger */}
              <div className="relative rounded-xl overflow-hidden bg-[#0c0c0f] border border-white/10 group/img">
                <div className="h-60 sm:h-72 w-full relative overflow-hidden">
                  
                  <img
                    src={imageUrls.caseAnalytics}
                    alt={salesCase.title}
                    className="w-full h-full object-cover object-center filter brightness-90 group-hover/img:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="300"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0f] via-transparent to-[#0c0c0f]/40 pointer-events-none" />

                  {/* Floating Mockup Elements */}
                  <div className="absolute inset-x-3 top-3 flex items-center justify-between pointer-events-none">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white">
                      <span>odonto.estetica</span>
                    </div>
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#10b981]/20 border border-[#10b981]/40 text-[10px] font-mono text-[#10b981]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                      <span>Agendamentos Diretos</span>
                    </div>
                  </div>

                  {/* Bottom indicator */}
                  <div className="absolute bottom-3 inset-x-3 flex items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-black/85 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-mono text-white truncate min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] shrink-0" />
                      <span className="truncate">WhatsApp + Catálogo</span>
                    </div>

                    <button
                      onClick={() => onOpenCaseModal(salesCase)}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono text-black font-semibold bg-white hover:bg-neutral-200 shadow-md flex items-center gap-1.5 cursor-pointer shrink-0 transition-all"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Ampliar Mockup</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Case 2: Advocacia Tributária */}
          {(selectedCategory === 'all' || selectedCategory === 'captura') && (
            <div className="group rounded-2xl bg-[#111115] border border-white/[0.08] hover:border-white/20 p-6 flex flex-col justify-between transition-all duration-300">
              <div>
                {/* Header Pills */}
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-white/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                    <span>{captureCase.categoryLabel}</span>
                  </div>
                  <button 
                    onClick={() => onOpenCaseModal(captureCase)}
                    className="text-text-muted hover:text-white transition-colors p-1"
                    title="Ampliar mockup"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Title & Description */}
                <h3 className="font-syne text-xl sm:text-2xl font-bold text-white mb-2.5">
                  {captureCase.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-5 font-sans">
                  {captureCase.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {captureCase.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded text-xs font-mono bg-white/[0.03] text-text-secondary border border-white/[0.06]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* UI Screen Mockup */}
              <div className="relative rounded-xl overflow-hidden bg-[#0c0c0f] border border-white/10 group/img">
                <div className="h-60 sm:h-72 w-full relative overflow-hidden">
                  <img
                    src={imageUrls.caseTaskFlow}
                    alt={captureCase.title}
                    className="w-full h-full object-cover object-center filter brightness-90 group-hover/img:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="300"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0f] via-transparent to-[#0c0c0f]/40 pointer-events-none" />

                  {/* Floating status */}
                  <div className="absolute inset-x-3 top-3 flex items-center justify-between pointer-events-none">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white">
                      <span>advocacia.tributaria</span>
                    </div>
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/10 border border-white/20 text-[10px] font-mono text-white">
                      <span>Leads Qualificados</span>
                    </div>
                  </div>

                  <div className="absolute bottom-3 inset-x-3 flex items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-black/85 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-mono text-white truncate min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
                      <span className="truncate">Formulário + Triagem</span>
                    </div>

                    <button
                      onClick={() => onOpenCaseModal(captureCase)}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono text-black font-semibold bg-white hover:bg-neutral-200 shadow-md flex items-center gap-1.5 cursor-pointer shrink-0 transition-all"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Ampliar Mockup</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Row 2: Imóveis de Luxo (Full width featured card) */}
        {(selectedCategory === 'all' || selectedCategory === 'institucional') && (
          <div className="rounded-2xl bg-[#111115] border border-white/[0.08] hover:border-white/20 p-6 sm:p-8 transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-white/90">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                      <span>Site Institucional &amp; Imobiliário</span>
                    </div>
                  </div>

                  <h3 className="font-syne text-2xl sm:text-3xl font-bold text-white mb-3">
                    {institutionalCase.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-6 font-sans">
                    {institutionalCase.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {institutionalCase.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded text-xs font-mono bg-white/[0.03] text-text-secondary border border-white/[0.06]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3.5">
                  <button
                    onClick={() => onSelectCaseForProposal(institutionalCase.title)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase font-mono tracking-wider text-black bg-white hover:bg-neutral-200 transition-all cursor-pointer shadow-sm"
                  >
                    <span>Quero um Site Assim</span>
                    <span className="text-sm">→</span>
                  </button>

                  <button
                    onClick={() => onOpenCaseModal(institutionalCase)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono text-text-secondary bg-[#18181e] hover:bg-[#22222a] border border-white/10 transition-colors cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-white/80" />
                    <span>Ampliar Mockup</span>
                  </button>
                </div>
              </div>

              {/* Right Column: High-Fidelity UI Screenshot */}
              <div className="lg:col-span-6">
                <div className="relative rounded-xl overflow-hidden bg-[#0c0c0f] border border-white/10 group/neuro">
                  <div className="h-64 sm:h-80 w-full relative overflow-hidden">
                    <img
                      src={imageUrls.caseNeuroDoc}
                      alt={institutionalCase.title}
                      className="w-full h-full object-cover object-center filter brightness-95 group-hover/neuro:scale-105 transition-transform duration-500 cursor-pointer"
                      onClick={() => onOpenCaseModal(institutionalCase)}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      width="600"
                      height="320"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0f] via-transparent to-[#0c0c0f]/40 pointer-events-none" />

                    <div className="absolute top-3 left-3 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-mono text-white max-w-[70%] sm:max-w-none truncate">
                      <Sparkles className="w-3.5 h-3.5 text-white/80 shrink-0" />
                      <span className="truncate">Design de Alto Padrão</span>
                    </div>

                    <div className="absolute bottom-3 right-3">
                      <button
                        onClick={() => onOpenCaseModal(institutionalCase)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-black font-semibold bg-white hover:bg-neutral-200 shadow-md cursor-pointer shrink-0 transition-all"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Ampliar Mockup</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
