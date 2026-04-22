/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Trophy, Sword, BookOpen, Code2, Skull, Flame, Star, Zap,
  Download, Upload, CheckCircle2, Lock, ExternalLink, Target, Dna,
  ChevronRight, Brain, Shield, FlaskConical, AlertTriangle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import type {
  Realm, Quest, Chapter, Challenge, CharacterStats, JournalEntry, Project,
} from './types';
import { loadRealms } from './data/index';

// ─── Utilities ───────────────────────────────────────────────────────────────

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Constants ───────────────────────────────────────────────────────────────

const THEMES = [
  { id: 'cyan',   name: 'CYANIDE',  color: '#00f2ff' },
  { id: 'green',  name: 'PHANTOM',  color: '#00ff41' },
  { id: 'orange', name: 'FISSION',  color: '#ff6600' },
  { id: 'red',    name: 'BLOODLINE',color: '#ff4d4d' },
];

const PORTRAITS = ['Σ', 'Ω', 'Δ', 'Ψ', 'Φ', 'Ξ'];

const CLASS_TITLES = [
  'Junior ML Aspirant', 'Code Weaver', 'Gradient Explorer', 'Neural Knight',
  'Deep Researcher', 'System Sage', 'AGI Architect', 'Master of Models', 'The Chimera',
];

const ACHIEVEMENTS = [
  { id: 'first_boss',       title: 'Giant Slayer',  description: 'Defeat your first Boss chapter.',       icon: Skull },
  { id: 'streak_7',         title: 'Neural Sync',   description: 'Maintain a 7-day learning streak.',    icon: Zap },
  { id: 'realm1_complete',  title: 'Founder',       description: 'Complete all of Realm I: Foundations.',icon: Trophy },
  { id: 'polymath',         title: 'Polymath',      description: 'Complete chapters in 4 different Realms.', icon: Brain },
  { id: 'gold_1k',          title: 'Social Star',   description: 'Earn 1,000 Social Gold.',              icon: Star },
  { id: 'full_inventory',   title: 'Arsenal',       description: 'Fill all 5 project slots.',            icon: Dna },
  { id: 'specialist',       title: 'Chosen One',    description: 'Select an AI/ML Specialization.',      icon: Target },
  { id: 'deep_learner',     title: 'Deep Learner',  description: 'Complete all of Realm III: Deep Learning.', icon: Flame },
];

const DAILY_CHALLENGES: Challenge[] = [
  { type: 'quiz', prompt: 'What does the learning rate control in gradient descent?', options: ['Step size toward the gradient minimum', 'Network depth', 'Activation threshold', 'Dataset size'], correctAnswer: 'Step size toward the gradient minimum' },
  { type: 'quiz', prompt: 'Which regularization adds the absolute value of weights as a penalty?', options: ['L1 (Lasso)', 'L2 (Ridge)', 'Dropout', 'Batch Norm'], correctAnswer: 'L1 (Lasso)' },
  { type: 'quiz', prompt: 'The vanishing gradient problem is most severe in:', options: ['Deep RNNs without gating', 'Linear regression', 'K-Means', 'Random forests'], correctAnswer: 'Deep RNNs without gating' },
  { type: 'quiz', prompt: 'Which optimizer combines momentum and adaptive learning rates?', options: ['Adam', 'SGD', 'RMSprop only', 'Adagrad'], correctAnswer: 'Adam' },
  { type: 'quiz', prompt: 'In a transformer, what does the softmax in the attention computation do?', options: ['Converts raw scores to a probability distribution over keys', 'Normalizes the embeddings', 'Applies dropout', 'Computes the gradient'], correctAnswer: 'Converts raw scores to a probability distribution over keys' },
];

const INITIAL_STATS: CharacterStats = {
  name: 'Subject Zero', classTitle: 'Junior ML Aspirant',
  hp: 0, gold: 0,
  xp: { math: 0, engineering: 0, specialization: 0 },
  specialization: 'None', portrait: 0, themeId: 'cyan',
  unlockedAchievements: [], completedChapterIds: [],
};

// ─── Helper: find chapter info across all realms ─────────────────────────────

function findChapter(chapterId: string, realms: Realm[]): { realm: Realm; quest: Quest; chapter: Chapter } | null {
  for (const realm of realms) {
    for (const quest of realm.quests) {
      const chapter = quest.chapters.find(c => c.id === chapterId);
      if (chapter) return { realm, quest, chapter };
    }
  }
  return null;
}

function isRealmUnlocked(realm: Realm, completedChapterIds: string[], realms: Realm[]): boolean {
  if (!realm.prerequisiteRealmIds || realm.prerequisiteRealmIds.length === 0) return true;
  return realm.prerequisiteRealmIds.every(prereqId => {
    const prereqRealm = realms.find(r => r.id === prereqId);
    if (!prereqRealm) return false;
    const firstQuest = prereqRealm.quests[0];
    if (!firstQuest) return false;
    return firstQuest.chapters.every(c => completedChapterIds.includes(c.id));
  });
}

function isQuestUnlocked(quest: Quest, allQuests: Quest[], completedChapterIds: string[]): boolean {
  if (!quest.prerequisiteQuestIds || quest.prerequisiteQuestIds.length === 0) return true;
  return quest.prerequisiteQuestIds.every(prereqId => {
    const prereq = allQuests.find(q => q.id === prereqId);
    if (!prereq) return false;
    return prereq.chapters.every(c => completedChapterIds.includes(c.id));
  });
}

function getQuestProgress(quest: Quest, completedChapterIds: string[]): number {
  const done = quest.chapters.filter(c => completedChapterIds.includes(c.id)).length;
  return done / quest.chapters.length;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

const ProgressBar = ({ label, value, max, color }: { label: string; value: number; max: number; color: string }) => {
  const pct = Math.min((value / Math.max(max, 1)) * 100, 100);
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] font-mono uppercase tracking-tighter text-text-muted">
        <span>{label}</span><span>{pct.toFixed(0)}%</span>
      </div>
      <div className="h-1.5 bg-border-main overflow-hidden border border-border-main relative">
        <motion.div className={cn('h-full absolute left-0 top-0', color)}
          initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1, ease: 'easeOut' }} />
      </div>
    </div>
  );
};

