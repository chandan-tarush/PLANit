import { ArrowRight, CalendarDays, CheckCircle2, FilePlus2, FolderOpen, Sparkles, TrendingUp, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { readPlans } from '../lib/storage';

const demoProjects = [
  { name: 'AI Resume Builder', status: 'In Progress', progress: 70, color: '#7c3aed' },
  { name: 'Study Assistant App', status: 'In Progress', progress: 45, color: '#4f6dff' },
  { name: 'SaaS Landing Page', status: 'Draft', progress: 32, color: '#ff7a2f' },
  { name: 'Personal Finance Tracker', status: 'Completed', progress: 100, color: '#2dd47d' },
];

const rise = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export function DashboardPage() {
  const plans = readPlans();
  const totalTasks = plans.reduce((sum, plan) => sum + plan.tasks.flatMap((group) => group.tasks).length, 0);
  const totalMilestones = plans.reduce((sum, plan) => sum + plan.milestones.length, 0);

  return (
    <>
      <PageHeader
        title="Good evening, Chandan"
        description="Let's turn your ideas into amazing products."
        actions={
          <Link to="/planner" className="button-primary">
            <FilePlus2 size={18} />
            New Project
          </Link>
        }
      />

      <motion.div variants={stagger} initial="hidden" animate="visible" className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Metric icon={FolderOpen} label="Total Projects" value={String(Math.max(plans.length, 12))} note="20% vs last month" />
        <Metric icon={TrendingUp} label="Projects in Progress" value="5" note="42% of total" />
        <Metric icon={CheckCircle2} label="Tasks Completed" value={String(Math.max(totalTasks, 128))} note="18% vs last month" />
        <Metric icon={CalendarDays} label="Upcoming Deadlines" value={String(Math.max(totalMilestones, 7))} note="Next in 3 days" />
      </motion.div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <motion.section variants={rise} initial="hidden" animate="visible" transition={{ delay: 0.15 }} className="surface p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-black"><span className="h-2 w-2 rounded-full bg-[#b879ff]" />Project Overview</h2>
            <button className="text-sm font-semibold text-white/58">This Month</button>
          </div>
          <div className="relative h-64 overflow-hidden rounded-2xl border border-white/8 bg-[#050a1a]/72 p-5">
            <div className="absolute inset-x-5 bottom-12 top-8 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:100%_52px]" />
            <svg viewBox="0 0 720 220" className="relative h-full w-full overflow-visible">
              <defs>
                <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.56" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 170 C80 168 95 160 135 140 C175 120 200 88 245 96 C290 104 295 142 342 132 C390 122 410 78 460 74 C505 70 530 120 575 92 C615 68 635 104 670 74 C692 55 704 48 720 44 L720 220 L0 220 Z" fill="url(#chartFill)" />
              <path className="chart-line" d="M0 170 C80 168 95 160 135 140 C175 120 200 88 245 96 C290 104 295 142 342 132 C390 122 410 78 460 74 C505 70 530 120 575 92 C615 68 635 104 670 74 C692 55 704 48 720 44" fill="none" stroke="#a855f7" strokeWidth="4" />
              <circle cx="460" cy="74" r="6" fill="#a855f7" />
            </svg>
          </div>
        </motion.section>

        <motion.section variants={rise} initial="hidden" animate="visible" transition={{ delay: 0.22 }} className="surface p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-black">Upcoming Deadlines</h2>
            <button className="text-sm font-semibold text-[#b879ff]">View All</button>
          </div>
          <div className="space-y-4">
            {demoProjects.map((project, index) => (
              <motion.div key={project.name} variants={rise} initial="hidden" animate="visible" className="flex items-center gap-4 border-b border-white/8 pb-4 last:border-b-0">
                <div className="grid h-11 w-11 place-items-center rounded-xl" style={{ backgroundColor: `${project.color}24`, color: project.color }}>
                  <FolderOpen size={19} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-bold">{project.name}</div>
                  <div className="text-sm text-white/48">{index + 3} days left</div>
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-full border-4 border-[#7c3aed] text-xs font-black">{project.progress}%</div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <motion.section variants={rise} initial="hidden" animate="visible" transition={{ delay: 0.28 }} className="surface p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-black">Recent Projects</h2>
            <Link to="/plans" className="flex items-center gap-1 text-sm font-semibold text-[#b879ff]">View All <ArrowRight size={15} /></Link>
          </div>
          <div className="space-y-4">
            {demoProjects.map((project) => (
              <motion.div key={project.name} variants={rise} initial="hidden" animate="visible" className="grid items-center gap-4 rounded-xl border border-white/8 bg-white/[0.025] p-4 md:grid-cols-[1fr_auto_180px_auto]">
                <div className="font-bold">{project.name}</div>
                <span className="w-fit rounded-lg bg-white/6 px-3 py-1 text-xs font-semibold text-white/62">{project.status}</span>
                <div className="h-2 rounded-full bg-white/8">
                  <div className="h-full rounded-full" style={{ width: `${project.progress}%`, backgroundColor: project.color }} />
                </div>
                <span className="text-sm font-bold text-white/70">{project.progress}%</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section variants={rise} initial="hidden" animate="visible" transition={{ delay: 0.35 }} className="surface p-6">
          <h2 className="text-lg font-black">AI Insights <span className="ml-2 rounded-lg bg-[#7c3aed]/25 px-2 py-1 text-xs text-[#d7b6ff]">Beta</span></h2>
          <div className="mt-6 rounded-2xl border border-fuchsia-400/45 bg-gradient-to-br from-[#6d4cff]/30 to-[#ec4899]/18 p-5">
            <p className="text-lg font-bold">Your project velocity is 20% higher than last month.</p>
          </div>
          <div className="mt-5 space-y-4 text-sm">
            {['Most productive day: Tuesday', 'Projects on track 85%', 'Risks detected 3', 'Blocked tasks 2'].map((item) => (
              <div key={item} className="flex items-center gap-3 text-white/68">
                <Sparkles size={15} className="text-[#b879ff]" />
                {item}
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      <motion.section variants={rise} initial="hidden" animate="visible" transition={{ delay: 0.42 }} className="surface mt-6 p-5">
        <div className="grid gap-4 lg:grid-cols-[0.4fr_repeat(4,1fr)]">
          <div>
            <h2 className="font-black">Quick Start</h2>
            <p className="mt-1 text-sm text-white/50">Jump right into planning</p>
          </div>
          {[
            ['Create New Project', 'Start from scratch', FilePlus2],
            ['Use Template', 'Choose from library', FilePlus2],
            ['Import Document', 'Upload PRD, Spec, etc.', Upload],
            ['AI Brainstorm', 'Generate ideas', Sparkles],
          ].map(([title, text, Icon]) => (
            <Link key={String(title)} to="/planner" className="rounded-2xl border border-white/8 bg-white/[0.035] p-5 transition hover:-translate-y-0.5 hover:border-fuchsia-400/30">
              <Icon size={22} className="text-[#b879ff]" />
              <div className="mt-3 font-bold">{String(title)}</div>
              <div className="mt-1 text-sm text-white/48">{String(text)}</div>
            </Link>
          ))}
        </div>
      </motion.section>
    </>
  );
}

function Metric({ icon: Icon, label, value, note }: { icon: typeof FolderOpen; label: string; value: string; note: string }) {
  return (
    <motion.div variants={rise} className="surface p-5">
      <div className="flex items-center gap-4">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#7c3aed]/20 text-[#b879ff]">
          <Icon size={22} />
        </div>
        <div>
          <div className="text-sm text-white/58">{label}</div>
          <div className="mt-1 text-3xl font-black">{value}</div>
          <div className="mt-2 text-sm text-emerald-300">{note}</div>
        </div>
      </div>
    </motion.div>
  );
}
