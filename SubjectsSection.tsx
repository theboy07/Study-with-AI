import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const subjects = [
  {
    name: 'Mathematics',
    image: '/subject-math.jpg',
    bgColor: 'bg-blue-50',
  },
  {
    name: 'Physics',
    image: '/subject-physics.jpg',
    bgColor: 'bg-emerald-50',
  },
  {
    name: 'Biology',
    image: '/subject-biology.jpg',
    bgColor: 'bg-green-50',
  },
  {
    name: 'Chemistry',
    image: '/subject-chemistry.jpg',
    bgColor: 'bg-yellow-50',
  },
  {
    name: 'History',
    image: '/subject-history.jpg',
    bgColor: 'bg-orange-50',
  },
  {
    name: 'Geography',
    image: '/subject-geography.jpg',
    bgColor: 'bg-purple-50',
  },
];

export default function SubjectsSection() {
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
          { opacity: 0, y: 50, scale: 0.98 },
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
            delay: index * 0.06,
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="subjects"
      className="w-full py-20 md:py-28 bg-white z-40"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4">
            Covers All Your Subjects
          </h2>
          <p className="text-base md:text-lg text-slate-600">
            Get help with any subject you're studying
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {subjects.map((subject, index) => (
            <div
              key={subject.name}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`${subject.bgColor} rounded-[28px] p-6 md:p-8 h-48 md:h-56 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition-all duration-300 group`}
            >
              <div className="w-24 h-24 md:w-32 md:h-32 mb-4 group-hover:scale-110 transition-transform duration-300">
                <img
                  src={subject.image}
                  alt={subject.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-slate-900">
                {subject.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
