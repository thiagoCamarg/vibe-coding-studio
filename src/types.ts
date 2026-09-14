export type ProjectCategory = 'all' | 'saas' | 'ai' | 'enterprise';

export interface ProjectCase {
  id: string;
  category: 'saas' | 'ai' | 'enterprise';
  categoryLabel: string;
  badgeType: 'conversion' | 'enterprise' | 'ai';
  title: string;
  description: string;
  tags: string[];
  statusText: string;
  isProductionReady: boolean;
  imageUrl: string;
  deliveryTimeDays: string;
  clientType: string;
  highlights: string[];
  techStack: {
    name: string;
    role: string;
  }[];
  interactiveType: 'analytics' | 'taskflow' | 'neurodoc';
}

export interface ServiceItem {
  id: string;
  iconName: 'rocket' | 'bot' | 'funnel' | 'brain';
  title: string;
  description: string;
  tags: string[];
  timeline: string;
  deliverables: string[];
}

export interface ProcessStep {
  stepNumber: string;
  stageBadge: string;
  title: string;
  description: string;
  footerHighlight: string;
  iconName: 'target' | 'code' | 'shield-check' | 'rocket';
}

export interface CompetitiveAdvantage {
  id: string;
  title: string;
  description: string;
  tag: string;
  iconName: 'zap' | 'dollar' | 'shield' | 'refresh';
}

export interface PipelineScenario {
  id: string;
  label: string;
  briefing: string;
  step1: string;
  step2: string;
  deploy: string;
  techStack: string;
}

export interface ProposalFormState {
  clientName: string;
  contact: string;
  projectType: string;
  budgetRange: string;
  projectSummary: string;
}

export interface DirectImageLinks {
  heroPortrait: string;
  caseAnalytics: string;
  caseTaskFlow: string;
  caseNeuroDoc: string;
}
