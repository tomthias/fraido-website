
import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  Lightbulb, 
  FileText, 
  Mail, 
  Linkedin, 
  Phone, 
  ArrowRight, 
  ShieldCheck, 
  Globe, 
  Play, 
  Menu, 
  X, 
  ChevronRight, 
  Stethoscope, 
  Activity 
} from 'lucide-react';

const RAW_URL = "https://raw.githubusercontent.com/tomthias/fraido-website/assets/website-assets";

// Componente per l'illustrazione interattiva del tubo a diametro variabile
const FraidoDynamicTube: React.FC<{ dark?: boolean }> = ({ dark }) => {
  const [regulation, setRegulation] = useState(0.5); // 0 to 1
  const isDragging = useRef(false);
  const tubeColor = dark ? "white" : "#4A90E2";
  const stopColor = dark ? "#ffffff" : "#4A90E2";

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>) => {
    if (!isDragging.current) return;
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX : e.clientX;
    const relativeX = x - rect.left;
    const svgWidth = rect.width;
    
    // Lo slider è posizionato tra x=10 e x=110 nel viewBox 800
    // Calcoliamo la posizione relativa all'area dello slider
    const sliderStartX = (10 / 800) * svgWidth;
    const sliderWidth = (100 / 800) * svgWidth;
    let newValue = (relativeX - sliderStartX) / sliderWidth;
    newValue = Math.max(0, Math.min(1, newValue));
    setRegulation(newValue);
  };

  // Interpolazione dei path basata sulla regolazione
  const getDynamicPath = (val: number) => {
    const y1 = 55 - (val * 10);
    const y2 = 58 - (val * 23);
    const qX = 650 + (val * 10);
    const qY = 60;
    const y3 = 62 + (val * 23);
    const y4 = 65 + (val * 10);
    return `M 0,${y1} L 640,${y2} Q ${qX},${qY} 640,${y3} L 0,${y4} Z`;
  };

  return (
    <div className="relative w-full max-w-[850px] h-[160px] md:h-[200px] flex flex-col items-center justify-center mt-16 mx-auto group">
      <svg 
        viewBox="0 0 800 120" 
        className="w-full h-full drop-shadow-2xl overflow-visible cursor-default select-none"
        onMouseDown={() => { isDragging.current = true; }}
        onMouseUp={() => { isDragging.current = false; }}
        onMouseLeave={() => { isDragging.current = false; }}
        onMouseMove={handleMouseMove}
        onTouchStart={() => { isDragging.current = true; }}
        onTouchEnd={() => { isDragging.current = false; }}
        onTouchMove={handleMouseMove}
      >
        <defs>
          <linearGradient id={`tubeGradient-${dark ? 'dark' : 'light'}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={stopColor} stopOpacity="0.4" />
            <stop offset="50%" stopColor={stopColor} stopOpacity="0.1" />
            <stop offset="100%" stopColor={stopColor} stopOpacity="0.4" />
          </linearGradient>
          <filter id="glow-tube-interactive">
            <feGaussianBlur stdDeviation="2.5" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* --- MANUAL CONTROL INTERFACE --- */}
        <g transform="translate(10, 35)" className="cursor-pointer pointer-events-auto">
           {/* Control Track */}
           <rect x="0" y="20" width="100" height="10" rx="5" fill="rgba(255,255,255,0.05)" stroke={tubeColor} strokeWidth="1" strokeOpacity="0.2" />
           
           {/* Manual Slider / Handle */}
           <g transform={`translate(${regulation * 88}, 0)`}>
             <rect 
                x="0" y="5" width="12" height="40" rx="4" 
                fill={tubeColor} 
                filter="url(#glow-tube-interactive)"
                className="transition-transform active:scale-95"
             />
             <rect x="4" y="15" width="1" height="20" fill={dark ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.4)"} />
             <rect x="7" y="15" width="1" height="20" fill={dark ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.4)"} />
           </g>
           
           <text x="50" y="0" textAnchor="middle" fill={tubeColor} fontSize="8" fontWeight="bold" letterSpacing="1.5" opacity="0.8" className="font-special uppercase">
              Manual Regulation: {Math.round(regulation * 100)}%
           </text>
        </g>

        {/* --- THE LONG VARIABLE TUBE --- */}
        <g transform="translate(140, 0)">
          {/* External Tissue Reference */}
          <path d="M 0,40 Q 325,30 650,40 L 650,80 Q 325,90 0,80 Z" fill="none" stroke={dark ? "rgba(255,255,255,0.08)" : "rgba(74,144,226,0.05)"} strokeWidth="1" strokeDasharray="4,4" />
          
          {/* The Dynamic Tube Body */}
          <path 
            d={getDynamicPath(regulation)}
            fill={`url(#tubeGradient-${dark ? 'dark' : 'light'})`} 
            stroke={tubeColor} 
            strokeWidth="2.5" 
            filter="url(#glow-tube-interactive)"
            className="transition-all duration-150 ease-out"
          />
          
          {/* Internal Flow Particles */}
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <circle key={i} r="1.5" fill={tubeColor}>
              <animate attributeName="cx" from="20" to="620" dur={`${1 + i * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="cy" values={`${55 + i}; ${65 - i}; ${55 + i}`} dur={`${0.5 + i * 0.2}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.6;0" dur={`${1 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>
      </svg>
    </div>
  );
};

const SectionHeader: React.FC<{ title: string; subtitle?: string; icon: React.ReactNode; dark?: boolean }> = ({ title, subtitle, icon, dark }) => (
  <div className="flex flex-col items-start md:items-center mb-16 text-left md:text-center">
    <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-semibold tracking-[0.2em] mb-6 border font-special transition-all hover:scale-105 cursor-default ${
      dark 
        ? "bg-white/10 text-white border-white/20" 
        : "bg-blue-50 text-fraido-blue border-blue-100/50"
    }`}>
      {icon}
      <span>{title.toUpperCase()}</span>
    </div>
    {subtitle && (
      <h2 className={`text-3xl md:text-5xl font-medium tracking-tight max-w-4xl leading-tight ${dark ? "text-white" : "text-gray-900"}`}>
        {subtitle}
      </h2>
    )}
  </div>
);

const VideoCard: React.FC<{ title: string, subtitle: string, videoId: string, date: string }> = ({ title, subtitle, videoId, date }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="p-6 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all duration-500 group">
      <div className="flex justify-between items-center mb-5">
          <div className="flex flex-col">
            <p className="text-[9px] font-semibold text-fraido-blue tracking-widest font-special mb-1">{date}</p>
            <h4 className="text-sm font-medium text-white/90">{title}</h4>
          </div>
          <span className="text-[10px] text-white/30 font-medium tracking-widest uppercase">{subtitle}</span>
      </div>
      <div className="aspect-video rounded-2xl overflow-hidden bg-black relative ring-1 ring-white/10 group-hover:ring-fraido-blue/50 transition-all shadow-2xl">
        {!isPlaying ? (
          <button 
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 w-full h-full flex items-center justify-center group/btn z-10"
            aria-label={`Play ${title}`}
          >
            <img 
              src={thumbnailUrl} 
              alt={title} 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover/btn:opacity-80 transition-opacity duration-700"
              loading="lazy"
            />
            <div className="relative w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover/btn:scale-110 group-hover/btn:bg-fraido-blue group-hover/btn:border-transparent transition-all duration-300 shadow-xl">
              <Play size={24} fill="white" className="text-white ml-1" />
            </div>
          </button>
        ) : (
          <iframe 
            className="w-full h-full" 
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showCookie, setShowCookie] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Idea', href: '#idea' },
    { name: 'Team', href: '#team' },
    { name: 'Advisors', href: '#advisors' },
    { name: 'Resources', href: '#resources' }
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfd]">
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-4 md:px-8 py-4 ${scrolled ? 'pt-4' : 'pt-8'}`}>
        <div className={`max-w-7xl mx-auto rounded-[2.5rem] transition-all duration-500 border ${
          scrolled 
            ? 'glass shadow-2xl py-3 px-8 border-white/40' 
            : 'bg-transparent py-4 px-10 border-transparent'
        }`}>
          <div className="flex justify-between items-center">
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-fraido-blue flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                <span className="text-white font-bold text-xl font-special">F</span>
              </div>
              <span className={`text-2xl font-semibold tracking-tighter font-special transition-colors ${scrolled ? 'text-fraido-blue' : 'text-white'}`}>Fraido</span>
            </a>

            <div className="hidden md:flex gap-12 items-center">
              {navLinks.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`text-[10px] font-semibold tracking-[0.2em] font-special uppercase transition-all hover:scale-105 ${
                    scrolled ? 'text-gray-500 hover:text-fraido-blue' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.name}
                </a>
              ))}
              <a 
                href="#contacts" 
                onClick={(e) => scrollToSection(e, '#contacts')}
                className={`text-[10px] font-semibold px-8 py-3 rounded-xl tracking-widest transition-all shadow-md font-special active:scale-95 ${
                  scrolled 
                    ? 'bg-fraido-blue text-white hover:bg-blue-600' 
                    : 'bg-[#4A90E2] text-white hover:bg-blue-600 border border-white/20'
                }`}
              >
                GET IN TOUCH
              </a>
            </div>

            <button 
              className="md:hidden p-2 text-white" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ color: scrolled ? '#4A90E2' : 'white' }}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        <div className={`md:hidden absolute top-full left-4 right-4 mt-4 glass rounded-[2.5rem] shadow-3xl border border-white/40 overflow-hidden transition-all duration-500 ${isMenuOpen ? 'max-h-[400px] opacity-100 py-8' : 'max-h-0 opacity-0 py-0'}`}>
          <div className="flex flex-col items-center gap-6">
            {navLinks.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                onClick={(e) => scrollToSection(e, item.href)}
                className="text-[12px] font-semibold tracking-[0.2em] font-special uppercase text-gray-500 hover:text-fraido-blue"
              >
                {item.name}
              </a>
            ))}
            <a 
              href="#contacts" 
              onClick={(e) => scrollToSection(e, '#contacts')}
              className="bg-fraido-blue text-white text-[10px] font-semibold px-10 py-4 rounded-2xl tracking-widest font-special shadow-lg"
            >
              GET IN TOUCH
            </a>
          </div>
        </div>
      </nav>

      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 animate-gradient"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-[35%] left-[25%] w-[40rem] h-[40rem] bg-white/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-start md:items-center text-left md:text-center">
            <div className="mb-6">
               <span className="px-8 py-3 rounded-full glass text-fraido-blue text-[10px] font-semibold tracking-[0.3em] border border-white/20 font-special uppercase backdrop-blur-xl">
                Faster access. Fewer tools.
               </span>
            </div>
            
            <h1 className="text-8xl md:text-[13rem] font-bold text-white tracking-tighter leading-none mb-2 drop-shadow-2xl select-none">
              Fraido
            </h1>
            
            <div className="max-w-4xl text-white">
              <p className="text-xl md:text-2xl font-bold mb-14 tracking-[0.1em] font-special uppercase drop-shadow-lg">
                Life in control. Minimal diameter.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-start md:justify-center gap-6 w-full">
                <a 
                  href="#idea" 
                  onClick={(e) => scrollToSection(e, '#idea')}
                  className="px-14 py-5 bg-white text-fraido-blue rounded-2xl font-bold shadow-2xl hover:bg-white hover:text-fraido-blue hover:shadow-white/20 hover:scale-105 transition-all flex items-center justify-center gap-3 font-special text-[11px] tracking-widest group"
                >
                  EXPLORE OUR IDEA <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* ILLUSTRATION INTERATTIVA POSIZIONATA SOTTO IL BOTTONE */}
              <FraidoDynamicTube dark />
            </div>
          </div>
        </div>

        <div className="absolute -bottom-1 left-0 right-0 h-32 bg-[#fcfcfd] clip-path-slant"></div>
      </header>

      <main>
        <section id="idea" className="py-32 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader 
              title="The Innovation" 
              subtitle="Revolutionizing endotracheal intubation"
              icon={<Lightbulb size={18} />} 
            />
            
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="relative order-2 lg:order-1 flex flex-col gap-8">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-blue-100/50 rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="relative rounded-[4rem] overflow-hidden shadow-2xl bg-white p-6 border border-gray-100 hover-lift">
                    <div className="aspect-[4/3] rounded-[3rem] overflow-hidden bg-gray-50 flex items-center justify-center">
                      <img 
                        src={`${RAW_URL}/Fraidogif.gif`} 
                        alt="Fraido Device Action" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-10 order-1 lg:order-2 text-left">
                <div className="space-y-8 text-gray-500 text-xl leading-relaxed font-light">
                  <p>
                    During endotracheal intubation, <span className="text-gray-900 font-medium">every single second matters</span>. The number of attempts and total time-to-intubation are critical markers for identifying a successful medical procedure.
                  </p>
                  <p className="border-l-4 border-fraido-blue/30 pl-8">
                    Fraido has patented a technology enabling the <span className="text-fraido-blue font-semibold">continuous regulation of a tube's diameter</span>. This breakthrough allows an endotracheal tube to act as its own introducer and expand once in place.
                  </p>
                  <p>
                    This dynamic control significantly reduces intubation time, minimizes attempts, and prevents tissue trauma. It also enables safe-extubation and precise intraoperative adjustments.
                  </p>
                </div>
                <div className="pt-6">
                  <a href="#resources" onClick={(e) => scrollToSection(e, '#resources')} className="inline-flex items-center gap-4 text-fraido-blue font-special text-[11px] tracking-[0.2em] uppercase font-bold group">
                    Discover clinical details <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="team" className="py-32 bg-[#f8fbff] scroll-mt-24">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader 
              title="Core Team" 
              subtitle="The minds driving innovation"
              icon={<Users size={18} />} 
            />
            <div className="grid md:grid-cols-2 gap-12">
              {[
                {
                  name: "Antonio Maria Vizioli",
                  role_full: "Co-Founder & CEO",
                  bio: "Experienced Nurse with 5+ years in Emergency Departments across England and Italy. A natural communicator and visionary leader focused on patient safety.",
                  img: `${RAW_URL}/AntonioVizioli.jpg`,
                  linkedin: "https://www.linkedin.com/in/antonio-maria-vizioli-75728219b/"
                },
                {
                  name: "Elia Fregonese",
                  role_full: "Co-Founder & CTO",
                  bio: "Master's in Materials Engineering and Nanotechnology from Politecnico di Milano. 4 years as a Thermo-Mechanical System Engineer with an obsession for precision.",
                  img: `${RAW_URL}/EliaFregonese.jpeg`,
                  linkedin: "https://www.linkedin.com/in/fregonesee/"
                }
              ].map((member, i) => (
                <div key={i} className="group relative bg-white rounded-[3.5rem] p-12 border border-blue-50 shadow-sm hover:shadow-2xl transition-all duration-700 hover-lift overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-fraido-light rounded-bl-[4rem] transition-all duration-700 group-hover:w-full group-hover:h-full group-hover:rounded-none opacity-20"></div>
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="relative mb-10">
                      <div className="absolute inset-0 bg-fraido-blue rounded-full scale-0 group-hover:scale-110 transition-transform duration-700 opacity-20"></div>
                      <img src={member.img} className="w-48 h-48 rounded-full object-cover shadow-2xl border-4 border-white grayscale group-hover:grayscale-0 transition-all duration-700" alt={member.name} />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">{member.name}</h3>
                    <p className="text-fraido-blue font-bold text-[11px] tracking-[0.3em] mb-8 font-special uppercase">{member.role_full}</p>
                    <p className="text-gray-500 leading-relaxed font-light mb-10 max-w-sm">{member.bio}</p>
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-fraido-blue hover:text-black transition-all duration-500 shadow-sm">
                      <Linkedin size={24} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="advisors" className="py-32 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader 
              title="Medical Advisors" 
              subtitle="Expertise in the field"
              icon={<Stethoscope size={18} />} 
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                { name: "Giacomo Bellani", desc: "Anesthetist - Head of ICU - Trento Hospital", img: `${RAW_URL}/GiacomoBellani.jpg` },
                { name: "Marco Garroni", desc: "Anesthetists - Airway Management Instructor", img: `${RAW_URL}/MarcoGarroni.png` },
                { name: "Roberto Righetti", desc: "Anesthetists - Airway Management Instructor", img: `${RAW_URL}/RobertoRighetti.png` },
                { name: "Stefano Bonvini", desc: "Vascular Surgeon - Head of Surgery - Trento Hospital", img: `${RAW_URL}/StefanoBonvini.jpg` }
              ].map((adv, i) => (
                <div key={i} className="group p-10 bg-white rounded-[3rem] border border-gray-50 shadow-sm hover:shadow-xl transition-all duration-500 text-center flex flex-col items-center hover-lift">
                  <div className="relative mb-8">
                    <img src={adv.img} className="w-24 h-24 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 shadow-lg border-2 border-transparent group-hover:border-fraido-blue/30" alt={adv.name} />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-4 tracking-tight text-lg">{adv.name}</h4>
                  <p className="text-[10px] text-gray-400 font-semibold tracking-widest leading-relaxed uppercase font-special px-4">{adv.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="resources" className="py-32 bg-slate-900 text-white rounded-[4rem] md:rounded-[6rem] mx-4 mb-32 overflow-hidden shadow-3xl scroll-mt-24 relative">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-fraido-blue/10 blur-[150px]"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-500/10 blur-[120px]"></div>
          <div className="max-w-7xl mx-auto px-8 relative z-10">
            <SectionHeader title="Knowledge Center" subtitle="Our Deck & Presentations" icon={<FileText size={18} className="text-white/60" />} dark />
            <div className="grid lg:grid-cols-12 gap-16">
              <div className="lg:col-span-7 space-y-10">
                <div className="flex justify-between items-end mb-4">
                  <div className="text-left">
                    <h3 className="text-3xl font-semibold tracking-tight mb-2">Interactive Deck</h3>
                    <p className="text-white/40 text-sm">Deep dive into our technology and business model.</p>
                  </div>
                  <a href="https://fraido.it/assets/deck/Fraido_Deck.pdf" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-fraido-blue uppercase tracking-widest border border-fraido-blue/30 px-6 py-2.5 rounded-full hover:bg-fraido-blue hover:text-white transition-all font-special bg-white/5 shadow-lg">Download PDF</a>
                </div>
                <div className="aspect-[16/10] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-black/40 group">
                  <iframe src="https://heyzine.com/flip-book/25f23293b0.html" className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity" allowFullScreen title="Fraido Pitch Deck"></iframe>
                </div>
              </div>
              <div className="lg:col-span-5 space-y-10">
                <div className="flex justify-between items-end mb-4">
                  <div className="text-left">
                    <h3 className="text-3xl font-semibold tracking-tight mb-2">Pitch Videos</h3>
                    <p className="text-white/40 text-sm">Watch our live demonstrations.</p>
                  </div>
                </div>
                <div className="flex flex-col gap-8">
                  <VideoCard title="Startupbreeze 2024" subtitle="Live Pitch" videoId="yqHHQR6pb0s" date="JUNE 2024" />
                  <VideoCard title="Full Concept Presentation" subtitle="Technical Deep-Dive" videoId="54Hm9SUGVtM" date="CURRENT" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contacts" className="py-32 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-6">
             <div className="bg-fraido-light rounded-[3rem] md:rounded-[5rem] p-8 sm:p-12 md:p-28 relative overflow-hidden border border-blue-100/50 shadow-inner">
                <div className="absolute -top-32 -right-32 opacity-10 pointer-events-none rotate-12">
                  <Globe size={600} className="text-fraido-blue" />
                </div>
                <div className="relative z-10 text-left">
                  <div className="mb-12 md:mb-20">
                    <span className="text-[10px] md:text-[11px] font-special font-bold text-fraido-blue tracking-[0.4em] uppercase mb-4 block">Let's connect</span>
                    <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold text-gray-900 tracking-tighter">Get in touch.</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6 md:gap-10">
                    <a href="mailto:info@fraido.it" className="flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-10 p-8 md:p-12 bg-white rounded-[2.5rem] md:rounded-[3.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group border border-blue-50/50">
                      <div className="w-14 h-14 md:w-20 md:h-20 shrink-0 rounded-2xl md:rounded-3xl bg-blue-50 flex items-center justify-center text-fraido-blue transition-all duration-500 shadow-sm group-hover:rotate-6">
                        <Mail className="w-7 h-7 md:w-9 md:h-9 text-fraido-blue" />
                      </div>
                      <div className="text-left overflow-hidden w-full">
                        <p className="text-[9px] md:text-[10px] font-bold text-gray-400 tracking-[0.3em] mb-2 font-special uppercase">Email Address</p>
                        <p className="text-lg md:text-2xl font-semibold text-gray-900 tracking-tight truncate">info@fraido.it</p>
                      </div>
                    </a>
                    <a href="tel:+393469731543" className="flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-10 p-8 md:p-12 bg-white rounded-[2.5rem] md:rounded-[3.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group border border-blue-50/50">
                      <div className="w-14 h-14 md:w-20 md:h-20 shrink-0 rounded-2xl md:rounded-3xl bg-blue-50 flex items-center justify-center text-fraido-blue transition-all duration-500 shadow-sm group-hover:-rotate-6">
                        <Phone className="w-7 h-7 md:w-9 md:h-9 text-fraido-blue" />
                      </div>
                      <div className="text-left overflow-hidden w-full">
                        <p className="text-[9px] md:text-[10px] font-bold text-gray-400 tracking-[0.3em] mb-2 font-special uppercase">Phone Contact</p>
                        <p className="text-lg md:text-2xl font-semibold text-gray-900 tracking-tight break-words">+39 346 973 1543</p>
                      </div>
                    </a>
                  </div>
                </div>
             </div>
          </div>
        </section>
      </main>

      <footer className="py-24 bg-white border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-16">
            <div className="flex flex-col items-start gap-6">
              <div className="flex items-center gap-5">
                <span className="text-4xl font-bold text-fraido-blue tracking-tighter font-special">Fraido</span>
                <div className="w-[1px] h-10 bg-gray-200"></div>
                <p className="text-[11px] font-bold text-gray-400 tracking-[0.4em] font-special uppercase">Life in control</p>
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end gap-10">
              <div className="flex gap-12 text-[11px] font-bold text-gray-400 tracking-[0.2em] font-special uppercase">
                <a href="#" className="hover:text-fraido-blue transition-colors">Privacy</a>
                <a href="#" className="hover:text-fraido-blue transition-colors">Legal</a>
                <a href="https://www.linkedin.com/company/fraido/" target="_blank" className="hover:text-fraido-blue transition-colors">LinkedIn</a>
              </div>
              <p className="text-[10px] font-semibold text-gray-300 tracking-widest font-special">© 2025 FRAIDO S.R.L. • ALL RIGHTS RESERVED</p>
            </div>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-8 right-8 z-[100] group">
        {showCookie && (
          <div className="relative glass p-8 rounded-[2.5rem] shadow-3xl border border-white/60 w-80 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none group-hover:pointer-events-auto mb-4">
            <h4 className="text-sm font-bold text-gray-900 mb-4 font-special tracking-widest uppercase">Privacy First</h4>
            <p className="text-[12px] leading-relaxed text-gray-500 mb-8 font-light italic text-left">We use cookies to enhance your medical technology discovery experience.</p>
            <button onClick={() => setShowCookie(false)} className="w-full py-4 bg-fraido-blue text-white text-[10px] font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-xl font-special tracking-widest active:scale-95">ACCEPT ALL</button>
          </div>
        )}
        <div className="flex justify-end">
          <div onClick={() => setShowCookie(!showCookie)} className="w-16 h-16 bg-fraido-blue rounded-full shadow-2xl flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform shadow-fraido-blue/40 border-4 border-white active:scale-90">
            <ShieldCheck size={26} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
