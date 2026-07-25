import React, { useEffect, useState } from 'react';

const NAV_LINKS = [
  { id: 'c-challenge', label: 'Challenge' },
  { id: 'c-problem', label: 'Main problem' },
  { id: 'c-idea', label: 'Idea' },
  { id: 'c-team', label: 'Team' },
  { id: 'c-adv', label: 'Advisors' },
  { id: 'c-res', label: 'Resources' },
];

const ADVISORS = [
  { img: 'assets/adv-chiara.png', name: 'Chiara Sansovini', desc: 'Anesthetist · Co-author of Stargate' },
  { img: 'assets/adv-bellani.jpg', name: 'Prof. Giacomo Bellani', desc: 'Anesthetist · Professor & ICU chief' },
  { img: 'assets/adv-garroni.png', name: 'Marco Garroni', desc: 'Anesthetist · Difficult airways instructor' },
  { img: 'assets/adv-righetti.png', name: 'Roberto Righetti', desc: 'Anesthetist · Difficult airways instructor' },
  { img: 'assets/adv-bonvini.png', name: 'Stefano Bonvini', desc: 'Vascular Surgeon · Chief of vascular surgery, Trento' },
  { img: 'assets/adv-gossling.jpg', name: 'Martin Gossling', desc: 'Product designer · Head of commercial innovation, UHS Southampton' },
  { img: 'assets/adv-markle.jpg', name: 'Andrew Markle', desc: 'Anesthetist · Quality management, Saint Mary hospital' },
];

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

  // Glass effect on the nav once the page starts scrolling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: highlight the nav link of the section currently in view
  useEffect(() => {
    const sections = NAV_LINKS
      .map(l => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Gentle scroll reveals
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal'));
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="site">
      <nav className={scrolled ? 'nav scrolled' : 'nav'}>
        <img className="nav-logo" src="assets/logo-navy.png" alt="Fraido" />
        <ul>
          {NAV_LINKS.map(link => (
            <li key={link.id}>
              <a href={`#${link.id}`} className={activeSection === link.id ? 'active' : undefined}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a className="nav-cta" href="mailto:info@fraido.it">Contact</a>
      </nav>

      <header className="hero">
        <span className="hero-badge">Difficult intubation, solved</span>
        <img className="hero-logo" src="assets/logo-white.png" alt="Fraido" />
        <p className="hero-pay"><b>Intubation</b>Easy · Fast · Safe</p>
        <div className="hero-btns">
          <a className="btn btn-fill" href="#c-challenge">The Challenge →</a>
          <a className="btn btn-ghost" href="#c-idea">Our Idea</a>
        </div>
      </header>

      <section className="sec" id="c-challenge">
        <div className="sec-inner reveal">
          <span className="eyebrow">◆ The Challenge</span>
          <h2>Difficult Intubation</h2>
          <p className="lead">
            Intubation inserts a tube through the mouth or nose into the trachea to keep an airway
            open — a critical intervention to support breathing, deliver oxygen and administer
            medication. This life-saving technique is performed in and out of hospital, in civil and
            military settings, on critically ill patients unable to breathe on their own.
          </p>
          <div className="chips">
            <span>Stenosis</span>
            <span>Anatomical abnormalities</span>
            <span>A foreign body</span>
            <span>An emergency</span>
          </div>
        </div>
      </section>

      <section className="sec problem" id="c-problem">
        <div className="sec-inner reveal">
          <span className="eyebrow">◆ Main problem</span>
          <h2><em>NO</em> space<br /><em>no</em> time<br /><em>no</em> oxygen.</h2>
          <p className="lead">
            The key determinants of outcome are the number of attempts, and the time to effective
            ventilation.
          </p>
        </div>
      </section>

      <section className="sec band">
        <div className="sec-inner reveal">
          <span className="eyebrow">◆ State of the art</span>
          <h2>Two steps, two devices</h2>
          <p className="lead">
            A combination of fixed-diameter devices is often used to reach an anatomical spot — like
            a guidewire and a tube. A 2-step, 2-device procedure that costs precious attempts and
            time.
          </p>
        </div>
      </section>

      <section className="sec" id="c-idea">
        <div className="sec-inner reveal">
          <span className="eyebrow">◆ Our Idea</span>
          <h2>One step, one device,<br />for all the anatomy.</h2>
          <div className="idea-grid">
            <div className="gif">
              <video src="assets/device.mp4" autoPlay loop muted playsInline aria-label="Fraido device" />
            </div>
            <div>
              <h3>A single-step, single-device procedure.</h3>
              <p>
                Fraido turns intubation into a single-step, single-device procedure: the device is
                inserted thin and dilated once in place, adapting to the patient's anatomy. A fully
                mechanical hardware with continuous diameter control.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec band" id="c-team">
        <div className="sec-inner reveal">
          <span className="eyebrow">◆ Our Team</span>
          <h2>The people behind Fraido</h2>
          <div className="team">
            <div className="tcard">
              <div className="mono-av">AV</div>
              <h4>Antonio Maria Vizioli</h4>
              <div className="role">CEO</div>
              <p>Nurse · 5 years in the Emergency Department.</p>
            </div>
            <div className="tcard">
              <div className="mono-av">EF</div>
              <h4>Elia Fregonese</h4>
              <div className="role">CTO</div>
              <p>Materials & Nanotech Engineer · 4 years in the space sector.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" id="c-adv">
        <div className="sec-inner reveal">
          <span className="eyebrow">◆ Our Advisors</span>
          <h2>Medical & product expertise</h2>
          <div className="adv">
            {ADVISORS.map(a => (
              <div className="acard" key={a.name}>
                <img className="avatar" src={a.img} alt={a.name} loading="lazy" decoding="async" width={80} height={80} />
                <h5>{a.name}</h5>
                <span>{a.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec band" id="c-res">
        <div className="sec-inner reveal">
          <span className="eyebrow">◆ Resources</span>
          <h2>Decks & presentations</h2>
          <div className="res">
            <div className="rcard">
              <span className="tag">PDF · Overview</span>
              <h4>Short deck</h4>
              <p>A concise overview of Fraido, the problem and the solution.</p>
              <div className="actions">
                <a className="act act-view" href="assets/Short_Deck.pdf" target="_blank" rel="noreferrer">View deck →</a>
                <a className="act act-dl" href="assets/Short_Deck.pdf" download="Fraido_Short_Deck.pdf">Download ↓</a>
              </div>
            </div>
            <div className="rcard">
              <span className="tag">PDF · Full</span>
              <h4>Detailed deck</h4>
              <p>The complete technical and business case, in depth.</p>
              <div className="actions">
                <a className="act act-view" href="assets/Detailed_Deck.pdf" target="_blank" rel="noreferrer">View deck →</a>
                <a className="act act-dl" href="assets/Detailed_Deck.pdf" download="Fraido_Detailed_Deck.pdf">Download ↓</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec contact" id="c-contact">
        <div className="sec-inner reveal">
          <span className="eyebrow">◆ Contacts</span>
          <h2>Get in touch</h2>
          <a className="email" href="mailto:info@fraido.it">info@fraido.it</a>
        </div>
      </section>

      <footer className="foot">
        <img src="assets/logo-white.png" alt="Fraido" />
        <span>© Fraido · 2026 · All rights reserved</span>
      </footer>
    </div>
  );
};

export default App;
