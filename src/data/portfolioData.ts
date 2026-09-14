import {
  ProjectCase,
  ServiceItem,
  ProcessStep,
  CompetitiveAdvantage,
  PipelineScenario,
  DirectImageLinks,
} from '../types';

export const DEFAULT_DIRECT_IMAGES: DirectImageLinks = {
  // Portrait matching the founder (bald with dark beard and black shirt) seamlessly integrated
  heroPortrait: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1000&q=85',
  // SaaS Analytics Pro dashboard interface
  caseAnalytics: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  // TaskFlow AI interface
  caseTaskFlow: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  // NeuroDoc interface
  caseNeuroDoc: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'mvps',
    iconName: 'rocket',
    title: 'MVPs & Micro-SaaS Rápidos',
    description: 'Validação de produtos digitais completos com login, banco de dados, dashboard e cobrança Stripe em tempo recorde.',
    tags: ['Next.js 15', 'Stripe Billing', 'Supabase DB', 'Auth Pronto'],
    timeline: '5 a 8 dias úteis',
    deliverables: [
      'Autenticação multi-provedor (Google, Magic Link, GitHub)',
      'Integração Stripe Checkout & Assinaturas recorrentes',
      'Banco de dados PostgreSQL/Supabase com Row Level Security',
      'Dashboard com métricas e painel administrativo',
    ],
  },
  {
    id: 'internal-tools',
    iconName: 'bot',
    title: 'Ferramentas Internas & IA',
    description: 'Dashboards executivos, painéis operacionais customizados e agentes para automatizar tarefas repetitivas da equipe.',
    tags: ['Painéis Custom', 'Agentes IA', 'Webhooks', 'Automação'],
    timeline: '4 a 7 dias úteis',
    deliverables: [
      'Workflows automatizados com Webhooks e APIs externas',
      'Assistentes autônomos para classificação de dados e atendimento',
      'Controle de níveis de acesso (RBAC) para equipes',
      'Painéis de visualização em tempo real de KPIs de negócio',
    ],
  },
  {
    id: 'landing-pages',
    iconName: 'funnel',
    title: 'Landing Pages de Conversão',
    description: 'Páginas magnéticas, ultra rápidas e calibradas para transformar tráfego em cadastros qualificados e compradores.',
    tags: ['Alta Conversão', 'Tailwind CSS', 'SEO Técnico', 'Mobile-First'],
    timeline: '2 a 4 dias úteis',
    deliverables: [
      'Copywriting estruturado para venda com gatilhos mentais',
      'Performance 95+ no Google PageSpeed Insights',
      'Rastreamento completo (Pixel Meta, GA4, GTM, Clarity)',
      'Formulários interativos conectados ao seu WhatsApp e CRM',
    ],
  },
  {
    id: 'llm-integrations',
    iconName: 'brain',
    title: 'Integrações com LLMs',
    description: 'Incorpore agentes de chat, síntese em streaming, embeddings e visão computacional nos seus fluxos de negócio.',
    tags: ['OpenAI & Claude', 'Streaming', 'Vector DB', 'RAG Básico'],
    timeline: '5 a 10 dias úteis',
    deliverables: [
      'Arquitetura RAG para busca semântica em base de documentos',
      'Respostas em streaming com latência reduzida via SSE',
      'Modelos híbridos (Gemini 2.5, GPT-4o, Claude 3.5 Sonnet)',
      'Guardrails de segurança e sanitização de prompts',
    ],
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: '01',
    stageBadge: 'ALINHAMENTO',
    title: 'Briefing & Escopo Enxuto',
    description: 'Definição clara do problema central, requisitos funcionais essenciais e o fluxo exato que gera valor e faturamento para o seu usuário.',
    footerHighlight: 'Escopo definido em 24h',
    iconName: 'target',
  },
  {
    stepNumber: '02',
    stageBadge: 'CONSTRUÇÃO',
    title: 'Arquitetura & Vibe Coding',
    description: 'Desenvolvimento acelerado com modelos de IA e código moderno, montando banco de dados, rotas de API e componentes reutilizáveis.',
    footerHighlight: 'Código limpo & componentizado',
    iconName: 'code',
  },
  {
    stepNumber: '03',
    stageBadge: 'VALIDAÇÃO',
    title: 'Refinamento & Testes Reais',
    description: 'Polimento de experiência, design responsivo, integração de pagamentos e garantia de que tudo funciona sem atritos.',
    footerHighlight: 'Teste de ponta a ponta',
    iconName: 'shield-check',
  },
  {
    stepNumber: '04',
    stageBadge: 'LANÇAMENTO',
    title: 'Deploy & Entrega Total',
    description: 'Publicação na nuvem em produção, transferência de repositório, chaves de API e documentação rápida para você faturar.',
    footerHighlight: 'Repositório 100% sob seu domínio',
    iconName: 'rocket',
  },
];

