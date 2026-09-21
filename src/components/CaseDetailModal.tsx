import React from 'react';
import { X } from 'lucide-react';
import { ProjectCase } from '../types';

interface CaseDetailModalProps {
  projectCase: ProjectCase | null;
  onClose: () => void;
  onSelectForProposal?: (title: string) => void;
}

export const CaseDetailModal: React.FC<CaseDetailModalProps> = ({
  projectCase,
  onClose,
}) => {
  if (!projectCase) return null;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto cursor-pointer"
    >
      {/* Card with Mockup Image - stops propagation so clicking inside doesn't immediately close */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl rounded-2xl bg-[#121216] border border-white/15 overflow-hidden shadow-2xl my-auto cursor-default group"
      >
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-black/70 hover:bg-black/90 text-white/80 hover:text-white transition-all cursor-pointer z-20 border border-white/20 shadow-lg"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Mockup Image */}
        <div className="w-full bg-[#0a0a0d] overflow-hidden flex items-center justify-center">
          <img
            src={projectCase.imageUrl}
            alt={projectCase.title}
            className="w-full h-auto max-h-[82vh] object-contain block"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Minimal Footer Label */}
        <div className="px-4 sm:px-6 py-3 bg-[#121216] border-t border-white/10 flex items-center justify-between gap-3 text-xs font-mono">
          <span className="text-white font-semibold truncate">{projectCase.title}</span>
          <span className="text-[#10b981] bg-[#10b981]/15 px-2.5 py-0.5 rounded-full text-[11px] shrink-0">
            {projectCase.categoryLabel}
          </span>
        </div>
      </div>
    </div>
  );
};
