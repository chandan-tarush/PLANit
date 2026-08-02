import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  FileText,
  Lightbulb,
  PlayCircle,
  Rocket,
  Route,
  ShieldAlert,
  Sparkles,
  Users,
} from 'lucide-react';
import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BrandLogo } from '../components/BrandLogo';

const features = [
  { icon: CheckCircle2, title: 'MVP Definition', text: 'Define the smallest version that delivers real value.' },
  { icon: Route, title: 'Smart Roadmaps', text: 'Step-by-step roadmap with milestones and deadlines.' },
  { icon: ClipboardList, title: 'Task Breakdown', text: 'Break down work into actionable tasks and ownership.' },
  { icon: ShieldAlert, title: 'Risk & Assumptions', text: 'Identify risks early and plan for what could go wrong.' },
  { icon: Users, title: 'Team Alignment', text: 'Keep roles, responsibilities, and progress visible.' },
  { icon: FileText, title: 'Export & Share', text: 'Export plans for docs, reviews, and team handoff.' },
];

const steps = [
  { icon: Lightbulb, title: 'Add Your Context', text: 'Share your idea, target users, timeline, constraints, budget, and team size.' },
  { icon: Sparkles, title: 'AI Creates Your Plan', text: 'PlanIt structures your project into scope, milestones, tasks, risks, and roadmap.' },
  { icon: Rocket, title: 'Execute with Confidence', text: 'Move from uncertainty to a concrete build plan your team can follow.' },
];

const rise = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

