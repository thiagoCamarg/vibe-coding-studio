import React, { useState } from 'react';
import { Zap, ExternalLink, ArrowRight, Play, Eye, Layers, Sparkles, Image as ImageIcon } from 'lucide-react';
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
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'saas' | 'enterprise' | 'ai'>('all');

  const filteredCases = selectedCategory === 'all' 
    ? cases 
    : cases.filter(c => c.category === selectedCategory);

  const saasCase = cases.find(c => c.id === 'saas-analytics-pro') || cases[0];
  const enterpriseCase = cases.find(c => c.id === 'taskflow-ai') || cases[1];
  const aiCase = cases.find(c => c.id === 'neurodoc-ai') || cases[2];

  return (
    <section id="cases" className="py-20 border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="font-mono text-xs text-[#06b6d4] tracking-wider mb-2">
              // 03. CASOS DE USO &amp; SOLUÇÕES ENTREGUES
            </div>
            <h2 className="font-syne text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Projetos Prontos &amp; Soluções Entregues
            </h2>
          </div>

          {/* Green production-ready badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 text-xs font-mono text-[#10b981]">
            <span>⚡</span>
            <span>100% Funcional &amp; Pronto para Produção</span>
          </div>
        </div>

        {/* Dynamic Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-10 pb-4 border-b border-white/[0.06]">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-[#94a3b8] hover:text-white bg-white/[0.04] border border-white/10'
              }`}
            >
              Todos ({cases.length})
            </button>
            <button
              onClick={() => setSelectedCategory('saas')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                selectedCategory === 'saas'
                  ? 'bg-[#6366f1] text-white font-semibold shadow-sm'
                  : 'text-[#94a3b8] hover:text-white bg-white/[0.04] border border-white/10'
              }`}
            >
              Micro-SaaS
            </button>
            <button
              onClick={() => setSelectedCategory('enterprise')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                selectedCategory === 'enterprise'
                  ? 'bg-[#06b6d4] text-black font-semibold shadow-sm'
                  : 'text-[#94a3b8] hover:text-white bg-white/[0.04] border border-white/10'
              }`}
            >
              Enterprise MVP
            </button>
            <button
              onClick={() => setSelectedCategory('ai')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                selectedCategory === 'ai'
                  ? 'bg-[#10b981] text-black font-semibold shadow-sm'
                  : 'text-[#94a3b8] hover:text-white bg-white/[0.04] border border-white/10'
              }`}
            >
              Inteligência Artificial
            </button>
          </div>

          <button
            onClick={onOpenImageManager}
            className="flex items-center gap-1.5 text-xs font-mono text-[#94a3b8] hover:text-[#06b6d4] transition-colors"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Editar Links das Telas</span>
          </button>
        </div>

        {/* Case Layout as shown in screenshot: */}
        {/* Row 1: SaaS Analytics Pro & TaskFlow AI (2 columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Case 1: SaaS Analytics Pro */}
          {(selectedCategory === 'all' || selectedCategory === 'saas') && (
            <div className="group rounded-2xl bg-[#121216]/90 border border-white/[0.08] hover:border-[#6366f1]/40 p-6 flex flex-col justify-between transition-all duration-300 shadow-xl">
              <div>
                {/* Header Pills */}
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-[#c7c4d7]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4]" />
                    <span>{saasCase.categoryLabel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#06b6d4]">⚡</span>
                    <button 
                      onClick={() => onOpenCaseModal(saasCase)}
                      className="text-[#94a3b8] hover:text-white transition-colors"
                      title="Abrir detalhes completos"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="font-syne text-xl sm:text-2xl font-bold text-white mb-2.5">
                  {saasCase.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed mb-5 font-sans">
                  {saasCase.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {saasCase.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded text-xs font-mono bg-white/[0.04] text-[#c7c4d7] border border-white/[0.06]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* UI Screen Mockup with Live Interactive Preview trigger */}
              <div className="relative rounded-xl overflow-hidden bg-[#0c0c0f] border border-white/10 group/img">
                <div className="h-60 sm:h-72 w-full relative overflow-hidden">
                  
                  {/* High fidelity image preview */}
                  <img
                    src={imageUrls.caseAnalytics}
                    alt={saasCase.title}
                    className="w-full h-full object-cover object-center filter brightness-90 group-hover/img:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* UI Overlay simulation reproducing screenshot look */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0f] via-transparent to-[#0c0c0f]/40 pointer-events-none" />

                  {/* Floating Mockup Elements inside image */}
                  <div className="absolute inset-x-3 top-3 flex items-center justify-between pointer-events-none">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white">
                      <span>analytics.overview // v2.4</span>
                    </div>
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#10b981]/20 border border-[#10b981]/40 text-[10px] font-mono text-[#10b981]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                      <span>$48,920 MRR</span>
                    </div>
                  </div>

                  {/* Bottom indicator matching reference screenshot */}
                  <div className="absolute bottom-3 inset-x-3 flex items-center justify-between">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-xs font-mono text-[#10b981]">
                      <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_6px_#10b981]" />
                      <span>Em Produção com Clientes Pagantes</span>
                    </div>

                    <button
                      onClick={() => onOpenCaseModal(saasCase)}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono text-white bg-[#6366f1] hover:bg-[#4f46e5] shadow-lg flex items-center gap-1.5 cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Testar Demo</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Case 2: TaskFlow AI & Supabase */}
          {(selectedCategory === 'all' || selectedCategory === 'enterprise') && (
            <div className="group rounded-2xl bg-[#121216]/90 border border-white/[0.08] hover:border-[#06b6d4]/40 p-6 flex flex-col justify-between transition-all duration-300 shadow-xl">
              <div>
                {/* Header Pills */}
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-[#c7c4d7]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                    <span>{enterpriseCase.categoryLabel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#06b6d4]">⚡</span>
                    <button 
                      onClick={() => onOpenCaseModal(enterpriseCase)}
                      className="text-[#94a3b8] hover:text-white transition-colors"
                      title="Abrir detalhes completos"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="font-syne text-xl sm:text-2xl font-bold text-white mb-2.5">
                  {enterpriseCase.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed mb-5 font-sans">
                  {enterpriseCase.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {enterpriseCase.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded text-xs font-mono bg-white/[0.04] text-[#c7c4d7] border border-white/[0.06]"
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
                    alt={enterpriseCase.title}
                    className="w-full h-full object-cover object-center filter brightness-90 group-hover/img:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0f] via-transparent to-[#0c0c0f]/40 pointer-events-none" />

                  {/* Floating status */}
                  <div className="absolute inset-x-3 top-3 flex items-center justify-between pointer-events-none">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white">
                      <span>taskflow.supabase.sync // live</span>
                    </div>
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#06b6d4]/20 border border-[#06b6d4]/40 text-[10px] font-mono text-[#06b6d4]">
                      <span>RBAC Active</span>
                    </div>
                  </div>

                  <div className="absolute bottom-3 inset-x-3 flex items-center justify-between">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-xs font-mono text-[#acedff]">
                      <span className="w-2 h-2 rounded-full bg-[#06b6d4] shadow-[0_0_6px_#06b6d4]" />
                      <span>Pronto para Produção Corporativa</span>
                    </div>

                    <button
                      onClick={() => onOpenCaseModal(enterpriseCase)}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono text-white bg-[#06b6d4] hover:bg-[#0891b2] shadow-lg flex items-center gap-1.5 cursor-pointer text-black font-semibold"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Testar Demo</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Row 2: NeuroDoc — Plataforma de Síntese e Análise de Documentos com LLMs (Full width featured card) */}
        {(selectedCategory === 'all' || selectedCategory === 'ai') && (
          <div className="rounded-2xl bg-[#121216]/90 border border-white/[0.08] hover:border-[#10b981]/40 p-6 sm:p-8 transition-all duration-300 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Description & CTAs */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  {/* Pills */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-[#c7c4d7]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1]" />
                      <span>Inteligência Artificial Aplicada</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10b981]/15 border border-[#10b981]/30 text-xs font-mono text-[#10b981]">
                      <span>Pronto para Produção</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-syne text-2xl sm:text-3xl font-bold text-white mb-3">
                    {aiCase.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed mb-6 font-sans">
                    {aiCase.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {aiCase.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded text-xs font-mono bg-white/[0.04] text-[#c7c4d7] border border-white/[0.06]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTAs matching screenshot */}
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => onSelectCaseForProposal(aiCase.title)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#6366f1] to-[#4f46e5] hover:brightness-110 shadow-[0_0_15px_rgba(99,102,241,0.4)] cursor-pointer"
                  >
                    <span>Quero um App Assim</span>
                    <span>🚀</span>
                  </button>

                  <button
                    onClick={() => onOpenCaseModal(aiCase)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium text-[#c7c4d7] bg-[#18181f] hover:bg-[#201f28] border border-white/10 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#06b6d4]" />
                    <span>Prazos &amp; Entregáveis</span>
                  </button>
                </div>
              </div>

              {/* Right Column: High-Fidelity UI Screenshot */}
              <div className="lg:col-span-6">
                <div className="relative rounded-xl overflow-hidden bg-[#0c0c0f] border border-white/10 group/neuro">
                  <div className="h-64 sm:h-80 w-full relative overflow-hidden">
                    <img
                      src={imageUrls.caseNeuroDoc}
                      alt={aiCase.title}
                      className="w-full h-full object-cover object-center filter brightness-95 group-hover/neuro:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0f] via-transparent to-[#0c0c0f]/40 pointer-events-none" />

                    {/* Streaming simulator pill */}
                    <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 text-xs font-mono text-white">
                      <Sparkles className="w-3.5 h-3.5 text-[#06b6d4]" />
                      <span>Streaming LLM Engine // Active</span>
                    </div>

                    <div className="absolute bottom-3 right-3">
                      <button
                        onClick={() => onOpenCaseModal(aiCase)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-white bg-[#10b981] hover:bg-[#059669] text-black font-semibold shadow-lg cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Simular Síntese de IA</span>
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
