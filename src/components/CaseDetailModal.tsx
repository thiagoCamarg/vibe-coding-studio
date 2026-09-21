import React, { useEffect } from 'react';
import { X, Maximize2 } from 'lucide-react';
import { ProjectCase } from '../types';

interface CaseDetailModalProps {
  projectCase: ProjectCase | null;
  onClose: () => void;
}

export const CaseDetailModal: React.FC<CaseDetailModalProps> = ({
  projectCase,
  onClose,
}) => {
  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!projectCase) return null;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md cursor-zoom-out animate-in fade-in duration-200"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl rounded-2xl bg-[#111115] border border-white/10 overflow-hidden shadow-2xl my-auto cursor-default flex flex-col max-h-[94vh]"
      >
        {/* Modal Header */}
        <div className="px-5 py-3.5 bg-[#18181e] border-b border-white/[0.08] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.06] text-white/90 border border-white/10 shrink-0">
              {projectCase.categoryLabel}
            </span>
            <h3 className="font-syne font-bold text-sm sm:text-base text-white truncate">
              {projectCase.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-text-muted hover:text-white transition-colors cursor-pointer"
              title="Fechar (ESC)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Pure Mockup Display */}
        <div className="flex-1 overflow-y-auto bg-[#09090b] p-3 sm:p-6 flex items-center justify-center min-h-[300px]">
          <div className="relative w-full max-w-4xl rounded-xl overflow-hidden bg-black/60 border border-white/[0.08] shadow-inner flex items-center justify-center">
            <img
              src={projectCase.imageUrl}
              alt={projectCase.title}
              className="w-full h-auto max-h-[75vh] object-contain block select-none"
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Modal Subtle Footer Info */}
        <div className="px-5 py-2.5 bg-[#18181e] border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-text-muted shrink-0">
          <div className="flex items-center gap-2">
            <Maximize2 className="w-3.5 h-3.5 text-white/50" />
            <span>Visualização em alta definição</span>
          </div>
          <span className="text-[11px] text-text-muted/60">Pressione ESC ou clique fora para fechar</span>
        </div>

      </div>
    </div>
  );
};

