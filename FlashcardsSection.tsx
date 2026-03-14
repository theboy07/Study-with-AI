import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { RotateCw, Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FlashcardsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const flashcardRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const flashcard = flashcardRef.current;
    const stats = statsRef.current;

    if (!section || !flashcard) return;

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
          flashcard,
          { opacity: 0, y: '70vh', rotateX: 25 },
          { opacity: 1, y: 0, rotateX: 0, ease: 'none' },
          0
        );

      if (stats) {
        scrollTl.fromTo(
          stats,
          { opacity: 0, x: 40, scale: 0.96 },
          { opacity: 1, x: 0, scale: 1, ease: 'none' },
          0.1
        );
      }

      // Phase 3: EXIT (70%–100%)
      scrollTl.to(
        flashcard,
        { scale: 0.92, opacity: 0, ease: 'power2.in' },
        0.7
      );

      if (stats) {
        scrollTl.to(
          stats,
          { y: '-20vh', opacity: 0, ease: 'power2.in' },
          0.7
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-white overflow-hidden z-80"
    >
      {/* Stats Card */}
      <div
        ref={statsRef}
        className="absolute right-[8%] top-[18%] w-60 bg-white rounded-3xl card-shadow p-6 opacity-0"
      >
        <h4 className="font-semibold text-slate-900 mb-4">Study Stats</h4>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Cards reviewed</span>
            <span className="font-semibold text-slate-900">24</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Mastered</span>
            <span className="font-semibold text-green-600">18</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Needs practice</span>
            <span className="font-semibold text-amber-600">6</span>
          </div>
        </div>
      </div>

      {/* Flashcard */}
      <div
        ref={flashcardRef}
        className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[min(520px,78vw)] h-80 opacity-0"
        style={{ perspective: '1000px' }}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 ${
            isFlipped ? '[transform:rotateY(180deg)]' : ''
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 bg-white rounded-[32px] card-shadow p-8 flex flex-col items-center justify-center"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="absolute top-6 left-6 flex items-center gap-2 text-slate-400 text-sm">
              <span>Card 12 of 24</span>
            </div>

            <h3 className="text-xl md:text-2xl font-semibold text-slate-900 text-center mb-4">
              What is the powerhouse of the cell?
            </h3>

            <div className="flex items-center gap-2 text-amber-600 text-sm">
              <Lightbulb className="w-4 h-4" />
              <span>Think energy production...</span>
            </div>

            <Button
              onClick={() => setIsFlipped(true)}
              variant="outline"
              className="absolute bottom-6 rounded-full flex items-center gap-2"
            >
              <RotateCw className="w-4 h-4" />
              Flip Card
            </Button>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 bg-green-500 rounded-[32px] card-shadow p-8 flex flex-col items-center justify-center text-white"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="absolute top-6 left-6 flex items-center gap-2 text-green-100 text-sm">
              <span>Answer</span>
            </div>

            <h3 className="text-xl md:text-2xl font-semibold text-center mb-4">
              Mitochondria
            </h3>

            <p className="text-green-100 text-center text-sm max-w-sm">
              Mitochondria are organelles that generate most of the cell's supply of adenosine 
              triphosphate (ATP), used as a source of chemical energy.
            </p>

            <Button
              onClick={() => setIsFlipped(false)}
              variant="outline"
              className="absolute bottom-6 rounded-full flex items-center gap-2 bg-white text-green-600 hover:bg-green-50 border-white"
            >
              <RotateCw className="w-4 h-4" />
              Flip Back
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <button className="w-10 h-10 bg-white rounded-full card-shadow flex items-center justify-center text-slate-400 hover:text-slate-600">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-slate-500">12 / 24</span>
          <button className="w-10 h-10 bg-white rounded-full card-shadow flex items-center justify-center text-slate-400 hover:text-slate-600">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
