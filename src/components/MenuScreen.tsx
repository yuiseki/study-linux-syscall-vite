import React from 'react';
import { loadStatistics } from '../utils/storage';

interface MenuScreenProps {
  onStartGame: () => void;
  onOpenSettings: () => void;
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2rem',
    padding: '1rem',
    maxWidth: '800px',
    animation: 'fadeIn 0.5s ease-out',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#888',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%',
  },
  primaryButton: {
    padding: '1rem 2rem',
    fontSize: '1.2rem',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  secondaryButton: {
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#444',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  statsBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: '1.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    width: '100%',
    marginTop: '1rem',
  },
  statRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.9rem',
    color: '#bbb',
  },
};

export const MenuScreen: React.FC<MenuScreenProps> = ({ onStartGame, onOpenSettings }) => {
  const stats = loadStatistics();

  return (
    <div style={styles.container}>
      <div>
        <h1 style={styles.title}>Linux システムコール クイズ</h1>
        <p style={styles.subtitle}>どれが本物のシステムコール?</p>
      </div>

      <div style={styles.buttonGroup}>
        <button
          style={styles.primaryButton}
          onClick={onStartGame}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#5568d3';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#667eea';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ゲームスタート
        </button>
        <button
          style={styles.secondaryButton}
          onClick={onOpenSettings}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#555';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#444';
          }}
        >
          設定
        </button>
      </div>

      {stats.totalGamesPlayed > 0 && (
        <div style={styles.statsBox}>
          <div style={styles.statRow}>
            <span>総プレイ回数:</span>
            <span>{stats.totalGamesPlayed}回</span>
          </div>
          <div style={styles.statRow}>
            <span>総正解数:</span>
            <span>{stats.totalCorrectAnswers}問</span>
          </div>
          <div style={styles.statRow}>
            <span>最高連続正解:</span>
            <span>{stats.highestStreak}回</span>
          </div>
          <div style={styles.statRow}>
            <span>平均正答率:</span>
            <span>
              {stats.totalGamesPlayed > 0
                ? ((stats.totalCorrectAnswers / (stats.totalGamesPlayed * 10)) * 100).toFixed(1)
                : 0}
              %
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
