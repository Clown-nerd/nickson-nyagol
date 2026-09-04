/**
 * Terminal Monograph design reminder: present Nickson as a dependable systems builder through asymmetry, ruled metadata, and restrained lime signals.
 */
import { FormEvent, useEffect, useRef, useState } from "react";
import HeroArtifact from "@/components/HeroArtifact";
import ProjectMediaCarousel from "@/components/ProjectMediaCarousel";
import {
  ArrowDownRight,
  ArrowUpRight,
  Blocks,
  BookOpen,
  Braces,
  Check,
  CircleDot,
  Cloud,
  Code2,
  Database,
  Download,
  ExternalLink,
  FileDown,
  GitFork,
  Github,
  Layers3,
  Mail,
  MapPin,
  Menu,
  Send,
  Terminal,
  Workflow,
  X,
} from "lucide-react";

const projects = [
  {
    number: "01",
    type: "SACCO financial operations",
    name: "ChamaFlow",
    problem: "A savings group needs contributions, M-Pesa activity, loan exposure, and membership decisions to stay visible without giving every member access to every financial control.",
    build: "I built a role-aware SACCO workspace where members can inspect their own contributions, loans, and statements while officials manage the directory, reconcile payments, record contributions, and review requests.",
    impact: "The result is a clearer operating picture for the group: members get self-service visibility, while controlled approvals, policy routing, and an audit trail help officials protect shared funds and make decisions with context.",
    proof: ["Member & official workspaces", "M-Pesa reconciliation", "Staged loan approvals"],
    stack: ["React", "tRPC", "Role-based access"],
  },
  {
    number: "02",
    type: "Higher-education operations",
    name: "College MIS",
    problem: "A college’s admissions, registry, teaching, support, and finance teams need a shared student record, but sensitive academic information must remain visible only to the people responsible for each decision.",
    build: "I created a role-aware management information system that connects admissions, student records, course offerings, rosters, attendance, grade entry, GPA reporting, finance foundations, and service requests.",
    impact: "The platform gives each role an appropriate operational view while preserving an auditable system of record. That creates a more dependable foundation for daily academic work, student self-service, and governed institutional reporting.",
    proof: ["Student lifecycle record", "Teaching & grade workflows", "Audit-led role controls"],
    stack: ["React", "Drizzle", "MySQL / TiDB"],
  },
  {
    number: "03",
    type: "Appointment operations",
    name: "SlotFlow",
    problem: "Appointment-led businesses need to know their capacity before changing a schedule, while customers need a booking path that cannot create conflicts for staff, services, or shared resources.",
    build: "I designed an operations hub and customer booking journey that holds a time during deposit, validates availability at the server boundary, tracks payment state, confirms appointments, and records reminders.",
    impact: "Operators can run the day with less ambiguity, staff can prepare from an accurate schedule, and customers get a clearer route from service selection to confirmation. Valid slots and conflict checks protect bookable capacity as the business grows.",
    proof: ["Availability rules", "Deposit & confirmation flow", "Staff / resource conflict checks"],
    stack: ["React", "Scheduling domain", "M-Pesa flow"],
  },
  {
    number: "04",
    type: "Inventory command centre",
    name: "StockFlow",
    problem: "When stock is spread across facilities, teams need to see availability, exceptions, fulfillment demand, and working-capital exposure without forcing executives and warehouse staff into the same overloaded workspace.",
    build: "I built a role-specific inventory platform with catalog control, stock receipts, reorder signals, warehouse coverage, order queues, CSV exports, and configurable alert safeguards.",
    impact: "Executives gain a strategic network view, while warehouse teams get an actionable floor-level queue. Together, those perspectives turn inventory from a reactive ledger into a shared decision surface for keeping fulfillment ready.",
    proof: ["Reorder exception queue", "Role-aware warehouse views", "Inventory & order signals"],
    stack: ["React", "Inventory domain", "Operational analytics"],
  },
  {
    number: "05",
    type: "Editorial commerce",
    name: "Aurelia Commerce",
    problem: "A considered home-goods brand needs an online storefront that helps people browse a collection with intention instead of flattening every product into a generic retail grid.",
    build: "I created a headless commerce storefront with an editorial landing experience, mood-led collection paths, product discovery, and a direct route into the shop.",
    impact: "The storefront gives the brand a more deliberate way to present its products, materials, and point of view. It helps turn visual interest into a shoppable journey while keeping the buying experience clear.",
    proof: ["Collection-led navigation", "Product discovery", "Headless storefront"],
    stack: ["React", "tRPC", "Commerce catalog"],
  },
  {
    number: "06",
    type: "Craft-brand storefront",
    name: "CrochetEra.",
    problem: "A handmade collection needs more than a catalog: the online experience must communicate the pace, material, and care behind each piece before a visitor decides to explore it further.",
    build: "I developed a responsive storefront that pairs a featured-product story with a live collection preview, product routes, thoughtful loading states, and browsing paths built around the brand’s slower, tactile point of view.",
    impact: "The business gets a digital storefront that supports merchandising without losing its personality. Visitors can discover the collection through a more distinctive narrative while still moving naturally toward individual products.",
    proof: ["Featured-piece storytelling", "Live product collection", "Responsive product routes"],
    stack: ["React", "tRPC", "Commerce catalog"],
  },
  {
    number: "07",
    type: "AI product narrative",
    name: "NeuralForge",
    problem: "Teams working across many tools can lose the connection between decisions, dependencies, and the next useful action. An AI product in that space needs its value to be understandable before it can be trusted.",
    build: "I shaped an interactive product narrative that explains NeuralForge through context, intelligence, and action layers—then lets visitors inspect the workflow story before requesting a private preview.",
    impact: "The experience gives a complex operational-intelligence offer a focused commercial path. It turns an abstract proposition into a clear story about aligning scattered context, surfacing leverage, and keeping human judgement in the loop.",
    proof: ["Interactive product anatomy", "Context-to-action narrative", "Preview conversion path"],
    stack: ["React", "Interaction design", "Product positioning"],
  },
];

