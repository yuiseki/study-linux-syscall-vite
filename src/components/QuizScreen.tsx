import React, { useEffect, useState } from 'react';
import { QuestionData } from '../data/questions';
import { GameSettings } from '../types';
import { useConfetti, useScreenShake, useDebrisParticles, useFlashEffect } from '../hooks/useEffects';
import { playSuccessSound, playFailSound, playClickSound } from '../utils/audio';
import { ParticleRenderer } from './ParticleRenderer';

interface QuizScreenProps {
  question: QuestionData;
  questionIndex: number;
  totalQuestions: number;
  currentStreak: number;
  settings: GameSettings;
  onAnswer: (answer: string) => { isCorrect: boolean; correctAnswer: string } | undefined;
  onNext: () => void;
  isAnswered: boolean;
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    padding: '2rem',
    maxWidth: '800px',
    width: '100%',
    animation: 'fadeIn 0.5s ease-out',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.9rem',
    color: '#888',
  },
  questionBox: {
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
  },
  questionText: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  hint: {
    fontSize: '0.9rem',
    color: '#888',
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  optionButton: {
    padding: '1.5rem',
    fontSize: '1.2rem',
    backgroundColor: '#333',
    color: 'white',
    border: '2px solid transparent',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    position: 'relative' as const,
  },
  optionButtonHover: {
    backgroundColor: '#444',
    borderColor: '#667eea',
  },
  correctOption: {
    backgroundColor: '#28a745',
    borderColor: '#34d058',
  },
  incorrectOption: {
    backgroundColor: '#dc3545',
    borderColor: '#f85149',
  },
  streak: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#FFD700',
  },
  feedbackOverlay: {
    position: 'fixed' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '5rem',
    fontWeight: 'bold',
    pointerEvents: 'none' as const,
    zIndex: 1000,
    animation: 'pulse 0.5s ease-out',
  },
  flashOverlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none' as const,
    zIndex: 999,
    transition: 'opacity 0.3s',
  },
};

export const QuizScreen: React.FC<QuizScreenProps> = ({
  question,
  questionIndex,
  totalQuestions,
  currentStreak,
  settings,
  onAnswer,
  onNext,
  isAnswered,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [result, setResult] = useState<{ isCorrect: boolean; correctAnswer: string } | null>(null);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  const confetti = useConfetti(settings.effectIntensity);
  const shake = useScreenShake(settings.effectIntensity);
  const debris = useDebrisParticles(settings.effectIntensity);
  const flash = useFlashEffect();

  useEffect(() => {
    // 問題が変わったらリセット
    setSelectedAnswer(null);
    setResult(null);
  }, [question]);

  // キーボードショートカット
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isAnswered) {
        if (e.key === 'Enter') {
          onNext();
        }
      } else {
        const index = parseInt(e.key) - 1;
        if (index >= 0 && index < question.options.length) {
          handleAnswer(question.options[index]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [question, isAnswered, onNext]);

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;

    if (settings.soundEnabled) {
      playClickSound();
    }

    setSelectedAnswer(answer);
    const res = onAnswer(answer);
    if (!res) return;

    setResult(res);

    if (res.isCorrect) {
      confetti.trigger();
      flash.trigger('rgba(40, 167, 69, 0.3)');
      if (settings.soundEnabled) {
        setTimeout(() => playSuccessSound(), 100);
      }
    } else {
      shake.trigger();
      debris.trigger(window.innerWidth / 2, window.innerHeight / 2);
      flash.trigger('rgba(220, 53, 69, 0.3)');
      if (settings.soundEnabled) {
        setTimeout(() => playFailSound(), 100);
      }
    }

    // 自動遷移
    setTimeout(() => {
      onNext();
    }, 1500);
  };

  const isLastQuestion = questionIndex === totalQuestions - 1;

  return (
    <div style={{ ...styles.container, ...shake.shakeStyle }}>
      <div style={styles.header}>
        <span>
          問題 {questionIndex + 1} / {totalQuestions}
          {isLastQuestion && <span style={{ color: '#FFD700', marginLeft: '0.5rem' }}>🏁 最終問題!</span>}
        </span>
        {currentStreak > 0 && <span style={styles.streak}>🔥 連続正解: {currentStreak}</span>}
        <span>難易度: {settings.difficulty.toUpperCase()}</span>
      </div>

      <div style={styles.questionBox}>
        <div style={styles.questionText}>どれが実在するLinuxシステムコール？</div>
        <div style={styles.hint}>以下の3つから選んでください</div>
      </div>

      <div style={styles.optionsContainer}>
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = result && option === result.correctAnswer;
          const isIncorrect = result && isSelected && !result.isCorrect;
          const isHovered = hoveredOption === option && !isAnswered;

          let buttonStyle = { ...styles.optionButton };
          if (isCorrect) buttonStyle = { ...buttonStyle, ...styles.correctOption };
          else if (isIncorrect) buttonStyle = { ...buttonStyle, ...styles.incorrectOption };
          else if (isHovered) buttonStyle = { ...buttonStyle, ...styles.optionButtonHover };

          return (
            <button
              key={option}
              style={buttonStyle}
              onClick={() => handleAnswer(option)}
              onMouseEnter={() => setHoveredOption(option)}
              onMouseLeave={() => setHoveredOption(null)}
              disabled={isAnswered}
            >
              <span style={{ marginRight: '1rem', color: '#888' }}>{index + 1}.</span>
              {option}
            </button>
          );
        })}
      </div>

      {result && (
        <div
          style={{
            ...styles.feedbackOverlay,
            color: result.isCorrect ? '#28a745' : '#dc3545',
          }}
        >
          {result.isCorrect ? 'SUCCESS!' : 'MISS!'}
        </div>
      )}

      {flash.isFlashing && (
        <div
          style={{
            ...styles.flashOverlay,
            backgroundColor: flash.flashColor,
            opacity: flash.isFlashing ? 1 : 0,
          }}
        />
      )}

      <ParticleRenderer particles={[...confetti.particles, ...debris.particles]} />
    </div>
  );
};
