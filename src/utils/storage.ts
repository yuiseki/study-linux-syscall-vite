import { GameSettings, Statistics } from '../types';

const SETTINGS_KEY = 'linux-syscall-quiz-settings';
const STATS_KEY = 'linux-syscall-quiz-stats';

const defaultSettings: GameSettings = {
  questionCount: 10,
  difficulty: 'normal',
  effectIntensity: 'standard',
  soundEnabled: true,
};

const defaultStats: Statistics = {
  totalGamesPlayed: 0,
  totalCorrectAnswers: 0,
  highestStreak: 0,
};

export function loadSettings(): GameSettings {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      return { ...defaultSettings, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.error('Failed to load settings:', error);
  }
  return defaultSettings;
}

export function saveSettings(settings: GameSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}

export function loadStatistics(): Statistics {
  try {
    const stored = localStorage.getItem(STATS_KEY);
    if (stored) {
      return { ...defaultStats, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.error('Failed to load statistics:', error);
  }
  return defaultStats;
}

export function saveStatistics(stats: Statistics): void {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error('Failed to save statistics:', error);
  }
}

export function resetAllData(): void {
  try {
    localStorage.removeItem(SETTINGS_KEY);
    localStorage.removeItem(STATS_KEY);
  } catch (error) {
    console.error('Failed to reset data:', error);
  }
}

// OS設定から「動きを減らす」を検出
export function shouldReduceMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
