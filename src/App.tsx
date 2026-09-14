import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsBar } from './components/StatsBar';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { CasesSection } from './components/CasesSection';
import { AdvantagesSection } from './components/AdvantagesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CaseDetailModal } from './components/CaseDetailModal';
import { ImageManagerModal } from './components/ImageManagerModal';
import { CASES_DATA, DEFAULT_DIRECT_IMAGES } from './data/portfolioData';
import { ProjectCase, DirectImageLinks } from './types';

export default function App() {
  // Direct image links state with local storage fallback
  const [imageLinks, setImageLinks] = useState<DirectImageLinks>(() => {
    try {
      const saved = localStorage.getItem('vibe_coding_image_links');
      if (saved) return JSON.parse(saved);
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
  const [prefilledServiceType, setPrefilledServiceType] = useState<string>('MVP / Micro-SaaS');

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

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#e5e1e4] flex flex-col selection:bg-[#6366f1]/30 selection:text-[#acedff]">
      
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
          onStartProject={() => handleScrollToContact('MVP / Micro-SaaS')}
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

      {/* Case Interactive Preview Modal */}
      <CaseDetailModal
        projectCase={activeCaseModal}
        onClose={() => setActiveCaseModal(null)}
        onSelectForProposal={(title) => handleScrollToContact(title)}
      />

      {/* Direct Image Links Manager Modal */}
      <ImageManagerModal
        isOpen={isImageManagerOpen}
        onClose={() => setIsImageManagerOpen(false)}
        currentLinks={imageLinks}
        onUpdateLinks={handleUpdateImageLinks}
      />

    </div>
  );
}
