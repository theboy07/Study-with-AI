import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Send, 
  Image, 
  Sparkles, 
  MoreVertical, 
  Plus,
  Clock,
  Star,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  hasImage?: boolean;
  imageUrl?: string;
}

const sampleConversations = [
  'Explain photosynthesis',
  'Help me solve this math problem',
  'What are Newton\'s laws?',
  'Generate notes on World War II',
];

const initialMessages: Message[] = [
  {
    id: 1,
    type: 'user',
    content: 'Explain the water cycle.',
    timestamp: new Date(),
  },
  {
    id: 2,
    type: 'ai',
    content: `The water cycle is the continuous movement of water on, above, and below the surface of the Earth. Here's how it works:

**1. Evaporation**
Water from oceans, lakes, and rivers heats up and turns into water vapor, rising into the atmosphere.

**2. Condensation**
As water vapor rises, it cools and forms tiny droplets, creating clouds.

**3. Precipitation**
When clouds become heavy, water falls back to Earth as rain, snow, sleet, or hail.

**4. Collection**
Water collects in bodies of water, and the cycle begins again!`,
    timestamp: new Date(),
    hasImage: true,
    imageUrl: '/water-cycle.jpg',
  },
];

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        type: 'ai',
        content: `That's a great question about "${inputValue}"! Let me help you understand this topic better.

**Key Points:**
1. This is an important concept in your studies
2. Understanding the fundamentals will help you solve more complex problems
3. Practice is essential for mastery

Would you like me to:
- Generate detailed notes on this topic?
- Create a practice quiz?
- Explain with examples?`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast.success('Image uploaded successfully!');
      const userMessage: Message = {
        id: Date.now(),
        type: 'user',
        content: 'I uploaded an image of my question.',
        timestamp: new Date(),
        hasImage: true,
      };
      setMessages(prev => [...prev, userMessage]);
      
      setTimeout(() => {
        const aiResponse: Message = {
          id: Date.now() + 1,
          type: 'ai',
          content: 'I can see your question! Let me analyze it and provide a step-by-step solution.',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const startNewChat = () => {
    setMessages([]);
    toast.success('New conversation started!');
  };

  return (
    <div className="min-h-screen bg-white pt-16 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-50 border-r border-slate-200 hidden lg:flex flex-col">
        <div className="p-4">
          <Button
            onClick={startNewChat}
            className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </Button>
        </div>

        <div className="flex-1 overflow-auto px-4">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3 px-2">
            Recent Conversations
          </p>
          <div className="space-y-1">
            {sampleConversations.map((conv, i) => (
              <button
                key={i}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-2"
              >
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="truncate">{conv}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-slate-200">
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100 transition-colors">
            <Star className="w-4 h-4" />
            Saved Conversations
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100 transition-colors mt-1">
            <Trash2 className="w-4 h-4" />
            Clear History
          </button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col h-[calc(100vh-64px)]">
        {/* Header */}
        <header className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-slate-900">StudyAI Tutor</h1>
              <p className="text-xs text-slate-500">Always here to help</p>
            </div>
          </div>
          <button className="p-2 hover:bg-slate-100 rounded-lg">
            <MoreVertical className="w-5 h-5 text-slate-600" />
          </button>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-auto px-4 md:px-6 py-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                How can I help you study today?
              </h2>
              <p className="text-slate-500 max-w-md">
                Ask me anything - from homework help to exam preparation, I'm here to assist!
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {sampleConversations.map((conv, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setInputValue(conv);
                    }}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-full text-sm text-slate-700 transition-colors"
                  >
                    {conv}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6 max-w-3xl mx-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] md:max-w-[75%] ${
                      message.type === 'user'
                        ? 'bg-green-500 text-white rounded-2xl rounded-tr-sm'
                        : 'bg-slate-100 text-slate-800 rounded-2xl rounded-tl-sm'
                    } px-4 md:px-5 py-3`}
                  >
                    {message.hasImage && message.imageUrl && (
                      <img
                        src={message.imageUrl}
                        alt="Attached"
                        className="mb-3 rounded-xl max-w-full"
                      />
                    )}
                    {message.hasImage && !message.imageUrl && (
                      <div className="mb-3 p-3 bg-white/20 rounded-xl flex items-center gap-2">
                        <Image className="w-5 h-5" />
                        <span className="text-sm">Image attached</span>
                      </div>
                    )}
                    <div className="text-sm md:text-base whitespace-pre-line">
                      {message.content}
                    </div>
                    <div
                      className={`text-xs mt-2 ${
                        message.type === 'user' ? 'text-green-100' : 'text-slate-400'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 rounded-2xl rounded-tl-sm px-5 py-4">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-100 px-4 md:px-6 py-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-end gap-2 bg-slate-50 rounded-2xl p-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
              >
                <Image className="w-5 h-5" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Type your question..."
                className="flex-1 bg-transparent resize-none outline-none text-slate-700 placeholder:text-slate-400 py-3 max-h-32"
                rows={1}
                style={{ minHeight: '48px' }}
              />
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                className="bg-green-500 hover:bg-green-600 text-white rounded-xl px-4 py-3 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-center text-xs text-slate-400 mt-2">
              StudyAI may produce inaccurate information. Verify important information.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
