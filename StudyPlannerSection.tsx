import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Calendar as CalendarIcon, Clock, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const tasks = [
  { subject: 'Biology', task: 'Revise Chapter 5', time: '9:00 AM', completed: true },
  { subject: 'Mathematics', task: 'Practice Algebra Problems', time: '11:00 AM', completed: false },
  { subject: 'History', task: 'Review World War II Notes', time: '2:00 PM', completed: false },
];

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const dates = [28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1];

export default function StudyPlannerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const plannerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const planPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const planner = plannerRef.current;
    const calendar = calendarRef.current;
    const planPanel = planPanelRef.current;

    if (!section || !planner) return;

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
          planner,
          { opacity: 0, x: '60vw', scale: 0.94 },
          { opacity: 1, x: 0, scale: 1, ease: 'none' },
          0
        );

      if (calendar) {
        scrollTl.fromTo(
          calendar,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, ease: 'none' },
          0.1
        );
      }

      if (planPanel) {
        scrollTl.fromTo(
          planPanel,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, ease: 'none' },
          0.15
        );

        // Tasks stagger
        const taskItems = planPanel.querySelectorAll('.task-item');
        scrollTl.fromTo(
          taskItems,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, stagger: 0.02, ease: 'none' },
          0.2
        );
      }

      // Phase 3: EXIT (70%–100%)
      scrollTl.to(
        planner,
        { y: '-55vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-white overflow-hidden z-60"
    >
      <div
        ref={plannerRef}
        className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[86vw] max-w-[1080px] h-[60vh] max-h-[560px] bg-white rounded-[36px] card-shadow flex overflow-hidden opacity-0"
      >
        {/* Calendar */}
        <div ref={calendarRef} className="flex-1 p-6 md:p-8 border-r border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-green-500" />
              March 2026
            </h3>
            <div className="flex gap-1">
              <button className="p-1 hover:bg-slate-100 rounded-lg">
                <ChevronLeft className="w-5 h-5 text-slate-400" />
              </button>
              <button className="p-1 hover:bg-slate-100 rounded-lg">
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-slate-400 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {dates.map((date, index) => {
              const isToday = date === 12;
              const isCurrentMonth = index >= 3 && index <= 33;
              return (
                <button
                  key={index}
                  className={`aspect-square flex items-center justify-center text-sm rounded-lg transition-colors ${
                    isToday
                      ? 'bg-green-500 text-white'
                      : isCurrentMonth
                      ? 'text-slate-700 hover:bg-slate-100'
                      : 'text-slate-300'
                  }`}
                >
                  {date}
                </button>
              );
            })}
          </div>
        </div>

        {/* Today's Plan Panel */}
        <div ref={planPanelRef} className="w-80 md:w-96 bg-slate-50 p-6 md:p-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-1">
            Today's Study Plan
          </h3>
          <p className="text-sm text-slate-500 mb-6">Wednesday, March 12</p>

          <div className="space-y-4">
            {tasks.map((task, index) => (
              <div
                key={index}
                className="task-item bg-white rounded-xl p-4 border border-slate-100"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      task.completed
                        ? 'bg-green-500 border-green-500'
                        : 'border-slate-300'
                    }`}
                  >
                    {task.completed && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${task.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                      {task.task}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {task.subject}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {task.time}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              variant="outline"
              className="flex-1 rounded-full text-sm"
            >
              Reschedule
            </Button>
            <Button
              className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-full text-sm"
            >
              Mark Complete
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
