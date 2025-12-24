import React from 'react';
import { GameSession, Statistics } from '../types';

interface ResultScreenProps {
  session: GameSession;
  statistics: Statistics;
  onReturnToMenu: () => void;
  onPlayAgain: () => void;
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    padding: '2rem',
    maxWidth: '700px',
    width: '100%',
    animation: 'fadeIn 0.5s ease-out',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  scoreBox: {
    padding: '2rem',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '16px',
    textAlign: 'center',
  },
  bigNumber: {
    fontSize: '4rem',
    fontWeight: 'bold',
    color: '#667eea',
  },
  label: {
    fontSize: '1rem',
    color: '#888',
    marginTop: '0.5rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  statCard: {
    padding: '1.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    textAlign: 'center',
  },
  statValue: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: '0.85rem',
    color: '#888',
    marginTop: '0.5rem',
  },
  detailsBox: {
    padding: '1.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
  },
  detailsTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  resultItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.8rem',
    marginBottom: '0.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '8px',
    fontSize: '0.9rem',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
  },
  primaryButton: {
    flex: 1,
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  secondaryButton: {
    flex: 1,
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    backgroundColor: '#444',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
};

export const ResultScreen: React.FC<ResultScreenProps> = ({
  session,
  statistics,
  onReturnToMenu,
  onPlayAgain,
}) => {
  const correctCount = session.results.filter((r) => r.isCorrect).length;
  const totalQuestions = session.results.length;
  const accuracy = ((correctCount / totalQuestions) * 100).toFixed(1);
  const avgTime =
    session.results.reduce((sum, r) => sum + r.timeSpent, 0) / totalQuestions / 1000;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>結果発表!</h1>

      <div style={styles.scoreBox}>
        <div style={styles.bigNumber}>
          {correctCount} / {totalQuestions}
        </div>
        <div style={styles.label}>正解数</div>
      </div>

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{accuracy}%</div>
          <div style={styles.statLabel}>正答率</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{session.maxStreak}</div>
          <div style={styles.statLabel}>最大連続正解</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{avgTime.toFixed(1)}秒</div>
          <div style={styles.statLabel}>平均解答時間</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{statistics.highestStreak}</div>
          <div style={styles.statLabel}>歴代最高ストリーク</div>
        </div>
      </div>

      <div style={styles.detailsBox}>
        <div style={styles.detailsTitle}>問題ごとの結果</div>
        {session.results.map((result, index) => (
          <div key={index} style={styles.resultItem}>
            <span>
              問{index + 1}: {result.correctAnswer}
            </span>
            <span
              style={{
                color: result.isCorrect ? '#28a745' : '#dc3545',
                fontWeight: 'bold',
              }}
            >
              {result.isCorrect ? '✓ 正解' : '✗ 不正解'}
            </span>
          </div>
        ))}
      </div>

      <div style={styles.buttonGroup}>
        <button
          style={styles.primaryButton}
          onClick={onPlayAgain}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#5568d3';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#667eea';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          もう一度プレイ
        </button>
        <button
          style={styles.secondaryButton}
          onClick={onReturnToMenu}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#555';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#444';
          }}
        >
          メニューに戻る
        </button>
      </div>
    </div>
  );
};
