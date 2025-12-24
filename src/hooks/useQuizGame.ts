import { useState, useEffect, useCallback } from 'react';
import { generateQuestion, QuestionData, Difficulty } from '../data/questions';
import { GameSession, QuestionResult, GameSettings, Statistics } from '../types';
import { loadStatistics, saveStatistics } from '../utils/storage';

export function useQuizGame(settings: GameSettings, gameKey: number = 0) {
  const [currentQuestion, setCurrentQuestion] = useState<QuestionData | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [session, setSession] = useState<GameSession>({
    results: [],
    currentStreak: 0,
    maxStreak: 0,
    startTime: Date.now(),
  });
  const [usedSyscalls] = useState(new Set<string>());
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [isAnswered, setIsAnswered] = useState(false);

  // gameKeyが変わったらゲームをリセット
  useEffect(() => {
    setQuestionIndex(0);
    setSession({
      results: [],
      currentStreak: 0,
      maxStreak: 0,
      startTime: Date.now(),
    });
    usedSyscalls.clear();
    setIsAnswered(false);
  }, [gameKey, usedSyscalls]);

  // 新しい問題を生成
  const generateNewQuestion = useCallback(() => {
    const question = generateQuestion(settings.difficulty, usedSyscalls);
    setCurrentQuestion(question);
    setQuestionStartTime(Date.now());
    setIsAnswered(false);
  }, [settings.difficulty, usedSyscalls]);

  // ゲーム開始時に最初の問題を生成
  useEffect(() => {
    generateNewQuestion();
  }, [generateNewQuestion, gameKey]);

  // 回答処理
  const submitAnswer = useCallback((selectedAnswer: string) => {
    if (!currentQuestion || isAnswered) return;

    setIsAnswered(true);
    const timeSpent = Date.now() - questionStartTime;
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    const result: QuestionResult = {
      questionIndex,
      selectedAnswer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
      timeSpent,
    };

    setSession((prev) => {
      const newStreak = isCorrect ? prev.currentStreak + 1 : 0;
      const newMaxStreak = Math.max(prev.maxStreak, newStreak);

      return {
        ...prev,
        results: [...prev.results, result],
        currentStreak: newStreak,
        maxStreak: newMaxStreak,
      };
    });

    return { isCorrect, correctAnswer: currentQuestion.correctAnswer };
  }, [currentQuestion, questionIndex, questionStartTime, isAnswered]);

  // 次の問題へ
  const nextQuestion = useCallback(() => {
    if (questionIndex + 1 < settings.questionCount) {
      setQuestionIndex((prev) => prev + 1);
      generateNewQuestion();
    }
  }, [questionIndex, settings.questionCount, generateNewQuestion]);

  // ゲーム完了判定
  const isGameComplete = questionIndex >= settings.questionCount - 1 && isAnswered;

  // 統計の更新
  const updateStatistics = useCallback(() => {
    const stats = loadStatistics();
    const correctCount = session.results.filter((r) => r.isCorrect).length;

    const newStats: Statistics = {
      totalGamesPlayed: stats.totalGamesPlayed + 1,
      totalCorrectAnswers: stats.totalCorrectAnswers + correctCount,
      highestStreak: Math.max(stats.highestStreak, session.maxStreak),
    };

    saveStatistics(newStats);
    return newStats;
  }, [session]);

  return {
    currentQuestion,
    questionIndex,
    session,
    submitAnswer,
    nextQuestion,
    isGameComplete,
    isAnswered,
    updateStatistics,
  };
}
