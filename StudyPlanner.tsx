import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  Plus,
  Trash2,
  Sparkles,
  Target
} from 'lucide-react';
import { toast } from 'sonner';

interface Task {
  id: number;
  subject: string;
  task: string;
  time: string;
  completed: boolean;
}

const sampleTasks: Task[] = [
  { id: 1, subject: 'Biology', task: 'Revise Chapter 5', time: '9:00 AM', completed: true },
  { id: 2, subject: 'Mathematics', task: 'Practice Algebra Problems', time: '11:00 AM', completed: false },
  { id: 3, subject: 'History', task: 'Review World War II Notes', time: '2:00 PM', completed: false },
  { id: 4, subject: 'Chemistry', task: 'Complete Lab Report', time: '4:00 PM', completed: false },
];

export default function StudyPlanner() {
  const [date, setDate] = useState<Date>(new Date());
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [newTask, setNewTask] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [newTime, setNewTime] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [examDate, setExamDate] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (!newTask || !newSubject || !newTime) {
      toast.error('Please fill in all fields');
      return;
    }

    const task: Task = {
      id: Date.now(),
      subject: newSubject,
      task: newTask,
      time: newTime,
      completed: false,
    };

    setTasks([...tasks, task]);
    setNewTask('');
    setNewSubject('');
    setNewTime('');
    setShowAddForm(false);
    toast.success('Task added!');
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast.success('Task deleted');
  };

  const generatePlan = () => {
    if (!examDate) {
      toast.error('Please enter an exam date');
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      const generatedTasks: Task[] = [
        { id: Date.now(), subject: 'Mathematics', task: 'Review formulas and equations', time: '9:00 AM', completed: false },
        { id: Date.now() + 1, subject: 'Physics', task: 'Practice problem solving', time: '11:00 AM', completed: false },
        { id: Date.now() + 2, subject: 'Chemistry', task: 'Memorize periodic table', time: '2:00 PM', completed: false },
        { id: Date.now() + 3, subject: 'Biology', task: 'Review cell structure', time: '4:00 PM', completed: false },
      ];
      setTasks(generatedTasks);
      setIsGenerating(false);
      toast.success('Study plan generated!');
    }, 1500);
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#F6F8FC] pt-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
            <CalendarIcon className="w-6 h-6 text-pink-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">AI Study Planner</h1>
            <p className="text-slate-500">Create personalized study schedules</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 card-shadow">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                className="rounded-xl"
              />
            </div>

            {/* Generate Plan */}
            <div className="bg-white rounded-3xl p-6 card-shadow mt-6">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-green-500" />
                AI Plan Generator
              </h3>
              <div className="space-y-3">
                <Input
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="rounded-xl"
                />
                <Button
                  onClick={generatePlan}
                  disabled={isGenerating}
                  className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Target className="w-4 h-4 mr-2" />
                      Generate Plan
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Tasks */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-6 card-shadow">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {completedCount} of {tasks.length} tasks completed
                  </p>
                </div>
                <Button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="bg-green-500 hover:bg-green-600 text-white rounded-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-2 mb-6">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Add Task Form */}
              {showAddForm && (
                <div className="bg-slate-50 rounded-2xl p-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Input
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                      placeholder="Subject"
                      className="rounded-xl"
                    />
                    <Input
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      placeholder="Task description"
                      className="rounded-xl"
                    />
                    <Input
                      type="time"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button onClick={addTask} className="bg-green-500 hover:bg-green-600 text-white rounded-full">
                      Add
                    </Button>
                    <Button variant="outline" onClick={() => setShowAddForm(false)} className="rounded-full">
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {/* Task List */}
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${
                      task.completed ? 'bg-green-50' : 'bg-slate-50'
                    }`}
                  >
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        task.completed
                          ? 'bg-green-500 border-green-500'
                          : 'border-slate-300'
                      }`}
                    >
                      {task.completed && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </button>
                    <div className="flex-1">
                      <p className={`font-medium ${task.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                        {task.task}
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
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
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {tasks.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CalendarIcon className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-500">No tasks for this day</p>
                  <Button
                    onClick={() => setShowAddForm(true)}
                    variant="outline"
                    className="mt-4 rounded-full"
                  >
                    Add your first task
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