const skillGroups = [
  { label: "Frontend systems", value: 94, tools: "React · TypeScript · Next.js" },
  { label: "Backend architecture", value: 91, tools: "Node.js · APIs · PostgreSQL" },
  { label: "Cloud & delivery", value: 86, tools: "Docker · CI/CD · AWS" },
  { label: "Design collaboration", value: 82, tools: "Figma · A11y · Design systems" },
];

const posts = [
  {
    kind: "Engineering notes",
    read: "6 min",
    title: "The boring path to durable API boundaries",
    body: "A practical way to keep services legible as a codebase and team both grow.",
  },
  {
    kind: "Frontend systems",
    read: "8 min",
    title: "Interfaces should explain themselves under pressure",
    body: "What error states, loading states, and layout stability reveal about product quality.",
  },
  {
    kind: "Open source",
    read: "4 min",
    title: "Small pull requests are a compounding practice",
    body: "How focused contributions build trust in repositories you did not create.",
  },
];

const tech = [
  { icon: Braces, label: "TypeScript" },
  { icon: Blocks, label: "React" },
  { icon: Database, label: "PostgreSQL" },
  { icon: Cloud, label: "Cloud" },
  { icon: Workflow, label: "CI / CD" },
];

const typingTechStack = tech.map((item) => item.label);

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [typedTech, setTypedTech] = useState("");
  const [techIndex, setTechIndex] = useState(0);
  const [isDeletingTech, setIsDeletingTech] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const heroSceneRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setTypedTech(typingTechStack.join(" · "));
      return;
    }

    const currentTech = typingTechStack[techIndex];
    const isWordComplete = typedTech === currentTech;
    const isWordCleared = isDeletingTech && typedTech.length === 0;
    const delay = isDeletingTech ? 42 : isWordComplete ? 1500 : 82;

    const timer = window.setTimeout(() => {
      if (isWordComplete && !isDeletingTech) {
        setIsDeletingTech(true);
      } else if (isWordCleared) {
        setIsDeletingTech(false);
        setTechIndex((index) => (index + 1) % typingTechStack.length);
      } else {
        setTypedTech((text) => currentTech.slice(0, text.length + (isDeletingTech ? -1 : 1)));
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [isDeletingTech, reducedMotion, techIndex, typedTech]);

  useEffect(() => {
    const root = document.documentElement;
    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const updateScrollProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      root.style.setProperty("--page-scroll", String(maxScroll > 0 ? window.scrollY / maxScroll : 0));
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);

    if (reducedMotion) {
      root.removeAttribute("data-motion");
      revealTargets.forEach((target) => target.setAttribute("data-inview", "true"));
      return () => {
        window.removeEventListener("scroll", updateScrollProgress);
        window.removeEventListener("resize", updateScrollProgress);
      };
    }

    root.dataset.motion = "enhanced";
    if (!("IntersectionObserver" in window)) {
      revealTargets.forEach((target) => target.setAttribute("data-inview", "true"));
      return () => {
        window.removeEventListener("scroll", updateScrollProgress);
        window.removeEventListener("resize", updateScrollProgress);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-inview", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0 },
    );
    revealTargets.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
      root.removeAttribute("data-motion");
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, [reducedMotion]);

  const updateHeroDepth = (event: React.PointerEvent<HTMLElement>) => {
    if (reducedMotion || event.pointerType === "touch" || !heroSceneRef.current) return;
    const bounds = heroSceneRef.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    heroSceneRef.current.style.setProperty("--scene-x", `${x * 24}px`);
    heroSceneRef.current.style.setProperty("--scene-y", `${y * 18}px`);
    heroSceneRef.current.style.setProperty("--scene-rx", `${y * -4}deg`);
    heroSceneRef.current.style.setProperty("--scene-ry", `${x * 5}deg`);
  };

  const resetHeroDepth = () => {
    if (!heroSceneRef.current) return;
    heroSceneRef.current.style.setProperty("--scene-x", "0px");
    heroSceneRef.current.style.setProperty("--scene-y", "0px");
    heroSceneRef.current.style.setProperty("--scene-rx", "0deg");
    heroSceneRef.current.style.setProperty("--scene-ry", "0deg");
  };

  const updateProjectTilt = (event: React.PointerEvent<HTMLElement>) => {
    if (reducedMotion || event.pointerType === "touch") return;
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    card.style.setProperty("--card-rx", `${y * -2.1}deg`);
    card.style.setProperty("--card-ry", `${x * 2.3}deg`);
  };

  const resetProjectTilt = (event: React.PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--card-rx", "0deg");
    event.currentTarget.style.setProperty("--card-ry", "0deg");
  };

  const downloadResume = () => {
    const text = `NICKSON NYAGOL\nFULL-STACK DEVELOPER\n\nPROFILE\nFull-stack developer focused on reliable web systems, thoughtful interfaces, and durable product foundations.\n\nCORE PRACTICE\nTypeScript, React, Next.js, Node.js, PostgreSQL, APIs, Docker, CI/CD, accessibility, design systems.\n\nSELECTED WORK\nBranchline — multitenant workflow platform.\nNorthstar — observability layer for web infrastructure.\nField Notes — publishing platform for product knowledge.\n\nThis portable résumé is an illustrative portfolio artifact. Replace this text with Nickson Nyagol's verified career history before external use.\n`;
    const href = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = "nickson-nyagol-resume.txt";
    anchor.click();
    URL.revokeObjectURL(href);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  };

  const handlePlaceholderLink = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.alert("Add Nickson’s live project URL or repository URL before publishing this portfolio.");
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#080a0a] text-[#e4e9e1]">
      <div className="technical-rail" aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true" />
      <header className="sticky top-0 z-50 border-b border-[#27312c] bg-[#080a0a]/92 backdrop-blur-xl">
        <div className="shell flex h-[72px] items-center justify-between">
          <a href="#top" className="focus-ring flex items-center gap-3" aria-label="Nickson Nyagol home">
            <span className="monogram-mark" aria-hidden="true"><i /><i /><i /><i /><i /><i /></span>
            <span className="mono text-[11px] font-medium uppercase tracking-[0.14em] text-[#e4e9e1]">Nickson Nyagol</span>
          </a>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
            {[
              ["Work", "#work"],
              ["Capabilities", "#capabilities"],
              ["Writing", "#writing"],
            ].map(([label, href]) => (
              <a key={href} href={href} className="focus-ring mono text-[11px] uppercase tracking-[0.12em] text-[#9ba39e] transition-colors hover:text-[#c6ff3f]">
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a href="#contact" className="focus-ring mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.11em] text-[#c6ff3f] transition-transform hover:translate-x-1">
              Start a conversation <ArrowUpRight size={14} />
            </a>
          </div>

          <button className="focus-ring text-[#c6ff3f] md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="shell flex flex-col gap-5 border-t border-[#27312c] py-6 md:hidden" aria-label="Mobile navigation">
            {[
              ["Work", "#work"],
              ["Capabilities", "#capabilities"],
              ["Writing", "#writing"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="mono text-xs uppercase tracking-[0.14em] text-[#dfe5dd]">
                {label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main id="top" className="flow-log">
          <section ref={heroSceneRef} className="hero-scene grid-grain relative border-b border-[#27312c]" onPointerMove={updateHeroDepth} onPointerLeave={resetHeroDepth} onPointerCancel={resetHeroDepth}>
          <span className="hero-plane hero-plane-one" aria-hidden="true" />
          <span className="hero-plane hero-plane-two" aria-hidden="true" />
          <div className="shell grid min-h-[690px] items-end gap-12 py-14 md:grid-cols-[1fr_0.78fr] md:py-20 lg:min-h-[720px]">
            <div className="hero-copy-depth relative z-10 flex flex-col items-start pb-2 md:pb-10">
              <div className="mono mb-7 flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-[#9ba39e]">
                <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c6ff3f] opacity-50" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#c6ff3f]" /></span>
                Available for selected work
              </div>
              <p className="mono mb-6 text-[11px] uppercase tracking-[0.14em] text-[#c6ff3f]">Full-stack developer / Toronto, CA</p>
              <h1 className="display max-w-[760px] text-[clamp(4rem,10.3vw,9rem)] font-semibold leading-[0.83] tracking-[-0.09em] text-[#f3f5f1]">
                Systems that<br />
                <span className="text-[#c6ff3f]">ship.</span> And stay<br />
                <span className="text-[#758078]">shipped</span><span className="cursor-blink text-[#c6ff3f]">_</span>
              </h1>
              <p className="mt-8 max-w-[550px] text-[17px] leading-7 text-[#aab3ad] md:text-[19px]">
                I’m Nickson, a full-stack developer turning ambitious product ideas into reliable, human-centered web software.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#work" className="lime-button focus-ring">Open the work log <ArrowDownRight size={17} /></a>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="outline-button focus-ring">GitHub <Github size={17} /></a>
              </div>
              <div className="mt-12 border-t border-[#354038] pt-5" aria-label={`Core technology stack: ${typingTechStack.join(", ")}`}>
                <p className="mono flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-[#9ba59d]">
                  <span className="text-[#657067]">Toolchain /</span>
                  <span aria-hidden="true" className="text-[#c6ff3f]">{typedTech}<span className="typing-cursor">_</span></span>
                </p>
                <div className="mt-4 flex flex-wrap gap-x-7 gap-y-4">
                  {tech.map(({ icon: Icon, label }, index) => <span key={label} className="mono flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-[#838d86]"><Icon size={15} className={index === 0 ? "text-[#c6ff3f]" : "text-[#58645b]"} /> {label}</span>)}
                </div>
              </div>
            </div>

            <div className="hero-visual-card relative self-end md:justify-self-end">
              <span className="depth-chip depth-chip-one" aria-hidden="true">layer / 02</span>
              <span className="depth-chip depth-chip-two" aria-hidden="true">z-axis / live</span>
              <HeroArtifact reducedMotion={reducedMotion} />
            </div>
          </div>
        </section>

        <section id="work" className="log-section shell py-24 md:py-32 reveal" data-log="02 / WORK" data-reveal data-inview="false">
          <div className="grid gap-10 border-b border-[#27312c] pb-12 md:grid-cols-[1.15fr_0.85fr] md:items-end">
            <div><p className="eyebrow">Built systems / 2022—2026</p><h2 className="section-title">Every build starts<br />with a <span className="text-[#c6ff3f]">friction point.</span></h2></div>
            <p className="max-w-[415px] text-[16px] leading-7 text-[#9ca59f] md:justify-self-end">These are stories of operational knots becoming clearer systems: a problem worth solving, the product built around it, and the practical value it unlocks.</p>
          </div>

          <div className="case-log mt-8">
            <p className="log-cue mb-5">LOG/WORK · sector 02 · seven systems in the field</p>
            {projects.map((project, index) => (
              <article key={project.number} className={`case-story project-tilt reveal ${project.number === "02" ? "case-featured" : ""}`} data-case={project.number} data-reveal data-inview="false" style={{ transitionDelay: `${index * 65}ms` }} onPointerMove={updateProjectTilt} onPointerLeave={resetProjectTilt} onPointerCancel={resetProjectTilt}>
                <div className="case-stamp"><span className="case-node" aria-hidden="true" /><p className="mono text-[11px] tracking-[0.14em] text-[#778279]">{project.number} /</p><p className="mono mt-5 text-[9px] uppercase tracking-[0.13em] text-[#7f8a82]">{project.type}</p></div>
                <div className="case-title"><h3>{project.name}</h3><p className="case-kicker">A story of making work easier to move.</p><div className="mt-6 flex flex-wrap gap-2">{project.stack.map((item) => <span key={item} className="mono border border-[#354038] px-2.5 py-1 text-[9px] uppercase tracking-[0.08em] text-[#aeb7b0]">{item}</span>)}</div></div>
                <div className="case-narrative"><div><p className="case-label">The friction</p><p>{project.problem}</p></div><div><p className="case-label">What I built</p><p>{project.build}</p></div><div><p className="case-label">What it advances</p><p>{project.impact}</p></div></div>
                <div className="case-media"><ProjectMediaCarousel projectName={project.name} projectNumber={project.number} /></div>
                <div className="case-proof"><p className="case-label">In the system</p>{project.proof.map((item) => <p key={item} className="case-proof-item"><span />{item}</p>)}<div className="case-link-pending"><ExternalLink size={14} /><span>Live link / to be added</span></div></div>
              </article>
            ))}
          </div>
        </section>

        <section id="capabilities" className="log-section border-y border-[#27312c] bg-[#101512] reveal" data-log="03 / CAP" data-reveal data-inview="false">
          <div className="shell grid gap-16 py-24 md:grid-cols-[0.75fr_1.25fr] md:py-32">
            <div><p className="eyebrow">Capabilities / signal map</p><h2 className="section-title text-[clamp(2.4rem,4.8vw,4.8rem)]">Wide enough to connect the dots.</h2><p className="mt-7 max-w-[340px] leading-7 text-[#9ca59f]">I work across the product surface so the decisions between interface, data, and delivery stay intentional.</p></div>
            <div className="border-t border-[#3a463d]">
              <p className="log-cue pb-5 pt-4">CAP/MATRIX · last audited 2026.08</p>
              {skillGroups.map((skill, index) => <div key={skill.label} className="grid gap-5 border-b border-[#3a463d] py-6 sm:grid-cols-[1fr_2fr_auto] sm:items-center">
                <div><p className="mono text-[11px] uppercase tracking-[0.12em] text-[#e4e9e1]">{skill.label}</p><p className="mono mt-2 text-[10px] tracking-[0.04em] text-[#89938c]">{skill.tools}</p></div>
                <div className="h-[7px] bg-[#253027]"><div className={index === 0 ? "h-full bg-[#c6ff3f]" : "h-full bg-[#78837b]"} style={{ width: `${skill.value}%` }} /></div>
                <p className={index === 0 ? "mono text-[11px] text-[#c6ff3f]" : "mono text-[11px] text-[#aab3ad]"}>{skill.value}%</p>
              </div>)}
              <div className="grid gap-4 pt-8 sm:grid-cols-3">
                {[{icon: Terminal, label:"120+", detail:"releases cared for"},{icon: GitFork, label:"38", detail:"open-source pull requests"},{icon: Layers3, label:"8", detail:"design systems partnered"}].map(({icon: Icon,label,detail}) => <div key={detail} className="border border-[#3a463d] p-5"><Icon size={18} className="text-[#c6ff3f]"/><p className="mt-6 text-3xl font-medium tracking-[-0.06em]">{label}</p><p className="mono mt-1 text-[10px] uppercase tracking-[0.1em] text-[#89938c]">{detail}</p></div>)}
              </div>
            </div>
          </div>
        </section>

        <section className="log-section shell grid gap-8 py-24 reveal md:grid-cols-[1.25fr_0.75fr] md:py-32" data-log="04 / OSS" data-reveal data-inview="false">
          <div className="dimension-panel relative border border-[#3a463d] bg-[#0e120f] p-7 md:p-10">
            <div className="absolute -left-px top-8 h-20 w-px bg-[#c6ff3f]" />
            <p className="eyebrow">Open source / working in public</p><p className="log-cue mt-5">OSS/TRACE · issue to merge</p>
            <h2 className="mt-7 max-w-[700px] text-[clamp(2.4rem,4.6vw,4.5rem)] font-medium leading-[0.96] tracking-[-0.065em]">The web gets better when the maintenance work is shared.</h2>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="focus-ring mt-10 inline-flex items-center gap-2 border-b border-[#c6ff3f] pb-1.5 mono text-[11px] uppercase tracking-[0.1em] text-[#c6ff3f]">View GitHub activity <ArrowUpRight size={14} /></a>
          </div>
          <div className="grid grid-cols-2 gap-px bg-[#3a463d]">
            {["Docs", "Tooling", "A11y", "Reviews"].map((item, index) => <div key={item} className="flex min-h-40 flex-col justify-between bg-[#080a0a] p-5"><CircleDot size={17} className={index === 0 ? "text-[#c6ff3f]" : "text-[#58645b]"}/><p className="mono text-[11px] uppercase tracking-[0.12em] text-[#aab3ad]">{item}</p></div>)}
          </div>
        </section>

        <section id="writing" className="log-section border-y border-[#27312c] bg-[#0d100e] reveal" data-log="05 / LOG" data-reveal data-inview="false">
          <div className="shell py-24 md:py-32">
            <div className="flex flex-col justify-between gap-8 border-b border-[#27312c] pb-10 md:flex-row md:items-end"><div><p className="eyebrow">Writing / ongoing log</p><h2 className="section-title">Notes from the<br /><span className="text-[#c6ff3f]">workbench.</span></h2></div><a href="#contact" className="focus-ring mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-[#9ca59f] hover:text-[#c6ff3f]">Ask about a topic <ArrowUpRight size={14}/></a></div>
            <div className="grid divide-y divide-[#27312c] md:grid-cols-3 md:divide-x md:divide-y-0">
              {posts.map((post, index) => <article key={post.title} className="group px-0 py-8 reveal md:px-7 md:first:pl-0 md:last:pr-0" data-reveal data-inview="false" style={{ transitionDelay: `${index * 80}ms` }}><div className="flex items-center justify-between mono text-[10px] uppercase tracking-[0.11em] text-[#89938c]"><span>{post.kind}</span><span>{post.read}</span></div><p className="mono mt-5 text-[9px] uppercase tracking-[0.12em] text-[#59645d]">NOTE/{String(index + 1).padStart(2, "0")} · archived</p><h3 className="mt-7 text-2xl font-medium leading-[1.05] tracking-[-0.05em] text-[#edf1eb] transition-colors group-hover:text-[#c6ff3f]">{post.title}</h3><p className="mt-4 leading-7 text-[#9ca59f]">{post.body}</p><a href="#writing" onClick={handlePlaceholderLink} className="focus-ring mono mt-7 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.1em] text-[#89938c] hover:text-[#c6ff3f]">Read note <ArrowDownRight size={14}/></a></article>)}
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="log-section grid-grain border-b border-[#27312c] bg-[#080a0a] reveal" data-log="06 / CONTACT" data-reveal data-inview="false">
        <div className="shell grid gap-16 py-24 md:grid-cols-[0.9fr_1.1fr] md:py-32">
          <div><p className="eyebrow">Contact / next build</p><h2 className="mt-7 text-[clamp(3.2rem,6vw,6.2rem)] font-semibold leading-[0.85] tracking-[-0.085em] text-[#f2f4f0]">Start with<br />the <span className="text-[#c6ff3f]">hard part.</span></h2><p className="mt-8 max-w-[430px] text-[17px] leading-7 text-[#a2aaa4]">Tell me where the product or platform is getting stuck. I’ll bring a systems lens, a working style, and a bias toward momentum.</p><div className="mt-12 space-y-4 mono text-[11px] uppercase tracking-[0.1em]"><a href="mailto:nickson.nyagol@example.com" className="focus-ring flex w-fit items-center gap-3 text-[#c6ff3f]"><Mail size={16}/> nickson.nyagol@example.com</a><p className="flex items-center gap-3 text-[#909991]"><MapPin size={16}/> Toronto / remote-friendly</p><button onClick={downloadResume} className="focus-ring flex items-center gap-3 text-[#e4e9e1] hover:text-[#c6ff3f]"><Download size={16}/> Download résumé <span className="text-[#687269]">.txt</span></button></div></div>
          <form onSubmit={handleSubmit} className="self-end border-t border-[#c6ff3f] pt-7">
            <div className="grid gap-6 sm:grid-cols-2"><label className="mono text-[10px] uppercase tracking-[0.12em] text-[#8d9790]">Name<input required name="name" placeholder="Your name" className="mt-3 w-full border-b border-[#3a463d] bg-transparent pb-3 font-sans text-base normal-case tracking-normal text-[#e4e9e1] outline-none placeholder:text-[#535e56] focus:border-[#c6ff3f]" /></label><label className="mono text-[10px] uppercase tracking-[0.12em] text-[#8d9790]">Email<input required type="email" name="email" placeholder="you@company.com" className="mt-3 w-full border-b border-[#3a463d] bg-transparent pb-3 font-sans text-base normal-case tracking-normal text-[#e4e9e1] outline-none placeholder:text-[#535e56] focus:border-[#c6ff3f]" /></label></div>
            <label className="mono mt-8 block text-[10px] uppercase tracking-[0.12em] text-[#8d9790]">What are you building?<textarea required name="message" rows={5} placeholder="A few useful details are enough." className="mt-3 w-full resize-none border-b border-[#3a463d] bg-transparent pb-3 font-sans text-base normal-case tracking-normal text-[#e4e9e1] outline-none placeholder:text-[#535e56] focus:border-[#c6ff3f]" /></label>
            <div className="mt-7 flex flex-wrap items-center justify-between gap-5"><button type="submit" className="lime-button focus-ring">Send the brief <Send size={16}/></button>{submitted ? <p className="mono flex items-center gap-2 text-[10px] uppercase tracking-[0.1em] text-[#c6ff3f]"><Check size={15}/> Draft captured locally</p> : <p className="mono max-w-[240px] text-[9px] uppercase leading-5 tracking-[0.08em] text-[#687269]">Static demo form — connect delivery before publishing.</p>}</div>
          </form>
        </div>
        <div className="shell flex flex-col justify-between gap-4 border-t border-[#27312c] py-6 mono text-[10px] uppercase tracking-[0.1em] text-[#687269] sm:flex-row"><p className="flex items-center gap-3"><span className="monogram-mark monogram-mark-footer" aria-hidden="true"><i /><i /><i /><i /><i /><i /></span> © 2026 Nickson Nyagol / Built with intent</p><a href="#top" className="focus-ring inline-flex items-center gap-2 hover:text-[#c6ff3f]">Back to top <ArrowUpRight size={13}/></a></div>
      </footer>
    </div>
  );
}
