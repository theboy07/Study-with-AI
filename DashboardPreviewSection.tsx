import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Home, 
  BookOpen, 
  FileText, 
  HelpCircle, 
  Layers, 
  Calendar, 
  ClipboardCheck,
  TrendingUp,
  Settings,
  CheckCircle2,
  FileEdit,
  BrainCircuit,
  PlayCircle
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const sidebarItems = [
  { icon: Home, label: 'Home', active: true },
  { icon: BookOpen, label: 'My Subjects', active: false },
  { icon: FileText, label: 'Notes Maker', active: false },
  { icon: HelpCircle, label: 'Quiz Creator', active: false },
  { icon: Layers, label: 'Flashcards', active: false },
  { icon: Calendar, label: 'Study Planner', active: false },
  { icon: ClipboardCheck, label: 'Mock Tests', active: false },
  { icon: TrendingUp, label: 'Progress Tracker', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

const goals = [
  'Revise Chapter 5',
  'Complete Geography Quiz',
  'Learn Newton\'s Laws',
];

const quickTools = [
  { icon: FileEdit, label: 'Generate Notes' },
  { icon: BrainCircuit, label: 'Practice Quiz' },
  { icon: Layers, label: 'Create Flashcards' },
  { icon: PlayCircle, label: 'Start Mock Test' },
];

export default function DashboardPreviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const sidebarItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const dashboard = dashboardRef.current;
    const sidebarEls = sidebarItemsRef.current.filter(Boolean);
    const mainContent = mainContentRef.current;

    if (!section || !dashboard) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // Phase 1: ENTRANCE (0%–30%)
      scrollTl
        .fromTo(
          dashboard,
          { opacity: 0, y: '60vh', scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, ease: 'none' },
          0
        );

      sidebarEls.forEach((item, index) => {
        scrollTl.fromTo(
          item,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, ease: 'none' },
          index * 0.01
        );
      });

      if (mainContent) {
        scrollTl.fromTo(
          mainContent.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.02, ease: 'none' },
          0.05
        );
      }

      // Phase 3: EXIT (70%–100%)
      scrollTl.to(
        dashboard,
        { x: '-55vw', rotate: -2, opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#F6F8FC] overflow-hidden z-50"
    >
      <div
        ref={dashboardRef}
        className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[88vw] max-w-[1140px] h-[62vh] max-h-[640px] bg-white rounded-[36px] card-shadow flex overflow-hidden opacity-0"
      >
        {/* Sidebar */}
        <div className="w-56 bg-[#F8FAFC] hidden md:flex flex-col py-6 px-4 border-r border-slate-100">
          <div className="flex items-center gap-2 px-3 mb-8">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="font-semibold text-slate-900">StudyAI</span>
          </div>

          <nav className="flex-1 space-y-1">
            {sidebarItems.map((item, index) => (
              <div
                key={item.label}
                ref={(el) => { sidebarItemsRef.current[index] = el; }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-colors ${
                  item.active
                    ? 'bg-green-500 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </div>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div ref={mainContentRef} className="flex-1 p-6 md:p-8 overflow-auto">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              Welcome Back, Alex!
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              You have 3 tasks to complete today
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Today's Goals */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-50 rounded-2xl p-5">
                <h3 className="font-semibold text-slate-900 mb-4">Today's Study Goals</h3>
                <div className="space-y-3">
                  {goals.map((goal, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-white rounded-xl p-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span className="text-slate-700 text-sm">{goal}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Tools */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-4">Quick Study Tools</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {quickTools.map((tool) => (
                    <div
                      key={tool.label}
                      className="bg-white border border-slate-200 rounded-xl p-4 text-center cursor-pointer hover:border-green-500 hover:shadow-md transition-all"
                    >
                      <tool.icon className="w-6 h-6 text-green-500 mx-auto mb-2" />
                      <span className="text-xs text-slate-700">{tool.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-6">
              <div className="bg-slate-50 rounded-2xl p-5">
                <h3 className="font-semibold text-slate-900 mb-4">Weekly Progress</h3>
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#e2e8f0"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#22c55e"
                      strokeWidth="12"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray="351.86"
                      strokeDashoffset="70.37"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-slate-900">80%</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-slate-600">Topics completed</p>
                  <p className="text-lg font-semibold text-slate-900">24 / 30</p>
                </div>
              </div>

              <div className="bg-red-50 rounded-2xl p-5">
                <h3 className="font-semibold text-slate-900 mb-2">Weak Areas</h3>
                <p className="text-sm text-slate-600 mb-3">Focus on these subjects:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                    Chemistry
                  </span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                    Physics
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
