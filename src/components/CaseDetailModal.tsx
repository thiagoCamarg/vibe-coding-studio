import React, { useState } from 'react';
import { X, Check, ExternalLink, Zap, Play, Sparkles, Layers, ArrowRight, Clock, ShieldCheck, Database, RefreshCw } from 'lucide-react';
import { ProjectCase } from '../types';

interface CaseDetailModalProps {
  projectCase: ProjectCase | null;
  onClose: () => void;
  onSelectForProposal: (title: string) => void;
}

export const CaseDetailModal: React.FC<CaseDetailModalProps> = ({
  projectCase,
  onClose,
  onSelectForProposal,
}) => {
  if (!projectCase) return null;

  // State for interactive simulation inside the modal
  // Analytics demo state
  const [analyticsRange, setAnalyticsRange] = useState<'24h' | '7d' | '30d'>('30d');
  const [analyticsMetric, setAnalyticsMetric] = useState<'mrr' | 'churn' | 'users'>('mrr');

  // TaskFlow demo state
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Integração Stripe Webhook', status: 'done', priority: 'high' },
    { id: '2', title: 'Row Level Security no Supabase', status: 'done', priority: 'high' },
    { id: '3', title: 'Painel de métricas em tempo real', status: 'in_progress', priority: 'medium' },
    { id: '4', title: 'Otimização de rotas edge na Vercel', status: 'todo', priority: 'low' },
  ]);

  // NeuroDoc demo state
  const [docPrompt, setDocPrompt] = useState('Contrato de Prestação de Serviços SaaS (42 páginas)');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedText, setStreamedText] = useState(
    '✓ 3 cláusulas críticas de rescisão identificadas com risco médio.\n✓ Índice de conformidade LGPD: 98.4%.\n✓ Resumo executivo estruturado e pronto para exportação em Notion/Slack.'
  );

  const simulateStream = () => {
    setIsStreaming(true);
    setStreamedText('');
    const full = `[PRODUÇÃO] Análise semântica iniciada com Claude 3.5 Sonnet...\n✓ Documento: "${docPrompt}" indexado no Supabase Storage.\n✓ 14 entidades contratuais extraídas com sucesso.\n✓ Tabela comparativa de obrigações gerada.\n⚡ Tempo de síntese: 1.4s via Streaming SSE.`;
    
    let i = 0;
    const interval = setInterval(() => {
      setStreamedText(full.slice(0, i));
      i += 4;
      if (i > full.length + 4) {
        clearInterval(interval);
        setIsStreaming(false);
      }
    }, 25);
  };

  const toggleTaskStatus = (id: string) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === id) {
          const next = t.status === 'done' ? 'todo' : t.status === 'todo' ? 'in_progress' : 'done';
          return { ...t, status: next };
        }
        return t;
      })
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl bg-[#121216] border border-white/15 p-6 sm:p-8 shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#94a3b8] hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pr-10">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-0.5 rounded-full text-xs font-mono bg-white/[0.05] text-[#acedff] border border-white/10">
              {projectCase.categoryLabel}
            </span>
            <span className="px-3 py-0.5 rounded-full text-xs font-mono bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              {projectCase.statusText}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono text-[#94a3b8] bg-white/[0.03]">
              Entrega: {projectCase.deliveryTimeDays}
            </span>
          </div>

          <h2 className="font-syne text-2xl sm:text-3xl font-bold text-white mb-2">
            {projectCase.title}
          </h2>
          <p className="text-sm text-[#94a3b8] font-sans leading-relaxed">
            {projectCase.description}
          </p>
        </div>

        {/* Live Interactive Simulation Sandbox */}
        <div className="mb-8 rounded-xl bg-[#0c0c0f] border border-white/10 p-5 overflow-hidden">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-white">
              <Play className="w-3.5 h-3.5 text-[#06b6d4] fill-[#06b6d4]" />
              <span className="font-semibold">Simulação Interativa do Sistema:</span>
              <span className="text-[#94a3b8]">[{projectCase.interactiveType}]</span>
            </div>
            <span className="text-[11px] font-mono text-[#10b981]">● Ambiente Funcional</span>
          </div>

          {/* Type 1: Analytics Demo */}
          {projectCase.interactiveType === 'analytics' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {(['mrr', 'churn', 'users'] as const).map(m => (
                    <button
                      key={m}
                      onClick={() => setAnalyticsMetric(m)}
                      className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                        analyticsMetric === m
                          ? 'bg-[#6366f1] text-white'
                          : 'bg-white/5 text-[#94a3b8] hover:text-white'
                      }`}
                    >
                      {m === 'mrr' ? 'MRR ($)' : m === 'churn' ? 'Taxa Churn (%)' : 'Usuários Ativos'}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 bg-[#18181f] p-1 rounded-lg border border-white/10 text-xs font-mono">
                  {(['24h', '7d', '30d'] as const).map(r => (
                    <button
                      key={r}
                      onClick={() => setAnalyticsRange(r)}
                      className={`px-2 py-0.5 rounded ${
                        analyticsRange === r ? 'bg-white/20 text-white font-bold' : 'text-[#94a3b8]'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic metric stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-[#14141a] border border-white/5">
                  <p className="text-[11px] font-mono text-[#94a3b8]">Receita Recorrente</p>
                  <p className="font-syne text-xl sm:text-2xl font-bold text-white mt-1">
                    {analyticsRange === '24h' ? '$1,640' : analyticsRange === '7d' ? '$12,450' : '$48,920'}
                  </p>
                  <span className="text-[10px] font-mono text-[#10b981]">+14.2% este mês</span>
                </div>
                <div className="p-3 rounded-lg bg-[#14141a] border border-white/5">
                  <p className="text-[11px] font-mono text-[#94a3b8]">Clientes Ativos</p>
                  <p className="font-syne text-xl sm:text-2xl font-bold text-white mt-1">
                    {analyticsRange === '24h' ? '128' : analyticsRange === '7d' ? '412' : '1,894'}
                  </p>
                  <span className="text-[10px] font-mono text-[#06b6d4]">99.8% adimplentes</span>
                </div>
                <div className="p-3 rounded-lg bg-[#14141a] border border-white/5">
                  <p className="text-[11px] font-mono text-[#94a3b8]">Churn Rate</p>
                  <p className="font-syne text-xl sm:text-2xl font-bold text-white mt-1">1.2%</p>
                  <span className="text-[10px] font-mono text-[#10b981]">Abaixo do benchmark</span>
                </div>
              </div>

              {/* Simulated visual bar chart */}
              <div className="h-28 flex items-end gap-2 pt-4 px-2">
                {[45, 62, 58, 75, 90, 82, 95, 110, 105, 130, 125, 145].map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 group/bar">
                    <div
                      className="w-full rounded-t bg-gradient-to-t from-[#6366f1]/60 to-[#06b6d4] group-hover/bar:brightness-125 transition-all"
                      style={{ height: `${val * 0.65}px` }}
                    />
                    <span className="text-[9px] font-mono text-white/30 hidden sm:inline">{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Type 2: TaskFlow Demo */}
          {projectCase.interactiveType === 'taskflow' && (
            <div className="space-y-3">
              <p className="text-xs font-mono text-[#94a3b8]">
                Clique nas tarefas para alternar status entre <span className="text-yellow-400">Pendente</span>, <span className="text-[#06b6d4]">Em Progresso</span> e <span className="text-[#10b981]">Concluído</span> (sincronização instantânea com Supabase):
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {tasks.map(t => (
                  <div
                    key={t.id}
                    onClick={() => toggleTaskStatus(t.id)}
                    className="p-3 rounded-lg bg-[#14141a] border border-white/10 hover:border-[#06b6d4]/40 flex items-center justify-between cursor-pointer transition-all"
                  >
                    <div>
                      <p className={`text-xs font-mono ${t.status === 'done' ? 'line-through text-[#94a3b8]' : 'text-white'}`}>
                        {t.title}
                      </p>
                      <span className="text-[10px] font-mono text-white/40">Prioridade {t.priority}</span>
                    </div>

                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        t.status === 'done'
                          ? 'bg-[#10b981]/20 text-[#10b981]'
                          : t.status === 'in_progress'
                          ? 'bg-[#06b6d4]/20 text-[#06b6d4]'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {t.status === 'done' ? '✓ Concluído' : t.status === 'in_progress' ? '● Fazendo' : '○ A Fazer'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Type 3: NeuroDoc Demo */}
          {projectCase.interactiveType === 'neurodoc' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  value={docPrompt}
                  onChange={e => setDocPrompt(e.target.value)}
                  placeholder="Nome do documento para sintetizar..."
                  className="flex-1 px-3 py-2 rounded-lg bg-[#14141a] border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-[#10b981]"
                />
                <button
                  onClick={simulateStream}
                  disabled={isStreaming}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-mono font-semibold text-black bg-[#10b981] hover:bg-[#059669] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isStreaming ? 'animate-spin' : ''}`} />
                  <span>{isStreaming ? 'Processando...' : 'Sintetizar com IA'}</span>
                </button>
              </div>

              <div className="p-3.5 rounded-lg bg-[#14141a] border border-white/10 font-mono text-xs text-[#acedff] whitespace-pre-wrap leading-relaxed min-h-[90px]">
                {streamedText}
              </div>
            </div>
          )}
        </div>

        {/* Highlights and Architecture grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h4 className="text-xs font-mono uppercase text-[#06b6d4] tracking-wider mb-3">
              Destaques Funcionais do Projeto
            </h4>
            <ul className="space-y-2">
              {projectCase.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-[#e5e1e4]">
                  <Check className="w-4 h-4 text-[#10b981] flex-shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase text-[#c0c1ff] tracking-wider mb-3">
              Stack Tecnológica &amp; Componentes
            </h4>
            <div className="space-y-2">
              {projectCase.techStack.map((st, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-xs font-mono">
                  <span className="text-white font-semibold">{st.name}</span>
                  <span className="text-[#94a3b8] text-[11px]">{st.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
          <div className="text-xs font-mono text-[#94a3b8] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#10b981]" />
            <span>Código 100% transferido para o seu GitHub ao final</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-xs font-mono text-[#94a3b8] hover:text-white"
            >
              Fechar
            </button>
            <button
              onClick={() => {
                const title = projectCase.title;
                onClose();
                onSelectForProposal(title);
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#6366f1] to-[#4f46e5] hover:brightness-110 shadow-[0_0_20px_rgba(99,102,241,0.5)] cursor-pointer"
            >
              <span>Quero uma Página Assim</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
