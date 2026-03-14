import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Layers, 
  Sparkles, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle2,
  XCircle,
  BookOpen,
  Lightbulb
} from 'lucide-react';
import { toast } from 'sonner';

interface Flashcard {
  id: number;
  front: string;
  back: string;
  hint?: string;
}

interface Deck {
  topic: string;
  cards: Flashcard[];
}

const sampleDeck: Deck = {
  topic: 'Biology - Cell Biology',
  cards: [
    {
      id: 1,
      front: 'What is the powerhouse of the cell?',
      back: 'Mitochondria',
      hint: 'Think energy production...',
    },
    {
      id: 2,
      front: 'What organelle contains the cell\'s genetic material?',
      back: 'Nucleus',
      hint: 'It\'s the control center...',
    },
    {
      id: 3,
      front: 'What is the function of ribosomes?',
      back: 'Protein synthesis',
      hint: 'They build molecules...',
    },
    {
      id: 4,
      front: 'What is the cell membrane made of?',
      back: 'Phospholipid bilayer',
      hint: 'Two layers of fat molecules...',
    },
    {
      id: 5,
      front: 'What does the Golgi apparatus do?',
      back: 'Packages and distributes proteins',
      hint: 'Like a postal service...',
    },
  ],
};

export default function Flashcards() {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [deck, setDeck] = useState<Deck | null>(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mastered, setMastered] = useState<number[]>([]);
  const [needsPractice, setNeedsPractice] = useState<number[]>([]);
  const [studyComplete, setStudyComplete] = useState(false);

  const generateFlashcards = async () => {
    if (!topic.trim()) {
      toast.error('Please enter a topic');
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      setDeck(sampleDeck);
      setCurrentCard(0);
      setIsFlipped(false);
      setMastered([]);
      setNeedsPractice([]);
      setStudyComplete(false);
      setIsGenerating(false);
      toast.success('Flashcards generated successfully!');
    }, 1500);
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const nextCard = () => {
    if (deck && currentCard < deck.cards.length - 1) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false);
    } else {
      setStudyComplete(true);
    }
  };

  const prevCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setIsFlipped(false);
    }
  };

  const markMastered = () => {
    if (deck && !mastered.includes(deck.cards[currentCard].id)) {
      setMastered([...mastered, deck.cards[currentCard].id]);
      toast.success('Marked as mastered!');
    }
    nextCard();
  };

  const markNeedsPractice = () => {
    if (deck && !needsPractice.includes(deck.cards[currentCard].id)) {
      setNeedsPractice([...needsPractice, deck.cards[currentCard].id]);
      toast.info('Added to practice list');
    }
    nextCard();
  };

  const restartStudy = () => {
    setCurrentCard(0);
    setIsFlipped(false);
    setMastered([]);
    setNeedsPractice([]);
    setStudyComplete(false);
  };

  const progress = deck ? ((currentCard + 1) / deck.cards.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#F6F8FC] pt-16">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
            <Layers className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">AI Flashcards</h1>
            <p className="text-slate-500">Generate flashcards for effective revision</p>
          </div>
        </div>

        {/* Generate Form */}
        {!deck && (
          <div className="bg-white rounded-3xl p-8 card-shadow">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter a topic (e.g., Periodic Table, French Revolution)"
                  className="h-14 rounded-xl text-lg"
                />
              </div>
              <Button
                onClick={generateFlashcards}
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
                    Create Deck
                  </>
                )}
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Chemistry', 'History', 'Geography'].map((subject) => (
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

        {/* Flashcard Study Interface */}
        {deck && !studyComplete && (
          <>
            {/* Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-500">
                  Card {currentCard + 1} of {deck.cards.length}
                </span>
                <div className="flex gap-4 text-sm">
                  <span className="text-green-600">
                    <CheckCircle2 className="w-4 h-4 inline mr-1" />
                    {mastered.length} Mastered
                  </span>
                  <span className="text-red-600">
                    <XCircle className="w-4 h-4 inline mr-1" />
                    {needsPractice.length} Need Practice
                  </span>
                </div>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Flashcard */}
            <div className="relative mb-6" style={{ perspective: '1000px' }}>
              <div
                onClick={flipCard}
                className={`relative w-full h-80 md:h-96 cursor-pointer transition-transform duration-500 ${
                  isFlipped ? '[transform:rotateY(180deg)]' : ''
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front */}
                <div
                  className="absolute inset-0 bg-white rounded-3xl card-shadow p-8 flex flex-col items-center justify-center"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <span className="absolute top-6 left-6 text-sm text-slate-400">
                    Question
                  </span>
                  <h3 className="text-xl md:text-2xl font-semibold text-slate-900 text-center">
                    {deck.cards[currentCard].front}
                  </h3>
                  {deck.cards[currentCard].hint && (
                    <div className="absolute bottom-6 flex items-center gap-2 text-amber-600 text-sm">
                      <Lightbulb className="w-4 h-4" />
                      <span>{deck.cards[currentCard].hint}</span>
                    </div>
                  )}
                  <Button
                    variant="outline"
                    className="absolute bottom-6 right-6 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      flipCard();
                    }}
                  >
                    <RotateCw className="w-4 h-4 mr-2" />
                    Flip
                  </Button>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 bg-green-500 rounded-3xl card-shadow p-8 flex flex-col items-center justify-center text-white"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <span className="absolute top-6 left-6 text-sm text-green-100">
                    Answer
                  </span>
                  <h3 className="text-xl md:text-2xl font-semibold text-center">
                    {deck.cards[currentCard].back}
                  </h3>
                  <Button
                    variant="outline"
                    className="absolute bottom-6 right-6 rounded-full bg-white text-green-600 hover:bg-green-50 border-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      flipCard();
                    }}
                  >
                    <RotateCw className="w-4 h-4 mr-2" />
                    Flip Back
                  </Button>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={prevCard}
                disabled={currentCard === 0}
                className="w-12 h-12 bg-white rounded-full card-shadow flex items-center justify-center text-slate-600 disabled:opacity-50 hover:bg-slate-50"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="flex gap-3">
                <Button
                  onClick={markNeedsPractice}
                  variant="outline"
                  className="rounded-full px-6 border-red-300 text-red-600 hover:bg-red-50"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Need Practice
                </Button>
                <Button
                  onClick={markMastered}
                  className="rounded-full px-6 bg-green-500 hover:bg-green-600 text-white"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Mastered
                </Button>
              </div>

              <button
                onClick={nextCard}
                className="w-12 h-12 bg-white rounded-full card-shadow flex items-center justify-center text-slate-600 hover:bg-slate-50"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </>
        )}

        {/* Study Complete */}
        {studyComplete && (
          <div className="bg-white rounded-3xl p-8 card-shadow text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Study Session Complete!</h2>
            <p className="text-slate-500 mb-8">Great job reviewing your flashcards</p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-2xl font-bold text-slate-900">{deck?.cards.length}</p>
                <p className="text-sm text-slate-500">Total Cards</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <p className="text-2xl font-bold text-green-600">{mastered.length}</p>
                <p className="text-sm text-slate-500">Mastered</p>
              </div>
              <div className="p-4 bg-red-50 rounded-xl">
                <p className="text-2xl font-bold text-red-600">{needsPractice.length}</p>
                <p className="text-sm text-slate-500">Need Practice</p>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button
                onClick={restartStudy}
                variant="outline"
                className="rounded-full px-6"
              >
                <RotateCw className="w-4 h-4 mr-2" />
                Study Again
              </Button>
              <Button
                onClick={() => {
                  setDeck(null);
                  setTopic('');
                }}
                className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                New Deck
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