const AchievementBadge: React.FC<{ achievement: typeof ACHIEVEMENTS[0]; isUnlocked: boolean }> = ({ achievement, isUnlocked }) => {
  const Icon = achievement.icon;
  return (
    <div className={cn('aspect-square flex flex-col items-center justify-center border transition-all p-1 text-center group relative',
      isUnlocked ? 'bg-glow-gold/10 border-glow-gold/30 shadow-[inset_0_0_10px_rgba(255,204,0,0.2)]' : 'bg-black border-border-main opacity-20')}>
      <Icon className={cn('w-4 h-4 mb-1', isUnlocked ? 'text-glow-gold' : 'text-text-muted')} />
      <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 bg-dark-bg/95 p-2 flex flex-col items-center justify-center transition-opacity border border-glow-gold">
        <div className="text-[8px] font-bold text-glow-gold uppercase">{achievement.title}</div>
        <div className="text-[7px] text-text-main leading-tight mt-1">{achievement.description}</div>
      </div>
    </div>
  );
};

// ─── Challenge HUD ───────────────────────────────────────────────────────────

interface HUDProps {
  challenge: Challenge;
  title: string;
  subTitle: string;
  onComplete: () => void;
  onCancel: () => void;
}

const ChallengeHUD: React.FC<HUDProps> = ({ challenge, title, subTitle, onComplete, onCancel }) => {
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Quiz / Design state
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Code state
  const [code, setCode] = useState(challenge.template || '');

  // Flashcard state
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [knownSet, setKnownSet] = useState<Set<number>>(new Set());

  // Derivation state
  const [derivStep, setDerivStep] = useState(0);
  const [derivSelected, setDerivSelected] = useState<string | null>(null);
  const [derivFeedback, setDerivFeedback] = useState<'error' | 'success' | null>(null);

  // Concept battle state
  const [conceptAnswer, setConceptAnswer] = useState('');

  const succeed = () => {
    setFeedback({ type: 'success', text: 'VALIDATION SUCCESS: Knowledge confirmed. XP granted.' });
    setSubmitted(true);
    setTimeout(onComplete, 1600);
  };

  const fail = (msg?: string) => {
    setFeedback({ type: 'error', text: msg || 'VALIDATION ERROR: Insufficient clarity detected.' });
  };

  const handleQuizSubmit = () => {
    if (!selectedOption) { fail('Select an answer first.'); return; }
    if (selectedOption === challenge.correctAnswer) {
      if (challenge.explanation) { setShowExplanation(true); setTimeout(succeed, 2200); }
      else { succeed(); }
    } else {
      fail('Incorrect. Re-examine the theory and try again.');
    }
  };

  const handleCodeSubmit = () => {
    const reg = new RegExp(challenge.validationRegex || '.*', 'i');
    if (reg.test(code.replace(/\s/g, ''))) { succeed(); }
    else { fail('VALIDATION ERROR: Logic pattern not detected in code.'); }
  };

  const handleConceptSubmit = () => {
    const lower = conceptAnswer.toLowerCase();
    const keywords = challenge.keywords || [];
    const threshold = challenge.keywordThreshold || 3;
    const found = keywords.filter(k => lower.includes(k.toLowerCase()));
    if (found.length >= threshold) {
      succeed();
    } else {
      const missing = keywords.filter(k => !lower.includes(k.toLowerCase())).slice(0, 3);
      fail(`Not enough key concepts covered. Try mentioning: ${missing.join(', ')}.`);
    }
  };

  const handleDerivNext = () => {
    const steps = challenge.steps || [];
    if (derivSelected === steps[derivStep].correctAnswer) {
      setDerivFeedback('success');
      setTimeout(() => {
        if (derivStep + 1 >= steps.length) { succeed(); }
        else {
          setDerivStep(s => s + 1);
          setDerivSelected(null);
          setDerivFeedback(null);
        }
      }, 800);
    } else {
      setDerivFeedback('error');
    }
  };

  const handleFlashcard = (known: boolean) => {
    const cards = challenge.cards || [];
    const newKnown = new Set(knownSet);
    if (known) newKnown.add(cardIndex);
    setKnownSet(newKnown);
    setFlipped(false);
    if (newKnown.size === cards.length) {
      succeed();
    } else {
      const next = (cardIndex + 1) % cards.length;
      setCardIndex(next);
    }
  };

  const isBoss = subTitle.includes('BOSS');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
    >
      <div className={cn(
        'w-full max-w-2xl bg-dark-bg border-2 p-6 relative flex flex-col gap-4 shadow-[0_0_40px_rgba(0,0,0,0.8)]',
        isBoss ? 'border-glow-red shadow-[0_0_30px_rgba(255,77,77,0.3)]' : 'border-glow-cyan shadow-[0_0_30px_rgba(0,242,255,0.2)]'
      )}>
        <div className="accent-corner" />

        <header className="flex justify-between items-start border-b border-border-main pb-3">
          <div>
            <div className={cn('text-[10px] uppercase font-bold tracking-widest mb-1', isBoss ? 'text-glow-red' : 'text-glow-cyan')}>{subTitle}</div>
            <h2 className="text-lg font-black uppercase text-text-main italic leading-tight">{title}</h2>
          </div>
          {!submitted && <button onClick={onCancel} className="text-text-muted hover:text-glow-red text-xs transition-colors">[ ESC ]</button>}
        </header>

        <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar space-y-4 min-h-[260px]">

          {/* ── QUIZ ── */}
          {(challenge.type === 'quiz' || challenge.type === 'design') && (
            <>
              <p className="text-sm border-l-2 border-glow-cyan pl-3 italic text-text-main whitespace-pre-wrap leading-relaxed">{challenge.prompt}</p>
              <div className="grid grid-cols-1 gap-2">
                {challenge.options?.map(opt => (
                  <button key={opt} onClick={() => !submitted && setSelectedOption(opt)}
                    className={cn('p-3 border text-left text-xs font-bold transition-all',
                      submitted && opt === challenge.correctAnswer ? 'bg-glow-gold/20 border-glow-gold text-glow-gold' :
                      selectedOption === opt ? 'bg-glow-cyan/20 border-glow-cyan text-glow-cyan' :
                      'bg-panel-bg border-border-main text-text-muted hover:border-glow-cyan/50')}>
                    {opt}
                  </button>
                ))}
              </div>
              {showExplanation && challenge.explanation && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-glow-gold/10 border border-glow-gold/50 text-xs text-glow-gold leading-relaxed">
                  <span className="font-bold">WHY: </span>{challenge.explanation}
                </motion.div>
              )}
            </>
          )}

          {/* ── CODE ── */}
          {challenge.type === 'code' && (
            <>
              <p className="text-sm border-l-2 border-glow-cyan pl-3 italic text-text-main whitespace-pre-wrap leading-relaxed">{challenge.prompt}</p>
              <div className="relative">
                <div className="absolute -top-2 left-4 px-2 bg-dark-bg text-[8px] text-text-muted uppercase font-bold tracking-widest z-10">Neural Interface v2.0</div>
                <textarea value={code} onChange={e => setCode(e.target.value)}
                  className="w-full h-48 bg-panel-bg border border-border-main p-4 font-mono text-xs text-glow-cyan focus:outline-none focus:border-glow-cyan/70 resize-none transition-all scrollbar-hide"
                  spellCheck={false} />
              </div>
            </>
          )}

          {/* ── FLASHCARD ── */}
          {challenge.type === 'flashcard' && (() => {
            const cards = challenge.cards || [];
            const card = cards[cardIndex];
            if (!card) return null;
            return (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] text-text-muted uppercase">
                  <span>Card {cardIndex + 1} / {cards.length}</span>
                  <span className="text-glow-gold">{knownSet.size} Known</span>
                </div>
                <motion.div
                  key={`${cardIndex}-${flipped}`}
                  initial={{ rotateY: -90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setFlipped(f => !f)}
                  className="min-h-[160px] border border-glow-cyan bg-panel-bg p-5 cursor-pointer flex flex-col items-center justify-center text-center gap-3 hover:border-glow-cyan/80 transition-colors"
                >
                  <div className="text-[8px] uppercase text-text-muted font-bold tracking-widest">
                    {flipped ? 'DEFINITION' : 'TERM — click to flip'}
                  </div>
                  <div className={cn('font-bold leading-relaxed', flipped ? 'text-xs text-text-main' : 'text-sm text-glow-cyan uppercase')}>
                    {flipped ? card.definition : card.term}
                  </div>
                </motion.div>
                {flipped && (
                  <div className="flex gap-3">
                    <button onClick={() => handleFlashcard(false)} className="flex-1 py-2 border border-glow-red/50 text-glow-red text-[10px] font-bold uppercase hover:bg-glow-red/20 transition-colors">
                      Still Learning
                    </button>
                    <button onClick={() => handleFlashcard(true)} className="flex-1 py-2 border border-glow-gold/50 text-glow-gold text-[10px] font-bold uppercase hover:bg-glow-gold/20 transition-colors">
                      Known ✓
                    </button>
                  </div>
                )}
              </div>
            );
          })()}

          {/* ── DERIVATION ── */}
          {challenge.type === 'derivation' && (() => {
            const steps = challenge.steps || [];
            const step = steps[derivStep];
            if (!step) return null;
            return (
              <div className="space-y-4">
                <p className="text-sm border-l-2 border-glow-cyan pl-3 italic text-text-main leading-relaxed">{challenge.prompt}</p>
                <div className="bg-panel-bg border border-border-main p-4">
                  <div className="text-[9px] text-glow-cyan uppercase font-bold mb-2">Step {derivStep + 1} of {steps.length}</div>
                  <div className="flex w-full h-1 mb-4 gap-1">
                    {steps.map((_, i) => (
                      <div key={i} className={cn('flex-1 h-full', i < derivStep ? 'bg-glow-gold' : i === derivStep ? 'bg-glow-cyan animate-pulse' : 'bg-border-main')} />
                    ))}
                  </div>
                  <p className="text-xs text-text-main mb-4 font-mono">{step.prompt}</p>
                  <div className="grid grid-cols-1 gap-2">
                    {step.options.map(opt => (
                      <button key={opt} onClick={() => !derivFeedback && setDerivSelected(opt)}
                        className={cn('p-2 border text-left text-xs font-mono transition-all',
                          derivFeedback === 'success' && opt === step.correctAnswer ? 'bg-glow-gold/20 border-glow-gold text-glow-gold' :
                          derivSelected === opt ? 'bg-glow-cyan/20 border-glow-cyan text-glow-cyan' :
                          'bg-dark-bg border-border-main text-text-muted hover:border-glow-cyan/40')}>
                        {opt}
                      </button>
                    ))}
                  </div>
                  {derivFeedback && (
                    <div className={cn('mt-3 p-2 border text-xs font-bold uppercase',
                      derivFeedback === 'success' ? 'bg-glow-gold/10 border-glow-gold text-glow-gold' : 'bg-glow-red/10 border-glow-red text-glow-red')}>
                      {derivFeedback === 'success' ? '✓ Correct — proceeding' : '✗ Review and try again'}
                    </div>
                  )}
                </div>
              </div>
            );
          })()}

          {/* ── CONCEPT BATTLE ── */}
          {challenge.type === 'concept_battle' && (
            <div className="space-y-4">
              <div className="p-3 bg-panel-bg border border-glow-purple/40">
                <div className="text-[9px] text-glow-purple uppercase font-bold mb-1">⚔ CONCEPT BATTLE — GUILD MEMBER AWAITS</div>
                <p className="text-xs text-text-main italic leading-relaxed">{challenge.prompt}</p>
              </div>
              {challenge.keywords && (
                <div className="text-[9px] text-text-muted">
                  Key concepts to cover: <span className="text-glow-cyan">{challenge.keywords.slice(0, 4).join(', ')} ...</span>
                </div>
              )}
              <textarea
                value={conceptAnswer}
                onChange={e => setConceptAnswer(e.target.value)}
                placeholder="Explain the concept here in your own words..."
                className="w-full h-36 bg-panel-bg border border-border-main p-4 text-xs text-text-main focus:outline-none focus:border-glow-cyan/70 resize-none transition-all"
              />
            </div>
          )}

          {/* ── Feedback ── */}
          {feedback && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className={cn('p-3 border text-xs font-bold uppercase',
                feedback.type === 'success' ? 'bg-glow-gold/10 border-glow-gold text-glow-gold' : 'bg-glow-red/10 border-glow-red text-glow-red')}>
              {feedback.text}
            </motion.div>
          )}
        </div>

        {/* ── Footer ── */}
        {!submitted && (
          <footer className="flex justify-end gap-3 pt-3 border-t border-border-main">
            <button onClick={onCancel} className="dense-btn dense-btn-outline text-[10px]">Withdraw</button>
            {challenge.type === 'quiz' || challenge.type === 'design' ? (
              <button onClick={handleQuizSubmit} className="dense-btn dense-btn-primary px-6">Submit Answer</button>
            ) : challenge.type === 'code' ? (
              <button onClick={handleCodeSubmit} className="dense-btn dense-btn-primary px-6">Execute Logic</button>
            ) : challenge.type === 'concept_battle' ? (
              <button onClick={handleConceptSubmit} className="dense-btn dense-btn-primary px-6">Engage Guild</button>
            ) : challenge.type === 'derivation' ? (
              <button onClick={handleDerivNext} disabled={!derivSelected} className="dense-btn dense-btn-primary px-6 disabled:opacity-40">Next Step</button>
            ) : null}
          </footer>
        )}
      </div>
    </motion.div>
  );
};

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [realms, setRealms] = useState<Realm[]>([]);

  useEffect(() => {
    loadRealms().then(setRealms);
  }, []);

  const [stats, setStats] = useState<CharacterStats>(INITIAL_STATS);
  const [journal, setJournal] = useState<JournalEntry[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [dailyTaskDone, setDailyTaskDone] = useState(false);

  // Navigation
  const [activeRealm,   setActiveRealm]   = useState<Realm   | null>(null);
  const [activeQuest,   setActiveQuest]   = useState<Quest   | null>(null);
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);

  const [activeTab, setActiveTab] = useState<'campaign' | 'codex'>('campaign');
  const [activeDailyChallenge, setActiveDailyChallenge] = useState<Challenge | null>(null);
  const [activeChallenge, setActiveChallenge] = useState<{ challenge: Challenge; chapterId: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Theme ──
  useEffect(() => {
    const theme = THEMES.find(t => t.id === stats.themeId) || THEMES[0];
    document.documentElement.style.setProperty('--system-primary', theme.color);
  }, [stats.themeId]);

  // ── Persistence ──
  useEffect(() => {
    const saved = localStorage.getItem('chimera_v2_save');
    if (saved) {
      try {
        const p = JSON.parse(saved);
        setStats({ ...INITIAL_STATS, ...p.stats, completedChapterIds: p.stats?.completedChapterIds || [] });
        setJournal(p.journal || []);
        setProjects(p.projects || []);
      } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chimera_v2_save', JSON.stringify({ stats, journal, projects }));
  }, [stats, journal, projects]);

  // ── Leveling ──
  const currentLevel = useMemo(() => Math.floor(stats.completedChapterIds.length / 10) + 1, [stats.completedChapterIds]);
  const lastLevelRef = useRef(currentLevel);

  useEffect(() => {
    if (currentLevel > lastLevelRef.current) {
      confetti({ particleCount: 200, spread: 160, origin: { y: 0.6 }, colors: [THEMES.find(t => t.id === stats.themeId)?.color || '#00f2ff', '#bc13fe', '#ffd700', '#ffffff'] });
      addJournal(`CRITICAL RANK ADVANCEMENT! Level ${currentLevel} reached.`);
      lastLevelRef.current = currentLevel;
    }
  }, [currentLevel]);

  useEffect(() => {
    const idx = Math.min(currentLevel - 1, CLASS_TITLES.length - 1);
    if (stats.classTitle !== CLASS_TITLES[idx]) {
      setStats(s => ({ ...s, classTitle: CLASS_TITLES[idx] }));
    }
  }, [currentLevel]);

  // ── Achievements ──
  useEffect(() => {
    const newAch = [...stats.unlockedAchievements];
    let changed = false;

    const check = (id: string, condition: boolean) => {
      if (condition && !newAch.includes(id)) { newAch.push(id); changed = true; }
    };

    check('first_boss', stats.completedChapterIds.some(id => {
      const info = findChapter(id, realms);
      return info?.chapter.isBoss === true;
    }));

    check('streak_7', stats.hp >= 7);

    const realm1 = realms.find(r => r.id === 'r1');
    check('realm1_complete',
      !!realm1 && realm1.quests.flatMap(q => q.chapters).every(c => stats.completedChapterIds.includes(c.id)));

    const realm3 = realms.find(r => r.id === 'r3');
    check('deep_learner',
      !!realm3 && realm3.quests.flatMap(q => q.chapters).every(c => stats.completedChapterIds.includes(c.id)));

    const realmsWithProgress = new Set(
      stats.completedChapterIds.map(id => findChapter(id, realms)?.realm.id).filter(Boolean)
    );
    check('polymath', realmsWithProgress.size >= 4);

    check('gold_1k', stats.gold >= 1000);
    check('full_inventory', projects.length >= 5);
    check('specialist', stats.specialization !== 'None');

    if (changed) {
      setStats(s => ({ ...s, unlockedAchievements: newAch }));
      confetti({ particleCount: 50, colors: ['#ffd700'] });
      addJournal('New Achievement Unlocked!');
    }
  }, [stats.completedChapterIds, stats.hp, stats.gold, projects.length, stats.specialization]);

  // ── Helpers ──
  const addJournal = (text: string) => {
    setJournal(prev => [{
      id: Date.now().toString(), text,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16)
    }, ...prev]);
  };

  const completeChapter = (chapterId: string, isBoss: boolean) => {
    if (stats.completedChapterIds.includes(chapterId)) return;
    confetti({ particleCount: isBoss ? 250 : 120, spread: isBoss ? 180 : 100, origin: { y: 0.6 }, colors: isBoss ? ['#ff4d4d', '#ffd700', '#ffffff'] : ['#ffd700', '#ffffff'] });
    const xpGain = isBoss ? 150 : 50;
    setStats(prev => ({
      ...prev,
      completedChapterIds: [...prev.completedChapterIds, chapterId],
      xp: {
        math: prev.xp.math + xpGain,
        engineering: prev.xp.engineering + xpGain,
        specialization: prev.xp.specialization + xpGain * 2,
      }
    }));
    const info = findChapter(chapterId, realms);
    addJournal(`${isBoss ? '🔥 BOSS DEFEATED' : 'Chapter complete'}: ${info?.chapter.title || chapterId}`);
  };

  const finalizeDaily = () => {
    if (dailyTaskDone) return;
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#00f2ff', '#bc13fe', '#ffd700'] });
    const isStreakBonus = stats.hp > 0 && (stats.hp + 1) % 7 === 0;
    const xp = 10 + (isStreakBonus ? 50 : 0);
    setStats(prev => ({
      ...prev, hp: prev.hp + 1,
      xp: { math: prev.xp.math + Math.floor(xp / 3), engineering: prev.xp.engineering + Math.floor(xp / 3), specialization: prev.xp.specialization + xp - 2 * Math.floor(xp / 3) }
    }));
    setDailyTaskDone(true);
    setActiveDailyChallenge(null);
    addJournal(`Daily neural sync complete. +${xp} XP.${isStreakBonus ? ' STREAK BONUS!' : ''}`);
  };

  const exportSave = () => {
    const blob = new Blob([JSON.stringify({ stats, journal, projects })], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `chimera_save_${new Date().toISOString().slice(0, 10)}.json`; a.click();
  };

  const importSave = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = re => {
      try {
        const p = JSON.parse(re.target?.result as string);
        setStats(p.stats); setJournal(p.journal); setProjects(p.projects);
      } catch { alert('Invalid save file'); }
    };
    reader.readAsText(file);
  };

  const xpMax = currentLevel * 1500;

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-dark-bg p-6 flex items-center justify-center">
      <div className="w-full max-w-[1240px] h-[820px] border-4 border-border-main bg-dark-bg p-6 flex flex-col overflow-hidden relative">

        {/* Header */}
        <header className="flex justify-between items-end mb-5 border-b-2 border-border-main pb-4 shrink-0">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-glow-cyan uppercase italic leading-none">PROJECT CHIMERA</h1>
            <div className="text-[10px] text-text-muted tracking-widest mt-1.5 uppercase">SYSTEM VERSION 3.0.0 // WORLD MAP ONLINE // 247 NODES ACTIVE</div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex gap-1 mr-4 border-r border-border-main pr-4">
              {THEMES.map(t => (
                <button key={t.id} onClick={() => setStats(s => ({ ...s, themeId: t.id }))}
                  className={cn('w-3 h-3 border transition-all', stats.themeId === t.id ? 'scale-125 border-white' : 'border-transparent')}
                  style={{ backgroundColor: t.color }} title={t.name} />
              ))}
            </div>
            <button onClick={exportSave} className="dense-btn dense-btn-outline text-[9px]">Export</button>
            <button onClick={() => fileInputRef.current?.click()} className="dense-btn dense-btn-primary text-[9px]">Import</button>
            <input type="file" ref={fileInputRef} onChange={importSave} className="hidden" accept=".json" />
          </div>
        </header>

        <div className="grid grid-cols-12 gap-5 flex-1 overflow-hidden">

          {/* ── Left: Character ── */}
          <aside className="col-span-3 flex flex-col gap-4 overflow-y-auto pr-1 custom-scrollbar">
            <section className="high-density-panel">
              <div className="accent-corner" />
              <div className="flex items-center gap-3 mb-4">
                <button onClick={() => setStats(s => ({ ...s, portrait: (s.portrait + 1) % PORTRAITS.length }))}
                  className="w-14 h-14 bg-border-main border border-glow-cyan flex items-center justify-center text-2xl text-glow-cyan font-bold italic shrink-0 hover:scale-105 transition-transform">
                  {PORTRAITS[stats.portrait]}
                </button>
                <div className="min-w-0">
                  <div className="text-[10px] text-glow-cyan uppercase font-bold tracking-widest mb-0.5">LVL {String(currentLevel).padStart(2, '0')}</div>
                  <input type="text" value={stats.name} onChange={e => setStats(s => ({ ...s, name: e.target.value }))}
                    className="bg-transparent text-sm font-bold leading-tight focus:outline-none w-full uppercase" />
                  <div className="text-[9px] text-text-muted uppercase tracking-tighter truncate">{stats.classTitle}</div>
                </div>
              </div>

              <div className="space-y-3 pt-1">
                <ProgressBar label="Math & Theory"  value={stats.xp.math}           max={xpMax} color="bg-glow-cyan" />
                <ProgressBar label="Engineering"    value={stats.xp.engineering}     max={xpMax} color="bg-glow-purple" />
                <ProgressBar label="Specialization" value={stats.xp.specialization}  max={xpMax} color="bg-glow-gold" />
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="stat-card">
                  <div className="text-glow-red text-xs font-bold">{stats.hp}</div>
                  <div className="text-[8px] uppercase text-text-muted">Streak</div>
                </div>
                <div className="stat-card">
                  <input type="number" value={stats.gold} onChange={e => setStats(s => ({ ...s, gold: parseInt(e.target.value) || 0 }))}
                    className="bg-transparent w-full text-center focus:outline-none text-xs font-bold text-glow-gold" />
                  <div className="text-[8px] uppercase text-text-muted">Gold</div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-border-main">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-[8px] uppercase text-text-muted font-bold tracking-widest">Specialization</div>
                </div>
                <select value={stats.specialization} onChange={e => setStats(s => ({ ...s, specialization: e.target.value as CharacterStats['specialization'] }))}
                  className="w-full bg-panel-bg border border-border-main text-[10px] p-1 focus:outline-none focus:border-glow-cyan text-text-main uppercase">
                  {['None', 'LLMs', 'Vision', 'Research', 'Production'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="mt-4 pt-3 border-t border-border-main">
                <div className="text-[8px] uppercase text-text-muted font-bold tracking-widest mb-2">Service Medals</div>
                <div className="grid grid-cols-4 gap-1">
                  {ACHIEVEMENTS.map(a => <AchievementBadge key={a.id} achievement={a} isUnlocked={stats.unlockedAchievements.includes(a.id)} />)}
                </div>
              </div>

              <div className="mt-3 text-center">
                <div className="text-[9px] text-text-muted">
                  {stats.completedChapterIds.length} / 247 chapters complete
                </div>
              </div>
            </section>

            {/* Inventory */}
            <section className="high-density-panel flex-1 min-h-[120px]">
              <h3 className="text-[10px] uppercase tracking-widest text-text-muted mb-3 border-b border-border-main pb-1 flex justify-between">
                <span>Inventory</span>
                <button onClick={() => {
                  const name = prompt('Project Name?'); if (!name) return;
                  const desc = prompt('Short Description?');
                  const link = prompt('Github/Link URL?');
                  setProjects(prev => [...prev, { id: Date.now().toString(), name, description: desc || '', link: link || '#' }]);
                }} className="text-glow-cyan hover:scale-110 transition-transform">[+]</button>
              </h3>
              <ul className="space-y-2">
                {projects.map(p => (
                  <li key={p.id} className="flex gap-2 group">
                    <div className="w-7 h-7 shrink-0 bg-border-main border border-text-muted flex items-center justify-center text-[10px]">📦</div>
                    <div className="min-w-0">
                      <div className="text-[10px] text-glow-cyan font-bold flex items-center gap-1 truncate">
                        {p.name}
                        <a href={p.link} target="_blank" rel="noopener noreferrer" className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"><ExternalLink className="w-2 h-2" /></a>
                      </div>
                      <div className="text-[9px] leading-tight text-text-muted line-clamp-1">{p.description}</div>
                    </div>
                  </li>
                ))}
                {projects.length < 5 && Array.from({ length: 5 - projects.length }).map((_, i) => (
                  <li key={i} className="flex gap-2 opacity-20">
                    <div className="w-7 h-7 shrink-0 border border-dashed border-text-muted" />
                    <div className="flex items-center text-[9px] text-text-muted uppercase">Empty Slot</div>
                  </li>
                ))}
              </ul>
            </section>
          </aside>

          {/* ── Center: Campaign / Codex ── */}
          <main className="col-span-5 flex flex-col gap-3 overflow-hidden border-x-2 border-border-main px-4">
            {/* Tabs */}
            <div className="flex items-center gap-5 text-[10px] uppercase font-bold text-text-muted pt-2 shrink-0">
              {(['campaign', 'codex'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={cn('transition-colors', activeTab === tab ? 'text-glow-cyan' : 'hover:text-text-main')}>
                  {tab === 'campaign' ? 'World Map' : 'System Codex'}
                </button>
              ))}
              <div className="h-px bg-border-main flex-1" />
            </div>

            <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
              {activeTab === 'campaign' ? (
                <div className="space-y-3">
                  {/* Breadcrumbs */}
                  <div className="flex items-center gap-1.5 text-[9px] uppercase font-bold tracking-tighter flex-wrap">
                    <button onClick={() => { setActiveRealm(null); setActiveQuest(null); setActiveChapter(null); }}
                      className={cn('hover:text-glow-cyan transition-colors', !activeRealm && 'text-glow-cyan')}>THE MAP</button>
                    {activeRealm && <>
                      <ChevronRight className="w-3 h-3 text-text-muted" />
                      <button onClick={() => { setActiveQuest(null); setActiveChapter(null); }}
                        className={cn('hover:text-glow-cyan transition-colors', !activeQuest && 'text-glow-cyan')}>{activeRealm.icon} {activeRealm.title}</button>
                    </>}
                    {activeQuest && <>
                      <ChevronRight className="w-3 h-3 text-text-muted" />
                      <button onClick={() => setActiveChapter(null)}
                        className={cn('hover:text-glow-cyan transition-colors', !activeChapter && 'text-glow-cyan')}>{activeQuest.title}</button>
                    </>}
                    {activeChapter && <>
                      <ChevronRight className="w-3 h-3 text-text-muted" />
                      <span className="text-glow-cyan">{activeChapter.title}</span>
                    </>}
                  </div>

                  {/* ── REALM MAP ── */}
                  {!activeRealm && (
                    <div className="grid grid-cols-2 gap-3">
                      {realms.map(realm => {
                        const unlocked = isRealmUnlocked(realm, stats.completedChapterIds, realms);
                        const totalChapters = realm.quests.reduce((s, q) => s + q.chapters.length, 0);
                        const doneChapters = realm.quests.reduce((s, q) => s + q.chapters.filter(c => stats.completedChapterIds.includes(c.id)).length, 0);
                        const pct = Math.round((doneChapters / totalChapters) * 100);
                        return (
                          <button key={realm.id} disabled={!unlocked} onClick={() => setActiveRealm(realm)}
                            className={cn('high-density-panel text-left transition-all',
                              unlocked ? 'hover:border-glow-cyan group' : 'opacity-30 grayscale cursor-not-allowed')}>
                            <div className="flex items-start justify-between mb-2">
                              <span className="text-xl">{realm.icon}</span>
                              {!unlocked ? <Lock className="w-3 h-3 text-text-muted" /> : doneChapters === totalChapters ? <CheckCircle2 className="w-3 h-3 text-glow-gold" /> : null}
                            </div>
                            <div className="text-[10px] font-black uppercase italic group-hover:text-glow-cyan transition-colors mb-1 leading-tight">{realm.title}</div>
                            <div className="text-[9px] text-text-muted italic leading-tight mb-3">{realm.subtitle}</div>
                            <div className="h-1 bg-border-main w-full">
                              <div className="h-full bg-glow-cyan transition-all" style={{ width: `${pct}%` }} />
                            </div>
                            <div className="text-[8px] text-text-muted mt-1">{doneChapters}/{totalChapters} chapters</div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* ── QUEST LIST ── */}
                  {activeRealm && !activeQuest && (
                    <div className="space-y-3">
                      <div className="p-3 bg-panel-bg border border-border-main">
                        <div className="text-xl mb-1">{activeRealm.icon}</div>
                        <h2 className="text-sm font-black uppercase italic mb-1 text-glow-cyan">{activeRealm.title}</h2>
                        <p className="text-[10px] text-text-muted italic">{activeRealm.description}</p>
                      </div>
                      {activeRealm.quests.map((quest, idx) => {
                        const allQuests = activeRealm.quests;
                        const unlocked = isQuestUnlocked(quest, allQuests, stats.completedChapterIds);
                        const progress = getQuestProgress(quest, stats.completedChapterIds);
                        const isComplete = progress === 1;
                        return (
                          <button key={quest.id} disabled={!unlocked} onClick={() => setActiveQuest(quest)}
                            className={cn('high-density-panel text-left w-full transition-all',
                              unlocked ? 'hover:border-glow-cyan group' : 'opacity-25 cursor-not-allowed')}>
                            <div className="flex justify-between items-start mb-1.5">
                              <div>
                                <div className="text-[8px] text-text-muted uppercase tracking-widest">Quest {idx + 1}</div>
                                <div className={cn('text-xs font-black uppercase italic', isComplete ? 'text-glow-gold' : 'group-hover:text-glow-cyan transition-colors')}>{quest.title}</div>
                              </div>
                              {!unlocked ? <Lock className="w-3 h-3 text-text-muted shrink-0" /> : isComplete ? <CheckCircle2 className="w-3 h-3 text-glow-gold shrink-0" /> : null}
                            </div>
                            <p className="text-[9px] text-text-muted italic mb-2">{quest.description}</p>
                            <div className="h-1 bg-border-main w-full">
                              <div className="h-full bg-glow-cyan transition-all" style={{ width: `${progress * 100}%` }} />
                            </div>
                            <div className="text-[8px] text-text-muted mt-1">
                              {quest.chapters.filter(c => stats.completedChapterIds.includes(c.id)).length}/{quest.chapters.length} chapters
                              {quest.chapters.some(c => c.isBoss) && <span className="text-glow-red ml-2">⚔ Boss</span>}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* ── CHAPTER LIST ── */}
                  {activeRealm && activeQuest && !activeChapter && (
                    <div className="space-y-3">
                      <div className="p-3 bg-panel-bg border border-border-main flex justify-between items-start">
                        <div>
                          <div className="text-[8px] text-text-muted uppercase tracking-widest mb-0.5">Active Quest</div>
                          <h2 className="text-sm font-black uppercase italic text-glow-cyan">{activeQuest.title}</h2>
                          <p className="text-[10px] text-text-muted italic mt-1">{activeQuest.description}</p>
                        </div>
                        <button onClick={() => setActiveQuest(null)} className="text-[9px] text-text-muted hover:text-white transition-colors shrink-0">[Back]</button>
                      </div>

                      <div className="relative pl-5 space-y-3">
                        <div className="absolute left-2 top-2 bottom-2 w-px bg-border-main" />
                        {activeQuest.chapters.map((ch, idx) => {
                          const isCompleted = stats.completedChapterIds.includes(ch.id);
                          const isLocked = idx > 0 && !stats.completedChapterIds.includes(activeQuest.chapters[idx - 1].id);
                          return (
                            <div key={ch.id} className="relative">
                              <div className={cn('absolute -left-[14px] top-2.5 w-2 h-2 border z-10 transition-all',
                                isCompleted ? 'bg-glow-gold border-glow-gold' : isLocked ? 'bg-dark-bg border-text-muted' : ch.isBoss ? 'bg-glow-red border-glow-red animate-pulse' : 'bg-glow-cyan border-glow-cyan animate-pulse')} />
                              <div className={cn('p-3 border transition-all',
                                isCompleted ? 'bg-glow-gold/5 border-glow-gold/20 opacity-60' :
                                isLocked ? 'bg-black/30 border-border-main opacity-25' :
                                ch.isBoss ? 'bg-glow-red/5 border-glow-red/40 shadow-[0_0_12px_rgba(255,77,77,0.1)]' :
                                'bg-panel-bg border-glow-cyan/30 shadow-[0_0_10px_rgba(0,242,255,0.05)]')}>
                                <div className="flex justify-between items-start mb-1.5">
                                  <div>
                                    <div className={cn('text-[8px] uppercase font-bold mb-0.5', ch.isBoss ? 'text-glow-red' : 'text-text-muted')}>
                                      {ch.isBoss ? '⚔ BOSS ENCOUNTER' : `Chapter ${idx + 1}`}
                                    </div>
                                    <div className={cn('text-xs font-bold uppercase', isCompleted ? 'text-glow-gold line-through' : ch.isBoss ? 'text-glow-red' : 'text-text-main')}>{ch.title}</div>
                                  </div>
                                  {isCompleted && <CheckCircle2 className="w-3 h-3 text-glow-gold shrink-0" />}
                                </div>
                                {!isCompleted && !isLocked && (
                                  <button onClick={() => setActiveChapter(ch)}
                                    className={cn('w-full py-1 text-[9px] font-bold uppercase tracking-widest transition-all mt-1',
                                      ch.isBoss ? 'bg-glow-red/20 text-glow-red border border-glow-red/50 hover:bg-glow-red hover:text-dark-bg' :
                                      'bg-glow-cyan/15 text-glow-cyan border border-glow-cyan/40 hover:bg-glow-cyan hover:text-dark-bg')}>
                                    {ch.isBoss ? 'Engage Boss' : 'View Chapter'}
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* ── CHAPTER DETAIL — Lesson ── */}
                  {activeChapter && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-start border-b border-border-main pb-2">
                        <div>
                          <div className={cn('text-[8px] uppercase font-bold tracking-widest mb-0.5', activeChapter.isBoss ? 'text-glow-red' : 'text-glow-cyan')}>
                            {activeChapter.isBoss ? '⚔ BOSS ENCOUNTER' : 'Chapter Briefing'}
                          </div>
                          <h2 className="text-sm font-black uppercase italic text-text-main leading-tight">{activeChapter.title}</h2>
                        </div>
                        <button onClick={() => setActiveChapter(null)} className="text-[9px] text-text-muted hover:text-white transition-colors shrink-0">[Back]</button>
                      </div>

                      {/* Lesson panel */}
                      <div className="space-y-3">
                        <div className="text-[9px] uppercase font-bold text-glow-cyan tracking-widest">📚 Concept Briefing</div>
                        <p className="text-[11px] text-text-main leading-relaxed border-l-2 border-glow-cyan/50 pl-3">
                          {activeChapter.lesson.text}
                        </p>
                        {activeChapter.lesson.formula && (
                          <div className="bg-panel-bg border border-border-main p-3">
                            <div className="text-[8px] uppercase text-glow-cyan font-bold mb-1 tracking-widest">Key Formula</div>
                            <pre className="font-mono text-[10px] text-glow-gold whitespace-pre-wrap leading-relaxed">{activeChapter.lesson.formula}</pre>
                          </div>
                        )}
                        {activeChapter.lesson.example && (
                          <div className="bg-panel-bg border border-border-main/50 p-3">
                            <div className="text-[8px] uppercase text-text-muted font-bold mb-1 tracking-widest">Example</div>
                            <p className="text-[10px] text-text-muted leading-relaxed">{activeChapter.lesson.example}</p>
                          </div>
                        )}
                      </div>

                      {/* Challenge button */}
                      {stats.completedChapterIds.includes(activeChapter.id) ? (
                        <div className="p-3 bg-glow-gold/10 border border-glow-gold/40 text-center">
                          <CheckCircle2 className="w-4 h-4 text-glow-gold mx-auto mb-1" />
                          <div className="text-[10px] text-glow-gold font-bold uppercase">Chapter Complete</div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setActiveChallenge({ challenge: activeChapter.challenge, chapterId: activeChapter.id })}
                          className={cn('w-full py-3 text-sm font-black uppercase tracking-widest transition-all',
                            activeChapter.isBoss
                              ? 'bg-glow-red/20 text-glow-red border-2 border-glow-red hover:bg-glow-red hover:text-dark-bg'
                              : 'bg-glow-cyan/20 text-glow-cyan border-2 border-glow-cyan hover:bg-glow-cyan hover:text-dark-bg')}>
                          {activeChapter.isBoss ? '⚔ Engage Boss Challenge' : '▶ Begin Challenge'}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                /* ── CODEX ── */
                <div className="space-y-4 pt-2">
                  {[
                    { title: 'The Descent', lore: 'In the valley of errors, we follow the steepest curve down to truth.', concept: 'Gradient Descent: An optimization algorithm that minimizes a loss function by iteratively moving parameters opposite the gradient direction.' },
                    { title: 'Echoes of Error', lore: 'The mistake found at the end must ripple back to the beginning.', concept: 'Backpropagation: The algorithm for computing gradients in neural networks by applying the chain rule backward through the computational graph.' },
                    { title: 'Universal Attention', lore: 'To speak is to listen. To listen is to find what matters most in the sequence.', concept: 'Transformers: Architectures using self-attention to model relationships between all input positions simultaneously, without recurrence.' },
                    { title: 'Oracle of Memory', lore: 'A mind that remembers too much of the past fails to understand the future.', concept: 'Overfitting: When a model learns training data noise rather than the underlying signal, degrading generalization to new data.' },
                    { title: 'The Alignment Problem', lore: 'We build minds to serve us, but what if they serve themselves instead?', concept: 'AI Alignment: The challenge of ensuring AI systems reliably pursue intended human values, especially as they become more capable.' },
                    { title: 'The Probability Engine', lore: 'Reality is not certain. It is merely weighted.', concept: 'Bayesian inference: Updating beliefs (prior) with evidence (likelihood) to compute a posterior — the foundation of probabilistic ML.' },
                  ].map(entry => (
                    <div key={entry.title} className="high-density-panel border-glow-cyan/20">
                      <div className="text-glow-cyan text-xs font-bold uppercase mb-1">{entry.title}</div>
                      <div className="text-[10px] text-text-main mb-2 italic">"{entry.lore}"</div>
                      <div className="text-[9px] text-text-muted leading-relaxed bg-black/40 p-2 border border-border-main">
                        <span className="text-glow-purple font-bold">LOG: </span>{entry.concept}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>

          {/* ── Right: Directives & Log ── */}
          <aside className="col-span-4 flex flex-col gap-4 overflow-hidden">
            <section className="high-density-panel">
              <h3 className="text-[10px] uppercase tracking-widest text-glow-cyan mb-3 border-b border-glow-cyan/20 pb-1">Primary Directives</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-0.5">
                    <div className="text-[11px] font-bold uppercase">Daily: Neural Sync</div>
                    <span className="text-[10px] text-glow-gold">+10 XP</span>
                  </div>
                  <div className="text-[9px] text-text-muted italic mb-2">30m coding | 30m paper reading</div>
                  <button onClick={() => setActiveDailyChallenge(DAILY_CHALLENGES[Math.floor(Math.random() * DAILY_CHALLENGES.length)])}
                    disabled={dailyTaskDone}
                    className={cn('w-full py-1.5 text-[9px] font-bold uppercase tracking-widest border transition-all',
                      dailyTaskDone ? 'bg-border-main text-text-muted border-border-main' : 'border-glow-cyan text-glow-cyan bg-border-main hover:bg-glow-cyan hover:text-dark-bg')}>
                    {dailyTaskDone ? 'Directive Executed' : 'Sync Neural Link'}
                  </button>
                </div>

                <div className="p-3 bg-panel-bg border border-text-muted border-dashed">
                  <div className="flex justify-between text-[10px] font-bold uppercase mb-1">
                    <span>Weekly Raid</span><span className="text-glow-gold">+50 XP</span>
                  </div>
                  <div className="text-[9px] text-text-muted italic mb-2 line-clamp-1">Deploy a project or publish research</div>
                  <button onClick={() => {
                    const name = prompt('Raid Artifact Name?'); if (!name) return;
                    const link = prompt('Artifact Link?');
                    setProjects(prev => [...prev.slice(0, 4), { id: Date.now().toString(), name: `[RAID] ${name}`, description: 'Weekly Raid Reward', link: link || '#' }]);
                    setStats(prev => ({ ...prev, xp: { ...prev.xp, specialization: prev.xp.specialization + 50 } }));
                    confetti({ particleCount: 150 });
                    addJournal(`Weekly Raid Complete: ${name} deployed.`);
                  }} className="w-full py-1 border border-glow-gold/30 text-glow-gold text-[8px] uppercase font-bold hover:bg-glow-gold/20 transition-colors">
                    Deploy Artifact
                  </button>
                </div>

                {/* Realm progress quick-stats */}
                <div className="pt-2 border-t border-border-main">
                  <div className="text-[8px] uppercase text-text-muted font-bold tracking-widest mb-2">Realm Progress</div>
                  <div className="space-y-1.5">
                    {realms.map(realm => {
                      const total = realm.quests.reduce((s, q) => s + q.chapters.length, 0);
                      const done = realm.quests.reduce((s, q) => s + q.chapters.filter(c => stats.completedChapterIds.includes(c.id)).length, 0);
                      const unlocked = isRealmUnlocked(realm, stats.completedChapterIds, realms);
                      return (
                        <div key={realm.id} className="flex items-center gap-2">
                          <span className="text-[10px] w-4">{realm.icon}</span>
                          <div className="flex-1 h-1 bg-border-main">
                            <div className={cn('h-full transition-all', unlocked ? 'bg-glow-cyan' : 'bg-border-main')} style={{ width: `${(done / total) * 100}%` }} />
                          </div>
                          <span className="text-[8px] text-text-muted w-8 text-right">{done}/{total}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* Audit Log */}
            <section className="high-density-panel flex-1 flex flex-col min-h-0">
              <h3 className="text-[10px] uppercase tracking-widest text-text-muted mb-2 border-b border-border-main pb-1">System Audit Log</h3>
              <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                <AnimatePresence initial={false}>
                  {journal.map(entry => (
                    <motion.div key={entry.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                      className="text-[9px] font-mono leading-tight">
                      <span className="text-text-muted">[{entry.timestamp}]</span> {entry.text}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <div className="mt-3 pt-2 border-t border-border-main shrink-0">
                <input type="text" placeholder="> LOG NEW ENTRY..."
                  className="w-full bg-transparent border-b border-border-main text-[10px] py-1 outline-none focus:border-glow-cyan transition-colors"
                  onKeyDown={e => {
                    if (e.key === 'Enter' && e.currentTarget.value) {
                      addJournal(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }} />
              </div>
            </section>
          </aside>
        </div>

        {/* Footer */}
        <footer className="mt-3 flex items-center justify-between text-[8px] text-text-muted uppercase tracking-widest bg-panel-bg/50 px-2 h-6 shrink-0 border border-border-main">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-glow-cyan animate-pulse rounded-full" />
            CONNECTION: STABLE // {stats.name} // LVL {currentLevel}
          </span>
          <div className="flex gap-4 items-center">
            <span className="text-glow-red">SPEC: {stats.specialization === 'None' ? 'UNASSIGNED' : stats.specialization}</span>
            <button onClick={() => { if (confirm('Initiate total system wipe?')) { localStorage.removeItem('chimera_v2_save'); window.location.reload(); } }}
              className="hover:text-glow-red transition-all">[WIPE MEMORY]</button>
          </div>
        </footer>
      </div>

      {/* ── Overlays ── */}
      <AnimatePresence>
        {activeChallenge && (
          <ChallengeHUD
            challenge={activeChallenge.challenge}
            title={activeChapter?.title || ''}
            subTitle={activeChapter?.isBoss ? '⚔ CRITICAL CHALLENGE: BOSS ENCOUNTER' : `NODE ACCESS // ${activeQuest?.title || ''}`}
            onComplete={() => {
              completeChapter(activeChallenge.chapterId, activeChapter?.isBoss || false);
              setActiveChallenge(null);
            }}
            onCancel={() => setActiveChallenge(null)}
          />
        )}
        {activeDailyChallenge && (
          <ChallengeHUD
            challenge={activeDailyChallenge}
            title="Neural Sync Challenge"
            subTitle="Daily Directive Execution"
            onComplete={finalizeDaily}
            onCancel={() => setActiveDailyChallenge(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
