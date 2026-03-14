import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  MessageSquare, 
  FileText, 
  HelpCircle, 
  Layers, 
  Calendar, 
  ClipboardCheck 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const tools = [
  {
    icon: MessageSquare,
    title: 'AI Chat',
    description: 'Ask anything and get step-by-step explanations.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: FileText,
    title: 'Notes Generator',
    description: 'Turn any topic into clear, structured notes.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: HelpCircle,
    title: 'Quiz Creator',
    description: 'Auto-generate practice quizzes with instant feedback.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: Layers,
    title: 'Flashcards',
    description: 'Create smart flashcards and track what you\'ve mastered.',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    icon: Calendar,
    title: 'Study Planner',
    description: 'Build a daily study schedule around your exam dates.',
    color: 'bg-pink-100 text-pink-600',
  },
  {
    icon: ClipboardCheck,
    title: 'Mock Tests',
    description: 'Simulate real exam conditions and review weak areas.',
    color: 'bg-cyan-100 text-cyan-600',
  },
];

export default function ToolsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !header || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        header,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );

      // Cards animation
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 60%',
              scrub: true,
            },
            delay: index * 0.08,
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tools"
      className="w-full py-20 md:py-28 bg-[#F6F8FC] z-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4">
            Everything You Need to Study Smarter
          </h2>
          <p className="text-base md:text-lg text-slate-600">
            6 powerful AI tools — all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {tools.map((tool, index) => (
            <div
              key={tool.title}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="bg-white rounded-[28px] p-6 md:p-8 card-shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
            >
              <div
                className={`w-12 h-12 md:w-14 md:h-14 ${tool.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
              >
                <tool.icon className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">
                {tool.title}
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                {tool.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
