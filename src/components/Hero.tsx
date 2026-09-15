import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Rocket, RefreshCw, Upload, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { PIPELINE_SCENARIOS } from '../data/portfolioData';
import { removeWhiteBackground, readFileAsDataUrl } from '../utils/imageProcessing';

interface HeroProps {
  portraitUrl: string;
  onOpenImageManager?: () => void;
  onStartProject: (nicheName?: string) => void;
  onViewServices: () => void;
  onPhotoUploaded?: (newPhotoUrl: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  portraitUrl,
  onStartProject,
  onViewServices,
  onPhotoUploaded,
}) => {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const [pipelineState, setPipelineState] = useState<'running' | 'completed'>('completed');
  const [visibleStep, setVisibleStep] = useState(3);

  // Processed image state (transparent cutout without white background or frame)
  const [displayImage, setDisplayImage] = useState<string>(portraitUrl);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const nicheScrollRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Drag-to-scroll mouse state
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  const scenario = PIPELINE_SCENARIOS[activeScenarioIndex];

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!nicheScrollRef.current) return;
    setIsMouseDown(true);
    setHasDragged(false);
    setStartX(e.pageX - nicheScrollRef.current.offsetLeft);
    setScrollLeft(nicheScrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !nicheScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - nicheScrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }
    nicheScrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollNiche = (direction: 'left' | 'right') => {
    if (!nicheScrollRef.current) return;
    const amount = direction === 'left' ? -200 : 200;
    nicheScrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  // Load custom photo or sync with portraitUrl
  useEffect(() => {
    if (portraitUrl) {
      try {
        const saved = localStorage.getItem('vibe_coding_custom_hero_photo');
        if (saved && saved.startsWith('data:image/')) {
          setDisplayImage(saved);
          return;
        }
      } catch {
        // ignore
      }
      processAndSetImage(portraitUrl, false);
    }
  }, [portraitUrl]);

  // Listen to global paste event (Ctrl+V) so user can simply paste their photo
  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            e.preventDefault();
            await handleFileUpload(file);
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const processAndSetImage = async (imgSrc: string, shouldPersist = true) => {
    setIsProcessingImage(true);
    try {
      // Auto-remove pure white background to make a seamless transparent cutout
      const cutout = await removeWhiteBackground(imgSrc, { threshold: 220, feather: 35 });
      setDisplayImage(cutout);

      if (shouldPersist) {
        try {
          localStorage.setItem('vibe_coding_custom_hero_photo', cutout);
          if (onPhotoUploaded) onPhotoUploaded(cutout);
        } catch {
          // LocalStorage quota might be exceeded for high-res images
        }
        showNotification('Foto integrada ao hero sem moldura com sucesso!');
      }
    } catch (err) {
      console.error('Erro no processamento da foto:', err);
      setDisplayImage(imgSrc);
    } finally {
      setIsProcessingImage(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      setIsProcessingImage(true);
      const dataUrl = await readFileAsDataUrl(file);
      await processAndSetImage(dataUrl, true);
    } catch (err) {
      console.error('Falha no upload do arquivo:', err);
      setIsProcessingImage(false);
    }
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleFileUpload(file);
    }
  };

  // Simulated pipeline execution animation
  const runSimulation = () => {
    setPipelineState('running');
    setVisibleStep(0);

    setTimeout(() => setVisibleStep(1), 600);
    setTimeout(() => setVisibleStep(2), 1400);
    setTimeout(() => {
      setVisibleStep(3);
      setPipelineState('completed');
    }, 2200);
  };

  const handleSelectScenario = (idx: number) => {
    if (hasDragged) return;
    setActiveScenarioIndex(idx);

    if (buttonRefs.current[idx]) {
      buttonRefs.current[idx]?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }

    setPipelineState('running');
    setVisibleStep(0);
    setTimeout(() => setVisibleStep(1), 400);
    setTimeout(() => setVisibleStep(2), 900);
    setTimeout(() => {
      setVisibleStep(3);
      setPipelineState('completed');
    }, 1500);
  };

  return (
    <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 overflow-hidden">
      
      {/* Hidden file input for direct photo selection */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onFileInputChange}
        className="hidden"
      />

      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#121216] border border-[#10b981]/40 text-xs font-mono text-[#acedff] shadow-2xl animate-fade-in">
          <Check className="w-4 h-4 text-[#10b981]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Atmospheric studio glow spots */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-[#6366f1]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-28 right-10 w-[450px] h-[450px] bg-[#06b6d4]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid: Hero narrative (left) and Seamless Frameless Portrait (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Narrative Column */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">

            {/* Display Headline */}
            <h1 className="font-syne text-3xl sm:text-5xl lg:text-[62px] font-extrabold tracking-tight text-white leading-[1.08] mb-6">
              Sua Página <br />
              Não Converte? <br />
              A Minha <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4cd7f6] via-[#c0c1ff] to-[#6366f1] inline-block">
                Converte em até 7 Dias.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-[#94a3b8] text-base sm:text-lg leading-relaxed max-w-2xl mb-8 font-sans">
              Landing pages de alta conversão para qualquer nicho: dentistas, advogados, personal trainers, imóveis, infoprodutores, restaurantes, salões e mais. Copy persuasiva, design premium e PageSpeed 95+.
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => onStartProject()}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-[#6366f1] via-[#5254e6] to-[#4338ca] shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:shadow-[0_0_35px_rgba(99,102,241,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Quero Minha Landing Page</span>
                <span className="text-base">🚀 💨</span>
              </button>

              <button
                onClick={onViewServices}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full font-medium text-sm text-[#e5e1e4] bg-[#18181f]/80 hover:bg-[#201f28] border border-white/10 hover:border-white/20 transition-all cursor-pointer"
              >
                <span>Ver Soluções &amp; Pacotes</span>
                <span className="text-base">📦</span>
              </button>
            </div>
          </div>

          {/* Seamless Frameless Portrait Column (INTEGRAÇÃO TOTAL SEM MOLDURA) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            
            {/* Outer container without any card border, box, or frame */}
            <div
              className="relative w-full max-w-[420px] sm:max-w-[460px] flex flex-col items-center group select-none"
              onDragOver={(e) => {
                e.preventDefault();
                setIsDraggingOver(true);
              }}
              onDragLeave={() => setIsDraggingOver(false)}
              onDrop={onDrop}
            >
              
              {/* Atmospheric background backlights specifically sculpted behind the person */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[340px] h-[340px] bg-gradient-to-tr from-[#6366f1]/30 via-[#3b82f6]/20 to-[#06b6d4]/25 rounded-full blur-[85px] pointer-events-none" />
              <div className="absolute bottom-10 right-0 w-[240px] h-[240px] bg-[#10b981]/15 rounded-full blur-[70px] pointer-events-none" />

              {/* Photo element with seamless bottom fade & zero frame */}
              <div className="relative w-full flex justify-center items-end min-h-[460px] sm:min-h-[520px]">
                
                {/* Drag-over visual highlight */}
                {isDraggingOver && (
                  <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/75 rounded-3xl border-2 border-dashed border-[#06b6d4] backdrop-blur-sm p-6 text-center">
                    <Upload className="w-10 h-10 text-[#06b6d4] animate-bounce mb-2" />
                    <p className="font-mono text-sm text-white font-semibold">Solte sua foto aqui</p>
                    <p className="text-xs text-[#94a3b8] font-mono mt-1">O fundo branco será removido automaticamente</p>
                  </div>
                )}

                {/* The portrait image itself */}
                <img
                  src={displayImage}
                  alt="Fundador & Engenheiro Vibe Coding"
                  className="w-full max-h-[500px] sm:max-h-[560px] object-contain object-bottom transition-all duration-500 group-hover:scale-[1.01] drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                  style={{
                    // Seamless bottom feathering to dissolve torso into the dark obsidian hero
                    maskImage: 'linear-gradient(to bottom, black 60%, transparent 97%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 97%)',
                  }}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to local transparent portrait
                    (e.target as HTMLImageElement).src = '/hero-portrait.png';
                  }}
                />

                {/* Subtle bottom shadow overlay to ensure 100% seamless transition to #0a0a0c */}
                <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/80 to-transparent pointer-events-none" />

                {/* Loading indicator when processing background removal */}
                {isProcessingImage && (
                  <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-xs">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#121216] border border-white/20 text-xs font-mono text-white">
                      <RefreshCw className="w-4 h-4 text-[#06b6d4] animate-spin" />
                      <span>Removendo fundo branco e integrando...</span>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* REIMAGINED: Unified Interactive Niche Delivery Simulator */}
        <div className="mt-16 sm:mt-20 max-w-5xl mx-auto">
          
          {/* Section Sub-header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#4cd7f6] mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              <span>SIMULADOR DE ENTREGA POR NICHO</span>
            </div>
            <h2 className="font-syne text-xl sm:text-2xl font-bold text-white tracking-tight">
              Veja Como Sua Página é Estruturada em Tempo Real
            </h2>
            <p className="text-xs sm:text-sm text-[#94a3b8] mt-1 font-sans max-w-xl mx-auto">
              Clique no seu nicho abaixo para simular a estratégia de copy, integrações técnicas e prazo de entrega.
            </p>
          </div>

          {/* Niche Selector Interactive Carousel Bar */}
          <div className="relative mb-5 px-1 sm:px-0">
            
            {/* Left Scroll Arrow */}
            <button
              onClick={() => scrollNiche('left')}
              className="hidden sm:flex absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-[#18181f]/90 hover:bg-[#201f28] border border-white/15 text-[#94a3b8] hover:text-white items-center justify-center shadow-lg transition-all cursor-pointer backdrop-blur-md"
              title="Rolar para esquerda"
              aria-label="Rolar para esquerda"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Right Scroll Arrow */}
            <button
              onClick={() => scrollNiche('right')}
              className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-[#18181f]/90 hover:bg-[#201f28] border border-white/15 text-[#94a3b8] hover:text-white items-center justify-center shadow-lg transition-all cursor-pointer backdrop-blur-md"
              title="Rolar para direita"
              aria-label="Rolar para direita"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Scroll Container with drag-to-scroll & touch swipe */}
            <div
              ref={nicheScrollRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scroll-smooth select-none cursor-grab active:cursor-grabbing touch-pan-x scrollbar-none px-2 sm:px-4"
              style={{
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {PIPELINE_SCENARIOS.map((sc, i) => {
                const isActive = activeScenarioIndex === i;
                return (
                  <button
                    key={sc.id}
                    ref={(el) => { buttonRefs.current[i] = el; }}
                    onClick={() => handleSelectScenario(i)}
                    className={`group shrink-0 flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-mono transition-all duration-300 cursor-pointer border ${
                      isActive
                        ? 'bg-gradient-to-r from-[#6366f1]/25 to-[#4cd7f6]/20 border-[#6366f1]/60 text-white shadow-[0_0_15px_rgba(99,102,241,0.25)]'
                        : 'bg-[#121216]/85 border-white/[0.08] text-[#94a3b8] hover:text-white hover:border-white/20 hover:bg-[#18181f]'
                    }`}
                  >
                    <span className="text-xs sm:text-sm leading-none shrink-0">{sc.nicheEmoji}</span>
                    <span className="font-medium whitespace-nowrap">{sc.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6] shadow-[0_0_6px_#4cd7f6] animate-pulse shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mobile swipe hint on touch devices */}
            <div className="flex sm:hidden items-center justify-between px-2 pt-1 text-[10px] font-mono text-[#94a3b8]/70">
              <button
                onClick={() => scrollNiche('left')}
                className="flex items-center gap-0.5 hover:text-white"
              >
                <ChevronLeft className="w-3 h-3" />
                <span>Anterior</span>
              </button>
              <span className="text-[9px] text-[#94a3b8]/50">⇄ Arraste para o lado</span>
              <button
                onClick={() => scrollNiche('right')}
                className="flex items-center gap-0.5 hover:text-white"
              >
                <span>Próximo</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Unified Console Container (Split Grid) */}
          <div className="rounded-2xl bg-[#121216]/95 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl">
            
            {/* Top Window Bar */}
            <div className="px-4 py-3 bg-[#18181f]/95 border-b border-white/[0.08] flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="h-4 w-px bg-white/10 shrink-0" />
                <div className="flex items-center gap-2 text-xs font-mono truncate">
                  <Terminal className="w-3.5 h-3.5 text-[#4cd7f6] shrink-0" />
                  <span className="text-white/90 font-medium">pipeline.exec</span>
                  <span className="text-white/30">//</span>
                  <span className="text-[#acedff] font-semibold flex items-center gap-1">
                    <span>{scenario.nicheEmoji}</span>
                    <span>{scenario.label}</span>
                  </span>
                </div>
              </div>

              {/* Status & Re-run Trigger */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={runSimulation}
                  disabled={pipelineState === 'running'}
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono text-[#94a3b8] hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Executar simulação novamente"
                >
                  <RefreshCw className={`w-3 h-3 ${pipelineState === 'running' ? 'animate-spin text-[#4cd7f6]' : ''}`} />
                  <span className="hidden sm:inline">Simular</span>
                </button>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wide bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30">
                  {pipelineState === 'running' ? 'EXECUTING...' : 'PRONTO P/ ENTREGA'}
                </span>
              </div>
            </div>

            {/* Main Console Body: Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
              
              {/* Left Column: Interactive Terminal Stream (7 cols) */}
              <div className="lg:col-span-7 p-5 sm:p-6 font-mono text-xs sm:text-sm space-y-4 leading-relaxed bg-[#0c0c0f]/60 flex flex-col justify-between">
                <div className="space-y-3.5">
                  
                  {/* Step 0: Briefing */}
                  <div className="flex items-start gap-2.5 text-white">
                    <span className="text-[#4cd7f6] font-bold select-none text-base leading-none">&gt;</span>
                    <div>
                      <span className="text-[#94a3b8] text-xs uppercase tracking-wider block mb-0.5 font-semibold">
                        Briefing do Cliente:
                      </span>
                      <span className="text-[#acedff] font-sans text-sm italic">
                        "{scenario.briefing}"
                      </span>
                    </div>
                  </div>

                  {/* Step 1: Strategy & Copy */}
                  {visibleStep >= 1 && (
                    <div className="flex items-start gap-2.5 text-[#94a3b8] animate-fade-in">
                      <span className="text-[#10b981] font-bold select-none mt-0.5">✓</span>
                      <div>
                        <span className="text-[#10b981] text-xs font-semibold uppercase tracking-wider block mb-0.5">
                          Estratégia &amp; Copy:
                        </span>
                        <span className="text-white text-xs sm:text-sm">
                          {scenario.step1.split('(')[0]}
                        </span>
                        <span className="text-[#4cd7f6] ml-1 text-xs font-semibold">
                          ({scenario.step1.split('(')[1]}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Dev & Tracking */}
                  {visibleStep >= 2 && (
                    <div className="flex items-start gap-2.5 text-[#94a3b8] animate-fade-in">
                      <span className="text-[#10b981] font-bold select-none mt-0.5">✓</span>
                      <div>
                        <span className="text-[#10b981] text-xs font-semibold uppercase tracking-wider block mb-0.5">
                          Desenvolvimento &amp; Integrações:
                        </span>
                        <span className="text-white text-xs sm:text-sm">
                          {scenario.step2.split('(')[0]}
                        </span>
                        <span className="text-[#4cd7f6] ml-1 text-xs font-semibold">
                          ({scenario.step2.split('(')[1]}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Launch Result */}
                  {visibleStep >= 3 && (
                    <div className="p-3 rounded-xl bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981] font-semibold text-xs sm:text-sm flex items-center gap-2 animate-fade-in">
                      <Rocket className="w-4 h-4 text-[#10b981] shrink-0" />
                      <span>{scenario.deploy}</span>
                    </div>
                  )}
                </div>

                {/* Terminal Bottom Tagline */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-[#94a3b8]">
                  <span className="flex items-center gap-1.5 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6] shrink-0" />
                    <span className="truncate">Stack: {scenario.techStack}</span>
                  </span>
                  <span className="text-[#10b981] font-semibold shrink-0">PageSpeed 95+</span>
                </div>
              </div>

              {/* Right Column: Spec Card & Direct CTA (5 cols) */}
              <div className="lg:col-span-5 p-5 sm:p-6 bg-[#15151c]/70 flex flex-col justify-between gap-5">
                <div>
                  
                  {/* Delivery Metrics Highlights */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                      <span className="text-[10px] font-mono text-[#94a3b8] uppercase tracking-wider block mb-1">
                        Prazo de Entrega
                      </span>
                      <span className="font-syne font-bold text-sm sm:text-base text-white flex items-center gap-1">
                        <span>⚡</span>
                        <span>{scenario.turnaroundDays}</span>
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                      <span className="text-[10px] font-mono text-[#94a3b8] uppercase tracking-wider block mb-1">
                        Métrica Chave
                      </span>
                      <span className="font-syne font-bold text-sm sm:text-base text-[#10b981] flex items-center gap-1">
                        <span>🎯</span>
                        <span>{scenario.keyMetric}</span>
                      </span>
                    </div>
                  </div>

                  {/* Included in Package */}
                  <div className="space-y-2 mb-5">
                    <span className="text-[11px] font-mono text-[#c7c4d7] uppercase tracking-wider block">
                      O que está incluído para este nicho:
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#94a3b8] font-sans">
                      <li className="flex items-center gap-2">
                        <span className="text-[#10b981] font-bold">✓</span>
                        <span>Copy persuasiva sem template genérico</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-[#10b981] font-bold">✓</span>
                        <span>Integração de WhatsApp / CRM / Checkout</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-[#10b981] font-bold">✓</span>
                        <span>Rastreamento Pixel Meta + GA4 completo</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-[#10b981] font-bold">✓</span>
                        <span>Código 100% seu sem mensalidade oculta</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Direct Action Button */}
                <button
                  onClick={() => onStartProject(scenario.label)}
                  className="w-full py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-[#6366f1] to-[#4f46e5] hover:from-[#5254e6] hover:to-[#4338ca] shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] flex items-center justify-center gap-2 transition-all cursor-pointer group"
                >
                  <span>Quero Página para {scenario.label}</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
