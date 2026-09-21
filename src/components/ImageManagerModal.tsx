import React, { useState, useRef } from 'react';
import { X, Image as ImageIcon, Check, RefreshCw, Sparkles, Upload, Link as LinkIcon, Wand2 } from 'lucide-react';
import { DirectImageLinks } from '../types';
import { DEFAULT_DIRECT_IMAGES } from '../data/portfolioData';
import { removeWhiteBackground, readFileAsDataUrl } from '../utils/imageProcessing';

interface ImageManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLinks: DirectImageLinks;
  onUpdateLinks: (newLinks: DirectImageLinks) => void;
}

export const ImageManagerModal: React.FC<ImageManagerModalProps> = ({
  isOpen,
  onClose,
  currentLinks,
  onUpdateLinks,
}) => {
  const [formLinks, setFormLinks] = useState<DirectImageLinks>(currentLinks);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      setFormLinks(currentLinks);
    }
  }, [currentLinks, isOpen]);

  if (!isOpen) return null;

  // Curated presets for quick test
  const portraitPresets = [
    {
      label: 'Foto do Fundador (Bald & Beard Tech)',
      url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1000&q=85',
    },
    {
      label: 'Studio Clean Portrait',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=85',
    },
    {
      label: 'Minimalist Tech Profile',
      url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      const dataUrl = await readFileAsDataUrl(file);
      const transparentCutout = await removeWhiteBackground(dataUrl, { threshold: 220, feather: 35 });
      setFormLinks(prev => ({ ...prev, heroPortrait: transparentCutout }));
      try {
        localStorage.setItem('vibe_coding_custom_hero_photo', transparentCutout);
      } catch {
        // quota
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApplyWhiteBgRemoval = async () => {
    if (!formLinks.heroPortrait) return;
    try {
      setIsProcessing(true);
      const cutout = await removeWhiteBackground(formLinks.heroPortrait, { threshold: 220, feather: 35 });
      setFormLinks(prev => ({ ...prev, heroPortrait: cutout }));
      try {
        localStorage.setItem('vibe_coding_custom_hero_photo', cutout);
      } catch {
        // quota
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateLinks(formLinks);
    try {
      localStorage.setItem('vibe_coding_custom_hero_photo', formLinks.heroPortrait);
    } catch {
      // ignore
    }
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  const handleResetDefaults = () => {
    setFormLinks(DEFAULT_DIRECT_IMAGES);
    onUpdateLinks(DEFAULT_DIRECT_IMAGES);
    try {
      localStorage.removeItem('vibe_coding_custom_hero_photo');
    } catch {
      // ignore
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#111115] border border-white/10 p-6 sm:p-8 shadow-2xl my-8">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-text-muted hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
            <ImageIcon className="w-5 h-5 text-white/90" />
          </div>
          <div>
            <h2 className="font-syne text-xl sm:text-2xl font-bold text-white">
              Gerenciador de Links Diretos das Imagens
            </h2>
            <p className="text-xs font-mono text-text-muted">
              Faça upload do seu arquivo de foto ou configure links diretos para a renderização sem moldura.
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          
          {/* 1. Hero Portrait with Direct File Upload & Auto-cutout */}
          <div className="p-4 rounded-xl bg-[#0c0c0f] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-mono text-xs font-semibold text-white flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-white/70" />
                Foto do Perfil no Hero (Sem Moldura &amp; Fundo Transparente)
              </label>
              <span className="text-[10px] font-mono text-[#10b981]">Integração Ativa</span>
            </div>

            <div className="flex items-start gap-4">
              {/* Thumbnail with dark background check pattern */}
              <div className="w-16 h-20 rounded-lg bg-[#111115] border border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center relative group/thumb">
                <img
                  src={formLinks.heroPortrait}
                  alt="Preview Hero"
                  className="w-full h-full object-contain object-bottom"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = DEFAULT_DIRECT_IMAGES.heroPortrait;
                  }}
                />
                {isProcessing && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                    <RefreshCw className="w-4 h-4 text-white animate-spin" />
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-2.5">
                {/* Upload Action buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-white bg-white/10 hover:bg-white/15 border border-white/10 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5 text-white/80" />
                    <span>Carregar Foto do Computador (PNG/JPG)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleApplyWhiteBgRemoval}
                    disabled={isProcessing}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-text-secondary bg-white/[0.05] hover:bg-white/10 border border-white/10 cursor-pointer"
                    title="Remove fundo branco da imagem atual"
                  >
                    <Wand2 className="w-3.5 h-3.5 text-white/80" />
                    <span>Remover Fundo Branco</span>
                  </button>
                </div>

                <input
                  type="text"
                  value={formLinks.heroPortrait}
                  onChange={(e) => setFormLinks({ ...formLinks, heroPortrait: e.target.value })}
                  placeholder="URL direta ou Data URI da imagem"
                  className="w-full px-3 py-2 rounded-lg bg-[#111115] border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-white/40"
                />
                
                {/* Quick Presets */}
                <div className="flex flex-wrap gap-1.5">
                  {portraitPresets.map((preset, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setFormLinks({ ...formLinks, heroPortrait: preset.url })}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.05] hover:bg-white/10 text-text-secondary hover:text-white border border-white/5 cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 2. Clínica Odonto & Estética */}
          <div className="p-4 rounded-xl bg-[#0c0c0f] border border-white/10 space-y-3">
            <label className="font-mono text-xs font-semibold text-white flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5 text-white/70" />
              Imagem Mockup: Clínica Odonto &amp; Estética
            </label>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-lg bg-[#18181e] border border-white/10 overflow-hidden flex-shrink-0">
                <img
                  src={formLinks.caseAnalytics}
                  alt="Preview Clínica Odonto"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <input
                type="url"
                value={formLinks.caseAnalytics}
                onChange={(e) => setFormLinks({ ...formLinks, caseAnalytics: e.target.value })}
                placeholder="URL direta ou caminho (/case-odonto.jpg)"
                className="flex-1 px-3 py-2 rounded-lg bg-[#111115] border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-white/40"
              />
            </div>
          </div>

          {/* 3. Advocacia Empresarial */}
          <div className="p-4 rounded-xl bg-[#0c0c0f] border border-white/10 space-y-3">
            <label className="font-mono text-xs font-semibold text-white flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5 text-white/70" />
              Imagem Mockup: Advocacia Empresarial &amp; Tributária
            </label>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-lg bg-[#18181e] border border-white/10 overflow-hidden flex-shrink-0">
                <img
                  src={formLinks.caseTaskFlow}
                  alt="Preview Advocacia"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <input
                type="url"
                value={formLinks.caseTaskFlow}
                onChange={(e) => setFormLinks({ ...formLinks, caseTaskFlow: e.target.value })}
                placeholder="URL direta da imagem da Advocacia"
                className="flex-1 px-3 py-2 rounded-lg bg-[#111115] border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-white/40"
              />
            </div>
          </div>

          {/* 4. Imóveis de Luxo & Arquitetura */}
          <div className="p-4 rounded-xl bg-[#0c0c0f] border border-white/10 space-y-3">
            <label className="font-mono text-xs font-semibold text-white flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5 text-white/70" />
              Imagem Mockup: Imóveis de Luxo &amp; Arquitetura
            </label>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-lg bg-[#18181e] border border-white/10 overflow-hidden flex-shrink-0">
                <img
                  src={formLinks.caseNeuroDoc}
                  alt="Preview Imóveis de Luxo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <input
                type="url"
                value={formLinks.caseNeuroDoc}
                onChange={(e) => setFormLinks({ ...formLinks, caseNeuroDoc: e.target.value })}
                placeholder="URL direta da imagem dos Imóveis"
                className="flex-1 px-3 py-2 rounded-lg bg-[#111115] border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-white/40"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-white cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Restaurar Padrões</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-xs font-mono text-text-muted hover:text-white cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-black bg-white hover:bg-neutral-200 shadow-lg cursor-pointer"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Alterações Aplicadas!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Aplicar Imagens</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
