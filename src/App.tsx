import React, { useState, useEffect } from 'react';
import { GameState, GameSettings, Statistics } from './types';
import { loadSettings, saveSettings, loadStatistics, shouldReduceMotion } from './utils/storage';
import { useQuizGame } from './hooks/useQuizGame';
import { MenuScreen } from './components/MenuScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';

function App() {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [settings, setSettings] = useState<GameSettings>(loadSettings());
  const [statistics, setStatistics] = useState<Statistics>(loadStatistics());
  const [gameKey, setGameKey] = useState(0); // ゲームをリセットするためのキー

  const quizGame = useQuizGame(settings, gameKey);

  // OS設定で「動きを減らす」が有効な場合、自動的に演出を控えめに
  useEffect(() => {
    if (shouldReduceMotion() && settings.effectIntensity !== 'subtle') {
      const updatedSettings = { ...settings, effectIntensity: 'subtle' as const };
      setSettings(updatedSettings);
      saveSettings(updatedSettings);
    }
  }, []);

  const handleStartGame = () => {
    setGameState('playing');
  };

  const handleOpenSettings = () => {
    setGameState('settings');
  };

  const handleSaveSettings = (newSettings: GameSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const handleBackToMenu = () => {
    setGameState('menu');
    setStatistics(loadStatistics());
  };

  const handleNextQuestion = () => {
    if (quizGame.isGameComplete) {
      const updatedStats = quizGame.updateStatistics();
      setStatistics(updatedStats);
      setGameState('result');
    } else {
      quizGame.nextQuestion();
    }
  };

  const handlePlayAgain = () => {
    // ゲームを再開：状態をリセットして新しいゲームを開始
    setGameKey(prev => prev + 1);
    setGameState('playing');
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {gameState === 'menu' && (
        <MenuScreen onStartGame={handleStartGame} onOpenSettings={handleOpenSettings} />
      )}
      {gameState === 'settings' && (
        <SettingsScreen
          settings={settings}
          onSaveSettings={handleSaveSettings}
          onBack={handleBackToMenu}
        />
      )}
      {gameState === 'playing' && quizGame.currentQuestion && (
        <QuizScreen
          question={quizGame.currentQuestion}
          questionIndex={quizGame.questionIndex}
          totalQuestions={settings.questionCount}
          currentStreak={quizGame.session.currentStreak}
          settings={settings}
          onAnswer={quizGame.submitAnswer}
          onNext={handleNextQuestion}
          isAnswered={quizGame.isAnswered}
        />
      )}
      {gameState === 'result' && (
        <ResultScreen
          session={quizGame.session}
          statistics={statistics}
          onReturnToMenu={handleBackToMenu}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </div>
  );
}

export default App;
