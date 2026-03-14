import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
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
  Circle,
  FileEdit,
  BrainCircuit,
  PlayCircle,
  MessageSquare,
  Bell,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/App';

const sidebarItems = [
  { icon: Home, label: 'Home', href: '/dashboard', active: true },
  { icon: BookOpen, label: 'My Subjects', href: '#', active: false },
  { icon: FileText, label: 'Notes Maker', href: '/notes', active: false },
  { icon: HelpCircle, label: 'Quiz Creator', href: '/quiz', active: false },
  { icon: Layers, label: 'Flashcards', href: '/flashcards', active: false },
  { icon: Calendar, label: 'Study Planner', href: '/planner', active: false },
  { icon: ClipboardCheck, label: 'Mock Tests', href: '/mocktests', active: false },
  { icon: TrendingUp, label: 'Progress Tracker', href: '#', active: false },
  { icon: Settings, label: 'Settings', href: '#', active: false },
];

const goals = [
  { id: 1, text: 'Revise Chapter 5', completed: true },
  { id: 2, text: 'Complete Geography Quiz', completed: false },
  { id: 3, text: "Learn Newton's Laws", completed: false },
];

const quickTools = [
  { icon: FileEdit, label: 'Generate Notes', href: '/notes', color: 'bg-blue-500' },
  { icon: BrainCircuit, label: 'Practice Quiz', href: '/quiz', color: 'bg-purple-500' },
  { icon: Layers, label: 'Create Flashcards', href: '/flashcards', color: 'bg-orange-500' },
  { icon: PlayCircle, label: 'Start Mock Test', href: '/mocktests', color: 'bg-pink-500' },
];

const recentActivity = [
  { action: 'Completed Quiz', subject: 'Biology', score: '8/10', time: '2 hours ago' },
  { action: 'Generated Notes', subject: 'Physics', topic: 'Quantum Mechanics', time: '5 hours ago' },
  { action: 'Studied Flashcards', subject: 'Chemistry', count: '24 cards', time: '1 day ago' },
];

export default function Dashboard() {
  const [activeGoals, setActiveGoals] = useState(goals);
  const auth = useAuth();

  const toggleGoal = (id: number) => {
    setActiveGoals(goals => 
      goals.map(goal => 
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  const completedGoals = activeGoals.filter(g => g.completed).length;
  const progress = (completedGoals / activeGoals.length) * 100;

  return (
    <div className="min-h-screen bg-[#F6F8FC] pt-16">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white min-h-[calc(100vh-64px)] border-r border-slate-200 hidden lg:block">
          <div className="p-4">
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    item.active
                      ? 'bg-green-50 text-green-600'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-8 pt-8 border-t border-slate-200">
              <button
                onClick={auth?.logout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 w-full transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Log out
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                Welcome Back, {auth?.user?.name || 'Alex'}!
              </h1>
              <p className="text-slate-500 mt-1">
                You have {activeGoals.length - completedGoals} tasks to complete today
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/chat">
                <Button className="bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Ask AI
                </Button>
              </Link>
              <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="xl:col-span-2 space-y-6">
              {/* Today's Goals */}
              <div className="bg-white rounded-3xl p-6 card-shadow">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-slate-900">Today's Study Goals</h3>
                  <span className="text-sm text-slate-500">{completedGoals}/{activeGoals.length} completed</span>
                </div>
                <Progress value={progress} className="mb-6 h-2" />
                <div className="space-y-3">
                  {activeGoals.map((goal) => (
                    <div
                      key={goal.id}
                      onClick={() => toggleGoal(goal.id)}
                      className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors"
                    >
                      {goal.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      )}
                      <span className={`flex-1 ${goal.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                        {goal.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Tools */}
              <div className="bg-white rounded-3xl p-6 card-shadow">
                <h3 className="text-lg font-semibold text-slate-900 mb-6">Quick Study Tools</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {quickTools.map((tool) => (
                    <Link
                      key={tool.label}
                      to={tool.href}
                      className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors group"
                    >
                      <div className={`w-12 h-12 ${tool.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                        <tool.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm font-medium text-slate-700 text-center">{tool.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-3xl p-6 card-shadow">
                <h3 className="text-lg font-semibold text-slate-900 mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{activity.action}</p>
                          <p className="text-sm text-slate-500">
                            {activity.subject} {activity.score && `• ${activity.score}`} {activity.topic && `• ${activity.topic}`} {activity.count && `• ${activity.count}`}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm text-slate-400">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Progress Ring */}
              <div className="bg-white rounded-3xl p-6 card-shadow">
                <h3 className="text-lg font-semibold text-slate-900 mb-6">Weekly Progress</h3>
                <div className="flex flex-col items-center">
                  <div className="relative w-40 h-40 mb-4">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="#e2e8f0"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="#22c55e"
                        strokeWidth="12"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray="439.82"
                        strokeDashoffset="87.96"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-slate-900">80%</span>
                      <span className="text-xs text-slate-500">Complete</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-slate-600">Topics completed</p>
                    <p className="text-xl font-semibold text-slate-900">24 / 30</p>
                  </div>
                </div>
              </div>

              {/* Weak Areas */}
              <div className="bg-red-50 rounded-3xl p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Weak Areas</h3>
                <p className="text-sm text-slate-600 mb-4">Focus on these subjects:</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                    <span className="text-slate-700">Chemistry</span>
                    <span className="text-sm text-red-600 font-medium">65%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                    <span className="text-slate-700">Physics</span>
                    <span className="text-sm text-amber-600 font-medium">72%</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 rounded-full">
                  View Details
                </Button>
              </div>

              {/* Study Streak */}
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Study Streak</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold">12</span>
                  <span className="text-green-100">days</span>
                </div>
                <p className="text-sm text-green-100">
                  Keep it up! You're on fire!
                </p>
                <div className="flex gap-1 mt-4">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-8 rounded-lg ${
                        i < 5 ? 'bg-white/30' : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
