import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Image, MessageSquare, BookOpen, Upload, Save } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: MessageSquare, text: 'Step-by-step explanations' },
  { icon: Image, text: 'Math & science diagrams' },
  { icon: Upload, text: 'Upload images of questions' },
  { icon: Save, text: 'Save answers to your notebook' },
];

export default function AIChatSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    const featureItems = featuresRef.current.filter(Boolean);

    if (!section || !left || !right) return;

    const ctx = gsap.context(() => {
      // Left text block animation
      gsap.fromTo(
        left,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 40%',
            scrub: true,
          },
        }
      );

      // Chat card animation
      gsap.fromTo(
        right,
        { opacity: 0, x: 40, rotate: 1 },
        {
          opacity: 1,
          x: 0,
          rotate: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 40%',
            scrub: true,
          },
        }
      );

      // Feature list items
      featureItems.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              end: 'top 65%',
              scrub: true,
            },
            delay: index * 0.1,
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 md:py-28 bg-white z-30"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div ref={leftRef}>
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-6">
              Your Personal AI Tutor
            </h2>
            <p className="text-base md:text-lg text-slate-600 mb-8 leading-relaxed">
              StudyAI explains concepts like a patient tutor—step by step, with examples, 
              diagrams, and follow-up questions.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={feature.text}
                  ref={(el) => { featuresRef.current[index] = el; }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-slate-700">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Chat Preview */}
          <div ref={rightRef} className="relative">
            <div className="bg-white rounded-[28px] card-shadow p-6 md:p-8 border border-slate-100">
              {/* Chat Header */}
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-4">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">StudyAI Tutor</h4>
                  <p className="text-xs text-slate-500">Online</p>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="space-y-4">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-green-500 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                    <p className="text-sm">
                      Can you explain photosynthesis in simple terms?
                    </p>
                  </div>
                </div>

                {/* AI Message */}
                <div className="flex justify-start">
                  <div className="bg-slate-100 text-slate-800 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[90%]">
                    <p className="text-sm mb-2">
                      Of course! Photosynthesis is how plants make their food using sunlight:
                    </p>
                    <ol className="text-sm space-y-1 ml-4 list-decimal">
                      <li>Plants absorb sunlight through leaves</li>
                      <li>They take in CO₂ from air and water from roots</li>
                      <li>Using sunlight energy, they convert these into glucose (food)</li>
                      <li>Oxygen is released as a byproduct</li>
                    </ol>
                    <p className="text-sm mt-2">
                      Formula: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂
                    </p>
                  </div>
                </div>

                {/* User Message 2 */}
                <div className="flex justify-end">
                  <div className="bg-green-500 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                    <p className="text-sm">Thanks! That makes sense now.</p>
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 bg-slate-50 rounded-full px-4 py-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 bg-transparent text-sm outline-none"
                    readOnly
                  />
                  <button className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
