import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Rocket, RefreshCw, Upload, Check } from 'lucide-react';
import { PIPELINE_SCENARIOS } from '../data/portfolioData';
import { removeWhiteBackground, readFileAsDataUrl } from '../utils/imageProcessing';

interface HeroProps {
  portraitUrl: string;
  onOpenImageManager?: () => void;
  onStartProject: () => void;
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

  const scenario = PIPELINE_SCENARIOS[activeScenarioIndex];

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
    setActiveScenarioIndex(idx);
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
            <h1 className="font-syne text-4xl sm:text-5xl lg:text-[62px] font-extrabold tracking-tight text-white leading-[1.08] mb-6">
              Transformo <br />
              Sua Ideia em <br />
              Software <br />
              Funcional e <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4cd7f6] via-[#c0c1ff] to-[#6366f1] inline-block">
                no Ar em Poucos Dias
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-[#94a3b8] text-base sm:text-lg leading-relaxed max-w-2xl mb-8 font-sans">
              Desenvolvimento ultrarrápido com Vibe Coding &amp; Engenharia de IA. Chega de esperar meses e gastar fortunas com agências tradicionais. Você valida seu produto com clientes reais na velocidade máxima.
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onStartProject}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-[#6366f1] via-[#5254e6] to-[#4338ca] shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:shadow-[0_0_35px_rgba(99,102,241,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Quero Lançar Meu Produto</span>
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

        {/* Bottom Production Pipeline Box */}
        <div className="mt-14 max-w-4xl mx-auto">
          <div className="rounded-xl bg-[#121216]/90 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-md">
            
            {/* Terminal Top Window Bar */}
            <div className="px-4 py-3 bg-[#18181f]/90 border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Traffic lights */}
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="h-4 w-px bg-white/10 ml-1" />
                <span className="font-mono text-xs text-[#94a3b8] flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#06b6d4]" />
                  <span>production.pipeline</span>
                  <span className="text-white/30">//</span>
                  <span className="text-[#c7c4d7]">client_delivery</span>
                </span>
              </div>

              {/* Status & Replay Button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={runSimulation}
                  disabled={pipelineState === 'running'}
                  className="px-2.5 py-1 rounded text-[11px] font-mono text-[#94a3b8] hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors flex items-center gap-1 cursor-pointer"
                  title="Simular execução do pipeline"
                >
                  <RefreshCw className={`w-3 h-3 ${pipelineState === 'running' ? 'animate-spin text-[#06b6d4]' : ''}`} />
                  <span className="hidden sm:inline">Re-executar</span>
                </button>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wide bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30">
                  {pipelineState === 'running' ? 'EXECUTING...' : 'READY TO SHIP'}
                </span>
              </div>
            </div>

            {/* Scenario selector tabs */}
            <div className="px-4 py-2 bg-[#0e0e12] border-b border-white/[0.05] flex items-center gap-2 overflow-x-auto text-xs font-mono">
              <span className="text-[#94a3b8] text-[11px] mr-1 hidden sm:inline">Cenários:</span>
              {PIPELINE_SCENARIOS.map((sc, i) => (
                <button
                  key={sc.id}
                  onClick={() => handleSelectScenario(i)}
                  className={`px-3 py-1 rounded text-[11px] transition-all cursor-pointer whitespace-nowrap ${
                    activeScenarioIndex === i
                      ? 'bg-[#6366f1]/20 text-[#c0c1ff] border border-[#6366f1]/40'
                      : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {sc.label}
                </button>
              ))}
            </div>

            {/* Terminal Body */}
            <div className="p-5 font-mono text-xs sm:text-sm space-y-3 leading-relaxed">
              
              {/* Step 0: Briefing input */}
              <div className="flex items-start gap-2 text-white">
                <span className="text-[#06b6d4] font-bold select-none">&gt;</span>
                <div>
                  <span className="text-[#c7c4d7]">client.briefing</span>{' '}
                  <span className="text-[#acedff]">"{scenario.briefing}"</span>
                </div>
              </div>

              {/* Step 1: Database & Arch */}
              {visibleStep >= 1 && (
                <div className="flex items-start gap-2 text-[#94a3b8] transition-opacity duration-300">
                  <span className="text-[#10b981] select-none">✓</span>
                  <div>
                    <span className="text-white">{scenario.step1.split('(')[0]}</span>
                    <span className="text-[#06b6d4] ml-1">({scenario.step1.split('(')[1]}</span>
                  </div>
                </div>
              )}

              {/* Step 2: Interface & Payments */}
              {visibleStep >= 2 && (
                <div className="flex items-start gap-2 text-[#94a3b8] transition-opacity duration-300">
                  <span className="text-[#10b981] select-none">✓</span>
                  <div>
                    <span className="text-white">{scenario.step2.split('(')[0]}</span>
                    <span className="text-[#06b6d4] ml-1">({scenario.step2.split('(')[1]}</span>
                  </div>
                </div>
              )}

              {/* Step 3: Production deploy */}
              {visibleStep >= 3 && (
                <div className="flex items-start gap-2 pt-1 text-[#10b981] font-semibold transition-opacity duration-300">
                  <Rocket className="w-4 h-4 text-[#10b981] flex-shrink-0 mt-0.5" />
                  <span>{scenario.deploy}</span>
                </div>
              )}
            </div>

            {/* Terminal Footer Info */}
            <div className="px-5 py-2.5 bg-[#0e0e12] border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#94a3b8]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4]" />
                Stack: {scenario.techStack}
              </span>
              <span className="text-[#10b981]">Garantia de Entrega Ágil</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
