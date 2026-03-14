import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Trophy,
  RotateCw,
  BookOpen
} from 'lucide-react';
import { toast } from 'sonner';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Quiz {
  topic: string;
  questions: Question[];
}

const sampleQuiz: Quiz = {
  topic: 'Biology - Cell Structure',
  questions: [
    {
      id: 1,
      question: 'What is the powerhouse of the cell?',
      options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Endoplasmic Reticulum'],
      correctAnswer: 1,
      explanation: 'Mitochondria are often called the powerhouse of the cell because they generate most of the cell\'s supply of adenosine triphosphate (ATP), used as a source of chemical energy.',
    },
    {
      id: 2,
      question: 'Which organelle contains the cell\'s genetic material?',
      options: ['Mitochondria', 'Golgi Apparatus', 'Nucleus', 'Lysosome'],
      correctAnswer: 2,
      explanation: 'The nucleus contains the cell\'s genetic material (DNA) and coordinates cell activities like growth, metabolism, and reproduction.',
    },
    {
      id: 3,
      question: 'What is the function of ribosomes?',
      options: ['Protein synthesis', 'Energy production', 'Waste removal', 'Cell division'],
      correctAnswer: 0,
      explanation: 'Ribosomes are responsible for protein synthesis. They read messenger RNA and assemble amino acids into proteins.',
    },
  ],
};

export default function QuizGenerator() {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const generateQuiz = async () => {
    if (!topic.trim()) {
      toast.error('Please enter a topic');
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      setQuiz(sampleQuiz);
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setAnswers([]);
      setQuizCompleted(false);
      setIsGenerating(false);
      toast.success('Quiz generated successfully!');
    }, 1500);
  };

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) {
      toast.error('Please select an answer');
      return;
    }

    setShowResult(true);
    setAnswers([...answers, selectedAnswer]);
  };

  const nextQuestion = () => {
    if (quiz && currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnswers([]);
    setQuizCompleted(false);
  };

  const correctAnswers = answers.filter((answer, index) => 
    quiz && answer === quiz.questions[index].correctAnswer
  ).length;

  const score = quiz ? Math.round((correctAnswers / quiz.questions.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#F6F8FC] pt-16">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
            <HelpCircle className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">AI Quiz Creator</h1>
            <p className="text-slate-500">Generate custom quizzes to test your knowledge</p>
          </div>
        </div>

        {/* Generate Form */}
        {!quiz && (
          <div className="bg-white rounded-3xl p-8 card-shadow">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter a topic (e.g., World War II, Photosynthesis, Algebra)"
                  className="h-14 rounded-xl text-lg"
                />
              </div>
              <Button
                onClick={generateQuiz}
                disabled={isGenerating}
                className="h-14 px-8 bg-green-500 hover:bg-green-600 text-white rounded-xl text-lg"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Create Quiz
                  </>
                )}
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Biology', 'History', 'Mathematics'].map((subject) => (
                <button
                  key={subject}
                  onClick={() => setTopic(subject)}
                  className="p-4 bg-slate-50 rounded-xl text-left hover:bg-slate-100 transition-colors"
                >
                  <BookOpen className="w-5 h-5 text-slate-400 mb-2" />
                  <span className="font-medium text-slate-700">{subject}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quiz Interface */}
        {quiz && !quizCompleted && (
          <div className="bg-white rounded-3xl p-6 md:p-8 card-shadow">
            {/* Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-500">
                  Question {currentQuestion + 1} of {quiz.questions.length}
                </span>
                <span className="text-sm text-slate-500">
                  {Math.round(((currentQuestion + 1) / quiz.questions.length) * 100)}% Complete
                </span>
              </div>
              <Progress 
                value={((currentQuestion + 1) / quiz.questions.length) * 100} 
                className="h-2"
              />
            </div>

            {/* Question */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">
                {quiz.questions[currentQuestion].question}
              </h3>

              <div className="space-y-3">
                {quiz.questions[currentQuestion].options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === quiz.questions[currentQuestion].correctAnswer;
                  const showCorrect = showResult && isCorrect;
                  const showWrong = showResult && isSelected && !isCorrect;

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={showResult}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        showCorrect
                          ? 'border-green-500 bg-green-50'
                          : showWrong
                          ? 'border-red-500 bg-red-50'
                          : isSelected
                          ? 'border-green-500 bg-green-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            showCorrect
                              ? 'border-green-500 bg-green-500'
                              : showWrong
                              ? 'border-red-500 bg-red-500'
                              : isSelected
                              ? 'border-green-500'
                              : 'border-slate-300'
                          }`}
                        >
                          {showCorrect && <CheckCircle2 className="w-4 h-4 text-white" />}
                          {showWrong && <XCircle className="w-4 h-4 text-white" />}
                          {isSelected && !showResult && (
                            <div className="w-3 h-3 bg-green-500 rounded-full" />
                          )}
                        </div>
                        <span
                          className={`font-medium ${
                            showCorrect
                              ? 'text-green-700'
                              : showWrong
                              ? 'text-red-700'
                              : 'text-slate-700'
                          }`}
                        >
                          {option}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Explanation */}
            {showResult && (
              <div className="mb-6 p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-blue-800">
                  <strong>Explanation:</strong> {quiz.questions[currentQuestion].explanation}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-between">
              {!showResult ? (
                <Button
                  onClick={submitAnswer}
                  disabled={selectedAnswer === null}
                  className="bg-green-500 hover:bg-green-600 text-white rounded-full px-8"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button
                  onClick={nextQuestion}
                  className="bg-green-500 hover:bg-green-600 text-white rounded-full px-8"
                >
                  {currentQuestion < quiz.questions.length - 1 ? 'Next Question' : 'See Results'}
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Quiz Results */}
        {quizCompleted && (
          <div className="bg-white rounded-3xl p-8 card-shadow text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Quiz Complete!</h2>
            <p className="text-slate-500 mb-6">Here's how you performed</p>

            <div className="flex justify-center items-center gap-2 mb-8">
              <span className="text-5xl font-bold text-green-500">{score}%</span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-2xl font-bold text-slate-900">{quiz?.questions.length || 0}</p>
                <p className="text-sm text-slate-500">Total Questions</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <p className="text-2xl font-bold text-green-600">{correctAnswers}</p>
                <p className="text-sm text-slate-500">Correct</p>
              </div>
              <div className="p-4 bg-red-50 rounded-xl">
                <p className="text-2xl font-bold text-red-600">{(quiz?.questions.length || 0) - correctAnswers}</p>
                <p className="text-sm text-slate-500">Incorrect</p>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button
                onClick={restartQuiz}
                variant="outline"
                className="rounded-full px-6"
              >
                <RotateCw className="w-4 h-4 mr-2" />
                Retry Quiz
              </Button>
              <Button
                onClick={() => {
                  setQuiz(null);
                  setTopic('');
                }}
                className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                New Quiz
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
