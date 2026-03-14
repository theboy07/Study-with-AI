import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, createContext, useContext } from 'react';
import { Toaster } from '@/components/ui/sonner';
import Navigation from './components/Navigation';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AIChat from './pages/AIChat';
import NotesGenerator from './pages/NotesGenerator';
import QuizGenerator from './pages/QuizGenerator';
import Flashcards from './pages/Flashcards';
import StudyPlanner from './pages/StudyPlanner';
import MockTests from './pages/MockTests';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';

// Auth Context
interface AuthContextType {
  isLoggedIn: boolean;
  user: { name: string; email: string } | null;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const login = (email: string, _password: string) => {
    // Simulate login
    setUser({ name: 'Alex', email });
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const signup = (name: string, email: string, _password: string) => {
    // Simulate signup
    setUser({ name, email });
    setIsLoggedIn(true);
    setShowSignup(false);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, signup, logout }}>
      <Router>
        <div className="min-h-screen bg-white">
          <Navigation 
            onLoginClick={() => setShowLogin(true)} 
            onSignupClick={() => setShowSignup(true)}
          />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route 
              path="/dashboard" 
              element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} 
            />
            <Route 
              path="/chat" 
              element={isLoggedIn ? <AIChat /> : <Navigate to="/" />} 
            />
            <Route 
              path="/notes" 
              element={isLoggedIn ? <NotesGenerator /> : <Navigate to="/" />} 
            />
            <Route 
              path="/quiz" 
              element={isLoggedIn ? <QuizGenerator /> : <Navigate to="/" />} 
            />
            <Route 
              path="/flashcards" 
              element={isLoggedIn ? <Flashcards /> : <Navigate to="/" />} 
            />
            <Route 
              path="/planner" 
              element={isLoggedIn ? <StudyPlanner /> : <Navigate to="/" />} 
            />
            <Route 
              path="/mocktests" 
              element={isLoggedIn ? <MockTests /> : <Navigate to="/" />} 
            />
          </Routes>
          
          <LoginModal 
            isOpen={showLogin} 
            onClose={() => setShowLogin(false)}
            onLogin={login}
            onSwitchToSignup={() => {
              setShowLogin(false);
              setShowSignup(true);
            }}
          />
          
          <SignupModal 
            isOpen={showSignup} 
            onClose={() => setShowSignup(false)}
            onSignup={signup}
            onSwitchToLogin={() => {
              setShowSignup(false);
              setShowLogin(true);
            }}
          />
          
          <Toaster />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
