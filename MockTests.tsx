import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  ClipboardCheck, 
  Clock, 
  Play, 
  Trophy, 
  AlertCircle,
  CheckCircle2,
  XCircle,
  RotateCw,
  Timer
} from 'lucide-react';
import { toast } from 'sonner';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Test {
  id: number;
  name: string;
  subject: string;
  duration: number; // in minutes
  questions: Question[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const mockTests: Test[] = [
  {
    id: 1,
    name: 'Biology Fundamentals',
    subject: 'Biology',
    duration: 30,
    difficulty: 'Medium',
    questions: [
      {
        id: 1,
        question: 'What is the basic unit of life?',
        options: ['Atom', 'Cell', 'Molecule', 'Organ'],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: 'Which organelle is responsible for protein synthesis?',
        options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi apparatus'],
        correctAnswer: 2,
      },
      {
        id: 3,
        question: 'What is the process by which plants make their own food?',
        options: ['Respiration', 'Photosynthesis', 'Fermentation', 'Digestion'],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 2,
    name: 'World History Quiz',
    subject: 'History',
    duration: 45,
    difficulty: 'Hard',
    questions: [
      {
        id: 1,
        question: 'In which year did World War II end?',
        options: ['1943', '1944', '1945', '1946'],
        correctAnswer: 2,
      },
      {
        id: 2,
        question: 'Who was the first President of the United States?',
        options: ['Thomas Jefferson', 'John Adams', 'George Washington', 'Benjamin Franklin'],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 3,
    name: 'Algebra Basics',
    subject: 'Mathematics',
    duration: 20,
    difficulty: 'Easy',
    questions: [
      {
        id: 1,
        question: 'What is the value of x in 2x + 4 = 10?',
        options: ['2', '3', '4', '5'],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: 'Simplify: 3(x + 2)',
        options: ['3x + 2', '3x + 6', 'x + 6', '3x + 5'],
        correctAnswer: 1,
      },
    ],
  },
];

export default function MockTests() {
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (testStarted && timeLeft > 0 && !testCompleted) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            completeTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [testStarted, timeLeft, testCompleted]);

  const startTest = (test: Test) => {
    setSelectedTest(test);
    setTimeLeft(test.duration * 60);
    setCurrentQuestion(0);
    setAnswers([]);
    setTestCompleted(false);
    setTestStarted(true);
    toast.success('Test started! Good luck!');
  };

  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (selectedTest && currentQuestion < selectedTest.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeTest();
    }
  };

  const completeTest = () => {
    setTestCompleted(true);
    setTestStarted(false);
  };

  const calculateScore = () => {
    if (!selectedTest) return 0;
    const correct = answers.filter((answer, index) => 
      answer === selectedTest.questions[index].correctAnswer
    ).length;
    return Math.round((correct / selectedTest.questions.length) * 100);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTest = () => {
    setSelectedTest(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setTimeLeft(0);
    setTestCompleted(false);
    setTestStarted(false);
  };

  if (selectedTest && testStarted && !testCompleted) {
    const question = selectedTest.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / selectedTest.questions.length) * 100;

    return (
      <div className="min-h-screen bg-[#F6F8FC] pt-16">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-8">
          {/* Timer Bar */}
          <div className="bg-white rounded-2xl p-4 card-shadow mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-slate-500">
                Question {currentQuestion + 1} of {selectedTest.questions.length}
              </span>
              <div className={`flex items-center gap-2 font-mono text-lg ${
                timeLeft < 60 ? 'text-red-600' : 'text-slate-700'
              }`}>
                <Timer className="w-5 h-5" />
                {formatTime(timeLeft)}
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question */}
          <div className="bg-white rounded-3xl p-6 md:p-8 card-shadow">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">
              {question.question}
            </h3>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => selectAnswer(index)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    answers[currentQuestion] === index
                      ? 'border-green-500 bg-green-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        answers[currentQuestion] === index
                          ? 'border-green-500'
                          : 'border-slate-300'
                      }`}
                    >
                      {answers[currentQuestion] === index && (
                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                      )}
                    </div>
                    <span className="font-medium text-slate-700">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <Button
                onClick={nextQuestion}
                className="bg-green-500 hover:bg-green-600 text-white rounded-full px-8"
              >
                {currentQuestion < selectedTest.questions.length - 1 ? 'Next' : 'Finish'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedTest && testCompleted) {
    const score = calculateScore();
    const correctAnswers = answers.filter((answer, index) => 
      answer === selectedTest.questions[index].correctAnswer
    ).length;

    return (
      <div className="min-h-screen bg-[#F6F8FC] pt-16">
        <div className="max-w-2xl mx-auto px-4 md:px-6 py-8">
          <div className="bg-white rounded-3xl p-8 card-shadow text-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
              score >= 80 ? 'bg-green-100' : score >= 60 ? 'bg-amber-100' : 'bg-red-100'
            }`}>
              <Trophy className={`w-10 h-10 ${
                score >= 80 ? 'text-green-600' : score >= 60 ? 'text-amber-600' : 'text-red-600'
              }`} />
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-2">Test Complete!</h2>
            <p className="text-slate-500 mb-6">{selectedTest.name}</p>

            <div className="text-5xl font-bold text-slate-900 mb-8">
              {score}%
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-2xl font-bold text-slate-900">{selectedTest.questions.length}</p>
                <p className="text-sm text-slate-500">Questions</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <p className="text-2xl font-bold text-green-600">{correctAnswers}</p>
                <p className="text-sm text-slate-500">Correct</p>
              </div>
              <div className="p-4 bg-red-50 rounded-xl">
                <p className="text-2xl font-bold text-red-600">{selectedTest.questions.length - correctAnswers}</p>
                <p className="text-sm text-slate-500">Incorrect</p>
              </div>
            </div>

            {/* Review Answers */}
            <div className="text-left mb-8">
              <h3 className="font-semibold text-slate-900 mb-4">Review Answers</h3>
              <div className="space-y-3">
                {selectedTest.questions.map((q, i) => {
                  const isCorrect = answers[i] === q.correctAnswer;
                  return (
                    <div key={q.id} className={`p-4 rounded-xl ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                      <div className="flex items-start gap-3">
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className="text-sm font-medium text-slate-900">{q.question}</p>
                          <p className="text-sm text-slate-500 mt-1">
                            Your answer: {q.options[answers[i]] || 'Not answered'}
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-green-600 mt-1">
                              Correct answer: {q.options[q.correctAnswer]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button
                onClick={resetTest}
                variant="outline"
                className="rounded-full px-6"
              >
                <RotateCw className="w-4 h-4 mr-2" />
                Back to Tests
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F8FC] pt-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
            <ClipboardCheck className="w-6 h-6 text-cyan-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Mock Tests</h1>
            <p className="text-slate-500">Practice with timed quizzes and track your progress</p>
          </div>
        </div>

        {/* Test Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTests.map((test) => (
            <div key={test.id} className="bg-white rounded-3xl p-6 card-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  test.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                  test.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {test.difficulty}
                </span>
                <span className="text-sm text-slate-500 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {test.duration} min
                </span>
              </div>

              <h3 className="text-lg font-semibold text-slate-900 mb-2">{test.name}</h3>
              <p className="text-sm text-slate-500 mb-4">{test.subject}</p>

              <div className="flex items-center gap-4 text-sm text-slate-600 mb-6">
                <span>{test.questions.length} questions</span>
              </div>

              <Button
                onClick={() => startTest(test)}
                className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Test
              </Button>
            </div>
          ))}
        </div>

        {/* Info Card */}
        <div className="mt-8 bg-blue-50 rounded-2xl p-6 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">Test Tips</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Read each question carefully before answering</li>
              <li>• Manage your time wisely - don't spend too long on one question</li>
              <li>• Review your answers before submitting if time permits</li>
              <li>• Practice regularly to improve your scores</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
