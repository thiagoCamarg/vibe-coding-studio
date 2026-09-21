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
    projectType: initialProjectType || 'Página de Vendas',
    budgetRange: 'R$ 1.5k - 3k',
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
    { label: 'Página de Vendas', index: '01' },
    { label: 'Captura de Leads', index: '02' },
    { label: 'Site Institucional', index: '03' },
    { label: 'Otimização & SEO', index: '04' },
  ];

  const budgetOptions = ['R$ 800 - 1.5k', 'R$ 1.5k - 3k', 'R$ 3k - 5k', 'A definir'];

  // Calculate dynamic delivery estimate based on inputs
  const getDynamicEstimate = () => {
    if (formData.projectType.includes('Vendas')) return '5 a 7 dias úteis';
    if (formData.projectType.includes('Captura')) return '3 a 5 dias úteis';
    if (formData.projectType.includes('Institucional')) return '7 a 10 dias úteis';
    if (formData.projectType.includes('Otimização')) return '4 a 6 dias úteis';
    return '5 a 8 dias úteis';
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
*Resumo do Escopo:* ${formData.projectSummary || 'Quero discutir com o desenvolvedor'}`;
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
              <div className="font-mono text-xs text-text-muted tracking-widest uppercase mb-2">
                05 / INICIAR PROJETO
              </div>
              <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
                Sua Página Pronta com Agilidade
              </h2>
              <p className="text-sm text-text-muted leading-relaxed mb-8 font-sans">
                Compartilhe sua ideia ou necessidade. Em até 24 horas você recebe uma resposta direta com escopo técnico, sugestões visuais e estimativa de investimento.
              </p>

              {/* Direct channels cards */}
              <div className="space-y-3.5 mb-8">
                
                {/* WhatsApp Direto */}
                <a
                  href="https://wa.me/5511961060719"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#111115] hover:bg-[#18181e] border border-white/[0.08] hover:border-white/20 transition-all group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-4 h-4 text-[#10b981]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-xs font-semibold text-white tracking-wide uppercase">
                      WhatsApp Direto
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-white group-hover:translate-x-1 transition-all" />
                </a>

                {/* Calendly Call */}
                <a
                  href="https://calendly.com/thiagocamargodev/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#111115] hover:bg-[#18181e] border border-white/[0.08] hover:border-white/20 transition-all group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Calendar className="w-4 h-4 text-white/80" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-xs font-semibold text-white tracking-wide uppercase">
                      Reunião de Alinhamento (30 min)
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-white group-hover:translate-x-1 transition-all" />
                </a>

                {/* E-mail */}
                <a
                  href="mailto:thiagocamargo.dev@outlook.com"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#111115] hover:bg-[#18181e] border border-white/[0.08] hover:border-white/20 transition-all group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4 text-white/80" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-xs font-semibold text-white tracking-wide uppercase">
                      E-mail Profissional
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-white group-hover:translate-x-1 transition-all" />
                </a>

              </div>
            </div>

            {/* Availability Note */}
            <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
              <span>Atendimento direto com o desenvolvedor, sem intermediários.</span>
            </div>
          </div>

          {/* Right Column: Interactive Proposal & Scope Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#111115] border border-white/[0.08] p-6 sm:p-8 backdrop-blur-md shadow-2xl">
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Row 1: Name and Contact */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs text-text-muted mb-2">
                        01. Seu Nome / Empresa
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.clientName}
                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                        placeholder="ex: Lucas / Studio Saúde"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0c0c0f] border border-white/10 text-white placeholder:text-white/20 text-xs font-mono focus:outline-none focus:border-white/40 focus:ring-0 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs text-text-muted mb-2">
                        02. E-mail ou WhatsApp
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        placeholder="seu@email.com ou (11) 9..."
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0c0c0f] border border-white/10 text-white placeholder:text-white/20 text-xs font-mono focus:outline-none focus:border-white/40 focus:ring-0 transition-colors"
                      />
                    </div>
                  </div>

                  {/* 03. Tipo de Projeto */}
                  <div>
                    <label className="block font-mono text-xs text-text-muted mb-2">
                      03. Tipo de Projeto
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {projectTypes.map((type) => (
                        <button
                          type="button"
                          key={type.label}
                          onClick={() => setFormData({ ...formData, projectType: type.label })}
                          className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-mono transition-all cursor-pointer text-center border ${
                            formData.projectType === type.label
                              ? 'bg-white text-black font-semibold border-white shadow-sm'
                              : 'bg-[#0c0c0f] text-text-muted border-white/10 hover:border-white/20 hover:text-white'
                          }`}
                        >
                          <span className="text-[10px] opacity-60">{type.index}.</span>
                          <span className="truncate">{type.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 04. Orçamento Estimado */}
                  <div>
                    <label className="block font-mono text-xs text-text-muted mb-2">
                      04. Faixa de Investimento Estimada
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {budgetOptions.map((budget) => (
                        <button
                          type="button"
                          key={budget}
                          onClick={() => setFormData({ ...formData, budgetRange: budget })}
                          className={`py-2.5 px-2 rounded-xl text-xs font-mono transition-all cursor-pointer text-center border ${
                            formData.budgetRange === budget
                              ? 'bg-white text-black font-semibold border-white shadow-sm'
                              : 'bg-[#0c0c0f] text-text-muted border-white/10 hover:border-white/20 hover:text-white'
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
                      <label className="block font-mono text-xs text-text-muted">
                        05. Resumo do que você precisa
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
                      placeholder="Ex: Preciso de uma landing page para minha clínica de estética, com agendamento direto pelo WhatsApp e seções dos procedimentos..."
                      className="w-full px-4 py-3 rounded-xl bg-[#0c0c0f] border border-white/10 text-white placeholder:text-white/20 text-xs font-mono focus:outline-none focus:border-white/40 focus:ring-0 leading-relaxed resize-none transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-xs uppercase font-mono tracking-wider font-semibold text-black bg-white hover:bg-neutral-200 shadow-sm transition-all cursor-pointer hover:scale-[1.01]"
                  >
                    <span>Solicitar Orçamento &amp; Proposta</span>
                    <span className="text-sm">→</span>
                  </button>

                  <p className="text-[11px] font-mono text-text-muted text-center">
                    Seus dados de contato serão utilizados exclusivamente para o envio do orçamento.
                  </p>
                </form>
              ) : (
                /* Success State with formatted brief */
                <div className="space-y-6 py-4">
                  <div className="flex items-center gap-3 text-[#10b981]">
                    <div className="w-10 h-10 rounded-full bg-[#10b981]/15 border border-[#10b981]/30 flex items-center justify-center">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-syne text-xl font-bold text-white">
                        Briefing Estruturado com Sucesso
                      </h3>
                      <p className="text-xs font-mono text-[#10b981]">
                        Estimativa preliminar: {getDynamicEstimate()}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0c0c0f] border border-white/10 font-mono text-xs space-y-2 text-text-secondary">
                    <p><strong className="text-white">Cliente:</strong> {formData.clientName}</p>
                    <p><strong className="text-white">Contato:</strong> {formData.contact}</p>
                    <p><strong className="text-white">Escopo:</strong> {formData.projectType}</p>
                    <p><strong className="text-white">Faixa de Investimento:</strong> {formData.budgetRange}</p>
                    <p className="text-text-muted pt-1 border-t border-white/10 mt-2">
                      <strong className="text-white">Descrição:</strong> {formData.projectSummary}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={`https://wa.me/5511961060719?text=${getWhatsAppMessage()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold text-white bg-[#10b981] hover:bg-[#0da673] shadow-md transition-all cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Enviar no WhatsApp</span>
                    </a>

                    <button
                      onClick={handleCopyProposal}
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-mono text-white bg-white/10 hover:bg-white/15 border border-white/10 cursor-pointer"
                    >
                      <Copy className="w-4 h-4" />
                      <span>{copied ? 'Copiado!' : 'Copiar Escopo'}</span>
                    </button>
                  </div>

                  <div className="text-center pt-2">
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs font-mono text-text-muted hover:text-white underline cursor-pointer"
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