export function LandingPage() {
  return (
    <div className="landing-shell min-h-screen overflow-hidden bg-[#020617] text-white">
      <SplashIntro />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#020617]/72 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-14">
          <BrandLogo />
          <nav className="hidden items-center gap-9 text-sm font-semibold text-white/72 lg:flex">
            {['Product', 'Templates', 'Pricing', 'Resources', 'Changelog'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-white">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="hidden text-sm font-semibold text-white/74 transition hover:text-white sm:block">
              Log in
            </Link>
            <Link to="/planner" className="neon-button">
              Start Planning
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </header>

      <section className="relative min-h-screen px-6 pb-20 pt-28 lg:px-14">
        <HeroAtmosphere />
        <div className="relative z-10 mx-auto grid max-w-[1440px] items-center gap-16 lg:min-h-[780px] lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }}>
            <motion.div variants={rise} className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-xs font-bold text-white/75 shadow-[0_0_40px_rgba(124,58,237,0.18)]">
              <Sparkles size={15} className="text-[#ff5ac8]" />
              AI-Powered Project Planning
            </motion.div>
            <motion.h1 variants={rise} className="max-w-3xl text-5xl font-black leading-[1.04] tracking-[-0.02em] md:text-7xl">
              Turn ideas into execution plans <span className="gradient-text">that actually get built.</span>
            </motion.h1>
            <motion.p variants={rise} className="mt-8 max-w-xl text-lg leading-8 text-white/70">
              PlanIt turns scattered notes, assumptions, and ideas into a clear roadmap with tasks, milestones, risks, and everything your team needs to deliver.
            </motion.p>
            <motion.div variants={rise} className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link to="/planner" className="neon-button h-14 px-7">
                Start Planning for Free
                <ArrowRight size={18} />
              </Link>
              <a href="#demo" className="glass-button h-14 px-7">
                <PlayCircle size={18} />
                Watch Demo
              </a>
            </motion.div>
            <motion.div variants={rise} className="mt-9 flex items-center gap-4">
              <div className="flex -space-x-3">
                {['C', 'T', 'A'].map((item) => (
                  <div key={item} className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-gradient-to-br from-[#7c3aed] to-[#ff7a2f] text-sm font-black">
                    {item}
                  </div>
                ))}
              </div>
              <div className="text-sm text-white/62">
                Trusted by builders worldwide
                <div className="font-semibold text-white">150+ projects planned</div>
              </div>
            </motion.div>
            <motion.div variants={rise} className="mt-12">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-white/38">Featured on</div>
              <div className="mt-4 flex flex-wrap items-center gap-6 text-xs font-bold uppercase tracking-wide text-white/38">
                <span>Product Hunt</span>
                <span>Indie Hackers</span>
                <span>Excalidraw</span>
                <span>Makerpad</span>
              </div>
            </motion.div>
          </motion.div>

          <DashboardPreview />
        </div>
      </section>

      <section id="product" className="relative px-6 py-20 lg:px-14">
        <div className="mx-auto max-w-[1280px]">
          <SectionHeading eyebrow="How PlanIt Works" title="From chaos to clarity in 3 steps" />
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div key={step.title} variants={rise} className="feature-panel">
                <div className="flex items-center justify-between">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#7c3aed]/25 text-[#b879ff] shadow-[0_0_38px_rgba(124,58,237,0.35)]">
                    <step.icon size={25} />
                  </div>
                  <span className="text-sm font-bold text-white/34">0{index + 1}</span>
                </div>
                <h3 className="mt-7 text-xl font-bold">{step.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/62">{step.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="templates" className="px-6 py-20 lg:px-14">
        <div className="mx-auto max-w-[1280px]">
          <SectionHeading title="Everything you need to plan and build" />
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="mt-12 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
            {features.map((feature) => (
              <motion.div key={feature.title} variants={rise} className="feature-strip">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#7c3aed]/18 text-[#b879ff]">
                  <feature.icon size={22} />
                </div>
                <h3 className="mt-5 font-bold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/55">{feature.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="resources" className="px-6 py-12 lg:px-14">
        <div className="mx-auto grid max-w-[1280px] gap-8 rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 shadow-[0_0_90px_rgba(124,58,237,0.16)] backdrop-blur-xl lg:grid-cols-[0.42fr_0.58fr]">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-white/42">Visual roadmaps</div>
            <h2 className="mt-5 text-4xl font-black leading-tight">See the big picture. Stay on track.</h2>
            <p className="mt-5 text-sm leading-7 text-white/62">PlanIt gives you a visual roadmap so you always know what is next and how everything connects.</p>
            <Link to="/planner" className="glass-button mt-8 inline-flex h-12 px-5">
              Explore Roadmaps
              <ArrowRight size={17} />
            </Link>
          </div>
          <RoadmapPreview />
        </div>
      </section>

      <section className="px-6 py-12 lg:px-14">
        <div className="mx-auto grid max-w-[1280px] gap-5 rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-xl md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="text-7xl font-black text-[#b879ff]">"</div>
            <p className="text-sm leading-7 text-white/70">PlanIt is like having a co-founder who organizes chaos into a clear plan.</p>
            <p className="mt-5 text-sm font-bold">Arjun R.</p>
          </div>
          <Stat value="150+" label="Projects Planned" />
          <Stat value="10K+" label="Tasks Generated" />
          <Stat value="98%" label="Users Love PlanIt" />
        </div>
      </section>

      <section id="pricing" className="relative px-6 py-24 text-center lg:px-14">
        <div className="cta-glow" />
        <div className="relative mx-auto max-w-3xl">
          <h2 className="text-4xl font-black leading-tight md:text-5xl">Ready to turn your ideas into <span className="gradient-text">real-world products?</span></h2>
          <Link to="/planner" className="neon-button mx-auto mt-8 h-14 w-fit px-8">
            Start Planning for Free
            <ArrowRight size={18} />
          </Link>
          <p className="mt-4 text-sm text-white/42">No credit card required. Free forever plan.</p>
        </div>
      </section>

      <footer className="border-t border-white/8 px-6 py-12 lg:px-14">
        <div className="mx-auto grid max-w-[1280px] gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_1.2fr]">
          <div>
            <BrandLogo />
            <p className="mt-5 max-w-xs text-sm leading-6 text-white/52">AI-powered project planning for builders and dreamers.</p>
          </div>
          <FooterColumn title="Product" items={['Features', 'Templates', 'Pricing', 'Changelog']} />
          <FooterColumn title="Resources" items={['Docs', 'Guides', 'Blog', 'Help Center']} />
          <div>
            <h3 className="font-bold">Stay in the loop</h3>
            <p className="mt-3 text-sm leading-6 text-white/52">Get tips on planning, building, and launching better products.</p>
            <div className="mt-5 flex overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <input className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-white/35" placeholder="Enter your email" />
              <button className="grid w-12 place-items-center bg-[#7c3aed]" aria-label="Subscribe">
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SplashIntro() {
  return (
    <section className="relative grid min-h-screen overflow-hidden px-6 py-8">
      <HeroAtmosphere />
      <div className="relative z-10 flex items-start justify-between">
        <BrandLogo />
        <Link to="/dashboard" className="flex items-center gap-3 text-sm font-semibold text-white/72 transition hover:text-white">
          Skip Intro
          <ArrowRight size={20} />
        </Link>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center pb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: -420, scale: 0.48, rotate: -12, filter: 'blur(14px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
          className="splash-card relative grid h-44 w-44 place-items-center md:h-52 md:w-52"
        >
          <img src="/planit-mark.png" alt="" className="relative h-full w-full object-contain drop-shadow-[0_0_70px_rgba(168,85,247,0.7)]" />
          <div className="absolute -bottom-16 left-1/2 h-14 w-[460px] -translate-x-1/2 rounded-full bg-[#a855f7]/35 blur-2xl" />
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.75 }} className="mt-24 text-7xl font-black leading-none tracking-[-0.05em] md:text-8xl">
          Plan<span className="gradient-text">It</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72, duration: 0.7 }} className="mt-5 text-xl text-white/72 md:text-2xl">
          Turn ideas into execution plans that <span className="gradient-text font-bold">get built.</span>
        </motion.p>

        <motion.div variants={stagger} initial="hidden" animate="visible" className="mt-12 grid w-full gap-4 text-left md:grid-cols-4">
          {[
            { icon: Lightbulb, label: 'Capture Ideas' },
            { icon: ClipboardList, label: 'AI Planning' },
            { icon: Rocket, label: 'Execute Confidently' },
            { icon: Route, label: 'Track Progress' },
          ].map((item) => (
            <motion.div key={item.label} variants={rise} className="flex items-center justify-center gap-4 border-white/10 px-4 py-3 md:border-r md:last:border-r-0">
              <div className="grid h-12 w-12 place-items-center rounded-full border border-[#b879ff]/30 bg-[#7c3aed]/16 text-[#b879ff] shadow-[0_0_28px_rgba(124,58,237,0.42)]">
                <item.icon size={24} />
              </div>
              <span className="font-medium text-white/78">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <a href="#product" className="mt-14 flex flex-col items-center gap-5 text-sm font-medium tracking-[0.18em] text-white/58 transition hover:text-white">
          Scroll to explore
          <span className="relative h-11 w-px bg-[#7c3aed]/60">
            <ArrowRight size={34} className="absolute -left-4 bottom-0 rotate-90 text-[#b879ff]" />
          </span>
        </a>
      </div>
    </section>
  );
}

function HeroAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-10 h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-[#7c3aed]/20 blur-[120px]" />
      <div className="absolute bottom-0 left-[-8%] h-80 w-80 rounded-full bg-[#7c3aed]/24 blur-[90px]" />
      <div className="absolute bottom-0 right-[-8%] h-80 w-80 rounded-full bg-[#ff7a2f]/20 blur-[90px]" />
      <div className="spark-field">
        {Array.from({ length: 18 }).map((_, index) => (
          <span key={index} style={{ '--i': index } as CSSProperties} />
        ))}
      </div>
      <div className="orbital orbital-one" />
      <div className="orbital orbital-two" />
      <div className="beam beam-one" />
      <div className="beam beam-two" />
      <div className="beam beam-three" />
    </div>
  );
}

function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 80, y: 34, rotate: 5, scale: 0.92 }}
      whileInView={{ opacity: 1, x: 0, y: 0, rotate: 2, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="motion-float relative mx-auto w-full max-w-3xl rounded-[2rem] border border-white/15 bg-white/[0.055] p-5 shadow-[0_40px_120px_rgba(124,58,237,0.32)] backdrop-blur-xl lg:rotate-[2deg]"
    >
      <div className="grid gap-4 lg:grid-cols-[0.34fr_0.66fr]">
        <div className="rounded-2xl border border-white/8 bg-[#050a1a]/80 p-4">
          <BrandLogo compact />
          <div className="mt-8 space-y-2">
            {['Home', 'Projects', 'Templates', 'History', 'Analytics'].map((item, index) => (
              <div key={item} className={`rounded-xl px-3 py-3 text-sm ${index === 0 ? 'bg-[#7c3aed]/30 text-white' : 'text-white/52'}`}>{item}</div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <PreviewCard title="Create New Plan" text="Describe your idea and let AI handle the rest." />
            <PreviewCard title="Plan at a glance" text="Milestones 6  Tasks 42  Progress 70%" />
          </div>
          <div className="grid gap-4 md:grid-cols-[0.58fr_0.42fr]">
            <PreviewCard title="Recent Projects" text="AI Resume Builder 70%  Study Assistant 45%  SaaS Landing 32%" />
            <div className="rounded-2xl border border-white/10 bg-[#060b1b]/84 p-4">
              <div className="text-sm font-bold">Roadmap Preview</div>
              <div className="mt-7 flex items-center gap-2">
                {['Planning', 'MVP', 'Development', 'Launch'].map((item, index) => (
                  <div key={item} className="flex flex-1 items-center">
                    <div className="grid h-8 w-8 place-items-center rounded-full border border-[#b879ff] bg-[#7c3aed]/30 text-xs font-black">{index + 1}</div>
                    {index < 3 ? <div className="h-0.5 flex-1 bg-gradient-to-r from-[#7c3aed] to-[#ff7a2f]" /> : null}
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-4 gap-2 text-[10px] text-white/45">
                <span>Wk 1-2</span>
                <span>Wk 3-4</span>
                <span>Wk 5-8</span>
                <span>Wk 9-10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PreviewCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#060b1b]/84 p-5">
      <div className="text-sm font-bold">{title}</div>
      <p className="mt-3 text-sm leading-6 text-white/58">{text}</p>
    </div>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="text-center">
      {eyebrow ? <div className="text-xs font-bold uppercase tracking-[0.24em] text-white/42">{eyebrow}</div> : null}
      <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black leading-tight md:text-5xl">{title}</h2>
    </div>
  );
}

function RoadmapPreview() {
  const stages = ['Planning', 'MVP', 'Development', 'Testing', 'Launch'];
  return (
    <div className="rounded-2xl border border-white/10 bg-[#040817]/80 p-7">
      <div className="grid grid-cols-5 gap-3">
        {stages.map((stage, index) => (
          <div key={stage}>
            <div className="text-sm font-bold">{stage}</div>
            <div className="mt-1 text-xs text-white/42">Wk {index * 2 + 1}-{index * 2 + 2}</div>
          </div>
        ))}
      </div>
      <div className="mt-7 flex items-center">
        {stages.map((stage, index) => (
          <div key={stage} className="flex flex-1 items-center">
            <div className="grid h-12 w-12 place-items-center rounded-full border border-white/16 bg-[#7c3aed]/28 text-white">
              {index + 1}
            </div>
            {index < stages.length - 1 ? <div className="h-0.5 flex-1 bg-gradient-to-r from-[#b879ff] via-[#ff7a2f] to-[#2dd47d]" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-7 text-center">
      <div className="gradient-text text-5xl font-black">{value}</div>
      <div className="mt-4 text-sm text-white/62">{label}</div>
    </div>
  );
}

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-bold">{title}</h3>
      <div className="mt-4 space-y-3 text-sm text-white/52">
        {items.map((item) => (
          <a key={item} href="#" className="block transition hover:text-white">
            {item}
          </a>
        ))}
      </div>
    </div>
  );
}
