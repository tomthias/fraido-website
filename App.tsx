import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react';
import { motionTokens } from './motionTokens';

const NAV_LINKS = [
  { id: 'c-challenge', label: 'Challenge' },
  { id: 'c-problem', label: 'Main problem' },
  { id: 'c-idea', label: 'Idea' },
  { id: 'c-team', label: 'Team' },
  { id: 'c-adv', label: 'Advisors' },
  { id: 'c-res', label: 'Resources' },
];

const ADVISORS = [
  { img: 'assets/adv-chiara.jpg', name: 'Chiara Sansovini', desc: 'Anesthetist · Co-author of Stargate' },
  { img: 'assets/adv-bellani.jpg', name: 'Prof. Giacomo Bellani', desc: 'Anesthetist · Professor & ICU chief' },
  { img: 'assets/adv-garroni.png', name: 'Marco Garroni', desc: 'Anesthetist · Difficult airways instructor' },
  { img: 'assets/adv-righetti.png', name: 'Roberto Righetti', desc: 'Anesthetist · Difficult airways instructor' },
  { img: 'assets/adv-bonvini.png', name: 'Stefano Bonvini', desc: 'Vascular Surgeon · Chief of vascular surgery, Trento' },
  { img: 'assets/adv-gossling.jpg', name: 'Martin Gossling', desc: 'Product designer · Head of commercial innovation, UHS Southampton' },
  { img: 'assets/adv-markle.jpg', name: 'Andrew Markle', desc: 'Anesthetist · Quality management, Saint Mary hospital' },
];

// Tactile feedback for buttons and CTAs
const pressable = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.97 },
  transition: { duration: motionTokens.duration.fast, ease: motionTokens.easing.sharp },
};

const viewportOnce = { once: true, amount: 0.15 };

// Typewriter headline for the problem section: types the three negations
// once when scrolled into view; instant with prefers-reduced-motion.
const PROBLEM_LINES = [
  { em: 'NO', rest: ' space' },
  { em: 'no', rest: ' time' },
  { em: 'no', rest: ' oxygen.' },
];
const LINE_LENGTHS = PROBLEM_LINES.map(l => l.em.length + l.rest.length);
const LINE_STARTS = LINE_LENGTHS.reduce<number[]>((acc, _, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + LINE_LENGTHS[i - 1]);
  return acc;
}, []);
const TOTAL_CHARS = LINE_STARTS[LINE_STARTS.length - 1] + LINE_LENGTHS[LINE_LENGTHS.length - 1];
const CHAR_MS = 40;
const LINE_PAUSE_MS = 220;

const ProblemHeadline: React.FC = () => {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLHeadingElement>(null);

  const done = reduce || count >= TOTAL_CHARS;

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  useEffect(() => {
    if (!started || done) return;
    // one continuous sequence: fast tick within a line, brief hold when
    // the caret drops to the next line
    const atLineBreak = LINE_STARTS.includes(count) && count > 0;
    const id = setTimeout(() => setCount(c => c + 1), atLineBreak ? LINE_PAUSE_MS : CHAR_MS);
    return () => clearTimeout(id);
  }, [started, done, count]);

  // the single caret sits on the line currently being typed
  const activeLine = LINE_STARTS.reduce((active, s, i) => (count >= s ? i : active), 0);

  return (
    <h2 ref={ref} aria-label="NO space, no time, no oxygen.">
      {PROBLEM_LINES.map((line, i) => {
        const typed = reduce
          ? LINE_LENGTHS[i]
          : Math.max(0, Math.min(count - LINE_STARTS[i], LINE_LENGTHS[i]));
        const emTyped = line.em.slice(0, typed);
        const restTyped = line.rest.slice(0, Math.max(0, typed - line.em.length));
        const showCaret = !done && started && i === activeLine;
        return (
          <span className="hline" key={line.em + line.rest} aria-hidden="true">
            {typed === 0 && !showCaret ? ' ' : (
              <>
                <em>{emTyped}</em>
                {restTyped}
                {showCaret && <span className="caret" />}
              </>
            )}
          </span>
        );
      })}
    </h2>
  );
};

