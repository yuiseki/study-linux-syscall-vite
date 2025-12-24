import React, { useState } from 'react';
import { GameSettings, QuestionCount, EffectIntensity } from '../types';
import { Difficulty } from '../data/questions';
import { resetAllData, shouldReduceMotion } from '../utils/storage';

interface SettingsScreenProps {
  settings: GameSettings;
  onSaveSettings: (settings: GameSettings) => void;
  onBack: () => void;
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    padding: '2rem',
    maxWidth: '600px',
    width: '100%',
    animation: 'fadeIn 0.5s ease-out',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '1rem',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  label: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#bbb',
  },
  optionGroup: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
  optionButton: {
    padding: '0.6rem 1.2rem',
    fontSize: '0.9rem',
    backgroundColor: '#333',
    color: 'white',
    border: '2px solid transparent',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  optionButtonActive: {
    backgroundColor: '#667eea',
    borderColor: '#8899ff',
  },
  toggle: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  checkbox: {
    width: '50px',
    height: '26px',
    position: 'relative' as const,
    cursor: 'pointer',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    marginTop: '2rem',
  },
  primaryButton: {
    flex: 1,
    padding: '1rem',
    fontSize: '1rem',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  dangerButton: {
    flex: 1,
    padding: '1rem',
    fontSize: '1rem',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  secondaryButton: {
    flex: 1,
    padding: '1rem',
    fontSize: '1rem',
    backgroundColor: '#444',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  settings,
  onSaveSettings,
  onBack,
}) => {
  const [localSettings, setLocalSettings] = useState<GameSettings>(settings);

  const handleSave = () => {
    onSaveSettings(localSettings);
    onBack();
  };

  const handleReset = () => {
    if (confirm('すべてのデータをリセットしますか？この操作は取り消せません。')) {
      resetAllData();
      alert('データをリセットしました。');
      window.location.reload();
    }
  };

  // OS設定を確認
  const reducedMotion = shouldReduceMotion();

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>設定</h2>

      <div style={styles.section}>
        <label style={styles.label}>出題数</label>
        <div style={styles.optionGroup}>
          {[5, 10, 20].map((count) => (
            <button
              key={count}
              style={{
                ...styles.optionButton,
                ...(localSettings.questionCount === count ? styles.optionButtonActive : {}),
              }}
              onClick={() =>
                setLocalSettings({ ...localSettings, questionCount: count as QuestionCount })
              }
            >
              {count}問
            </button>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <label style={styles.label}>難易度</label>
        <div style={styles.optionGroup}>
          {[
            { value: 'easy', label: 'Easy' },
            { value: 'normal', label: 'Normal' },
            { value: 'hard', label: 'Hard' },
          ].map((diff) => (
            <button
              key={diff.value}
              style={{
                ...styles.optionButton,
                ...(localSettings.difficulty === diff.value ? styles.optionButtonActive : {}),
              }}
              onClick={() =>
                setLocalSettings({ ...localSettings, difficulty: diff.value as Difficulty })
              }
            >
              {diff.label}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <label style={styles.label}>演出強度</label>
        <div style={styles.optionGroup}>
          {[
            { value: 'subtle', label: '控えめ' },
            { value: 'standard', label: '標準' },
            { value: 'intense', label: '派手' },
          ].map((effect) => (
            <button
              key={effect.value}
              style={{
                ...styles.optionButton,
                ...(localSettings.effectIntensity === effect.value
                  ? styles.optionButtonActive
                  : {}),
              }}
              onClick={() =>
                setLocalSettings({
                  ...localSettings,
                  effectIntensity: effect.value as EffectIntensity,
                })
              }
            >
              {effect.label}
            </button>
          ))}
        </div>
        {reducedMotion && (
          <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.5rem' }}>
            ℹ️ OS設定により、アニメーションが抑制されています
          </p>
        )}
      </div>

      <div style={styles.section}>
        <label style={styles.label}>サウンド</label>
        <div style={styles.toggle}>
          <input
            type="checkbox"
            checked={localSettings.soundEnabled}
            onChange={(e) =>
              setLocalSettings({ ...localSettings, soundEnabled: e.target.checked })
            }
            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
          />
          <span>{localSettings.soundEnabled ? 'ON' : 'OFF'}</span>
        </div>
      </div>

      <div style={styles.buttonGroup}>
        <button style={styles.primaryButton} onClick={handleSave}>
          保存
        </button>
        <button style={styles.secondaryButton} onClick={onBack}>
          キャンセル
        </button>
      </div>

      <div style={styles.buttonGroup}>
        <button style={styles.dangerButton} onClick={handleReset}>
          データをリセット
        </button>
      </div>
    </div>
  );
};
