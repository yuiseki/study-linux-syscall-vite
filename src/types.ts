import { Difficulty } from './data/questions';

export type EffectIntensity = 'subtle' | 'standard' | 'intense';
export type QuestionCount = 5 | 10 | 20;

export interface GameSettings {
  questionCount: QuestionCount;
  difficulty: Difficulty;
  effectIntensity: EffectIntensity;
  soundEnabled: boolean;
}

export interface Statistics {
  totalGamesPlayed: number;
  totalCorrectAnswers: number;
  highestStreak: number;
}

export interface QuestionResult {
  questionIndex: number;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  timeSpent: number; // ミリ秒
}

export interface GameSession {
  results: QuestionResult[];
  currentStreak: number;
  maxStreak: number;
  startTime: number;
}

export type GameState = 'menu' | 'settings' | 'playing' | 'result';