// Informational cookie notice. The site sets no cookies, so there is nothing to
// consent to — this only points visitors to the Cookie Policy and is dismissed
// once, remembered in localStorage.
const NOTICE_KEY = 'fraido-cookie-notice';

const CookieNotice: React.FC = () => {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(NOTICE_KEY) === 'dismissed';
    } catch {
      // private browsing / storage disabled — show it, just don't persist
    }
    if (!seen) {
      const id = setTimeout(() => setOpen(true), 900);
      return () => clearTimeout(id);
    }
  }, []);

  const dismiss = () => {
    setOpen(false);
    try {
      localStorage.setItem(NOTICE_KEY, 'dismissed');
    } catch {
      /* nothing to persist to */
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cookie-notice"
          role="dialog"
          aria-label="Cookie notice"
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduce ? 0 : 16 }}
          transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }}
        >
          <p>
            This site uses <b>no tracking or profiling cookies</b>. Only the technical data needed to
            serve the page is processed — details in our <a href="cookie.html">Cookie Policy</a>.
          </p>
          <motion.button type="button" className="cookie-ok" onClick={dismiss} {...pressable}>
            Got it
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  const variants = useMemo(() => {
    const fadeUp = (distance: number): Variants => ({
      hidden: { opacity: 0, y: reduce ? 0 : distance },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth },
      },
    });
    return {
      heroContainer: {
        hidden: {},
        visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
      } as Variants,
      heroItem: fadeUp(motionTokens.distance.md),
      gridContainer: {
        hidden: {},
        visible: { transition: { staggerChildren: 0.07 } },
      } as Variants,
      gridItem: fadeUp(motionTokens.distance.sm),
    };
  }, [reduce]);

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

  // Gentle scroll reveals for header blocks and plain sections
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
                {activeSection === link.id && (
                  <motion.span
                    className="nav-underline"
                    layoutId="nav-underline"
                    transition={{ duration: motionTokens.duration.fast, ease: motionTokens.easing.smooth }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>
        <motion.a className="nav-cta" href="mailto:info@fraido.it" {...pressable}>Contact</motion.a>
      </nav>

      <motion.header className="hero" variants={variants.heroContainer} initial="hidden" animate="visible">
        <motion.span className="hero-badge" variants={variants.heroItem}>Difficult intubation, solved</motion.span>
        <motion.img className="hero-logo" src="assets/logo-white.png" alt="Fraido" variants={variants.heroItem} />
        <motion.p className="hero-pay" variants={variants.heroItem}><b>Intubation</b>Easy · Fast · Safe</motion.p>
        <motion.div className="hero-btns" variants={variants.heroItem}>
          <motion.a className="btn btn-fill" href="#c-challenge" {...pressable}>The Challenge →</motion.a>
          <motion.a className="btn btn-ghost" href="#c-idea" {...pressable}>Our Idea</motion.a>
        </motion.div>
      </motion.header>

      <section className="sec" id="c-challenge">
        <div className="sec-inner reveal">
          <span className="eyebrow">◆ The Challenge</span>
          <h2>Difficult Intubation</h2>
          <p className="lead">
            A critical procedure done to secure a patient's airways, deliver oxygen and administer
            medication. This life-saving technique is performed in and out of hospital, in civil and
            military settings, on either healthy or critically ill patients.
          </p>
        </div>
      </section>

      <section className="sec problem" id="c-problem">
        <div className="sec-inner">
          <div className="reveal">
            <span className="eyebrow">◆ Main problem</span>
          </div>
          <ProblemHeadline />
          <p className="lead reveal">
            Outcomes depend mainly on the number of attempts and how quickly effective ventilation is
            achieved.
          </p>
        </div>
      </section>

      <section className="sec band">
        <div className="sec-inner reveal">
          <span className="eyebrow">◆ State of the art</span>
          <h2>Two steps, two devices</h2>
          <p className="lead">
            A combination of fixed-diameter devices is often used to reach an anatomical spot — like
            a guidewire and a tube. A 2-step, 2-device procedure that costs attempts, time and
            oxygen.
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
        <div className="sec-inner">
          <div className="reveal">
            <span className="eyebrow">◆ Our Team</span>
            <h2>The people behind Fraido</h2>
          </div>
          <motion.div
            className="team"
            variants={variants.gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.div className="tcard" variants={variants.gridItem}>
              <img className="avatar tavatar" src="assets/team-antonio.jpg" alt="Antonio Maria Vizioli" loading="lazy" decoding="async" width={190} height={190} />
              <h4>Antonio Maria Vizioli</h4>
              <div className="role">CEO</div>
              <p>Nurse · 5 years in the Emergency Department.</p>
            </motion.div>
            <motion.div className="tcard" variants={variants.gridItem}>
              <img className="avatar tavatar" src="assets/team-elia.jpg" alt="Elia Fregonese" loading="lazy" decoding="async" width={190} height={190} />
              <h4>Elia Fregonese</h4>
              <div className="role">CTO</div>
              <p>Materials & Nanotech Engineer · 4 years in the space sector.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="sec" id="c-adv">
        <div className="sec-inner">
          <div className="reveal">
            <span className="eyebrow">◆ Our Advisors</span>
            <h2>Medical & product expertise</h2>
          </div>
          <motion.div
            className="adv"
            variants={variants.gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {ADVISORS.map(a => (
              <motion.div className="acard" key={a.name} variants={variants.gridItem}>
                <img className="avatar" src={a.img} alt={a.name} loading="lazy" decoding="async" width={80} height={80} />
                <h5>{a.name}</h5>
                <span>{a.desc}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="sec band" id="c-res">
        <div className="sec-inner">
          <div className="reveal">
            <span className="eyebrow">◆ Resources</span>
            <h2>Decks & presentations</h2>
          </div>
          <motion.div
            className="res"
            variants={variants.gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.div className="rcard" variants={variants.gridItem} whileHover={{ y: -3 }}>
              <span className="tag">PDF · Overview</span>
              <h4>Short deck</h4>
              <p>A concise overview of Fraido, the problem and the solution.</p>
              <div className="actions">
                <motion.a className="act act-view" href="assets/Short_Deck.pdf" target="_blank" rel="noreferrer" {...pressable}>View deck →</motion.a>
                <motion.a className="act act-dl" href="assets/Short_Deck.pdf" download="Fraido_Short_Deck.pdf" {...pressable}>Download ↓</motion.a>
              </div>
            </motion.div>
            <motion.div className="rcard" variants={variants.gridItem} whileHover={{ y: -3 }}>
              <span className="tag">PDF · Full</span>
              <h4>Detailed deck</h4>
              <p>The complete technical and business case, in depth.</p>
              <div className="actions">
                <motion.a className="act act-view" href="assets/Detailed_Deck.pdf" target="_blank" rel="noreferrer" {...pressable}>View deck →</motion.a>
                <motion.a className="act act-dl" href="assets/Detailed_Deck.pdf" download="Fraido_Detailed_Deck.pdf" {...pressable}>Download ↓</motion.a>
              </div>
            </motion.div>
          </motion.div>
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
        <div className="foot-top">
          <div className="foot-brand">
            <img src="assets/logo-white.png" alt="Fraido" />
            <a href="mailto:info@fraido.it">info@fraido.it</a>
          </div>
          <address className="foot-legal">
            <b>Fraido Srl</b>
            Via Roberto da San Severino 95 · 38122 Trento (TN) · Italy<br />
            VAT no. / Tax code 02802400222<br />
            Trento Companies Register · REA no. TN-250967<br />
            Share capital €10,000.00
          </address>
        </div>
        <div className="foot-bar">
          <span>© Fraido Srl · 2026 · All rights reserved</span>
          <nav className="foot-links">
            <a href="privacy.html">Privacy Policy</a>
            <a href="cookie.html">Cookie Policy</a>
          </nav>
        </div>
      </footer>

      <CookieNotice />
    </div>
  );
};

export default App;
