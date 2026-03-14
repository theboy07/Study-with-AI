import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const floatingCardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const section = sectionRef.current;
    const heroCard = heroCardRef.current;
    const floatingCard = floatingCardRef.current;
    const headline = headlineRef.current;
    const subheadline = subheadlineRef.current;
    const input = inputRef.current;

    if (!section || !heroCard || !floatingCard || !headline || !subheadline || !input) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      loadTl
        .fromTo(
          heroCard,
          { opacity: 0, scale: 0.96, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 0.9 }
        )
        .fromTo(
          [headline, subheadline],
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
          '-=0.5'
        )
        .fromTo(
          input,
          { opacity: 0, scaleX: 0.92 },
          { opacity: 1, scaleX: 1, duration: 0.7, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo(
          floatingCard,
          { opacity: 0, y: -60, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.4)' },
          '-=0.5'
        );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements when scrolling back to top
            gsap.set([heroCard, headline, subheadline, input, floatingCard], {
              opacity: 1,
              y: 0,
              scale: 1,
              scaleX: 1,
            });
          },
        },
      });

      // Phase 3: EXIT (70%–100%)
      scrollTl
        .fromTo(
          floatingCard,
          { y: 0, opacity: 1 },
          { y: '-40vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          heroCard,
          { y: 0, scale: 1, opacity: 1 },
          { y: '18vh', scale: 0.96, opacity: 0.35, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          [headline, subheadline, input],
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.75
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleAskAI = () => {
    if (!searchQuery.trim()) {
      toast.info('Please enter a question first!');
      return;
    }
    toast.success('AI is thinking...', {
      description: `Finding answer for: "${searchQuery}"`,
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-white dot-pattern overflow-hidden z-10"
    >
      {/* Floating Answer Card */}
      <div
        ref={floatingCardRef}
        className="absolute left-1/2 top-[18%] -translate-x-1/2 w-[72vw] max-w-[920px] h-[34vh] max-h-[280px] bg-white rounded-[32px] card-shadow p-6 md:p-8 z-20 opacity-0"
      >
        <div className="flex flex-col md:flex-row h-full gap-6">
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-green-500" />
              <span className="text-sm text-slate-500">AI Answer</span>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-3">
              Explain the water cycle.
            </h3>
            <ol className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                  1
                </span>
                <span>Evaporation - Water turns into vapor</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                  2
                </span>
                <span>Condensation - Vapor forms clouds</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                  3
                </span>
                <span>Precipitation - Rain or snow falls</span>
              </li>
            </ol>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <img
              src="/water-cycle.jpg"
              alt="Water cycle diagram"
              className="max-h-full max-w-full object-contain rounded-2xl"
            />
          </div>
        </div>
      </div>

      {/* Hero Card */}
      <div
        ref={heroCardRef}
        className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[86vw] max-w-[1100px] h-[56vh] max-h-[520px] bg-[#EEF6FF] rounded-[36px] border border-slate-200/60 flex flex-col justify-center px-6 md:px-12 opacity-0"
      >
        <h1
          ref={headlineRef}
          className="text-3xl md:text-5xl lg:text-[56px] font-bold text-slate-900 leading-tight mb-4 opacity-0"
        >
          Ace Your Studies with AI!
        </h1>
        <p
          ref={subheadlineRef}
          className="text-base md:text-lg text-slate-600 max-w-xl mb-8 opacity-0"
        >
          Get instant homework help and exam preparation with an AI tutor.
        </p>

        <div ref={inputRef} className="relative w-full max-w-2xl opacity-0">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Ask anything… (Example: Explain photosynthesis)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
              className="w-full h-14 md:h-16 pl-12 pr-32 rounded-full border-slate-200 bg-white text-sm md:text-base shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <Button
              onClick={handleAskAI}
              className="absolute right-2 h-10 md:h-12 px-4 md:px-6 bg-green-500 hover:bg-green-600 text-white rounded-full font-medium text-sm md:text-base"
            >
              Ask AI
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
