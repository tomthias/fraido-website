
import React, { useState } from 'react';
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
  Play
} from 'lucide-react';

const SectionHeader: React.FC<{ title: string; subtitle?: string; icon: React.ReactNode }> = ({ title, subtitle, icon }) => (
  <div className="flex flex-col items-center mb-16 text-center">
    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-50 text-fraido-blue text-[10px] font-semibold tracking-[0.1em] mb-6 border border-blue-100/50 font-special">
      {icon}
      <span>{title}</span>
    </div>
    {subtitle && <h2 className="text-2xl md:text-4xl font-medium text-gray-900 tracking-tight max-w-4xl leading-tight">{subtitle}</h2>}
  </div>
);

const VideoCard: React.FC<{ title: string, subtitle: string, videoId: string, date: string }> = ({ title, subtitle, videoId, date }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-colors group">
      <div className="flex justify-between items-center mb-4">
          <p className="text-[9px] font-semibold text-fraido-blue tracking-widest font-special">{date}</p>
          <span className="text-[10px] text-white/30 font-medium">{subtitle}</span>
      </div>
      <div className="aspect-video rounded-2xl overflow-hidden bg-black relative ring-1 ring-white/10 group-hover:ring-fraido-blue/50 transition-all">
        {!isPlaying ? (
          <button 
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 w-full h-full flex items-center justify-center group/btn z-10"
            aria-label={`Play ${title}`}
          >
            <img 
              src={thumbnailUrl} 
              alt={title} 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover/btn:opacity-80 transition-opacity"
              loading="lazy"
            />
            <div className="relative w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover/btn:scale-110 group-hover/btn:bg-fraido-blue transition-all duration-300">
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
  const RAW_URL = "https://raw.githubusercontent.com/tomthias/fraido-website/assets/website-assets";

  return (
    <div className="min-h-screen scroll-smooth">
      {/* Hero Section */}
      <header className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 animate-gradient opacity-100"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="mb-10">
               <span className="px-6 py-2.5 rounded-full glass text-white text-[9px] font-medium tracking-[0.2em] border border-white/20 font-special">
                Faster access. Fewer tools.
               </span>
            </div>
            
            <h1 className="text-5xl md:text-[9rem] font-semibold text-white tracking-tighter leading-none mb-8 drop-shadow-xl">
              Fraido
            </h1>
            
            <div className="max-w-2xl text-white/90">
              <p className="text-lg md:text-xl font-light mb-10 tracking-[0.1em] opacity-80 font-special">
                Minimal diameter.
              </p>
              <div className="flex flex-wrap justify-center gap-5">
                <a href="#idea" className="px-10 py-4 bg-white text-fraido-blue rounded-full font-medium shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2 font-special text-[10px] tracking-widest">
                  Our Idea <ArrowRight size={14} />
                </a>
                <a href="#resources" className="px-10 py-4 glass text-white rounded-full font-medium hover:bg-white/10 transition-all border border-white/30 font-special text-[10px] tracking-widest">
                  Resources
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-1 left-0 right-0 h-32 bg-white clip-path-slant"></div>
      </header>

      {/* Sticky Nav - Improved Spacing as per screenshot */}
      <nav className="sticky top-6 z-50 px-4">
        <div className="max-w-6xl mx-auto glass rounded-2xl px-8 py-3.5 shadow-xl border border-white/40 flex justify-between items-center">
          <a href="#" className="font-semibold text-fraido-blue tracking-tighter text-2xl font-special">F.</a>
          <div className="hidden md:flex gap-10 items-center justify-center flex-1">
            {['Idea', 'Team', 'Advisors', 'Resources', 'Contacts'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-medium text-gray-500 hover:text-fraido-blue transition-colors tracking-widest font-special px-2">
                {item}
              </a>
            ))}
          </div>
          <a href="#contacts" className="bg-fraido-blue text-white text-[10px] font-semibold px-6 py-2.5 rounded-xl tracking-widest hover:bg-blue-600 transition-all shadow-md font-special">
            Contact
          </a>
        </div>
      </nav>

      <main className="mt-20">
        
        {/* IDEA SECTION - Added scroll-mt-24 for anchor links */}
        <section id="idea" className="py-24 scroll-mt-24">
          <div className="max-w-6xl mx-auto px-4">
            <SectionHeader 
              title="Our Idea" 
              subtitle="Innovation in endotracheal intubation"
              icon={<Lightbulb size={16} />} 
            />
            
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-70"></div>
                <div className="relative rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] bg-white group p-4 border border-gray-100">
                  <img 
                    src={`${RAW_URL}/Fraidogif.gif`} 
                    alt="Fraido Device Action" 
                    className="w-full h-full object-contain rounded-2xl"
                  />
                </div>
              </div>
              
              <div className="space-y-8 order-1 lg:order-2">
                <div className="space-y-6 text-gray-500 text-lg leading-relaxed font-light">
                  <p>
                    During endotracheal intubation, <span className="text-gray-900 font-normal">every second matters</span>. The number of attempts and time-to-intubation are key markers for identifying a successful procedure.
                  </p>
                  <p>
                    Our company has filed a patent for a technology enabling the <span className="text-fraido-blue font-normal">continuous regulation of a tube's diameter</span>. This allows an endotracheal tube to act as the introducer and expand once in place, reducing time-to-intubation, attempts, and trauma.
                  </p>
                  <p>
                    Diameter control also enables safe-extubation and intraoperative adjustments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TEAM SECTION - Added scroll-mt-24 */}
        <section id="team" className="py-24 bg-gray-50/40 scroll-mt-24">
          <div className="max-w-6xl mx-auto px-4">
            <SectionHeader 
              title="Our Team" 
              subtitle="The people behind Fraido"
              icon={<Users size={16} />} 
            />
            
            <div className="grid md:grid-cols-2 gap-10">
              <div className="group relative bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500">
                <div className="flex flex-col items-center text-center">
                  <img src={`${RAW_URL}/AntonioVizioli.jpg`} className="w-40 h-40 rounded-full object-cover shadow-lg mb-8 border-4 border-white grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt="Antonio Maria Vizioli" />
                  <h3 className="text-2xl font-semibold text-gray-900 mb-1 tracking-tight">Antonio Maria Vizioli</h3>
                  <p className="text-fraido-blue font-semibold text-[10px] tracking-[0.2em] mb-5 font-special">CEO</p>
                  <p className="text-sm text-gray-500 leading-relaxed font-light mb-8 min-h-[6rem]">
                    Worked as a Nurse in England and throughout Italy. 5 years of experience in Emergency Departments. He could strike up a conversation with a door knob, and he will definitely end up pitching to it.
                  </p>
                  <a href="https://www.linkedin.com/in/antonio-maria-vizioli-75728219b/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-fraido-blue transition-colors">
                    <Linkedin size={24} />
                  </a>
                </div>
              </div>
              
              <div className="group relative bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500">
                <div className="flex flex-col items-center text-center">
                  <img src={`${RAW_URL}/EliaFregonese.jpeg`} className="w-40 h-40 rounded-full object-cover shadow-lg mb-8 border-4 border-white grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt="Elia Fregonese" />
                  <h3 className="text-2xl font-semibold text-gray-900 tracking-tight mb-1">Elia Fregonese</h3>
                  <p className="text-fraido-blue font-semibold text-[10px] tracking-[0.2em] mb-5 font-special">CTO</p>
                  <p className="text-sm text-gray-500 leading-relaxed font-light mb-8 min-h-[6rem]">
                    Master Degree in Materials Engineering and Nanotechnology from Politecnico di Milan. 4 years of experience as Thermo-Mechanical System Engineer. Painstakingly attached to details and precision.
                  </p>
                  <a href="https://www.linkedin.com/in/fregonesee/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-fraido-blue transition-colors">
                    <Linkedin size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ADVISORS - Added scroll-mt-24 */}
        <section id="advisors" className="py-24 scroll-mt-24">
          <div className="max-w-6xl mx-auto px-4">
            <SectionHeader 
              title="Our Advisors" 
              subtitle="Medical Expertise"
              icon={<Users size={16} />} 
            />
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: "Giacomo Bellani", desc: "Anesthetist - Head of ICU - Trento Hospital", img: `${RAW_URL}/GiacomoBellani.jpg` },
                { name: "Marco Garroni", desc: "Anesthetists - Airway Management Instructor", img: `${RAW_URL}/MarcoGarroni.png` },
                { name: "Roberto Righetti", desc: "Anesthetists - Airway Management Instructor", img: `${RAW_URL}/RobertoRighetti.png` },
                { name: "Stefano Bonvini", desc: "Vascular Surgeon - Head of Surgery - Trento Hospital", img: `${RAW_URL}/StefanoBonvini.jpg` }
              ].map((adv, i) => (
                <div key={i} className="group p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center text-center">
                  <img src={adv.img} className="w-20 h-20 rounded-full object-cover mb-6 grayscale group-hover:grayscale-0 transition-all duration-500 border-2 border-transparent group-hover:border-fraido-blue/20" alt={adv.name} />
                  <h4 className="font-semibold text-gray-900 mb-3 tracking-tight">{adv.name}</h4>
                  <p className="text-[9px] text-gray-400 font-medium tracking-widest leading-relaxed opacity-70 font-special">{adv.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RESOURCES - Added scroll-mt-24 */}
        <section id="resources" className="py-24 bg-gray-900 text-white rounded-[3rem] md:rounded-[5rem] mx-4 mb-24 overflow-hidden shadow-2xl scroll-mt-24">
          <div className="max-w-6xl mx-auto px-8">
            <SectionHeader 
              title="Resources" 
              subtitle="Our Deck & Pitch Videos"
              icon={<FileText size={16} className="text-white/40" />} 
            />

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="flex justify-between items-center px-4">
                  <h3 className="text-2xl font-medium tracking-tight">Interactive Deck</h3>
                  <a href="https://fraido.it/assets/deck/Fraido_Deck.pdf" target="_blank" rel="noopener noreferrer" className="text-[9px] font-bold text-fraido-blue uppercase tracking-widest border border-fraido-blue/30 px-4 py-1.5 rounded-full hover:bg-fraido-blue/10 transition-colors font-special">
                    Download PDF
                  </a>
                </div>
                <div className="aspect-[16/9] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-3xl bg-black/40">
                  <iframe 
                    src="https://heyzine.com/flip-book/b21697f353.html" 
                    className="w-full h-full" 
                    allowFullScreen
                    title="Fraido Pitch Deck"
                  ></iframe>
                </div>
                <p className="text-[10px] text-white/40 text-center tracking-widest font-medium font-special">Browse our latest clinical and business case</p>
              </div>

              <div className="space-y-8">
                <div className="flex justify-between items-center px-4">
                  <h3 className="text-2xl font-medium tracking-tight">Pitch & Presentations</h3>
                  <span className="text-[10px] font-bold text-white/20 tracking-widest font-special">Video Archive</span>
                </div>
                
                <div className="grid gap-6">
                  <VideoCard 
                    title="Fraido Pitch 1" 
                    subtitle="Startupbreeze 2024" 
                    videoId="yqHHQR6pb0s" 
                    date="June 2024"
                  />
                  <VideoCard 
                    title="Fraido Pitch 2" 
                    subtitle="Presentation" 
                    videoId="54Hm9SUGVtM" 
                    date="Current"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACTS - Added scroll-mt-24 */}
        <section id="contacts" className="py-24 scroll-mt-24">
          <div className="max-w-6xl mx-auto px-4">
             <div className="bg-fraido-light rounded-[4rem] p-16 md:p-24 relative overflow-hidden border border-blue-100/50">
                <div className="absolute -top-20 -right-20 opacity-[0.03] pointer-events-none">
                  <Globe size={500} className="text-fraido-blue" />
                </div>
                
                <div className="relative z-10 text-center md:text-left">
                  <h2 className="text-5xl md:text-7xl font-medium text-gray-900 mb-16 tracking-tighter">Get in touch.</h2>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <a href="mailto:info@fraido.it" className="flex items-center gap-8 p-10 bg-white rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group border border-gray-100/50">
                      <div className="w-16 h-16 rounded-2xl bg-fraido-light flex items-center justify-center text-fraido-blue group-hover:bg-fraido-blue group-hover:text-white transition-all duration-300">
                        <Mail size={30} />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-gray-400 tracking-widest mb-1.5 font-special">Email</p>
                        <p className="text-xl font-medium text-gray-900 tracking-tight">info@fraido.it</p>
                      </div>
                    </a>
                    <a href="tel:+393469731543" className="flex items-center gap-8 p-10 bg-white rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group border border-gray-100/50">
                      <div className="w-16 h-16 rounded-2xl bg-fraido-light flex items-center justify-center text-fraido-blue group-hover:bg-fraido-blue group-hover:text-white transition-all duration-300">
                        <Phone size={30} />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-gray-400 tracking-widest mb-1.5 font-special">Phone</p>
                        <p className="text-xl font-medium text-gray-900 tracking-tight">+39 346 973 1543</p>
                      </div>
                    </a>
                  </div>
                </div>
             </div>
          </div>
        </section>

      </main>

      <footer className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-5">
            <span className="text-3xl font-semibold text-fraido-blue tracking-tighter font-special">Fraido</span>
            <div className="w-[1px] h-10 bg-gray-100"></div>
            <p className="text-[10px] font-medium text-gray-400 tracking-[0.3em] font-special">Life in control</p>
          </div>
          
          <div className="flex gap-10 text-[10px] font-medium text-gray-300 tracking-widest font-special">
            <a href="#" className="hover:text-fraido-blue transition-colors">Privacy</a>
            <a href="#" className="hover:text-fraido-blue transition-colors">Legal</a>
            <a href="#" className="hover:text-gray-900 transition-colors">© 2025 Fraido S.r.l.</a>
          </div>
        </div>
      </footer>

      {/* Cookie Consent */}
      <div className="fixed bottom-10 right-10 z-[100] group">
        <div className="relative glass p-8 rounded-[3rem] shadow-3xl border border-white/60 w-80 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none group-hover:pointer-events-auto">
          <p className="text-[12px] leading-relaxed text-gray-600 mb-6 font-light italic">Enhancing your digital medical experience through optimized cookies.</p>
          <button className="w-full py-3.5 bg-fraido-blue text-white text-[10px] font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-lg font-special">Accept All</button>
        </div>
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-fraido-blue rounded-full shadow-2xl flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
          <ShieldCheck size={28} />
        </div>
      </div>
    </div>
  );
};

export default App;
