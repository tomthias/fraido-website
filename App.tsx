
import React from 'react';
import { 
  Users, 
  Lightbulb, 
  FileText, 
  Video, 
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
    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-50 text-fraido-blue text-[11px] font-bold uppercase tracking-[0.2em] mb-6 border border-blue-100/50">
      {icon}
      <span>{title}</span>
    </div>
    {subtitle && <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 tracking-tight max-w-3xl leading-tight">{subtitle}</h2>}
  </div>
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen scroll-smooth">
      {/* Hero Section */}
      <header className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 animate-gradient opacity-100"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="mb-10">
               <span className="px-6 py-2.5 rounded-full glass text-white text-[11px] font-medium uppercase tracking-[0.3em] border border-white/20">
                Faster access. Fewer tools.
               </span>
            </div>
            
            <h1 className="text-7xl md:text-[10rem] font-bold text-white tracking-tighter leading-none mb-8 drop-shadow-xl">
              Fraido
            </h1>
            
            <div className="max-w-2xl text-white/90">
              <p className="text-xl md:text-2xl font-light mb-10 tracking-wide opacity-80 uppercase">
                Minimal diameter.
              </p>
              <div className="flex flex-wrap justify-center gap-5">
                <a href="#idea" className="px-10 py-4 bg-white text-fraido-blue rounded-full font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2">
                  Our Idea <ArrowRight size={18} />
                </a>
                <a href="#deck" className="px-10 py-4 glass text-white rounded-full font-semibold hover:bg-white/10 transition-all border border-white/30">
                  Pitch Deck
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-1 left-0 right-0 h-32 bg-white clip-path-slant"></div>
      </header>

      {/* Sticky Nav */}
      <nav className="sticky top-6 z-50 px-4">
        <div className="max-w-4xl mx-auto glass rounded-2xl px-8 py-3.5 shadow-xl border border-white/40 flex justify-between items-center">
          <span className="font-bold text-fraido-blue tracking-tighter text-2xl">F.</span>
          <div className="hidden md:flex gap-10 items-center">
            {['IDEA', 'TEAM', 'ADVISORS', 'DECK', 'PITCHES', 'CONTACTS'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[11px] font-semibold text-gray-500 hover:text-fraido-blue transition-colors tracking-widest uppercase">
                {item}
              </a>
            ))}
          </div>
          <a href="#contacts" className="bg-fraido-blue text-white text-[11px] font-bold px-6 py-2.5 rounded-xl uppercase tracking-widest hover:bg-blue-600 transition-all shadow-md">
            Contact
          </a>
        </div>
      </nav>

      <main className="mt-20">
        
        {/* IDEA SECTION */}
        <section id="idea" className="py-24">
          <div className="max-w-6xl mx-auto px-4">
            <SectionHeader 
              title="Our Idea" 
              subtitle="Innovation in endotracheal intubation"
              icon={<Lightbulb size={16} />} 
            />
            
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-70"></div>
                <div className="relative rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] group">
                  <img 
                    src="https://fraido.it/assets/home/fraido_idea.png" 
                    alt="Fraido Innovation" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end p-10">
                    <p className="text-white text-[10px] font-medium uppercase tracking-[0.2em] opacity-90">Proprietary Patent Technology</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-8 order-1 lg:order-2">
                <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-light">
                  <p>
                    During endotracheal intubation, <span className="text-gray-900 font-medium">every second matters</span>. The number of attempts and time-to-intubation are key markers for identifying a successful procedure.
                  </p>
                  <p>
                    Our company has filed a patent for a technology enabling the <span className="text-fraido-blue font-medium">continuous regulation of a tube's diameter</span>. This allows an endotracheal tube to act as the introducer and expand once in place, reducing time-to-intubation, attempts, and trauma.
                  </p>
                  <p>
                    Diameter control also enables safe-extubation and intraoperative adjustments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TEAM SECTION */}
        <section id="team" className="py-24 bg-gray-50/40">
          <div className="max-w-6xl mx-auto px-4">
            <SectionHeader 
              title="Our Team" 
              subtitle="The people behind Fraido"
              icon={<Users size={16} />} 
            />
            
            <div className="grid md:grid-cols-12 gap-10">
              {/* Antonio */}
              <div className="md:col-span-7 group relative bg-white rounded-[2.5rem] p-12 border border-gray-100/80 shadow-sm hover:shadow-2xl transition-all duration-500">
                <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
                  <img src="https://fraido.it/assets/home/vizioli.png" className="w-44 h-44 rounded-[2rem] object-cover shadow-lg grayscale group-hover:grayscale-0 transition-all duration-700" alt="Antonio Maria Vizioli" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">Antonio Maria Vizioli</h3>
                    <p className="text-fraido-blue font-bold text-[11px] uppercase tracking-[0.2em] mb-5">CEO</p>
                    <p className="text-sm text-gray-500 leading-relaxed font-light mb-8">
                      Worked as a Nurse in England and throughout Italy. 5 years of experience in Emergency Departments. He could strike up a conversation with a door knob, and he will definitely end up pitching to it.
                    </p>
                    <a href="https://www.linkedin.com/in/antonio-maria-vizioli-1a00a1200/" className="inline-flex items-center gap-2 text-[11px] font-bold text-gray-400 hover:text-fraido-blue transition-colors tracking-widest">
                      <Linkedin size={14} /> LINKEDIN
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Elia */}
              <div className="md:col-span-5 group bg-white rounded-[2.5rem] p-12 border border-gray-100/80 shadow-sm hover:shadow-2xl transition-all duration-500">
                <div className="flex flex-col items-center text-center">
                  <img src="https://fraido.it/assets/home/fregonese.png" className="w-32 h-32 rounded-full object-cover shadow-lg mb-8 border-4 border-white group-hover:scale-105 transition-transform duration-700" alt="Elia Fregonese" />
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">Elia Fregonese</h3>
                  <p className="text-fraido-blue font-bold text-[11px] uppercase tracking-[0.2em] mb-5">CTO</p>
                  <p className="text-[13px] text-gray-500 leading-relaxed font-light mb-8">
                    Master Degree in Materials Engineering and Nanotechnology from Politecnico di Milan. 4 years of experience as Thermo-Mechanical System Engineer. Painstakingly attached to details and precision.
                  </p>
                  <a href="https://it.linkedin.com/in/elia-fregonese-78a051108" className="text-gray-400 hover:text-fraido-blue transition-colors"><Linkedin size={22} /></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ADVISORS */}
        <section id="advisors" className="py-24">
          <div className="max-w-6xl mx-auto px-4">
            <SectionHeader 
              title="Our Advisors" 
              subtitle="Medical Expertise"
              icon={<Users size={16} />} 
            />
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: "Giacomo Bellani", desc: "Anesthetist - Head of ICU - Trento Hospital", img: "https://fraido.it/assets/home/bellani.png" },
                { name: "Marco Garroni", desc: "Anesthetists - Airway Management Instructor", img: "https://fraido.it/assets/home/garroni.png" },
                { name: "Roberto Righetti", desc: "Anesthetists - Airway Management Instructor", img: "https://fraido.it/assets/home/righetti.png" },
                { name: "Stefano Bonvini", desc: "Vascular Surgeon - Head of Surgery - Trento Hospital", img: "https://fraido.it/assets/home/bonvini.png" }
              ].map((adv, i) => (
                <div key={i} className="group p-8 bg-white rounded-[2.5rem] border border-gray-100/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center text-center">
                  <img src={adv.img} className="w-20 h-20 rounded-full object-cover mb-6 grayscale group-hover:grayscale-0 transition-all duration-500 border-2 border-transparent group-hover:border-fraido-blue/20" alt={adv.name} />
                  <h4 className="font-bold text-gray-900 mb-3 tracking-tight">{adv.name}</h4>
                  <p className="text-[11px] text-gray-400 font-medium uppercase tracking-widest leading-relaxed opacity-80">{adv.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RESOURCES */}
        <section id="deck" className="py-24 bg-gray-900 text-white rounded-[3rem] md:rounded-[5rem] mx-4 mb-24 overflow-hidden">
          <div className="max-w-6xl mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-6 border border-white/10">
                  <FileText size={14} />
                  <span>Resources</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">Deck & Pitches</h2>
              </div>
              <a href="https://fraido.it/assets/deck/Fraido_Deck.pdf" className="px-8 py-3.5 bg-white text-gray-900 rounded-full font-bold text-[11px] uppercase tracking-widest hover:bg-blue-50 transition-all flex items-center gap-2">
                Download PDF <ArrowRight size={14} />
              </a>
            </div>

            <div className="grid lg:grid-cols-12 gap-16">
              <div className="lg:col-span-7">
                <div className="aspect-[16/9] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-3xl bg-black/40">
                  <iframe 
                    src="https://heyzine.com/flip-book/b21697f353.html" 
                    className="w-full h-full" 
                    allowFullScreen
                    title="Fraido Pitch Deck"
                  ></iframe>
                </div>
              </div>

              <div id="pitches" className="lg:col-span-5 space-y-8">
                <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-colors group">
                   <div className="flex justify-between items-center mb-6">
                      <p className="text-[10px] font-bold text-fraido-blue uppercase tracking-widest">October 2025</p>
                      <span className="text-[10px] text-white/30 uppercase font-medium">Startupbreeze</span>
                   </div>
                   <h4 className="text-xl font-medium mb-6 tracking-tight">International Pitch</h4>
                   <div className="aspect-video rounded-2xl overflow-hidden bg-black/60 relative cursor-pointer ring-1 ring-white/10 group-hover:ring-fraido-blue/50 transition-all">
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-transparent transition-all">
                        <Play size={40} fill="white" className="text-white drop-shadow-lg" />
                      </div>
                      <iframe 
                        className="w-full h-full opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity" 
                        src="https://www.youtube.com/embed/j_8j_8_8_8"
                        title="Pitch"
                        allowFullScreen
                      ></iframe>
                   </div>
                </div>

                <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-colors group">
                   <div className="flex justify-between items-center mb-6">
                      <p className="text-[10px] font-bold text-fraido-blue uppercase tracking-widest">September 2025</p>
                      <span className="text-[10px] text-white/30 uppercase font-medium">Italian</span>
                   </div>
                   <h4 className="text-xl font-medium mb-6 tracking-tight">Official Presentation</h4>
                   <div className="aspect-video rounded-2xl overflow-hidden bg-black/60 ring-1 ring-white/10">
                      <video controls className="w-full h-full">
                        <source src="https://fraido.it/assets/pitches/Fraido_Italian_Presentation.mp4" type="video/mp4" />
                      </video>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACTS */}
        <section id="contacts" className="py-24">
          <div className="max-w-6xl mx-auto px-4">
             <div className="bg-fraido-light rounded-[4rem] p-16 md:p-24 relative overflow-hidden border border-blue-100/50">
                <div className="absolute -top-20 -right-20 opacity-[0.03] pointer-events-none">
                  <Globe size={500} className="text-fraido-blue" />
                </div>
                
                <div className="relative z-10 text-center md:text-left">
                  <h2 className="text-5xl md:text-7xl font-semibold text-gray-900 mb-16 tracking-tighter">Get in touch.</h2>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <a href="mailto:info@fraido.it" className="flex items-center gap-8 p-10 bg-white rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group border border-gray-100/50">
                      <div className="w-16 h-16 rounded-2xl bg-fraido-light flex items-center justify-center text-fraido-blue group-hover:bg-fraido-blue group-hover:text-white transition-all duration-300">
                        <Mail size={30} />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Email</p>
                        <p className="text-xl font-semibold text-gray-900 tracking-tight">info@fraido.it</p>
                      </div>
                    </a>
                    <a href="tel:+393469731543" className="flex items-center gap-8 p-10 bg-white rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group border border-gray-100/50">
                      <div className="w-16 h-16 rounded-2xl bg-fraido-light flex items-center justify-center text-fraido-blue group-hover:bg-fraido-blue group-hover:text-white transition-all duration-300">
                        <Phone size={30} />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Phone</p>
                        <p className="text-xl font-semibold text-gray-900 tracking-tight">+39 346 973 1543</p>
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
            <span className="text-4xl font-bold text-fraido-blue tracking-tighter">Fraido</span>
            <div className="w-[1px] h-10 bg-gray-100"></div>
            <p className="text-[11px] font-medium text-gray-400 uppercase tracking-[0.5em]">Life in control</p>
          </div>
          
          <div className="flex gap-12 text-[11px] font-bold text-gray-300 uppercase tracking-widest">
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
          <button className="w-full py-3.5 bg-fraido-blue text-white text-[11px] font-bold uppercase rounded-2xl hover:bg-blue-600 transition-all shadow-lg">Accept All</button>
        </div>
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-fraido-blue rounded-full shadow-2xl flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
          <ShieldCheck size={28} />
        </div>
      </div>
    </div>
  );
};

export default App;