export const CASES_DATA: ProjectCase[] = [
  {
    id: 'saas-analytics-pro',
    category: 'saas',
    categoryLabel: 'SaaS de Alta Conversão',
    badgeType: 'conversion',
    title: 'SaaS Analytics Pro — Métricas & Retenção em Tempo Real',
    description: 'Plataforma B2B para monitoramento de métricas financeiras, churn e retenção em tempo real com autenticação empresarial e faturamento Stripe integrado.',
    tags: ['Next.js 15', 'Stripe Billing', 'Real-time Telemetry', 'Vercel Edge'],
    statusText: 'Em Produção com Clientes Pagantes',
    isProductionReady: true,
    imageUrl: DEFAULT_DIRECT_IMAGES.caseAnalytics,
    deliveryTimeDays: '7 dias',
    clientType: 'Fintech B2B / SaaS',
    highlights: [
      'Dashboard com MRR, ARR, LTV e Churn Rate calculados em tempo real',
      'Webhooks Stripe com fallback automático e reconciliação financeira',
      'Suporte a múltiplos planos e faturamento por uso',
      'Exportação para CSV/JSON e relatórios executivos instantâneos',
    ],
    techStack: [
      { name: 'Next.js 15 App Router', role: 'Frontend & API Serverless' },
      { name: 'Stripe API & Webhooks', role: 'Gestão de Assinaturas' },
      { name: 'Supabase PostgreSQL', role: 'Banco de Dados com RLS' },
      { name: 'Tailwind CSS & Recharts', role: 'Interface de Alta Densidade' },
    ],
    interactiveType: 'analytics',
  },
  {
    id: 'taskflow-ai',
    category: 'enterprise',
    categoryLabel: 'Enterprise MVP',
    badgeType: 'enterprise',
    title: 'TaskFlow AI & Supabase — Produtividade Empresarial',
    description: 'Solução corporativa com controle de permissões por nível (RBAC), sincronização instantânea de bancos e automações inteligentes para equipes ágeis.',
    tags: ['Supabase DB', 'React 19', 'Row-Level Security'],
    statusText: 'Pronto para Produção',
    isProductionReady: true,
    imageUrl: DEFAULT_DIRECT_IMAGES.caseTaskFlow,
    deliveryTimeDays: '6 dias',
    clientType: 'Agência & Equipes Ágeis',
    highlights: [
      'Quadro Kanban com priorização assistida por IA generativa',
      'Controle rigoroso de permissões (Administrador, Gerente, Operador)',
      'Histórico de auditoria e logs em tempo real',
      'Notificações instantâneas via WebSocket / Supabase Realtime',
    ],
    techStack: [
      { name: 'React 19 & TypeScript', role: 'Client SPA Reativo' },
      { name: 'Supabase Realtime', role: 'Sincronização instantânea' },
      { name: 'Row-Level Security (RLS)', role: 'Segurança por tenant' },
      { name: 'Tailwind CSS & Motion', role: 'Transições suaves de layout' },
    ],
    interactiveType: 'taskflow',
  },
  {
    id: 'neurodoc-ai',
    category: 'ai',
    categoryLabel: 'Inteligência Artificial Aplicada',
    badgeType: 'ai',
    title: 'NeuroDoc — Plataforma de Síntese e Análise de Documentos com LLMs',
    description: 'Micro-SaaS B2B para processamento automatizado de relatórios, síntese em streaming com modelos Claude/GPT e exportação estruturada direta para CRM e Notion.',
    tags: ['Streaming AI API', 'Next.js 15 App Router', 'Supabase Storage', 'OAuth & Enterprise'],
    statusText: 'Pronto para Produção',
    isProductionReady: true,
    imageUrl: DEFAULT_DIRECT_IMAGES.caseNeuroDoc,
    deliveryTimeDays: '8 dias',
    clientType: 'Consultorias & Escritórios de Advocacia',
    highlights: [
      'Upload e indexação semântica de PDFs de até 200 páginas',
      'Geração de relatórios executivos com citações das páginas originais',
      'Conexão direta com Notion, Google Drive e Slack via Webhooks',
      'Streaming de respostas com latência inferior a 400ms',
    ],
    techStack: [
      { name: 'OpenAI / Claude 3.5 API', role: 'Processamento de Linguagem Natural' },
      { name: 'Vector Embeddings', role: 'Busca Semântica no Texto' },
      { name: 'Next.js Server Actions', role: 'Streaming e Pipelines Server-side' },
      { name: 'Supabase Storage', role: 'Armazenamento de Arquivos Criptografado' },
    ],
    interactiveType: 'neurodoc',
  },
];

