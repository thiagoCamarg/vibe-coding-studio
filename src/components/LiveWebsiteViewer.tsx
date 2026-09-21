import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Check, 
  Calendar, 
  Phone, 
  ShieldCheck, 
  Star, 
  ArrowRight, 
  MapPin, 
  Clock, 
  Award, 
  Sparkles, 
  Building, 
  ChevronRight,
  ExternalLink,
  ThumbsUp,
  SlidersHorizontal,
  Home,
  Briefcase,
  FileText,
  User,
  Mail,
  FileCheck2,
  PhoneCall
} from 'lucide-react';
import { ProjectCase } from '../types';

interface LiveWebsiteViewerProps {
  projectCase: ProjectCase;
  isMobileView?: boolean;
}

export const LiveWebsiteViewer: React.FC<LiveWebsiteViewerProps> = ({
  projectCase,
  isMobileView = false,
}) => {
  // Odonto state
  const [odontoConsultationSent, setOdontoConsultationSent] = useState(false);
  const [odontoSelectedService, setOdontoSelectedService] = useState('Smile Makeover');

  // Advocacia state
  const [advName, setAdvName] = useState('');
  const [advEmail, setAdvEmail] = useState('');
  const [advSubject, setAdvSubject] = useState('Direito Tributário');
  const [advMessage, setAdvMessage] = useState('');
  const [advSent, setAdvSent] = useState(false);

  // Imóveis state
  const [imovelViewingSent, setImovelViewingSent] = useState(false);
  const [selectedPlanTab, setSelectedPlanTab] = useState<'ground' | 'first'>('ground');

  // ==========================================
  // 1. CLÍNICA ODONTO & ESTÉTICA (AESTHETICA)
  // ==========================================
  if (projectCase.id === 'curso-online-sales') {
    return (
      <div className={`bg-white text-[#1a1a1a] font-sans ${isMobileView ? 'text-xs' : 'text-sm'}`}>
        
        {/* Top Navbar matching mockup */}
        <header className="px-4 sm:px-8 py-3.5 bg-white border-b border-gray-100 sticky top-0 z-30 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <div>
              <span className="font-serif font-bold text-base sm:text-lg tracking-wider text-[#1e293b] block">
                AESTHETICA
              </span>
              <span className="text-[8px] uppercase tracking-widest text-[#b4975a] block font-medium">
                Modern Dental &amp; Aesthetics
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-5 text-xs text-[#475569] font-medium">
            <span className="text-[#b4975a] border-b border-[#b4975a] pb-0.5 cursor-pointer">Home</span>
            <span className="hover:text-black cursor-pointer">Services</span>
            <span className="hover:text-black cursor-pointer">Aesthetics</span>
            <span className="hover:text-black cursor-pointer">Implants</span>
            <span className="hover:text-black cursor-pointer">Orthodontics</span>
            <span className="hover:text-black cursor-pointer">Smile Makeover</span>
            <span className="hover:text-black cursor-pointer">Gallery</span>
            <span className="hover:text-black cursor-pointer">About</span>
            <span className="hover:text-black cursor-pointer">Contact</span>
          </nav>

          <a
            href="#consultation"
            className="px-4 py-2 rounded bg-[#1e293b] hover:bg-[#0f172a] text-white font-serif font-semibold text-xs tracking-wider transition-all cursor-pointer shadow-sm"
          >
            BOOK NOW
          </a>
        </header>

        {/* Hero Section matching mockup exactly: Smile photo on left, title on right */}
        <section className="bg-[#faf9f6] px-4 sm:px-8 py-8 sm:py-12 border-b border-gray-100">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Smile Portrait matching mockup */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white max-w-[340px] w-full aspect-4/3 sm:aspect-square bg-gray-100">
                <img
                  src="/odonto-smile.jpg"
                  alt="Smile Makeover Patient"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {/* Right Column: High-End Dental Aesthetics */}
            <div className="md:col-span-7 space-y-4">
              <div className="inline-block text-[11px] uppercase tracking-widest font-serif font-semibold text-[#b4975a]">
                ELEVATE YOUR SMILE |
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#1e293b] leading-tight tracking-tight">
                High-End Dental Aesthetics &amp; Smile Makeovers
              </h1>

              <p className="text-xs sm:text-sm text-[#64748b] font-sans leading-relaxed max-w-lg">
                Transforming Smiles, Enhancing Confidence in São Paulo &amp; London. Lentes de contato em porcelana, implantes guiados e harmonização orofacial com tecnologia 3D.
              </p>

              <div className="pt-2">
                <a
                  href="#consultation"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#1e293b] hover:bg-[#0f172a] text-[#b4975a] border border-[#b4975a]/30 font-serif font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  <span>BOOK YOUR CONSULTATION</span>
                  <ArrowRight className="w-4 h-4 text-[#b4975a]" />
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* 3 Featured Boxes matching mockup layout: Smile Makeover | Dental Implants | Before & After */}
        <section className="px-4 sm:px-8 py-8 bg-white">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5">
            
            {/* Box 1: Smile Makeover */}
            <div className="p-4 rounded-xl bg-[#faf9f6] border border-gray-200 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <h3 className="font-serif font-bold text-sm tracking-wider text-[#1e293b] mb-1">
                  SMILE MAKEOVER
                </h3>
                <p className="text-[11px] text-[#64748b] mb-3 leading-snug">
                  Eleve o potencial do seu sorriso com lentes de contato ultrafinas em cerâmica pura.
                </p>
                <div className="rounded-lg overflow-hidden h-28 bg-gray-200 mb-3">
                  <img
                    src="/odonto-smile.jpg"
                    alt="Smile Makeover"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <a href="#consultation" className="text-[11px] font-serif font-bold text-[#b4975a] hover:underline flex items-center gap-1">
                <span>READ MORE</span>
                <span>→</span>
              </a>
            </div>

            {/* Box 2: Dental Implants */}
            <div className="p-4 rounded-xl bg-[#faf9f6] border border-gray-200 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <h3 className="font-serif font-bold text-sm tracking-wider text-[#1e293b] mb-1">
                  DENTAL IMPLANTS
                </h3>
                <p className="text-[11px] text-[#64748b] mb-3 leading-snug">
                  Implantes unitários e protocolos completos sem dor com cirurgia guiada por computador.
                </p>
                <div className="rounded-lg overflow-hidden h-28 bg-[#1e293b] flex items-center justify-center p-3 text-center mb-3">
                  <div className="text-white">
                    <span className="text-2xl block mb-1">🦷</span>
                    <span className="text-[10px] font-mono text-[#b4975a]">3D Guided Implantology</span>
                  </div>
                </div>
              </div>
              <a href="#consultation" className="text-[11px] font-serif font-bold text-[#b4975a] hover:underline flex items-center gap-1">
                <span>READ MORE</span>
                <span>→</span>
              </a>
            </div>

            {/* Box 3: Before & After Showcase (Dark Navy box matching mockup) */}
            <div className="p-4 rounded-xl bg-[#0f172a] text-white flex flex-col justify-between shadow-lg">
              <div>
                <div className="text-center mb-2">
                  <h3 className="font-serif font-bold text-xs sm:text-sm tracking-widest text-[#b4975a]">
                    BEFORE &amp; AFTER SHOWCASE
                  </h3>
                  <p className="text-[9px] uppercase tracking-wider text-gray-400">
                    REAL RESULTS, RADIANT SMILES
                  </p>
                </div>

                <div className="rounded-lg overflow-hidden border border-white/20 h-28 bg-black/40 mb-2">
                  <img
                    src="/odonto-before-after.jpg"
                    alt="Before and After Cosmetic Smile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <a
                href="#consultation"
                className="w-full py-2 text-center rounded bg-[#b4975a] hover:bg-[#a3864b] text-black font-serif font-bold text-[11px] tracking-wider transition-all"
              >
                AGENDAR AVALIAÇÃO
              </a>
            </div>

          </div>
        </section>

        {/* Interactive Direct WhatsApp Consultation Booking */}
        <section id="consultation" className="px-4 sm:px-8 py-8 bg-[#faf9f6] border-t border-gray-200">
          <div className="max-w-3xl mx-auto rounded-2xl bg-white border border-gray-200 p-6 shadow-md">
            <div className="text-center mb-5">
              <span className="text-[10px] font-serif uppercase tracking-widest text-[#b4975a] block mb-1">
                // AGENDAMENTO ONLINE &amp; WHATSAPP
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1e293b]">
                Agende Sua Consulta com a Equipe Aesthetica
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Selecione o Tratamento:</label>
                <select
                  value={odontoSelectedService}
                  onChange={(e) => setOdontoSelectedService(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-gray-300 text-xs focus:outline-none focus:border-[#b4975a] bg-white"
                >
                  <option value="Smile Makeover (Lentes em Porcelana)">Smile Makeover (Lentes em Porcelana)</option>
                  <option value="Implantes Dentários Guiados">Implantes Dentários Guiados</option>
                  <option value="Harmonização Orofacial">Harmonização Orofacial</option>
                  <option value="Clareamento a Laser Premium">Clareamento a Laser Premium</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Canal de Contato Preferido:</label>
                <div className="flex gap-2">
                  <span className="flex-1 py-2 px-3 rounded border border-[#10b981] bg-[#10b981]/10 text-xs font-semibold text-[#065f46] text-center flex items-center justify-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-[#10b981]" />
                    <span>WhatsApp Direto</span>
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOdontoConsultationSent(true)}
              className="w-full py-3 rounded bg-[#1e293b] hover:bg-[#0f172a] text-[#b4975a] font-serif font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4 text-[#b4975a]" />
              <span>CONFIRMAR AGENDAMENTO NO WHATSAPP</span>
            </button>

            {odontoConsultationSent && (
              <div className="mt-3 p-3 rounded bg-[#10b981]/15 border border-[#10b981]/40 text-xs text-[#065f46] flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 text-[#10b981] shrink-0" />
                <span>Solicitação de consulta para {odontoSelectedService} enviada com sucesso para a recepção!</span>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 sm:px-8 py-5 bg-[#1e293b] text-gray-300 text-center text-xs font-serif">
          <p>© 2026 AESTHETICA Dental &amp; Aesthetics • Todos os direitos reservados</p>
        </footer>
      </div>
    );
  }

  // ==========================================
  // 2. ADVOCACIA EMPRESARIAL & TRIBUTÁRIA
  // ==========================================
  if (projectCase.id === 'saas-waitlist') {
    return (
      <div className={`bg-[#0b1329] text-white font-sans ${isMobileView ? 'text-xs' : 'text-sm'}`}>
        
        {/* Dark Navy Header matching mockup */}
        <header className="px-4 sm:px-8 py-3 bg-[#0a1124] border-b border-white/10 sticky top-0 z-30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-[#b4975a]/20 border border-[#b4975a] flex items-center justify-center font-serif font-bold text-sm text-[#b4975a]">
              S
            </div>
            <div>
              <span className="font-serif font-bold text-sm sm:text-base tracking-wider text-[#b4975a] block">
                SILVA &amp; ASSOCIADOS
              </span>
              <span className="text-[8px] uppercase tracking-widest text-gray-400 block font-mono">
                Advocacia Empresarial &amp; Tributária
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs text-gray-300 font-medium">
            <span className="text-[#b4975a] hover:underline cursor-pointer">HOME</span>
            <span className="hover:text-white cursor-pointer">ÁREAS DE ATUAÇÃO</span>
            <span className="hover:text-white cursor-pointer">EQUIPE</span>
            <span className="hover:text-white cursor-pointer">BLOG</span>
            <span className="hover:text-white cursor-pointer">CONTATO</span>
          </nav>

          <a
            href="#consulta"
            className="px-3.5 py-1.5 rounded bg-[#b4975a] hover:bg-[#a3864b] text-black font-serif font-bold text-xs tracking-wider transition-all shadow-sm"
          >
            CONSULTA
          </a>
        </header>

        {/* Hero Section matching mockup: Boardroom photo on left with bold title, Consultation form on right */}
        <section className="relative px-4 sm:px-8 py-8 sm:py-12 bg-[#0d1836] border-b border-white/10 overflow-hidden">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Column with text and background meeting photo */}
            <div className="md:col-span-7 space-y-4">
              <div className="rounded-xl overflow-hidden border border-white/15 shadow-2xl h-44 sm:h-52 relative group">
                <img
                  src="/advocacia-meeting.jpg"
                  alt="Equipe Jurídica em Reunião"
                  className="w-full h-full object-cover filter brightness-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1329] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[10px] font-mono text-[#b4975a] uppercase tracking-widest block font-bold">
                    CORPO JURÍDICO ESPECIALIZADO
                  </span>
                </div>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                LIDERANÇA JURÍDICA PARA O SEU NEGÓCIO.
              </h1>

              <h2 className="font-serif text-base sm:text-xl text-[#b4975a] font-semibold">
                Excelência em Advocacia Empresarial &amp; Tributária.
              </h2>

              <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                Oferecemos assessoria jurídica estratégica e personalizada para empresas em crescimento, operações societárias e tributárias.
              </p>
            </div>

            {/* Right Column: Form matching the mockup 'AGENDE UMA CONSULTA' */}
            <div id="consulta" className="md:col-span-5">
              <div className="rounded-xl bg-[#091024] border-2 border-[#b4975a]/60 p-5 shadow-2xl">
                <div className="text-center mb-4 pb-2 border-b border-[#b4975a]/30">
                  <h3 className="font-serif font-bold text-sm sm:text-base text-[#b4975a] tracking-wider uppercase">
                    AGENDE UMA CONSULTA
                  </h3>
                </div>

                <div className="space-y-2.5 mb-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Nome"
                      value={advName}
                      onChange={(e) => setAdvName(e.target.value)}
                      className="w-full px-3 py-1.5 rounded bg-white text-black text-xs placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#b4975a]"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="E-mail"
                      value={advEmail}
                      onChange={(e) => setAdvEmail(e.target.value)}
                      className="w-full px-3 py-1.5 rounded bg-white text-black text-xs placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#b4975a]"
                    />
                  </div>

                  <div>
                    <select
                      value={advSubject}
                      onChange={(e) => setAdvSubject(e.target.value)}
                      className="w-full px-3 py-1.5 rounded bg-white text-black text-xs focus:outline-none focus:ring-1 focus:ring-[#b4975a]"
                    >
                      <option value="Direito Tributário">Assunto: Direito Tributário</option>
                      <option value="Direito Societário & M&A">Assunto: Direito Societário &amp; M&A</option>
                      <option value="Consultoria Trabalhista">Assunto: Consultoria Trabalhista</option>
                    </select>
                  </div>

                  <div>
                    <textarea
                      placeholder="Mensagem"
                      rows={2}
                      value={advMessage}
                      onChange={(e) => setAdvMessage(e.target.value)}
                      className="w-full px-3 py-1.5 rounded bg-white text-black text-xs placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#b4975a]"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setAdvSent(true)}
                  className="w-full py-2 rounded bg-[#b4975a] hover:bg-[#a3864b] text-black font-serif font-bold text-xs uppercase tracking-widest cursor-pointer shadow-md transition-all"
                >
                  ENVIAR
                </button>

                {advSent && (
                  <div className="mt-2 p-2 rounded bg-[#10b981]/20 border border-[#10b981]/50 text-[11px] text-[#10b981] text-center font-medium">
                    ✓ Consulta solicitada com sucesso! Retornaremos em breve.
                  </div>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* Section matching mockup: NOSSAS CREDENCIAIS (White background with logos) */}
        <section className="bg-white text-black px-4 sm:px-8 py-6 border-b border-gray-200">
          <div className="max-w-5xl mx-auto">
            <h3 className="font-serif font-bold text-xs uppercase tracking-widest text-[#1e293b] mb-4 text-center sm:text-left">
              NOSSAS CREDENCIAIS
            </h3>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 items-center text-center">
              <div className="p-2 border border-gray-200 rounded">
                <span className="text-xs font-serif font-bold text-[#1e293b] block">Societário</span>
                <span className="text-[9px] text-gray-500">M&amp;A e Contratos</span>
              </div>
              <div className="p-2 border border-gray-200 rounded">
                <span className="text-xs font-serif font-bold text-[#1e293b] block">Tributário</span>
                <span className="text-[9px] text-gray-500">Recuperação Fiscal</span>
              </div>
              <div className="p-2 border border-gray-200 rounded">
                <span className="text-xs font-serif font-bold text-[#1e293b] block">M&amp;A</span>
                <span className="text-[9px] text-gray-500">Fusões &amp; Aquisições</span>
              </div>
              <div className="p-2 border border-gray-200 rounded font-serif font-bold text-xs text-[#0f172a]">
                LEGAL 500
              </div>
              <div className="p-2 border border-gray-200 rounded font-serif font-bold text-xs text-[#0f172a]">
                CHAMBERS
              </div>
              <div className="p-2 border border-gray-200 rounded font-serif font-bold text-xs text-[#0f172a]">
                LEADERS 500
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 sm:px-8 py-5 bg-[#070c1a] text-gray-400 text-center text-xs font-serif">
          <p>© 2026 SILVA &amp; ASSOCIADOS ADVOCACIA • OAB/SP • Todos os direitos reservados</p>
        </footer>
      </div>
    );
  }

  // ==========================================
  // 3. IMÓVEIS DE LUXO & ARQUITETURA (LUXE ARCHITECTURE)
  // ==========================================
  return (
    <div className={`bg-white text-[#1a1a1a] font-sans ${isMobileView ? 'text-xs' : 'text-sm'}`}>
      
      {/* Top Navbar matching mockup */}
      <header className="px-4 sm:px-8 py-3.5 bg-white border-b border-gray-100 sticky top-0 z-30 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <div>
            <span className="font-serif font-bold text-base sm:text-lg tracking-widest text-black block">
              LUXE
            </span>
            <span className="text-[8px] uppercase tracking-widest text-gray-500 block font-mono">
              ARCHITECTURE &amp; ESTATES
            </span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-5 text-xs text-[#475569] font-medium tracking-wider">
          <span className="text-black font-bold border-b border-black pb-0.5 cursor-pointer">HOME</span>
          <span className="hover:text-black cursor-pointer">PORTFOLIO</span>
          <span className="hover:text-black cursor-pointer">FLOOR PLANS</span>
          <span className="hover:text-black cursor-pointer">VIRTUAL TOURS</span>
          <span className="hover:text-black cursor-pointer">CONTACT</span>
        </nav>

        <a
          href="#private-viewing"
          className="px-4 py-2 rounded bg-black hover:bg-gray-800 text-white font-mono font-semibold text-xs tracking-wider transition-all cursor-pointer shadow-sm"
        >
          REQUEST PRIVATE VIEWING
        </a>
      </header>

      {/* Main Showcase Header matching mockup */}
      <section className="bg-[#fafafa] px-4 sm:px-8 py-6 border-b border-gray-100 text-center">
        <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase block mb-1">
          LUXE ARCHITECTURE &amp; ESTATES
        </span>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-wider text-black">
          THE CURATED PORTFOLIO
        </h1>
      </section>

      {/* 3 Grid Columns matching mockup: High-End Modern Villas | Projects Specs | Floor Plans */}
      <section className="px-4 sm:px-8 py-8 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* Column 1: High-End Modern Villas (Villa Photo) */}
          <div className="md:col-span-5 space-y-2">
            <span className="text-[11px] font-mono font-bold tracking-wider text-gray-500 uppercase block">
              HIGH-END MODERN VILLAS
            </span>

            <div className="rounded-xl overflow-hidden border border-gray-200 shadow-md aspect-16/10 bg-gray-100">
              <img
                src="/imoveis-villa.jpg"
                alt="The Azure Vista Villa"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="pt-1">
              <h3 className="font-serif font-bold text-base text-black">The Azure Vista</h3>
              <p className="text-xs text-gray-500 font-mono">minimalist concrete/glass • Alphaville</p>
            </div>
          </div>

          {/* Column 2: Projects Info */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[11px] font-mono font-bold tracking-wider text-gray-500 uppercase block">
              PROJECTS
            </span>

            <div className="p-4 rounded-xl bg-[#fafafa] border border-gray-200 space-y-2">
              <h4 className="font-serif font-bold text-sm text-black">A01 - The Villa Azure</h4>
              <p className="text-xs text-gray-600 font-mono">4 Beds | 5 Baths | 450 sqm</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Piscina com borda infinita, automação residencial de ponta e vista permanente.
              </p>
              <div className="pt-2">
                <span className="text-sm font-bold font-mono text-black">R$ 6.850.000</span>
              </div>
            </div>
          </div>

          {/* Column 3: Floor Plans Blueprint */}
          <div className="md:col-span-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold tracking-wider text-gray-500 uppercase">
                FLOOR PLANS
              </span>
              <div className="flex gap-1 text-[10px] font-mono">
                <button
                  type="button"
                  onClick={() => setSelectedPlanTab('ground')}
                  className={`px-2 py-0.5 rounded cursor-pointer ${selectedPlanTab === 'ground' ? 'bg-black text-white font-bold' : 'text-gray-500 bg-gray-100'}`}
                >
                  Térreo
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPlanTab('first')}
                  className={`px-2 py-0.5 rounded cursor-pointer ${selectedPlanTab === 'first' ? 'bg-black text-white font-bold' : 'text-gray-500 bg-gray-100'}`}
                >
                  1º Pav.
                </button>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-gray-200 p-2 bg-white shadow-sm aspect-4/3 flex items-center justify-center">
              <img
                src="/imoveis-floorplan.jpg"
                alt="Architectural Blueprint Floor Plan"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Private Viewing Form */}
      <section id="private-viewing" className="px-4 sm:px-8 py-8 bg-[#fafafa] border-t border-gray-200">
        <div className="max-w-3xl mx-auto rounded-2xl bg-white border border-gray-200 p-6 text-center shadow-md">
          <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase block mb-1">
            // EXCLUSIVE APPOINTMENT
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-black mb-2">
            Request Private Viewing &amp; Architectural Portfolio
          </h2>
          <p className="text-xs text-gray-500 max-w-lg mx-auto mb-5">
            Agende uma visita guiada com nossos arquitetos e corretores especialistas com total privacidade.
          </p>

          <button
            type="button"
            onClick={() => setImovelViewingSent(true)}
            className="w-full py-3 rounded bg-black hover:bg-gray-800 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
          >
            CONFIRMAR AGENDAMENTO DE VISITA PRIVATIVA
          </button>

          {imovelViewingSent && (
            <div className="mt-3 p-3 rounded bg-[#10b981]/15 border border-[#10b981]/40 text-xs text-[#065f46] font-medium">
              ✓ Solicitação confirmada para The Villa Azure! Nossa equipe entrará em contato.
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-8 py-5 bg-black text-gray-400 text-center text-xs font-mono">
        <p>© 2026 LUXE ARCHITECTURE &amp; ESTATES • Todos os direitos reservados</p>
      </footer>
    </div>
  );
};
