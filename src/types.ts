/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ─── Challenge Types ─────────────────────────────────────────────────────────

export type ChallengeType = 'quiz' | 'code' | 'flashcard' | 'derivation' | 'design' | 'concept_battle';

export interface FlashCard {
  term: string;
  definition: string;
}

export interface DerivationStep {
  prompt: string;
  options: string[];
  correctAnswer: string;
}

export interface Challenge {
  type: ChallengeType;
  prompt: string;
  // quiz / design
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
  // code
  template?: string;
  validationRegex?: string;
  // flashcard
  cards?: FlashCard[];
  // derivation
  steps?: DerivationStep[];
  // concept_battle
  keywords?: string[];
  keywordThreshold?: number;
}

// ─── Lesson ──────────────────────────────────────────────────────────────────

export interface Lesson {
  text: string;
  formula?: string;
  example?: string;
}

// ─── World Hierarchy ─────────────────────────────────────────────────────────

export interface Chapter {
  id: string;
  title: string;
  lesson: Lesson;
  challenge: Challenge;
  isBoss?: boolean;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  chapters: Chapter[];
  /** IDs of Quests that must be fully completed before this one unlocks */
  prerequisiteQuestIds?: string[];
}

export interface Realm {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  quests: Quest[];
  /** IDs of Realms whose first Quest must be completed before this unlocks */
  prerequisiteRealmIds?: string[];
}

// ─── Player ───────────────────────────────────────────────────────────────────

export interface CharacterStats {
  name: string;
  classTitle: string;
  hp: number;           // streak counter
  gold: number;
  xp: {
    math: number;
    engineering: number;
    specialization: number;
  };
  specialization: 'LLMs' | 'Vision' | 'Research' | 'Production' | 'None';
  portrait: number;
  themeId: string;
  unlockedAchievements: string[];
  completedChapterIds: string[];
}

// ─── Misc ─────────────────────────────────────────────────────────────────────

export interface JournalEntry {
  id: string;
  text: string;
  timestamp: string;
}

export interface Project {
  id: string;
  name: string;
  link: string;
  description: string;
}
