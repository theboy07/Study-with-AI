import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  FileText, 
  Sparkles, 
  Download, 
  Copy, 
  Save,
  BookOpen,
  Clock,
  Star
} from 'lucide-react';
import { toast } from 'sonner';

interface Note {
  id: number;
  topic: string;
  content: string;
  createdAt: Date;
  isFavorite: boolean;
}

const sampleNotes: Note[] = [
  {
    id: 1,
    topic: 'Photosynthesis',
    content: `## Photosynthesis

### Definition
Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll.

### Chemical Equation
6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂

### Key Components
1. **Chlorophyll** - Green pigment that captures light energy
2. **Chloroplasts** - Organelles where photosynthesis occurs
3. **Stomata** - Pores for gas exchange

### Two Stages
1. **Light-dependent reactions** - Capture energy from sunlight
2. **Calvin cycle (Light-independent)** - Convert CO₂ into glucose

### Importance
- Produces oxygen for atmosphere
- Base of food chain
- Removes CO₂ from atmosphere`,
    createdAt: new Date(Date.now() - 86400000),
    isFavorite: true,
  },
];

export default function NotesGenerator() {
  const [topic, setTopic] = useState('');
  const [detailLevel, setDetailLevel] = useState<'short' | 'detailed'>('detailed');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedNote, setGeneratedNote] = useState<Note | null>(null);
  const [savedNotes, setSavedNotes] = useState<Note[]>(sampleNotes);
  const [selectedNote, setSelectedNote] = useState<Note | null>(sampleNotes[0]);

  const generateNotes = async () => {
    if (!topic.trim()) {
      toast.error('Please enter a topic');
      return;
    }

    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      const newNote: Note = {
        id: Date.now(),
        topic: topic,
        content: detailLevel === 'detailed' 
          ? `## ${topic}

### Overview
${topic} is a fundamental concept that plays a crucial role in understanding the subject matter. This comprehensive guide covers all the essential aspects you need to know.

### Key Concepts
1. **Definition** - A clear explanation of what ${topic} means and its significance
2. **Importance** - Why understanding ${topic} matters in the broader context
3. **Applications** - Real-world examples and use cases

### Detailed Explanation
${topic} involves several interconnected components that work together to achieve specific outcomes. Understanding these relationships is essential for mastery.

### Main Points to Remember
- Core principles and fundamentals
- Common misconceptions to avoid
- Practical tips for application
- Related concepts and dependencies

### Summary
Mastering ${topic} requires practice and consistent review. Use these notes as a reference and supplement with additional practice problems.`
          : `## ${topic} - Quick Notes

**Definition:** Core concept in the subject area

**Key Points:**
• Essential for understanding advanced topics
• Widely applicable in various contexts
• Requires practice to master

**Remember:** Review regularly and practice applying the concepts!`,
        createdAt: new Date(),
        isFavorite: false,
      };
      setGeneratedNote(newNote);
      setSelectedNote(newNote);
      setIsGenerating(false);
      toast.success('Notes generated successfully!');
    }, 2000);
  };

  const saveNote = () => {
    if (generatedNote) {
      setSavedNotes(prev => [generatedNote, ...prev]);
      toast.success('Note saved to your collection!');
    }
  };

  const copyNote = () => {
    if (selectedNote) {
      navigator.clipboard.writeText(selectedNote.content);
      toast.success('Copied to clipboard!');
    }
  };

  const toggleFavorite = (noteId: number) => {
    setSavedNotes(prev => 
      prev.map(note => 
        note.id === noteId ? { ...note, isFavorite: !note.isFavorite } : note
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC] pt-16">
      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <aside className="w-80 bg-white border-r border-slate-200 hidden lg:flex flex-col">
          <div className="p-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900">My Notes</h2>
          </div>
          <div className="flex-1 overflow-auto">
            {savedNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => setSelectedNote(note)}
                className={`p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors ${
                  selectedNote?.id === note.id ? 'bg-green-50 border-l-4 border-l-green-500' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-slate-900 text-sm">{note.topic}</h3>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {note.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(note.id);
                    }}
                    className={`p-1 rounded ${note.isFavorite ? 'text-amber-500' : 'text-slate-300'}`}
                  >
                    <Star className="w-4 h-4" fill={note.isFavorite ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white border-b border-slate-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-slate-900">AI Notes Generator</h1>
                  <p className="text-sm text-slate-500">Generate comprehensive study notes in seconds</p>
                </div>
              </div>
              {selectedNote && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={copyNote} className="rounded-full">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              )}
            </div>
          </header>

          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-4xl mx-auto">
              {/* Generate Form */}
              <div className="bg-white rounded-2xl p-6 card-shadow mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="Enter a topic (e.g., Photosynthesis, World War II, Calculus)"
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="flex bg-slate-100 rounded-xl p-1">
                      <button
                        onClick={() => setDetailLevel('short')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          detailLevel === 'short'
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'text-slate-600'
                        }`}
                      >
                        Short
                      </button>
                      <button
                        onClick={() => setDetailLevel('detailed')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          detailLevel === 'detailed'
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'text-slate-600'
                        }`}
                      >
                        Detailed
                      </button>
                    </div>
                    <Button
                      onClick={generateNotes}
                      disabled={isGenerating}
                      className="h-12 px-6 bg-green-500 hover:bg-green-600 text-white rounded-xl"
                    >
                      {isGenerating ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Generated Note */}
              {selectedNote ? (
                <div className="bg-white rounded-2xl p-8 card-shadow">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">{selectedNote.topic}</h2>
                    {generatedNote && generatedNote.id === selectedNote.id && (
                      <Button onClick={saveNote} variant="outline" className="rounded-full">
                        <Save className="w-4 h-4 mr-2" />
                        Save Note
                      </Button>
                    )}
                  </div>
                  <div className="prose prose-slate max-w-none">
                    <div className="whitespace-pre-line text-slate-700 leading-relaxed">
                      {selectedNote.content}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-12 card-shadow text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Generate Your First Note
                  </h3>
                  <p className="text-slate-500 max-w-md mx-auto">
                    Enter any topic above and let AI create comprehensive study notes for you.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
