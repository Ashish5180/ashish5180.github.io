import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Tabs for the terminal
const TABS = ["Projects", "System", "Skills"];

// Demo data (heavier, eye‑catching)
const PROJECT_SCRIPTS = [
  "$ npx create-next-app career-verse --ts",
  "✔ Scaffolding project (Next.js 15 • App Router • RSC)",
  "$ pnpm add zod @tanstack/react-query prisma @aws-sdk/client-dynamodb",
  "✔ Installing deps (tree-shaken) — 3,418 files • 18s",
  "$ pnpm exec prisma migrate deploy",
  "✔ Database schema synced • 12 models • 4 relations",
  "$ pnpm run build",
  "▼ Compiling server & client bundles",
  "✔ SWC • 317 modules • 6 code-split chunks",
  "✔ Route Handlers optimized (edge-ready)",
  "$ docker build -t career-verse:prod .",
  "✔ Multi-stage image • 145MB final • best practices applied",
  "$ deploy --target=lambda --region=ap-south-1",
  "✔ API Gateway • IAM • CloudWatch wired",
  "✔ DynamoDB connected • TTL + GSIs • on-demand",
  "Smoke tests: /health 200 • /api/v1/jobs 200",
  "Release v1.7.3 LIVE ✅",
];

const SKILL_LINES = [
  "const skills = {",
  "  core: ['TypeScript', 'Next.js', 'Go', 'Node.js' , 'React.js' , ],",
  "  app: ['React Native', 'Expo', 'Flutter', 'React Native Web'],",
  "  cloud: ['AWS Lambda', 'APIGW', 'S3', 'DynamoDB', 'CloudFront'],",
  "  data: ['Prisma', 'SQL', 'NoSQL'],",
  "  ui: ['TailwindCSS', 'Framer Motion', 'R3F (Three.js)'],",
  "  data: ['Firebase', 'Supabase', 'Postgres', 'MongoDB'],",
  "}",
  "assure(qualityCode).via(CI_CD).with(tests.coverage('98%')) // ✅",
];

// Sparkline path generator for system tab
const createSparkPath = (points) => {
  if (points.length === 0) return "";
  const width = 80;
  const height = 24;
  const step = width / (points.length - 1 || 1);
  let d = `M 0 ${height - points[0]}`;
  for (let i = 1; i < points.length; i++) {
    d += ` L ${i * step} ${height - points[i]}`;
  }
  return d;
};

// Generic path for inline micro charts
const createPath = (points, width, height) => {
  if (!points || points.length === 0) return "";
  const step = width / (points.length - 1 || 1);
  let d = `M 0 ${height - points[0]}`;
  for (let i = 1; i < points.length; i++) {
    d += ` L ${i * step} ${height - points[i]}`;
  }
  return d;
};

// Radar polygon path for skills
const createRadarPath = (values, radius, cx, cy) => {
  if (!values || values.length === 0) return "";
  const angleStep = (Math.PI * 2) / values.length;
  let d = "";
  values.forEach((v, i) => {
    const r = (Math.max(0, Math.min(100, v)) / 100) * radius;
    const angle = -Math.PI / 2 + i * angleStep;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    d += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
  });
  d += " Z";
  return d;
};

