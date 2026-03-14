import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from '@/sections/HeroSection';
import ToolsSection from '@/sections/ToolsSection';
import AIChatSection from '@/sections/AIChatSection';
import SubjectsSection from '@/sections/SubjectsSection';
import DashboardPreviewSection from '@/sections/DashboardPreviewSection';
import StudyPlannerSection from '@/sections/StudyPlannerSection';
import QuizSection from '@/sections/QuizSection';
import FlashcardsSection from '@/sections/FlashcardsSection';
import CTASection from '@/sections/CTASection';
import Footer from '@/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Global snap for pinned sections
    const setupSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    };

    // Delay snap setup to allow all ScrollTriggers to initialize
    const timer = setTimeout(setupSnap, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <main ref={mainRef} className="pt-16">
      <HeroSection />
      <ToolsSection />
      <AIChatSection />
      <SubjectsSection />
      <DashboardPreviewSection />
      <StudyPlannerSection />
      <QuizSection />
      <FlashcardsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
