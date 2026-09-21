import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsBar } from './components/StatsBar';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { CasesSection } from './components/CasesSection';
import { AdvantagesSection } from './components/AdvantagesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CASES_DATA, DEFAULT_DIRECT_IMAGES } from './data/portfolioData';
import { ProjectCase, DirectImageLinks } from './types';

// Code-splitting non-critical modals for optimal Core Web Vitals & PageSpeed
const CaseDetailModal = lazy(() => 
  import('./components/CaseDetailModal').then(module => ({ default: module.CaseDetailModal }))
);
const ImageManagerModal = lazy(() => 
  import('./components/ImageManagerModal').then(module => ({ default: module.ImageManagerModal }))
);

export default function App() {
  // Direct image links state with local storage fallback
  const [imageLinks, setImageLinks] = useState<DirectImageLinks>(() => {
    try {
      const saved = localStorage.getItem('vibe_coding_image_links');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.heroPortrait || parsed.heroPortrait.includes('unsplash.com') || parsed.heroPortrait.includes('hero-portrait.jpg')) {
          parsed.heroPortrait = DEFAULT_DIRECT_IMAGES.heroPortrait;
        }
        if (!parsed.caseAnalytics || parsed.caseAnalytics.includes('unsplash.com') || parsed.caseAnalytics.includes('460925895917')) {
          parsed.caseAnalytics = DEFAULT_DIRECT_IMAGES.caseAnalytics;
        }
        if (!parsed.caseTaskFlow || parsed.caseTaskFlow.includes('unsplash.com') || parsed.caseTaskFlow.includes('551288049')) {
          parsed.caseTaskFlow = DEFAULT_DIRECT_IMAGES.caseTaskFlow;
        }
        if (!parsed.caseNeuroDoc || parsed.caseNeuroDoc.includes('unsplash.com') || parsed.caseNeuroDoc.includes('497366216548')) {
          parsed.caseNeuroDoc = DEFAULT_DIRECT_IMAGES.caseNeuroDoc;
        }
        return { ...DEFAULT_DIRECT_IMAGES, ...parsed };
      }
    } catch {
      // ignore
    }
    return DEFAULT_DIRECT_IMAGES;
  });

  // Active case for detail / interactive simulation modal
  const [activeCaseModal, setActiveCaseModal] = useState<ProjectCase | null>(null);

  // Modal for direct image links management
  const [isImageManagerOpen, setIsImageManagerOpen] = useState(false);

  // Selected project type for contact proposal form
  const [prefilledServiceType, setPrefilledServiceType] = useState<string>('Página de Vendas');

  const handleUpdateImageLinks = (newLinks: DirectImageLinks) => {
    setImageLinks(newLinks);
    try {
      localStorage.setItem('vibe_coding_image_links', JSON.stringify(newLinks));
    } catch {
      // ignore
    }
  };

  const handleScrollToContact = (serviceTitle?: string) => {
    if (serviceTitle) {
      setPrefilledServiceType(serviceTitle);
    }
    const el = document.getElementById('contato');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToServices = () => {
    const el = document.getElementById('servicos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Floating WhatsApp button visibility
  const [showFloatingWhatsApp, setShowFloatingWhatsApp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingWhatsApp(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] flex flex-col selection:bg-white/20 selection:text-white">
      
      {/* Sticky Global Navigation */}
      <Navbar
        onOpenImageManager={() => setIsImageManagerOpen(true)}
        onOpenProposal={() => handleScrollToContact()}
      />

      {/* Main Single Page Content */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <Hero
          portraitUrl={imageLinks.heroPortrait}
          onOpenImageManager={() => setIsImageManagerOpen(true)}
          onStartProject={(niche) => handleScrollToContact(niche || 'Página de Vendas')}
          onViewServices={handleScrollToServices}
          onPhotoUploaded={(newPhoto) => {
            setImageLinks((prev) => ({ ...prev, heroPortrait: newPhoto }));
          }}
        />

        {/* Cohesive Metrics Status Rail */}
        <StatsBar />

        {/* Section 01: Serviços & Entregas */}
        <ServicesSection
          onSelectServiceForProposal={(title) => handleScrollToContact(title)}
        />

        {/* Section 02: Processo de Entrega Ágil */}
        <ProcessSection />

        {/* Section 03: Casos de Uso & Soluções Entregues */}
        <CasesSection
          cases={CASES_DATA}
          imageUrls={{
            caseAnalytics: imageLinks.caseAnalytics,
            caseTaskFlow: imageLinks.caseTaskFlow,
            caseNeuroDoc: imageLinks.caseNeuroDoc,
          }}
          onOpenCaseModal={(c) => setActiveCaseModal(c)}
          onSelectCaseForProposal={(title) => handleScrollToContact(title)}
          onOpenImageManager={() => setIsImageManagerOpen(true)}
        />

        {/* Section 04: Vantagem Competitiva */}
        <AdvantagesSection />

        {/* Section 05: Iniciar Projeto & Calculadora de Orçamento */}
        <ContactSection initialProjectType={prefilledServiceType} />

      </main>

      {/* Global Terminal-style Footer */}
      <Footer onOpenProposal={() => handleScrollToContact()} />

      {/* Floating High-Conversion WhatsApp Quick Trigger */}
      {showFloatingWhatsApp && (
        <aside
          aria-label="Atendimento Rápido"
          className="fixed bottom-6 right-6 z-40 flex items-center animate-fade-in"
        >
          <a
            href="https://wa.me/5511961060719?text=Ol%C3%A1%2C%20Thiago!%20Vi%20seu%20site%20e%20gostaria%20de%20um%20or%C3%A7amento%20para%20uma%20landing%20page."
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#10b981] hover:bg-[#0da673] text-white shadow-[0_4px_25px_rgba(16,185,129,0.45)] hover:shadow-[0_4px_35px_rgba(16,185,129,0.65)] transition-all hover:scale-105 cursor-pointer font-sans"
            title="Falar no WhatsApp com Thiago"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
            </span>
            <span className="text-xs font-bold font-mono tracking-wide">
              WhatsApp Direto
            </span>
          </a>
        </aside>
      )}

      {/* Case Mockup Lightbox Modal (Lazy Loaded) */}
      {activeCaseModal && (
        <Suspense fallback={null}>
          <CaseDetailModal
            projectCase={activeCaseModal}
            onClose={() => setActiveCaseModal(null)}
          />
        </Suspense>
      )}

      {/* Direct Image Links Manager Modal (Lazy Loaded) */}
      {isImageManagerOpen && (
        <Suspense fallback={null}>
          <ImageManagerModal
            isOpen={isImageManagerOpen}
            onClose={() => setIsImageManagerOpen(false)}
            currentLinks={imageLinks}
            onUpdateLinks={handleUpdateImageLinks}
          />
        </Suspense>
      )}

    </div>
  );
}