export const TerminalDemo = () => {
  const [activeTab, setActiveTab] = useState("Projects");
  const [typed, setTyped] = useState("");
  const [lines, setLines] = useState([]);
  const [cursorOn, setCursorOn] = useState(true);
  const [index, setIndex] = useState(0);
  const [char, setChar] = useState(0);
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);

  // System stats + sparkline
  const [cpu, setCpu] = useState(15);
  const [mem, setMem] = useState(42);
  const [net, setNet] = useState(4);
  const [cpuHistory, setCpuHistory] = useState([8, 10, 12, 11, 15, 18, 16, 20, 17, 22, 18, 16, 19, 21, 17, 16, 15, 18, 22, 19, 17, 20, 18, 16]);
  const [netHistory, setNetHistory] = useState([5,7,4,9,6,8,10,12,6,9,7,5,8,11,9,6]);
  const [memHistory, setMemHistory] = useState([30,32,34,36,38,40,42,44,46,45,44,46,47,49,50,52,51,53,55,54]);
  const [disk, setDisk] = useState(68);
  const [swap, setSwap] = useState(24);
  const [tempC, setTempC] = useState(54);
  const [coresHistory, setCoresHistory] = useState([
    [8,10,12,14,12,16,15,17,18,16,17,19],
    [7,9,11,13,12,14,16,18,17,15,14,16],
    [6,8,10,12,11,13,15,16,15,14,13,15],
    [9,11,13,15,14,16,18,19,17,16,18,20],
  ]);
  const [processes, setProcesses] = useState([
    { name: "node:server", cpu: 12, mem: 180 },
    { name: "chrome:renderer", cpu: 18, mem: 640 },
    { name: "docker:buildkit", cpu: 9, mem: 420 },
    { name: "postgres", cpu: 6, mem: 260 },
    { name: "redis", cpu: 3, mem: 110 },
  ]);
  const projectMetrics = useMemo(() => ({ build: 92, tests: 98, deploy: 88 }), []);
  const projectBadges = useMemo(() => [
    "Serverless", "Edge‑ready", "Code‑split", "Typed API", "Observability", "Caching",
  ], []);
  const skillsCore = useMemo(() => [
    "TypeScript", "Next.js 15", "Go", "Node.js", "R3F", "Framer Motion", "React.js", "React Native", "Expo", "Flutter", "React Native Web",
  ], []);
  const skillsTooling = useMemo(() => [
    "Prisma", "Firebase", "Supabase", "Postgres", "MongoDB", "React Query", "Jest", "ESLint", "Prettier",
  ], []);
  const skillsCloud = useMemo(() => [
    "AWS Lambda", "API Gateway", "DynamoDB", "S3", "CloudFront", "CI/CD",
  ], []);
  const skillCategories = useMemo(() => [
    "Frontend", "Backend", "Cloud", "Mobile", "Testing", "3D/Graphics",
  ], []);
  const [skillsRadar, setSkillsRadar] = useState([85, 78, 72, 68, 74, 60]);
  const proficiencyList = useMemo(() => ([
    { name: "Next.js", value: 92 },
    { name: "Go", value: 84 },
    { name: "AWS", value: 88 },
    { name: "React Native", value: 80 },
    { name: "Three.js / R3F", value: 76 },
  ]), []);
  const keySkills = useMemo(() => (
    ["TypeScript", "Next.js", "Go", "AWS", "React Native", "R3F", "CI/CD"]
  ), []);
  const [isCompact, setIsCompact] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [isNearBottom, setIsNearBottom] = useState(true);

  const contentByTab = useMemo(() => {
    if (activeTab === "Projects") return PROJECT_SCRIPTS;
    if (activeTab === "Skills") return SKILL_LINES;
    return [
      `$ top — ${(new Date()).toLocaleTimeString()}`,
      `CPU ${cpu}%  MEM ${mem}%  NET ${net}Mb/s`,
      `uptime ${(Math.random() * 48 + 1).toFixed(1)}h  load ${(Math.random() * 1.8 + 0.2).toFixed(2)}`,
    ];
  }, [activeTab, cpu, mem, net]);

  // Typing engine for Projects only (disable for Skills to keep minimal and smooth)
  useEffect(() => {
    if (activeTab !== "Projects") return;
    if (!isInView || isScrolling) return;

    const script = contentByTab;
    if (index >= script.length) {
      const t = setTimeout(() => {
        setLines([]);
        setIndex(0);
        setChar(0);
        setTyped("");
      }, 1400);
      return () => clearTimeout(t);
    }

    if (char < script[index].length) {
      const t = setTimeout(() => {
        setTyped(script[index].slice(0, char + 1));
        setChar((c) => c + 1);
      }, 28);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setLines((prev) => {
          const appended = [...prev, script[index]];
          return appended.length > 80 ? appended.slice(appended.length - 80) : appended;
        });
        setIndex((i) => i + 1);
        setChar(0);
        setTyped("");
      }, 180);
      return () => clearTimeout(t);
    }
  }, [activeTab, index, char, contentByTab, isInView, isScrolling]);

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), 500);
    return () => clearInterval(id);
  }, []);

  // Auto scroll (Projects only; avoid System/Skills and avoid fighting user)
  useEffect(() => {
    if (activeTab !== "Projects" || !isNearBottom) return;
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, typed, activeTab, isNearBottom]);

  // Disable radar animation entirely for minimal, flicker-free Skills
  useEffect(() => {}, [activeTab, isScrolling, isInView]);

  // Track scroll to temporarily pause updates while user scrolls
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let timeoutId;
    const onScroll = () => {
      setIsScrolling(true);
      const near = (el.scrollHeight - el.scrollTop - el.clientHeight) < 48;
      setIsNearBottom(near);
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsScrolling(false), 300);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Observe section visibility to avoid updating when off-screen
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setIsInView(entry.isIntersecting && entry.intersectionRatio > 0.2);
    }, { threshold: [0, 0.2, 0.5, 1] });
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Live system metrics (functional updates, gated by visibility/scroll/compact)
  useEffect(() => {
    const id = setInterval(() => {
      if (activeTab !== 'System' || !isInView || isScrolling) return;

      // Lightweight updates (always)
      setCpu((prev) => {
        const next = Math.max(5, Math.min(95, prev + (Math.random() * 12 - 6)));
        setCpuHistory((h) => {
          const normalized = Math.max(2, Math.min(22, (next / 100) * 22));
          return [...h.slice(-23), normalized];
        });
        return next;
      });
      setMem((prev) => Math.max(20, Math.min(95, prev + (Math.random() * 8 - 4))));
      setNet((prev) => {
        const next = Math.max(1, Math.min(30, prev + (Math.random() * 6 - 3)));
        setNetHistory((h) => [...h.slice(-15), next]);
        return next;
      });

      if (isCompact) return; // Skip heavy updates in compact mode

      // Heavier updates (only in Details)
      setMemHistory((h) => {
        const last = h[h.length - 1] ?? 40;
        const next = Math.max(10, Math.min(95, last + (Math.random() * 6 - 3)));
        return [...h.slice(-29), next];
      });
      setDisk((d) => Math.max(35, Math.min(95, d + (Math.random() * 3 - 1.5))));
      setSwap((s) => Math.max(5, Math.min(70, s + (Math.random() * 4 - 2))));
      setTempC((t) => Math.max(35, Math.min(88, t + (Math.random() * 2.5 - 1.2))));
      setCoresHistory((hist) => hist.map((core, idx) => {
        const last = core[core.length - 1] ?? 10;
        const baseline = last + (idx * 0.2);
        const nextVal = Math.max(2, Math.min(22, baseline + (Math.random() * 4 - 2)));
        return [...core.slice(-23), nextVal];
      }));
      setProcesses((ps) => ps.map((p) => ({
        ...p,
        cpu: Math.max(1, Math.min(95, p.cpu + (Math.random() * 6 - 3))),
        mem: Math.max(60, Math.min(1200, p.mem + (Math.random() * 60 - 30))),
      })));
    }, 1200);
    return () => clearInterval(id);
  }, [activeTab, isInView, isScrolling, isCompact]);

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-0 py-16 md:py-20">
      {/* Headings for recruiters */}
      <div className="w-full text-center mb-6 md:mb-8 px-6">
        <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-white">
          Full‑Stack Engineer — Next.js • Go • AWS • Three.js (R3F)
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.05 }} className="mt-2 text-sm md:text-base text-white/70">
          Performance | Scalability | Cloud‑Native | TypeScript | CI/CD | DX‑Focused | System Design
        </motion.p>
      </div>
      {/* Animated gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-70" style={{ background: "radial-gradient(1200px 600px at 10% 10%, rgba(56,189,248,0.15), transparent), radial-gradient(1000px 500px at 90% 20%, rgba(168,85,247,0.14), transparent), radial-gradient(1200px 600px at 20% 90%, rgba(16,185,129,0.12), transparent)" }} />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.04),transparent)] animate-[shimmer_8s_linear_infinite]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-5xl rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.4)] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-3 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/90" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/90" />
            <span className="h-3 w-3 rounded-full bg-green-500/90" />
          </div>
          <div className="text-xs text-white/70">Neo Terminal</div>
          <div className="ml-auto flex items-center gap-4 text-xs text-white/60">
            <div className="hidden sm:flex items-center gap-2">
              <span>CPU {Math.round(cpu)}%</span>
              <svg width="80" height="24" viewBox="0 0 80 24" className="opacity-80">
                <path d={createSparkPath(cpuHistory)} stroke="#34d399" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <span className="hidden sm:inline">MEM {Math.round(mem)}%</span>
            <span>NET {Math.round(net)} Mb/s</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 px-5 py-2 border-b border-white/10 bg-black/30">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setLines([]);
                setTyped("");
                setIndex(0);
                setChar(0);
              }}
              className={`px-3 py-1.5 rounded-md text-xs transition-colors ${
                activeTab === tab
                  ? "bg-white/10 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset]"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* System controls */}
        {activeTab === "System" && (
          <div className="flex items-center justify-between px-5 py-2 border-b border-white/10 bg-black/20">
            <div className="text-xs text-white/60">Realtime metrics</div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsCompact(true)}
                className={`px-2.5 py-1 rounded text-xs ${isCompact ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
              >Compact</button>
              <button
                onClick={() => setIsCompact(false)}
                className={`px-2.5 py-1 rounded text-xs ${!isCompact ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
              >Details</button>
            </div>
          </div>
        )}

        {/* Terminal body */}
        <div className="relative">
          {/* subtle grid */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
          <div ref={scrollRef} className="relative z-10 h-[480px] overflow-y-auto p-5 font-mono text-[13px] leading-relaxed text-emerald-300/90">
            {activeTab === "Projects" && (
              <>
                <AnimatePresence>
                  {lines.map((l, i) => (
                    <motion.div
                      key={`${l}-${i}`}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="whitespace-pre-wrap"
                    >
                      {l}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {typed && (
                  <div>
                    {typed}
                    <span className={`ml-0.5 text-cyan-300 ${cursorOn ? "opacity-100" : "opacity-0"}`}>▋</span>
                  </div>
                )}
              </>
            )}

            {/* Heavier content for Projects */}
            {activeTab === "Projects" && lines.length > 4 && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-white/80">
                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="text-xs text-white/60 mb-1">Build Progress</div>
                  <div className="h-2 rounded bg-white/10 overflow-hidden">
                    <div className="h-full bg-emerald-400" style={{ width: `${projectMetrics.build}%` }} />
                  </div>
                  <div className="mt-1 text-[11px] text-white/50">SWC optimized modules</div>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="text-xs text-white/60 mb-1">Tests Coverage</div>
                  <div className="h-2 rounded bg-white/10 overflow-hidden">
                    <div className="h-full bg-sky-400" style={{ width: `${projectMetrics.tests}%` }} />
                  </div>
                  <div className="mt-1 text-[11px] text-white/50">unit • integration • e2e</div>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="text-xs text-white/60 mb-1">Deployment Readiness</div>
                  <div className="h-2 rounded bg-white/10 overflow-hidden">
                    <div className="h-full bg-violet-400" style={{ width: `${projectMetrics.deploy}%` }} />
                  </div>
                  <div className="mt-1 text-[11px] text-white/50">image hardening • rollbacks</div>
                </div>
              </div>
            )}

            {activeTab === "Projects" && (
              <div className="mt-3 flex flex-wrap gap-2">
                {projectBadges.map((b, i) => (
                  <span key={i} className="text-[11px] px-2 py-1 rounded-md border border-white/10 bg-white/5 text-white/70">
                    {b}
                  </span>
                ))}
              </div>
            )}

            {activeTab === "System" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white/80">
                {/* CPU — gradient area chart */}
                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-white/60">CPU Utilization</div>
                    <div className="text-xs text-emerald-300">{Math.round(cpu)}%</div>
                  </div>
                  <svg viewBox="0 0 200 56" className="mt-2 w-full h-14">
                    <defs>
                      <linearGradient id="cpuArea" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#34d399" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#34d399" stopOpacity="0.05" />
                      </linearGradient>
                    </defs>
                    <path d={`M 0 ${56 - cpuHistory[0]} ${cpuHistory.map((p, i) => `L ${(i * (200 / (cpuHistory.length - 1))).toFixed(2)} ${(56 - p).toFixed(2)}`).join(" ")} L 200 56 L 0 56 Z`} fill="url(#cpuArea)" stroke="none" />
                    <path d={`M 0 ${56 - cpuHistory[0]} ${cpuHistory.map((p, i) => `L ${(i * (200 / (cpuHistory.length - 1))).toFixed(2)} ${(56 - p).toFixed(2)}`).join(" ")}`} stroke="#34d399" strokeWidth="2" fill="none" />
                  </svg>
                  <div className="mt-1 text-[11px] text-white/50">Load avg {(cpu / 33).toFixed(2)}, {(cpu / 50).toFixed(2)}, {(cpu / 25).toFixed(2)}</div>
                </div>

                {/* Memory — donut */}
                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-white/60">Memory Usage</div>
                    <div className="text-xs text-sky-300">{Math.round(mem)}%</div>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-3 items-center">
                    <svg viewBox="0 0 40 40" className="w-20 h-20 mx-auto">
                      <defs>
                        <linearGradient id="memArc" x1="1" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#38bdf8" />
                          <stop offset="100%" stopColor="#60a5fa" />
                        </linearGradient>
                      </defs>
                      <circle cx="20" cy="20" r="16" stroke="rgba(255,255,255,0.15)" strokeWidth="6" fill="none" />
                      {(() => {
                        const radius = 16;
                        const circumference = 2 * Math.PI * radius;
                        const dash = (Math.min(100, Math.max(0, mem)) / 100) * circumference;
                        return (
                          <circle cx="20" cy="20" r="16" stroke="url(#memArc)" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${dash} ${circumference - dash}`} transform="rotate(-90 20 20)" fill="none" />
                        );
                      })()}
                    </svg>
                    <div className="text-xs text-white/60">
                      <div>active <span className="text-white/80">{(mem * 0.62).toFixed(0)}%</span></div>
                      <div>cache <span className="text-white/80">{(mem * 0.28).toFixed(0)}%</span></div>
                      <div>free <span className="text-white/80">{(100 - mem).toFixed(0)}%</span></div>
                    </div>
                  </div>
                </div>

                {/* Network — bars */}
                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-white/60">Network I/O</div>
                    <div className="text-xs text-violet-300">{Math.round(net)} Mb/s</div>
                  </div>
                  <svg viewBox="0 0 160 60" className="mt-2 w-full h-16">
                    {netHistory.map((v, i) => {
                      const barW = 160 / 16;
                      const x = i * barW + 2;
                      const h = (v / 30) * 56;
                      const y = 58 - h;
                      return <rect key={i} x={x} y={y} width={barW - 4} height={h} rx="2" fill="#a78bfa" opacity={0.8} />;
                    })}
                  </svg>
                  <div className="mt-1 text-[11px] text-white/50">latency {(Math.random() * 40 + 10).toFixed(0)}ms • pkt loss {(Math.random() * 2).toFixed(2)}%</div>
                </div>
                {/* Additional heavy visuals row (only in Details) */}
                {!isCompact && <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="text-xs text-white/60 mb-2">Load Average</div>
                  {[cpu / 33, cpu / 50, cpu / 25].map((v, i) => {
                    const pct = Math.min(100, (v / 3) * 100);
                    const labels = ["1m", "5m", "15m"]; 
                    return (
                      <div key={i} className="mb-2">
                        <div className="flex justify-between text-[11px] text-white/50"><span>{labels[i]}</span><span>{v.toFixed(2)}</span></div>
                        <div className="h-2 rounded bg-white/10 overflow-hidden">
                          <div className="h-full bg-rose-400" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>}
                {!isCompact && <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="text-xs text-white/60 mb-2">Disk & Swap</div>
                  <div className="grid grid-cols-2 gap-3 items-center">
                    {/* Disk donut */}
                    <svg viewBox="0 0 40 40" className="w-20 h-20 mx-auto">
                      <defs>
                        <linearGradient id="diskArc" x1="1" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f472b6" />
                          <stop offset="100%" stopColor="#fb7185" />
                        </linearGradient>
                      </defs>
                      <circle cx="20" cy="20" r="16" stroke="rgba(255,255,255,0.15)" strokeWidth="6" fill="none" />
                      {(() => {
                        const radius = 16;
                        const circumference = 2 * Math.PI * radius;
                        const dash = (Math.min(100, Math.max(0, disk)) / 100) * circumference;
                        return (
                          <circle cx="20" cy="20" r="16" stroke="url(#diskArc)" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${dash} ${circumference - dash}`} transform="rotate(-90 20 20)" fill="none" />
                        );
                      })()}
                    </svg>
                    {/* Swap donut */}
                    <svg viewBox="0 0 40 40" className="w-20 h-20 mx-auto">
                      <defs>
                        <linearGradient id="swapArc" x1="1" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#22d3ee" />
                          <stop offset="100%" stopColor="#60a5fa" />
                        </linearGradient>
                      </defs>
                      <circle cx="20" cy="20" r="16" stroke="rgba(255,255,255,0.15)" strokeWidth="6" fill="none" />
                      {(() => {
                        const radius = 16;
                        const circumference = 2 * Math.PI * radius;
                        const dash = (Math.min(100, Math.max(0, swap)) / 100) * circumference;
                        return (
                          <circle cx="20" cy="20" r="16" stroke="url(#swapArc)" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${dash} ${circumference - dash}`} transform="rotate(-90 20 20)" fill="none" />
                        );
                      })()}
                    </svg>
                  </div>
                  <div className="mt-2 text-[11px] text-white/50">disk {Math.round(disk)}% • swap {Math.round(swap)}%</div>
                </div>}
                {!isCompact && <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-white/60">CPU Cores</div>
                    <div className="text-xs text-white/50">temp {Math.round(tempC)}°C</div>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {coresHistory.map((hist, i) => (
                      <svg key={i} viewBox="0 0 120 24" className="w-full h-6">
                        <path d={createPath(hist, 120, 24)} stroke="#fbbf24" strokeWidth="2" fill="none" />
                      </svg>
                    ))}
                  </div>
                </div>}
                {/* Processes table spanning 3 cols (only in Details) */}
                {!isCompact && <div className="md:col-span-3 rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="text-xs text-white/60 mb-2">Top Processes</div>
                  <div className="grid grid-cols-5 text-[11px] text-white/60 px-2">
                    <div>Process</div><div>CPU%</div><div>Mem MB</div><div>State</div><div>PID</div>
                  </div>
                  <div className="mt-1 divide-y divide-white/10">
                    {processes.map((p, idx) => (
                      <div key={idx} className="grid grid-cols-5 items-center py-1.5 px-2 text-[12px]">
                        <div className="truncate text-white/80">{p.name}</div>
                        <div className="text-emerald-300">{p.cpu.toFixed(1)}</div>
                        <div className="text-sky-300">{Math.round(p.mem)}</div>
                        <div className="text-white/50">{p.cpu > 25 ? 'running' : 'sleep'}</div>
                        <div className="text-white/50">{1000 + idx}</div>
                      </div>
                    ))}
                  </div>
                </div>}
              </div>
            )}

            {/* Streamlined, recruiter-focused Skills (no logs, minimal visuals) */}
            {activeTab === "Skills" && (
              <div className="mt-4 space-y-4 text-white/80">
                {/* Radar chart (static) */}
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <div className="text-xs text-white/60 mb-2">Skill Radar</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <svg viewBox="0 0 180 180" className="w-full h-[180px]">
                      <defs>
                        <linearGradient id="radarFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.45" />
                          <stop offset="100%" stopColor="#34d399" stopOpacity="0.25" />
                        </linearGradient>
                      </defs>
                      {/* grid rings */}
                      {[0.3, 0.6, 0.9].map((g, i) => (
                        <circle key={i} cx="90" cy="90" r={90 * g} stroke="rgba(255,255,255,0.12)" fill="none" />
                      ))}
                      {/* axes */}
                      {skillCategories.map((_, i) => {
                        const angle = -Math.PI / 2 + (i * Math.PI * 2) / skillCategories.length;
                        const x = 90 + 90 * Math.cos(angle);
                        const y = 90 + 90 * Math.sin(angle);
                        return <line key={i} x1="90" y1="90" x2={x} y2={y} stroke="rgba(255,255,255,0.12)" />;
                      })}
                      {/* data */}
                      <path d={createRadarPath(skillsRadar, 90, 90, 90)} fill="url(#radarFill)" stroke="#93c5fd" strokeWidth="2" />
                    </svg>
                    <div className="space-y-2">
                      {skillCategories.map((label, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <span className="w-28 text-[11px] text-white/60">{label}</span>
                          <div className="flex-1 h-2 rounded bg-white/10 overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-sky-400 to-emerald-400" style={{ width: `${skillsRadar[i]}%` }} />
                          </div>
                          <span className="w-10 text-right text-[11px] text-white/60">{Math.round(skillsRadar[i])}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Proficiency bars (top 3) */}
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <div className="text-xs text-white/60 mb-2">Proficiency</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {proficiencyList.slice(0, 3).map((p, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-[11px] text-white/60 mb-1">
                          <span>{p.name}</span>
                          <span>{p.value}%</span>
                        </div>
                        <div className="h-2 rounded bg-white/10 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-violet-400 via-sky-400 to-emerald-400" style={{ width: `${p.value}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Key Skills chips */}
                <div className="flex flex-wrap gap-2">
                  {keySkills.map((s, i) => (
                    <span key={i} className="text-[11px] px-2 py-1 rounded-md border border-white/10 bg-white/5 text-white/80">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-2 border-t border-white/10 text-[11px] text-white/60 bg-black/40">
          <div>Press ⌘K to open command palette</div>
          <div>Theme: Neo Glow</div>
        </div>
      </motion.div>

      {/* Local styles */}
      <style>{`
        @keyframes shimmer { 0% { transform: translateX(-50%); } 100% { transform: translateX(50%); } }
      `}</style>
    </section>
  );
};
