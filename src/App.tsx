/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Trophy, 
  Sword, 
  BookOpen, 
  Code2, 
  Skull, 
  Flame, 
  Star, 
  Zap, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  Upload, 
  Trash2,
  CheckCircle2,
  Lock,
  ExternalLink,
  History,
  Target,
  Dna
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utilities ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
type QuestType = 'theory' | 'code' | 'quiz' | 'boss';

interface Exercise {
  type: 'code' | 'quiz' | 'flashcard';
  prompt: string;
  template?: string;
  validationRegex?: string; // For code check
  options?: string[]; // For quiz
  correctAnswer?: string; // For quiz
}

interface Quest {
  id: string;
  title: string;
  type: QuestType;
  exercise: Exercise;
}

interface Chapter {
  id: string;
  title: string;
  description: string;
  quests: Quest[];
}

interface Journey {
  id: string;
  title: string;
  description: string;
  chapters: Chapter[];
}

interface JournalEntry {
  id: string;
  text: string;
  timestamp: string;
}

interface Project {
  id: string;
  name: string;
  link: string;
  description: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

interface CodexEntry {
  id: string;
  title: string;
  lore: string;
  concept: string;
}

interface Theme {
  id: string;
  name: string;
  color: string;
}

interface CharacterStats {
  name: string;
  classTitle: string;
  hp: number; // Streak
  gold: number; // Manually editable
  xp: {
    math: number;
    engineering: number;
    specialization: number;
  };
  specialization: 'LLMs' | 'Vision' | 'Research' | 'Production' | 'None';
  portrait: number;
  themeId: string;
  unlockedAchievements: string[];
  completedQuestIds: string[];
}

const ACHIEVEMENTS: Achievement[] = [
  { id: 'first_boss', title: 'Giant Slayer', description: 'Defeat your first level boss.', icon: Skull },
  { id: 'streak_7', title: 'Neural Sync', description: 'Maintain a 7-day learning streak.', icon: Zap },
  { id: 'act_1', title: 'Founder', description: 'Complete Act I: Foundations.', icon: Trophy },
  { id: 'gold_1k', title: 'Social Star', description: 'Earn 1,000 Social Gold.', icon: Star },
  { id: 'full_inventory', title: 'Arsenal', description: 'Fill all 5 project slots.', icon: Dna },
  { id: 'specialist', title: 'Chosen One', description: 'Select an AI/ML Specialization.', icon: Target },
];

const CODEX: CodexEntry[] = [
  { id: 'gradient', title: 'The Descent', lore: 'In the valley of errors, we follow the steepest curve down to truth.', concept: 'Gradient Descent: An optimization algorithm used to minimize loss by iteratively moving towards the local minimum.' },
  { id: 'backprop', title: 'Echoes of Error', lore: 'The mistake found at the end must ripple back to the beginning to forge a better network.', concept: 'Backpropagation: The primary method for training neural networks, calculating the gradient of the loss function with respect to weights.' },
  { id: 'transformer', title: 'Universal Attention', lore: 'To speak is to listen. To listen is to find what matters most in the sequence.', concept: 'Transformers: A model architecture that uses self-attention mechanisms to process sequential data, forming the backbone of modern LLMs.' },
  { id: 'overfit', title: 'Oracle of Memory', lore: 'A mind that remembers too much of the past fails to understand the future.', concept: 'Overfitting: When a model learns the training data too well, including its noise, resulting in poor generalization to new data.' },
];

const THEMES: Theme[] = [
  { id: 'cyan', name: 'CYANIDE', color: '#00f2ff' },
  { id: 'green', name: 'PHANTOM', color: '#00ff41' },
  { id: 'orange', name: 'FISSION', color: '#ff6600' },
  { id: 'red', name: 'BLOODLINE', color: '#ff4d4d' },
];

const PORTRAITS = [
  'Σ', 'Ω', 'Δ', 'Ψ', 'Φ', 'Ξ'
];

// --- Initial Data ---
const JOURNEYS: Journey[] = [
  {
    id: 'fundamentals',
    title: 'Fundamentals',
    description: 'The core mathematical and statistical bedrock of machine learning.',
    chapters: [
      {
        id: 'math_foundations',
        title: 'Math Foundations',
        description: 'Linear Algebra and Calculus for the modern age.',
        quests: [
          { id: 'vec_space', title: 'Vector Spaces', type: 'theory', exercise: { type: 'quiz', prompt: 'In a vector space, what is a "basis"?', options: ['A set of vectors that are linearly dependent', 'A set of linearly independent vectors that span the space', 'A subset of vectors that are all zero', 'The coordinate system origin'], correctAnswer: 'A set of linearly independent vectors that span the space' } },
          { id: 'gradients', title: 'Gradient Calculus', type: 'theory', exercise: { type: 'quiz', prompt: 'What does the gradient of a multivariable function represent?', options: ['The direction of steepest descent', 'The direction of steepest ascent', 'The average value of the function', 'The point where the function is zero'], correctAnswer: 'The direction of steepest ascent' } },
          { id: 'grad_boss', title: 'BOSS: Gradient Optimizer', type: 'boss', exercise: { type: 'code', prompt: 'Implement a simple gradient step update for weight "w" with gradient "dw" and learning rate "lr".', template: 'function update(w, dw, lr) {\n  return // ...\n}', validationRegex: 'return.*w.*-.*lr.*\\*.*dw' } }
        ]
      },
      {
        id: 'stat_foundations',
        title: 'Probability & Stats',
        description: 'Understanding uncertainty and data distribution.',
        quests: [
          { id: 'bayes_rule', title: 'Bayes Rule', type: 'theory', exercise: { type: 'quiz', prompt: 'What is P(A|B) according to Bayes Theorem?', options: ['P(B|A)P(A)/P(B)', 'P(A|B)P(B)/P(A)', 'P(A) + P(B)', 'P(A) * P(B)'], correctAnswer: 'P(B|A)P(A)/P(B)' } },
          { id: 'mse_theory', title: 'The Cost of Error', type: 'theory', exercise: { type: 'quiz', prompt: 'Mean Squared Error (MSE) is sensitive to outliers because...', options: ['It uses the absolute value of error', 'It squares the error terms', 'It only looks at the mean', 'It ignores negative values'], correctAnswer: 'It squares the error terms' } },
          { id: 'mse_boss', title: 'BOSS: MSE Implementation', type: 'boss', exercise: { type: 'code', prompt: 'Write the MSE formula for a single pair of y_true and y_pred (scalars).', template: 'function mse(y, y_hat) {\n  return // ...\n}', validationRegex: 'Math\\.pow.*y.*-.*y_hat.*2' } }
        ]
      }
    ]
  },
  {
    id: 'classical_ml',
    title: 'Classical ML',
    description: 'Algorithms that paved the way before the deep learning era.',
    chapters: [
      {
        id: 'supervised',
        title: 'Supervised Learning',
        description: 'Learning patterns from labeled data.',
        quests: [
          { id: 'lin_reg', title: 'Linear Regression', type: 'theory', exercise: { type: 'quiz', prompt: 'In linear regression, what are we trying to find?', options: ['The best clustering of data', 'The line that minimizes prediction error', 'The most frequent class', 'The largest gap between points'], correctAnswer: 'The line that minimizes prediction error' } },
          { id: 'log_reg', title: 'Logistic Regression', type: 'theory', exercise: { type: 'quiz', prompt: 'Logistic regression is primarily used for...', options: ['Continuous value prediction', 'Classification', 'Image generation', 'Sorting data'], correctAnswer: 'Classification' } },
          { id: 'sup_boss', title: 'BOSS: Simple Predictor', type: 'boss', exercise: { type: 'code', prompt: 'Implement a predictor that returns 1 if feature "x" > 0, else 0.', template: 'function predict(x) {\n  return // ...\n}', validationRegex: 'return.*x.*>.*0.*\\?.*1.*:.*0' } }
        ]
      },
      {
        id: 'unsupervised',
        title: 'Unsupervised Learning',
        description: 'Finding structure in unlabeled data.',
        quests: [
          { id: 'kmeans', title: 'K-Means Clustering', type: 'theory', exercise: { type: 'quiz', prompt: 'What does "K" represent in K-Means?', options: ['The number of features', 'The number of clusters', 'The learning rate', 'The number of iterations'], correctAnswer: 'The number of clusters' } },
          { id: 'un_boss', title: 'BOSS: Distance Calculator', type: 'boss', exercise: { type: 'code', prompt: 'Calculate the squared Euclidean distance between two 1D points p1 and p2.', template: 'function distance(p1, p2) {\n  return // ...\n}', validationRegex: 'Math\\.pow.*p1.*-.*p2.*2' } }
        ]
      }
    ]
  },
  {
    id: 'deep_learning',
    title: 'Deep Learning',
    description: 'The power of multi-layered neural networks.',
    chapters: [
      {
        id: 'neural_nets',
        title: 'Neural Networks',
        description: 'The building blocks of intelligence.',
        quests: [
          { id: 'relu', title: 'ReLU Logic', type: 'theory', exercise: { type: 'quiz', prompt: 'ReLU(x) returns...', options: ['x if x > 0 else 0', 'e^x', '1 / (1 + e^-x)', 'tanh(x)'], correctAnswer: 'x if x > 0 else 0' } },
          { id: 'dl_boss', title: 'BOSS: Neuron Forward', type: 'boss', exercise: { type: 'code', prompt: 'Calculate the forward pass of a neuron: output = activation(w * x + b). Use Math.max(0, ...) for ReLU.', template: 'function neuron(x, w, b) {\n  return // ...\n}', validationRegex: 'Math\\.max.*0.*w.*\\*.*x.*\\+.*b' } }
        ]
      }
    ]
  },
  {
    id: 'generative_ai',
    title: 'Generative AI & LLMs',
    description: 'The frontier of machine creativity and language understanding.',
    chapters: [
      {
        id: 'transformers',
        title: 'Transformers',
        description: 'Self-attention and sequence modeling.',
        quests: [
          { id: 'attention', title: 'Self-Attention', type: 'theory', exercise: { type: 'quiz', prompt: 'What is the purpose of "Attention"?', options: ['To speed up training', 'To weigh the importance of different parts of a sequence', 'To normalize data', 'To replace backpropagation'], correctAnswer: 'To weigh the importance of different parts of a sequence' } },
          { id: 'gen_boss', title: 'BOSS: Dot-Product Attention', type: 'boss', exercise: { type: 'code', prompt: 'Calculate dot-product attention score for vectors q and k.', template: 'function dot_product(q, k) {\n  return // ...\n}', validationRegex: 'q\\.reduce.*a.*v.*i.*a.*v.*\\*.*k\\[i\\]' } }
        ]
      }
    ]
  },
  {
    id: 'research',
    title: 'Research Frontier',
    description: 'Where human knowledge ends and AI starts.',
    chapters: [
      {
        id: 'safety',
        title: 'AI Safety & Ethics',
        description: 'Ensuring AI serves human values.',
        quests: [
          { id: 'alignment_q', title: 'The Alignment Problem', type: 'theory', exercise: { type: 'quiz', prompt: 'What is "alignment"?', options: ['Sorting vectors', 'Making AI follow human values', 'Aligning layers in a network', 'Correcting dataset bias'], correctAnswer: 'Making AI follow human values' } }
        ]
      }
    ]
  }
];

const INITIAL_STATS: CharacterStats = {
  name: 'Subject Zero',
  classTitle: 'Junior ML Aspirant',
  hp: 0,
  gold: 0,
  xp: { math: 0, engineering: 0, specialization: 0 },
  specialization: 'None',
  portrait: 0,
  themeId: 'cyan',
  unlockedAchievements: [],
  completedQuestIds: []
};

// --- Components ---

const ProgressBar = ({ label, value, max, color }: { label: string, value: number, max: number, color: string }) => {
  const percentage = Math.min((value / max) * 100, 100);
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] font-mono uppercase tracking-tighter text-text-muted">
        <span>{label}</span>
        <span>{percentage.toFixed(0)}%</span>
      </div>
      <div className="h-1.5 bg-border-main overflow-hidden border border-border-main relative">
        <motion.div 
          className={cn("h-full absolute left-0 top-0", color)}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

interface AchievementBadgeProps {
  achievement: Achievement;
  isUnlocked: boolean;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({ achievement, isUnlocked }) => {
  const Icon = achievement.icon;
  return (
    <div className={cn(
      "aspect-square flex flex-col items-center justify-center border transition-all p-1 text-center group relative",
      isUnlocked ? "bg-glow-gold/10 border-glow-gold/30 glow-gold shadow-[inset_0_0_10px_rgba(255,204,0,0.2)]" : "bg-black border-border-main opacity-20"
    )}>
      <Icon className={cn("w-4 h-4 mb-1", isUnlocked ? "text-glow-gold" : "text-text-muted")} />
      <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 bg-dark-bg/95 p-2 flex flex-col items-center justify-center transition-opacity border border-glow-gold">
         <div className="text-[8px] font-bold text-glow-gold uppercase">{achievement.title}</div>
         <div className="text-[7px] text-text-main leading-tight mt-1">{achievement.description}</div>
      </div>
    </div>
  );
};

const ExerciseHUD = ({ 
  exercise, 
  title, 
  subTitle, 
  onComplete, 
  onCancel 
}: { 
  exercise: Exercise, 
  title: string, 
  subTitle: string, 
  onComplete: () => void, 
  onCancel: () => void 
}) => {
  const [answer, setAnswer] = useState(exercise.template || '');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success', text: string } | null>(null);

  const handleSubmit = () => {
    if (exercise.type === 'code') {
      const reg = new RegExp(exercise.validationRegex || '.*', 'i');
      if (reg.test(answer.replace(/\s/g, ''))) {
        setFeedback({ type: 'success', text: 'VALIDATION SUCCESS: Neural weights optimized.' });
        setTimeout(onComplete, 1500);
      } else {
        setFeedback({ type: 'error', text: 'VALIDATION ERROR: Logic mismatch in node logic.' });
      }
    } else if (exercise.type === 'quiz') {
      if (selectedOption === exercise.correctAnswer) {
        setFeedback({ type: 'success', text: 'VALIDATION SUCCESS: Conceptual alignment confirmed.' });
        setTimeout(onComplete, 1500);
      } else {
        setFeedback({ type: 'error', text: 'VALIDATION ERROR: Theoretical divergence detected.' });
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
    >
      <div className="w-full max-w-2xl bg-dark-bg border-2 border-glow-cyan p-6 relative flex flex-col gap-6 shadow-[0_0_30px_#00f2ff40]">
        <div className="accent-corner" />
        
        <header className="flex justify-between items-start border-b border-border-main pb-4">
          <div>
            <div className="text-[10px] text-glow-cyan uppercase font-bold tracking-widest mb-1">{subTitle}</div>
            <h2 className="text-xl font-black uppercase text-text-main italic">{title}</h2>
          </div>
          <button onClick={onCancel} className="text-text-muted hover:text-glow-red transition-colors">[ ESCAPE ]</button>
        </header>

        <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar min-h-[300px]">
          <p className="text-sm border-l-2 border-glow-cyan pl-4 italic text-text-main whitespace-pre-wrap">
            {exercise.prompt}
          </p>

          {exercise.type === 'code' ? (
            <div className="relative group">
              <div className="absolute -top-2 left-4 px-2 bg-dark-bg text-[8px] text-text-muted uppercase font-bold tracking-widest z-10">Neural Interface v1.0</div>
              <textarea 
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full h-48 bg-panel-bg border border-border-main p-4 font-mono text-xs text-glow-cyan focus:outline-none focus:border-glow-cyan/50 resize-none transition-all scrollbar-hide"
                spellCheck={false}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {exercise.options?.map(opt => (
                <button 
                  key={opt}
                  onClick={() => setSelectedOption(opt)}
                  className={cn(
                    "p-3 border text-left text-xs uppercase font-bold transition-all",
                    selectedOption === opt ? "bg-glow-cyan/20 border-glow-cyan text-glow-cyan" : "bg-panel-bg border-border-main text-text-muted hover:border-glow-cyan/50"
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {feedback && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "p-3 border text-xs font-bold uppercase",
                feedback.type === 'success' ? "bg-glow-gold/10 border-glow-gold text-glow-gold" : "bg-glow-red/10 border-glow-red text-glow-red"
              )}
            >
              {feedback.text}
            </motion.div>
          )}
        </div>

        <footer className="flex justify-end gap-3 pt-4 border-t border-border-main">
          <button onClick={onCancel} className="dense-btn dense-btn-outline">Withdraw</button>
          <button onClick={handleSubmit} className="dense-btn dense-btn-primary px-8">Execute Logic</button>
        </footer>
      </div>
    </motion.div>
  );
};

const DAILY_CHALLENGES: Exercise[] = [
  { type: 'quiz', prompt: 'What does the "learning rate" control in Gradient Descent?', options: ['The step size', 'The number of layers', 'The activation threshold', 'The dataset size'], correctAnswer: 'The step size' },
  { type: 'quiz', prompt: 'Which regularization technique adds the absolute value of coefficients as a penalty?', options: ['L1 (Lasso)', 'L2 (Ridge)', 'Dropout', 'Batch Norm'], correctAnswer: 'L1 (Lasso)' },
  { type: 'quiz', prompt: 'The "vanishing gradient" problem is most common in:', options: ['Deep RNNs', 'Linear Regression', 'K-Means', 'PCA'], correctAnswer: 'Deep RNNs' },
];

export default function App() {
  const [stats, setStats] = useState<CharacterStats>(INITIAL_STATS);
  const [journal, setJournal] = useState<JournalEntry[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [dailyTaskDone, setDailyTaskDone] = useState(false);
  
  // Navigation State
  const [activeJourney, setActiveJourney] = useState<Journey | null>(null);
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);
  const [activeQuest, setActiveQuest] = useState<Quest | null>(null);
  
  const [activeTab, setActiveTab] = useState<'campaign' | 'codex'>('campaign');
  const [activeDailyExercise, setActiveDailyExercise] = useState<Exercise | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Theme Application ---
  useEffect(() => {
    const theme = THEMES.find(t => t.id === stats.themeId) || THEMES[0];
    document.documentElement.style.setProperty('--system-primary', theme.color);
  }, [stats.themeId]);

  // --- Persistence ---
  useEffect(() => {
    const saved = localStorage.getItem('chimera_save');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setStats({
          ...INITIAL_STATS,
          ...parsed.stats,
          unlockedAchievements: parsed.stats?.unlockedAchievements || [],
          completedQuestIds: parsed.stats?.completedQuestIds || []
        });
        setJournal(parsed.journal || []);
        setProjects(parsed.projects || []);
      } catch (e) {
        console.error("Failed to load save", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chimera_save', JSON.stringify({ stats, journal, projects }));
  }, [stats, journal, projects]);

  // --- Logic: Achievement Engine ---
  useEffect(() => {
    const newAchievements = [...stats.unlockedAchievements];
    let changed = false;

    // First Boss
    const completedBossQuests = stats.completedQuestIds.filter(id => id.endsWith('_boss'));
    if (completedBossQuests.length > 0 && !newAchievements.includes('first_boss')) {
      newAchievements.push('first_boss');
      changed = true;
    }
    // 7 Day Streak
    if (stats.hp >= 7 && !newAchievements.includes('streak_7')) {
      newAchievements.push('streak_7');
      changed = true;
    }
    // Fundamentals Complete
    const fundamentals = JOURNEYS.find(j => j.id === 'fundamentals');
    const allFundQuests = fundamentals?.chapters.flatMap(c => c.quests.map(q => q.id)) || [];
    if (allFundQuests.length > 0 && allFundQuests.every(id => stats.completedQuestIds.includes(id)) && !newAchievements.includes('act_1')) {
      newAchievements.push('act_1');
      changed = true;
    }
    // 1k Gold
    if (stats.gold >= 1000 && !newAchievements.includes('gold_1k')) {
      newAchievements.push('gold_1k');
      changed = true;
    }
    // Full Inventory
    if (projects.length >= 5 && !newAchievements.includes('full_inventory')) {
      newAchievements.push('full_inventory');
      changed = true;
    }
    // Specialist
    if (stats.specialization !== 'None' && !newAchievements.includes('specialist')) {
      newAchievements.push('specialist');
      changed = true;
    }

    if (changed) {
      setStats(prev => ({ ...prev, unlockedAchievements: newAchievements }));
      confetti({ particleCount: 50, colors: ['#ffd700'] });
      setJournal(prev => [{ id: Date.now().toString(), text: "New Achievement Unlocked!", timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16) }, ...prev]);
    }
  }, [stats.completedQuestIds, stats.hp, stats.gold, projects.length, stats.specialization]);

  // --- Logic: Leveling ---
  const currentLevelVal = useMemo(() => {
    return Math.floor(stats.completedQuestIds.length / 5) + 1;
  }, [stats.completedQuestIds]);

  // --- Level Up Celebration ---
  const lastLevelRef = useRef(currentLevelVal);
  useEffect(() => {
    if (currentLevelVal > lastLevelRef.current) {
      confetti({
        particleCount: 200,
        spread: 160,
        origin: { y: 0.6 },
        colors: [THEMES.find(t => t.id === stats.themeId)?.color || '#00f2ff', '#bc13fe', '#ffd700', '#ffffff']
      });
      setJournal(prev => [
        { id: Date.now().toString(), text: `CRITICAL RANK ADVANCEMENT! Level ${currentLevelVal} reached.`, timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16) },
        ...prev
      ]);
      lastLevelRef.current = currentLevelVal;
    }
  }, [currentLevelVal, stats.themeId]);

  useEffect(() => {
    const titles = ['Junior ML Aspirant', 'Code Weaver', 'Gradient Explorer', 'Neural Knight', 'Deep Researcher', 'System Sage', 'AGI Architect', 'Master of Models', 'The Chimera'];
    const index = Math.min(currentLevelVal - 1, titles.length - 1);
    if (stats.classTitle !== titles[index]) {
      setStats(prev => ({ ...prev, classTitle: titles[index] }));
    }
  }, [currentLevelVal, stats.classTitle]);

  const handleQuestComplete = () => {
    const randomEx = DAILY_CHALLENGES[Math.floor(Math.random() * DAILY_CHALLENGES.length)];
    setActiveDailyExercise(randomEx);
  };

  const finalizeDaily = () => {
    if (dailyTaskDone) return;
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f2ff', '#bc13fe', '#ffd700']
    });

    const xpGain = 10;
    const isStreakBonus = stats.hp > 0 && (stats.hp + 1) % 7 === 0;
    const finalXp = xpGain + (isStreakBonus ? 50 : 0);

    setStats(prev => ({
      ...prev,
      hp: prev.hp + 1,
      xp: {
        ...prev.xp,
        math: prev.xp.math + Math.floor(finalXp/3),
        engineering: prev.xp.engineering + Math.floor(finalXp/3),
        specialization: prev.xp.specialization + (finalXp - 2 * Math.floor(finalXp/3))
      }
    }));
    setDailyTaskDone(true);
    setActiveDailyExercise(null);
    
    const entry: JournalEntry = {
      id: Date.now().toString(),
      text: "Daily neural sync complete. +10 XP.",
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };
    setJournal(prev => [entry, ...prev]);
  };

  const completeQuest = (questId: string) => {
    if (stats.completedQuestIds.includes(questId)) return;

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#ffd700', '#ffffff']
    });

    setStats(prev => ({
      ...prev,
      completedQuestIds: [...prev.completedQuestIds, questId],
      xp: {
        ...prev.xp,
        math: prev.xp.math + 50,
        engineering: prev.xp.engineering + 50,
        specialization: prev.xp.specialization + 100
      }
    }));

    const questTitle = JOURNEYS.flatMap(j => j.chapters.flatMap(c => c.quests)).find(q => q.id === questId)?.title || "Quest";
    setJournal(prev => [
      { id: Date.now().toString(), text: `Quest Absolute: ${questTitle} finalized.`, timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16) },
      ...prev
    ]);
  };

  const exportSave = () => {
    const blob = new Blob([JSON.stringify({ stats, journal, projects })], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `project_chimera_save_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
  };

  const importSave = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (re) => {
      try {
        const parsed = JSON.parse(re.target?.result as string);
        setStats(parsed.stats);
        setJournal(parsed.journal);
        setProjects(parsed.projects);
      } catch (err) {
        alert("Invalid save file");
      }
    };
    reader.readAsText(file);
  };

  // --- Render ---
  return (
    <div className="min-h-screen bg-dark-bg p-6 flex items-center justify-center">
      <div className="w-full max-w-[1200px] h-[800px] border-4 border-border-main bg-dark-bg p-6 flex flex-col overflow-hidden relative">
        
        {/* --- Header --- */}
        <header className="flex justify-between items-end mb-6 border-b-2 border-border-main pb-4 shrink-0">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-glow-cyan uppercase italic leading-none">PROJECT CHIMERA</h1>
            <div className="text-[10px] text-text-muted tracking-widest mt-2 uppercase">SYSTEM VERSION 2.4.0 // NEURAL LINK ESTABLISHED</div>
          </div>
          <div className="flex gap-2">
            <div className="flex gap-1 mr-4 border-r border-border-main pr-4">
              {THEMES.map(theme => (
                <button 
                  key={theme.id}
                  onClick={() => setStats(s => ({ ...s, themeId: theme.id }))}
                  className={cn(
                    "w-3 h-3 border transition-all",
                    stats.themeId === theme.id ? "scale-125 border-white" : "border-transparent"
                  )}
                  style={{ backgroundColor: theme.color }}
                  title={theme.name}
                />
              ))}
            </div>
            <button onClick={exportSave} className="dense-btn dense-btn-outline">Export .JSON</button>
            <button onClick={() => fileInputRef.current?.click()} className="dense-btn dense-btn-primary">Import Save</button>
            <input type="file" ref={fileInputRef} onChange={importSave} className="hidden" accept=".json" />
          </div>
        </header>

        <div className="grid grid-cols-12 gap-6 flex-1 overflow-hidden">
          
          {/* --- Left Column: Stats & Inventory --- */}
          <aside className="col-span-3 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
            
            {/* Character Info Panel */}
            <section className="high-density-panel">
              <div className="accent-corner" />
              <div className="flex items-center gap-4 mb-4">
                <button 
                  onClick={() => setStats(s => ({ ...s, portrait: (s.portrait + 1) % PORTRAITS.length }))}
                  className="w-14 h-14 bg-border-main border border-glow-cyan flex items-center justify-center text-2xl text-glow-cyan font-bold italic shrink-0 hover:glow-cyan transition-all"
                  title="Recalibrate Portrait"
                >
                  {PORTRAITS[stats.portrait]}
                </button>
                <div className="min-w-0">
                  <div className="text-[10px] text-glow-cyan uppercase font-bold tracking-widest mb-0.5">LVL {currentLevelVal.toString().padStart(2, '0')}</div>
                  <input 
                    type="text" 
                    value={stats.name}
                    onChange={(e) => setStats(s => ({ ...s, name: e.target.value }))}
                    className="bg-transparent text-sm font-bold leading-tight focus:outline-none w-full uppercase"
                  />
                  <div className="text-[9px] text-text-muted uppercase tracking-tighter truncate">{stats.classTitle}</div>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <ProgressBar label="Math & Theory" value={stats.xp.math} max={currentLevelVal * 1000} color="bg-glow-cyan" />
                <ProgressBar label="Engineering" value={stats.xp.engineering} max={currentLevelVal * 1000} color="bg-glow-purple" />
                <ProgressBar label="Spec" value={stats.xp.specialization} max={currentLevelVal * 1000} color="bg-glow-gold" />
              </div>

              <div className="grid grid-cols-2 gap-2 mt-6">
                <div className="stat-card">
                  <div className="text-glow-red text-xs font-bold">HP {stats.hp}</div>
                  <div className="text-[8px] uppercase text-text-muted">Streak</div>
                </div>
                <div className="stat-card">
                  <div className="text-glow-gold text-xs font-bold flex items-center justify-center gap-1">
                    <input 
                      type="number"
                      value={stats.gold}
                      onChange={(e) => setStats(s => ({ ...s, gold: parseInt(e.target.value) || 0 }))}
                      className="bg-transparent w-full text-center focus:outline-none"
                    />
                  </div>
                  <div className="text-[8px] uppercase text-text-muted">Gold</div>
                </div>
              </div>

              {/* Achievements Grid Integration */}
              <div className="mt-4 pt-4 border-t border-border-main">
                 <div className="text-[8px] uppercase text-text-muted font-bold tracking-widest mb-2">Service Medals</div>
                 <div className="grid grid-cols-3 gap-2">
                   {ACHIEVEMENTS.map(ach => (
                     <AchievementBadge 
                       key={ach.id} 
                       achievement={ach} 
                       isUnlocked={stats.unlockedAchievements.includes(ach.id)} 
                     />
                   ))}
                 </div>
              </div>
            </section>

            {/* Inventory Panel */}
            <section className="high-density-panel flex-1 min-h-[150px]">
              <h3 className="text-[10px] uppercase tracking-widest text-text-muted mb-3 border-b border-border-main pb-1 flex justify-between items-center">
                <span>Inventory</span>
                <button 
                  onClick={() => {
                    const name = prompt("Project Name?");
                    if (!name) return;
                    const desc = prompt("Short Description?");
                    const link = prompt("Github/Link URL?");
                    setProjects(prev => [...prev, { id: Date.now().toString(), name, description: desc || '', link: link || '#' }]);
                  }}
                  className="text-glow-cyan hover:scale-110 transition-transform"
                >
                  [+]
                </button>
              </h3>
              <ul className="space-y-3">
                {projects.map(p => (
                  <li key={p.id} className="flex gap-2 group">
                    <div className="w-8 h-8 shrink-0 bg-border-main border border-text-muted flex items-center justify-center text-xs">📦</div>
                    <div className="min-w-0">
                      <div className="text-[10px] text-glow-cyan font-bold flex items-center gap-1">
                        <span className="truncate">{p.name}</span>
                        <a href={p.link} target="_blank" rel="noopener noreferrer" className="opacity-0 group-hover:opacity-100 transition-opacity"><ExternalLink className="w-2 h-2" /></a>
                      </div>
                      <div className="text-[9px] leading-tight text-text-muted line-clamp-2">{p.description}</div>
                    </div>
                  </li>
                ))}
                {projects.length < 5 && Array.from({ length: 5 - projects.length }).map((_, i) => (
                  <li key={i} className="flex gap-2 opacity-20">
                    <div className="w-8 h-8 shrink-0 border border-dashed border-text-muted"></div>
                    <div className="flex items-center text-[9px] text-text-muted uppercase">Empty Slot</div>
                  </li>
                ))}
              </ul>
            </section>
          </aside>

          {/* --- Center Column: Tabs (Campaign / Codex) --- */}
          <main className="col-span-5 flex flex-col gap-4 overflow-hidden border-x-2 border-border-main px-4">
            <div className="flex items-center gap-6 text-[10px] uppercase font-bold text-text-muted pt-2 shrink-0">
              <button 
                onClick={() => setActiveTab('campaign')}
                className={cn("transition-colors", activeTab === 'campaign' ? "text-glow-cyan" : "hover:text-text-main")}
              >
                Campaign
              </button>
              <button 
                onClick={() => setActiveTab('codex')}
                className={cn("transition-colors", activeTab === 'codex' ? "text-glow-cyan" : "hover:text-text-main")}
              >
                System Codex
              </button>
              <div className="h-px bg-border-main flex-1"></div>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
              {activeTab === 'campaign' ? (
                <div className="space-y-4">
                  {/* Breadcrumbs */}
                  <div className="flex items-center gap-2 text-[9px] uppercase font-bold tracking-tighter mb-4">
                    <button 
                      onClick={() => { setActiveJourney(null); setActiveChapter(null); }}
                      className={cn("hover:text-glow-cyan transition-colors", !activeJourney && "text-glow-cyan")}
                    >
                      THE MAP
                    </button>
                    {activeJourney && (
                      <>
                        <span className="text-text-muted">/</span>
                        <button 
                          onClick={() => setActiveChapter(null)}
                          className={cn("hover:text-glow-cyan transition-colors", !activeChapter && "text-glow-cyan")}
                        >
                          {activeJourney.title}
                        </button>
                      </>
                    )}
                    {activeChapter && (
                      <>
                        <span className="text-text-muted">/</span>
                        <span className="text-glow-cyan">{activeChapter.title}</span>
                      </>
                    )}
                  </div>

                  {/* JOURNEY SELECTION */}
                  {!activeJourney && (
                    <div className="grid grid-cols-1 gap-3">
                      {JOURNEYS.map(j => (
                        <button 
                          key={j.id}
                          onClick={() => setActiveJourney(j)}
                          className="high-density-panel text-left hover:border-glow-cyan transition-all group"
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-black uppercase italic group-hover:text-glow-cyan">{j.title}</span>
                            <span className="text-[8px] text-text-muted">ID: {j.id.toUpperCase()}</span>
                          </div>
                          <p className="text-[10px] text-text-muted italic leading-tight">{j.description}</p>
                          <div className="mt-3 flex gap-2">
                             {j.chapters.map(c => (
                               <div key={c.id} className={cn("w-2 h-2 border", c.quests.every(q => stats.completedQuestIds.includes(q.id)) ? "bg-glow-gold border-glow-gold" : "border-text-muted opacity-30")} />
                             ))}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* CHAPTER SELECTION */}
                  {activeJourney && !activeChapter && (
                    <div className="grid grid-cols-1 gap-3">
                      <div className="p-3 bg-panel-bg border border-border-main mb-2">
                        <h2 className="text-sm font-black uppercase italic mb-1 text-glow-cyan">{activeJourney.title} Overview</h2>
                        <p className="text-[10px] text-text-muted italic leading-tight">{activeJourney.description}</p>
                      </div>
                      {activeJourney.chapters.map((c, idx) => {
                        const prevChapter = activeJourney.chapters[idx - 1];
                        const isLocked = prevChapter && !prevChapter.quests.every(q => stats.completedQuestIds.includes(q.id));
                        const isCompleted = c.quests.every(q => stats.completedQuestIds.includes(q.id));

                        return (
                          <button 
                            key={c.id}
                            disabled={isLocked}
                            onClick={() => setActiveChapter(c)}
                            className={cn(
                              "high-density-panel text-left transition-all relative overflow-hidden",
                              isLocked ? "opacity-30 grayscale cursor-not-allowed" : "hover:border-glow-cyan group"
                            )}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className={cn("text-xs font-black uppercase italic", isCompleted ? "text-glow-gold" : "group-hover:text-glow-cyan")}>{c.title}</span>
                              {isLocked ? <Lock className="w-3 h-3 text-text-muted" /> : isCompleted && <CheckCircle2 className="w-3 h-3 text-glow-gold" />}
                            </div>
                            <p className="text-[10px] text-text-muted italic leading-tight">{c.description}</p>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* QUEST SEQUENCE */}
                  {activeJourney && activeChapter && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-end border-b border-border-main pb-2">
                        <div>
                          <div className="text-[8px] text-text-muted uppercase font-bold tracking-widest mb-0.5">Active Chapter</div>
                          <h2 className="text-sm font-black uppercase italic text-glow-cyan leading-none">{activeChapter.title}</h2>
                        </div>
                        <button onClick={() => setActiveChapter(null)} className="text-[9px] text-text-muted hover:text-white uppercase transition-colors">[ Return ]</button>
                      </div>

                      <div className="relative pl-6 space-y-4">
                         <div className="absolute left-2.5 top-2 bottom-2 w-px bg-border-main" />
                         {activeChapter.quests.map((q, idx) => {
                           const isCompleted = stats.completedQuestIds.includes(q.id);
                           const isLocked = idx > 0 && !stats.completedQuestIds.includes(activeChapter.quests[idx-1].id);

                           return (
                             <div key={q.id} className="relative group">
                               <div className={cn(
                                 "absolute -left-[19px] top-1.5 w-2 h-2 rounded-full border transition-all z-10",
                                 isCompleted ? "bg-glow-gold border-glow-gold" : isLocked ? "bg-dark-bg border-text-muted" : "bg-glow-cyan border-glow-cyan animate-pulse"
                               )} />
                               
                               <div className={cn(
                                 "p-3 border transition-all",
                                 isCompleted ? "bg-glow-gold/5 border-glow-gold/30 opacity-70" : 
                                 isLocked ? "bg-black/40 border-border-main opacity-30 grayscale" : 
                                 "bg-panel-bg border-glow-cyan shadow-[0_0_15px_rgba(0,242,255,0.1)]"
                               )}>
                                 <div className="flex justify-between items-start mb-2">
                                   <div>
                                      <div className="text-[8px] text-text-muted uppercase font-bold mb-1">Quest {idx + 1} // {q.type.toUpperCase()}</div>
                                      <div className={cn("text-xs font-bold uppercase", isCompleted && "text-glow-gold line-through")}>{q.title}</div>
                                   </div>
                                   {isCompleted && <CheckCircle2 className="w-3 h-3 text-glow-gold" />}
                                 </div>
                                 
                                 {!isCompleted && !isLocked && (
                                   <button 
                                     onClick={() => setActiveQuest(q)}
                                     className={cn(
                                       "w-full py-1.5 text-[9px] font-bold uppercase tracking-widest transition-all",
                                       q.type === 'boss' ? "bg-glow-red/20 text-glow-red border border-glow-red/50 hover:bg-glow-red hover:text-dark-bg px-4" : "bg-glow-cyan/20 text-glow-cyan border border-glow-cyan/50 hover:bg-glow-cyan hover:text-dark-bg"
                                     )}
                                   >
                                     {q.type === 'boss' ? "Engage Logic Boss" : "Access Node Data"}
                                   </button>
                                 )}
                               </div>
                             </div>
                           );
                         })}
                      </div>
                    </div>
                  )}

                </div>
              ) : (
                <div className="space-y-4 pt-2">
                  {CODEX.map(entry => (
                    <div key={entry.id} className="high-density-panel border-glow-cyan/20">
                      <div className="text-glow-cyan text-xs font-bold uppercase mb-1">{entry.title}</div>
                      <div className="text-[10px] text-text-main mb-3 italic">"{entry.lore}"</div>
                      <div className="text-[9px] text-text-muted leading-relaxed bg-black/40 p-2 border border-border-main">
                        <span className="text-glow-purple font-bold">LOG:</span> {entry.concept}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>

          {/* --- Right Column: Quests & Log --- */}
          <aside className="col-span-4 flex flex-col gap-6 overflow-hidden">
            
            {/* Daily Quest Section */}
            <section className="high-density-panel">
              <h3 className="text-[10px] uppercase tracking-widest text-glow-cyan mb-4 border-b border-glow-cyan/20 pb-1">Primary Directives</h3>
              <div className="space-y-4">
                <div className="group">
                  <div className="flex items-start justify-between">
                    <div className="text-[11px] font-bold uppercase">Daily: Neural Sync</div>
                    <span className="text-[10px] text-glow-gold">+10 XP</span>
                  </div>
                  <div className="text-[9px] text-text-muted italic mt-0.5">30m coding | 30m paper reading</div>
                  <button 
                    onClick={handleQuestComplete}
                    disabled={dailyTaskDone}
                    className={cn(
                      "w-full mt-2 py-1.5 dense-btn transition-colors",
                      dailyTaskDone ? "bg-border-main text-text-muted border-border-main" : "bg-border-main border-glow-cyan text-glow-cyan hover:bg-glow-cyan hover:text-dark-bg"
                    )}
                  >
                    {dailyTaskDone ? "Directive Executed" : "Sync Neural Link"}
                  </button>
                </div>

                <div className="p-3 bg-panel-bg border border-text-muted border-dashed">
                  <div className="flex justify-between text-[10px] font-bold uppercase mb-1">
                    <span>Weekly Raid</span>
                    <span className="text-glow-gold">+50 XP</span>
                  </div>
                  <div className="text-[9px] text-text-muted line-clamp-1 italic mb-2">Deliver build or blog update</div>
                  <button 
                    onClick={() => {
                      const name = prompt("Raid Artifact Name (Project/Blog)?");
                      if (!name) return;
                      const link = prompt("Artifact Link (URL)?");
                      setProjects(prev => [...prev.slice(0, 4), { id: Date.now().toString(), name: `[RAID] ${name}`, description: 'Weekly Raid Reward', link: link || '#' }]);
                      setJournal(prev => [{ id: Date.now().toString(), text: `Weekly Raid Complete: ${name} deployed.`, timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16) }, ...prev]);
                      setStats(prev => ({ ...prev, xp: { ...prev.xp, specialization: prev.xp.specialization + 50 } }));
                      confetti({ particleCount: 150 });
                    }}
                    className="w-full py-1 border border-glow-gold/30 text-glow-gold text-[8px] uppercase font-bold hover:bg-glow-gold/20 transition-colors"
                  >
                    Deploy Artifact
                  </button>
                </div>
              </div>
            </section>

            {/* Quest Log Section */}
            <section className="high-density-panel flex-1 flex flex-col min-h-0">
              <h3 className="text-[10px] uppercase tracking-widest text-text-muted mb-3 border-b border-border-main pb-1">System Audit Log</h3>
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                <AnimatePresence initial={false}>
                  {journal.map((entry) => (
                    <motion.div 
                      key={entry.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-[9px] font-mono leading-tight"
                    >
                      <span className="text-text-muted">[{entry.timestamp}]</span> {entry.text}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <div className="mt-4 pt-2 border-t border-border-main shrink-0">
                <input 
                  type="text" 
                  placeholder="> LOG NEW ENTRY..." 
                  className="w-full bg-transparent border-b border-border-main text-[10px] py-1 outline-none focus:border-glow-cyan transition-colors"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const text = e.currentTarget.value;
                      if (!text) return;
                      setJournal(prev => [{ 
                        id: Date.now().toString(), 
                        text, 
                        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16) 
                      }, ...prev]);
                      e.currentTarget.value = '';
                    }
                  }}
                />
              </div>
            </section>

          </aside>
        </div>

        {/* --- Exercise HUD Overlay --- */}
        <AnimatePresence>
          {activeQuest && (
            <ExerciseHUD 
              exercise={activeQuest.exercise}
              title={activeQuest.title}
              subTitle={activeQuest.type === 'boss' ? 'CRITICAL CHALLENGE: CHAPTER BOSS' : 'NODE ACCESS: DATA RETRIEVAL'}
              onComplete={() => {
                completeQuest(activeQuest.id);
                setActiveQuest(null);
              }}
              onCancel={() => setActiveQuest(null)}
            />
          )}
          {activeDailyExercise && (
            <ExerciseHUD 
              exercise={activeDailyExercise}
              title="Neural Sync Challenge"
              subTitle="Daily Directive Execution"
              onComplete={finalizeDaily}
              onCancel={() => setActiveDailyExercise(null)}
            />
          )}
        </AnimatePresence>

        {/* --- Footer Status Bar --- */}
        <footer className="mt-4 flex items-center justify-between text-[8px] text-text-muted uppercase tracking-widest bg-panel-bg/50 px-2 h-6 shrink-0 border border-border-main">
          <div className="flex gap-4">
            <span className="flex items-center gap-1 uppercase tracking-tighter">
              <span className="w-1.5 h-1.5 bg-glow-cyan animate-pulse rounded-full"></span> 
              CONNECTION: STABLE // ASSET ID: {stats.name}
            </span>
          </div>
          <div className="flex gap-4 items-center">
            <span className="text-glow-red truncate max-w-[200px]">CRITICAL ASSET: {stats.specialization === 'None' ? 'UNASSIGNED' : stats.specialization} ARCHITECTURE</span>
            <button 
              onClick={() => { if(confirm("Initiate total system wipe?")) { localStorage.removeItem('chimera_save'); window.location.reload(); } }}
              className="hover:text-glow-red transition-all"
            >
              [WIPE MEMORY]
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