export const ADVANTAGES_DATA: CompetitiveAdvantage[] = [
  {
    id: 'speed',
    title: 'Velocidade Imbatível',
    description: 'Saia da ideia para o mercado em dias, não trimestres. Chegue primeiro que seus concorrentes e valide sua tese com clientes reais.',
    tag: 'PRIMEIRO NO MERCADO',
    iconName: 'zap',
  },
  {
    id: 'economy',
    title: 'Economia Real',
    description: 'Pague pelo resultado entregue e funcional. Sem squads infladas, horas faturadas sem avanço ou taxas burocráticas de agências.',
    tag: 'RETORNO SOBRE INVESTIMENTO',
    iconName: 'dollar',
  },
  {
    id: 'ownership',
    title: 'Propriedade Total',
    description: 'Código 100% limpo, estruturado em Next.js e TypeScript. O repositório GitHub, bancos de dados e hospedagem são de sua propriedade.',
    tag: 'ZERO LOCK-IN OU AMARRAS',
    iconName: 'shield',
  },
  {
    id: 'flexibility',
    title: 'Flexibilidade Máxima',
    description: 'Novas features, testes A/B e refinamentos baseados no feedback dos usuários são implementados em poucas horas.',
    tag: 'ITERAÇÕES ULTRA VELOZES',
    iconName: 'refresh',
  },
];

export const PIPELINE_SCENARIOS: PipelineScenario[] = [
  {
    id: 'saas',
    label: 'SaaS + Stripe + IA',
    briefing: 'SaaS com pagamentos Stripe + IA generativa',
    step1: 'Arquitetura escalável & Banco Supabase configurado (4h)',
    step2: 'Interface de alta conversão + Auth + Checkout integrados (24h)',
    deploy: 'Deploy em produção na Vercel: pronto para faturar!',
    techStack: 'Next.js 15 • Supabase • Stripe • Tailwind',
  },
  {
    id: 'automation',
    label: 'Agente IA + WhatsApp',
    briefing: 'Agente de atendimento e agendamento 24/7 com IA no WhatsApp',
    step1: 'Fluxo conversacional & RAG estruturado com base de conhecimento (6h)',
    step2: 'Integração de Webhooks da API do WhatsApp & CRM (18h)',
    deploy: 'Bot ativo em produção: atendendo leads automaticamente!',
    techStack: 'Node.js • LangChain • Claude 3.5 • PostgreSQL',
  },
  {
    id: 'portal',
    label: 'Portal Interno B2B',
    briefing: 'Painel operacional com permissões RBAC e relatórios ao vivo',
    step1: 'Modelagem de dados relacionais e segurança Row-Level Security (5h)',
    step2: 'Interface densa com filtros, gráficos e exportação automática (20h)',
    deploy: 'Painel corporativo entregue: equipe 100% alinhada!',
    techStack: 'React 19 • Supabase RLS • Tailwind • Recharts',
  },
];
