import React, { useState, useEffect } from 'react';
import { MessageSquare, Calendar, Mail, Zap, Check, ArrowRight, Copy, ExternalLink, Sparkles } from 'lucide-react';
import { ProposalFormState } from '../types';

interface ContactSectionProps {
  initialProjectType?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialProjectType,
}) => {
  const [formData, setFormData] = useState<ProposalFormState>({
    clientName: '',
    contact: '',
    projectType: initialProjectType || 'MVP / Micro-SaaS',
    budgetRange: 'R$ 5k - 10k',
    projectSummary: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialProjectType) {
      setFormData(prev => ({ ...prev, projectType: initialProjectType }));
    }
  }, [initialProjectType]);

  const projectTypes = [
    { label: 'MVP / Micro-SaaS', icon: '🚀' },
    { label: 'Automação & IA', icon: '🤖' },
    { label: 'Landing Page', icon: '⚡' },
    { label: 'Outro', icon: '📦' },
  ];

  const budgetOptions = ['R$ 1k - 4k', 'R$ 5k - 10k', 'R$ 10k+', 'A definir'];

  // Calculate dynamic delivery estimate based on inputs
  const getDynamicEstimate = () => {
    if (formData.projectType.includes('Landing')) return '2 a 4 dias úteis';
    if (formData.projectType.includes('Automação')) return '4 a 6 dias úteis';
    if (formData.projectType.includes('MVP')) return '5 a 8 dias úteis';
    return '5 a 10 dias úteis';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const getWhatsAppMessage = () => {
    const text = `Olá! Gostaria de um orçamento para meu projeto:
*Nome/Empresa:* ${formData.clientName || 'Não informado'}
*Contato:* ${formData.contact || 'Não informado'}
*Tipo de Projeto:* ${formData.projectType}
*Orçamento Estimado:* ${formData.budgetRange}
*Resumo do Escopo:* ${formData.projectSummary || 'Quero discutir com o engenheiro'}`;
    return encodeURIComponent(text);
  };

  const handleCopyProposal = () => {
    const text = `Proposta solicitada:
Nome/Empresa: ${formData.clientName}
Contato: ${formData.contact}
Tipo: ${formData.projectType}
Orçamento: ${formData.budgetRange}
Resumo: ${formData.projectSummary}
Estimativa de entrega: ${getDynamicEstimate()}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contato" className="py-20 border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Direct channels & Value proposition */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs text-[#06b6d4] tracking-wider mb-2">
                // 05. INICIAR PROJETO
              </div>
              <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
                Pronto Para Tirar Sua Ideia do Papel?
              </h2>
              <p className="text-sm text-[#94a3b8] leading-relaxed mb-8 font-sans">
                Me conte sobre seu projeto. Analiso seu escopo e respondo em até 4 horas com uma estimativa de prazo, viabilidade técnica e proposta comercial.
              </p>

              {/* Direct channels cards matching reference */}
              <div className="space-y-3.5 mb-8">
                
                {/* WhatsApp Direto */}
                <a
                  href={`https://wa.me/5511961060719?text=${getWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#121216] hover:bg-[#18181f] border border-white/[0.08] hover:border-[#10b981]/40 transition-all group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#10b981]/15 border border-[#10b981]/30 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-4 h-4 text-[#10b981]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[10px] text-[#94a3b8] uppercase tracking-wide">
                      WHATSAPP DIRETO / RESPOSTA IMEDIATA
                    </p>
                    <p className="font-mono text-xs text-[#acedff] group-hover:text-white flex items-center gap-1">
                      wa.me/5511961060719
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform inline" />
                    </p>
                  </div>
                </a>

                {/* Calendly Call */}
                <a
                  href="https://calendly.com/thiagocamargodev/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#121216] hover:bg-[#18181f] border border-white/[0.08] hover:border-[#06b6d4]/40 transition-all group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#06b6d4]/15 border border-[#06b6d4]/30 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-[#06b6d4]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[10px] text-[#94a3b8] uppercase tracking-wide">
                      ALINHAMENTO RÁPIDO (30 MIN)
                    </p>
                    <p className="font-mono text-xs text-[#acedff] group-hover:text-white flex items-center gap-1">
                      calendly.com/thiagocamargodev/30min
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform inline" />
                    </p>
                  </div>
                </a>

                {/* E-mail */}
                <a
                  href="mailto:thiagocamargo.dev@outlook.com"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#121216] hover:bg-[#18181f] border border-white/[0.08] hover:border-[#6366f1]/40 transition-all group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#6366f1]/15 border border-[#6366f1]/30 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-[#6366f1]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[10px] text-[#94a3b8] uppercase tracking-wide">
                      E-MAIL CORPORATIVO
                    </p>
                    <p className="font-mono text-xs text-[#acedff] group-hover:text-white">
                      thiagocamargo.dev@outlook.com
                    </p>
                  </div>
                </a>

              </div>
            </div>

            {/* Availability Warning */}
            <div className="flex items-center gap-2 text-xs font-mono text-[#c0c1ff]">
              <span className="text-[#06b6d4]">⚡</span>
              <span>Vagas limitadas para entregas em 5 a 10 dias.</span>
            </div>
          </div>

          {/* Right Column: Interactive Proposal & Scope Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#121216]/90 border border-white/[0.08] p-6 sm:p-8 backdrop-blur-md shadow-2xl">
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Row 1: Name and Contact */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs text-[#94a3b8] mb-2">
                        01. Seu Nome / Empresa
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.clientName}
                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                        placeholder="ex: Lucas / StartupX"
                        className="w-full px-4 py-2.5 rounded-lg bg-[#0e0e12] border border-white/10 text-white placeholder:text-white/30 text-xs font-mono focus:outline-none focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1]"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs text-[#94a3b8] mb-2">
                        02. E-mail ou WhatsApp
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        placeholder="seu@email.com ou (11) 9..."
                        className="w-full px-4 py-2.5 rounded-lg bg-[#0e0e12] border border-white/10 text-white placeholder:text-white/30 text-xs font-mono focus:outline-none focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1]"
                      />
                    </div>
                  </div>

                  {/* 03. Tipo de Projeto */}
                  <div>
                    <label className="block font-mono text-xs text-[#94a3b8] mb-2">
                      03. Tipo de Projeto
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                      {projectTypes.map((type) => (
                        <button
                          type="button"
                          key={type.label}
                          onClick={() => setFormData({ ...formData, projectType: type.label })}
                          className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg text-[11px] xl:text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                            formData.projectType === type.label
                              ? 'bg-[#06b6d4] text-black font-semibold shadow-md'
                              : 'bg-[#0e0e12] text-[#c7c4d7] border border-white/10 hover:border-white/20'
                          }`}
                        >
                          <span className="flex-shrink-0">{type.icon}</span>
                          <span className="whitespace-nowrap">{type.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 04. Orçamento Estimado */}
                  <div>
                    <label className="block font-mono text-xs text-[#94a3b8] mb-2">
                      04. Orçamento Estimado
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                      {budgetOptions.map((budget) => (
                        <button
                          type="button"
                          key={budget}
                          onClick={() => setFormData({ ...formData, budgetRange: budget })}
                          className={`py-2.5 px-2 rounded-lg text-xs font-mono transition-all cursor-pointer whitespace-nowrap text-center ${
                            formData.budgetRange === budget
                              ? 'bg-[#6366f1] text-white font-semibold shadow-md'
                              : 'bg-[#0e0e12] text-[#c7c4d7] border border-white/10 hover:border-white/20'
                          }`}
                        >
                          {budget}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 05. Resumo do Projeto */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block font-mono text-xs text-[#94a3b8]">
                        05. Conte um resumo do que você precisa construir
                      </label>
                      <span className="font-mono text-[10px] text-[#10b981]">
                        Estimativa: {getDynamicEstimate()}
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      required
                      value={formData.projectSummary}
                      onChange={(e) => setFormData({ ...formData, projectSummary: e.target.value })}
                      placeholder="Ex: Preciso de um micro-SaaS para clínicas agendarem consultas com WhatsApp e IA..."
                      className="w-full px-4 py-3 rounded-lg bg-[#0e0e12] border border-white/10 text-white placeholder:text-white/30 text-xs font-mono focus:outline-none focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1] leading-relaxed resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#6366f1] via-[#5053eb] to-[#06b6d4] hover:opacity-95 shadow-[0_0_25px_rgba(99,102,241,0.4)] transition-all cursor-pointer"
                  >
                    <span>Solicitar Proposta e Orçamento</span>
                    <span className="text-sm">🚀 ➔</span>
                  </button>

                  <p className="text-[11px] font-mono text-[#94a3b8] text-center">
                    🔒 Seus dados e ideia estão seguros sob acordo de confidencialidade (NDA tácito).
                  </p>
                </form>
              ) : (
                /* Success State with formatted brief */
                <div className="space-y-6 py-4">
                  <div className="flex items-center gap-3 text-[#10b981]">
                    <div className="w-10 h-10 rounded-full bg-[#10b981]/20 border border-[#10b981]/40 flex items-center justify-center">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-syne text-xl font-bold text-white">
                        Briefing Estruturado com Sucesso!
                      </h3>
                      <p className="text-xs font-mono text-[#10b981]">
                        Estimativa preliminar calculada: {getDynamicEstimate()}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0e0e12] border border-white/10 font-mono text-xs space-y-2 text-[#c7c4d7]">
                    <p><strong className="text-white">Cliente:</strong> {formData.clientName}</p>
                    <p><strong className="text-white">Contato:</strong> {formData.contact}</p>
                    <p><strong className="text-white">Escopo:</strong> {formData.projectType}</p>
                    <p><strong className="text-white">Faixa de Investimento:</strong> {formData.budgetRange}</p>
                    <p className="text-[#94a3b8] pt-1 border-t border-white/10 mt-2">
                      <strong className="text-white">Descrição:</strong> {formData.projectSummary}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={`https://wa.me/5511961060719?text=${getWhatsAppMessage()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold text-white bg-[#10b981] hover:bg-[#0da673] shadow-lg"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Enviar no WhatsApp Oficial</span>
                    </a>

                    <button
                      onClick={handleCopyProposal}
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-mono text-white bg-white/10 hover:bg-white/15 border border-white/10"
                    >
                      <Copy className="w-4 h-4" />
                      <span>{copied ? 'Copiado!' : 'Copiar Escopo'}</span>
                    </button>
                  </div>

                  <div className="text-center pt-2">
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs font-mono text-[#94a3b8] hover:text-white underline cursor-pointer"
                    >
                      ← Editar ou Enviar Outro Projeto
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
