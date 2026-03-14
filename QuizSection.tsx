import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { RefreshCw, AlertCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const options = [
  { label: 'Photosynthesis', correct: true },
  { label: 'Respiration', correct: false },
  { label: 'Fermentation', correct: false },
  { label: 'Digestion', correct: false },
];

export default function QuizSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const quizRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scoreCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const quiz = quizRef.current;
    const optionEls = optionsRef.current.filter(Boolean);
    const scoreCard = scoreCardRef.current;

    if (!section || !quiz) return;

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
          quiz,
          { opacity: 0, scale: 0.88, y: '40vh' },
          { opacity: 1, scale: 1, y: 0, ease: 'none' },
          0
        );

      optionEls.forEach((option, index) => {
        scrollTl.fromTo(
          option,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, ease: 'none' },
          0.05 + index * 0.02
        );
      });

      if (scoreCard) {
        scrollTl.fromTo(
          scoreCard,
          { opacity: 0, x: 50, rotate: 2 },
          { opacity: 1, x: 0, rotate: 0, ease: 'none' },
          0.1
        );
      }

      // Phase 3: EXIT (70%–100%)
      scrollTl.to(
        quiz,
        { x: '55vw', rotate: 2, opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#F6F8FC] overflow-hidden z-70"
    >
      <div
        ref={quizRef}
        className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[84vw] max-w-[1000px] h-[58vh] max-h-[520px] bg-white rounded-[36px] card-shadow flex overflow-hidden opacity-0"
      >
        {/* Question Section */}
        <div className="flex-1 p-6 md:p-10">
          <div className="mb-2">
            <span className="text-sm text-slate-500">Question 7 of 10</span>
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-8">
            What is the process by which plants make their own food?
          </h3>

          <div className="space-y-3">
            {options.map((option, index) => (
              <div
                key={option.label}
                ref={(el) => { optionsRef.current[index] = el; }}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  option.correct
                    ? 'border-green-500 bg-green-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    option.correct
                      ? 'border-green-500 bg-green-500'
                      : 'border-slate-300'
                  }`}
                >
                  {option.correct && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className={`font-medium ${option.correct ? 'text-green-700' : 'text-slate-700'}`}>
                  {option.label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <Button variant="outline" className="rounded-full">
              Previous
            </Button>
            <Button className="bg-green-500 hover:bg-green-600 text-white rounded-full">
              Next Question
            </Button>
          </div>
        </div>

        {/* Score Card */}
        <div
          ref={scoreCardRef}
          className="w-72 md:w-80 bg-slate-50 p-6 md:p-8 flex flex-col justify-center opacity-0"
        >
          <div className="text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold text-white">8/10</span>
            </div>
            <h4 className="text-xl font-semibold text-slate-900 mb-1">Great job!</h4>
            <p className="text-sm text-slate-500 mb-6">
              You scored 80% on this quiz
            </p>

            <div className="bg-white rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 text-amber-600 mb-2">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Area to improve</span>
              </div>
              <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                Revise: Photosynthesis
              </span>
            </div>

            <Button
              variant="outline"
              className="w-full rounded-full flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Retry Quiz
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
