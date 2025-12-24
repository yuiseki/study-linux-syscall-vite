import { useState } from 'react';
import { EffectIntensity } from '../types';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
}

// コンフェッティ生成
export function useConfetti(intensity: EffectIntensity) {
  const [particles, setParticles] = useState<Particle[]>([]);

  const trigger = () => {
    const count = intensity === 'subtle' ? 20 : intensity === 'standard' ? 50 : 100;
    const newParticles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: Math.random() * window.innerWidth,
        y: -20,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 3 + 2,
        color: ['#FFD700', '#FF69B4', '#00CED1', '#FF6347', '#32CD32'][Math.floor(Math.random() * 5)],
        size: Math.random() * 8 + 4,
        life: 1,
      });
    }

    setParticles(newParticles);

    // アニメーション
    const animate = () => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.1, // 重力
            life: p.life - 0.01,
          }))
          .filter((p) => p.life > 0 && p.y < window.innerHeight)
      );
    };

    const interval = setInterval(animate, 16);
    setTimeout(() => {
      clearInterval(interval);
      setParticles([]);
    }, 3000);
  };

  return { particles, trigger };
}

// 画面シェイク
export function useScreenShake(intensity: EffectIntensity) {
  const [isShaking, setIsShaking] = useState(false);

  const trigger = () => {
    setIsShaking(true);
    const duration = intensity === 'subtle' ? 200 : intensity === 'standard' ? 400 : 600;

    setTimeout(() => {
      setIsShaking(false);
    }, duration);
  };

  const shakeStyle = isShaking
    ? {
        animation: `shake ${intensity === 'subtle' ? '0.2s' : intensity === 'standard' ? '0.4s' : '0.6s'}`,
      }
    : {};

  return { isShaking, trigger, shakeStyle };
}

// 破片パーティクル（不正解用）
export function useDebrisParticles(intensity: EffectIntensity) {
  const [particles, setParticles] = useState<Particle[]>([]);

  const trigger = (x: number, y: number) => {
    const count = intensity === 'subtle' ? 10 : intensity === 'standard' ? 20 : 40;
    const newParticles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = Math.random() * 3 + 2;

      newParticles.push({
        id: Date.now() + i,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: ['#FF4444', '#CC0000', '#990000'][Math.floor(Math.random() * 3)],
        size: Math.random() * 6 + 3,
        life: 1,
      });
    }

    setParticles(newParticles);

    const animate = () => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.15,
            life: p.life - 0.02,
          }))
          .filter((p) => p.life > 0)
      );
    };

    const interval = setInterval(animate, 16);
    setTimeout(() => {
      clearInterval(interval);
      setParticles([]);
    }, 2000);
  };

  return { particles, trigger };
}

// フラッシュエフェクト
export function useFlashEffect() {
  const [isFlashing, setIsFlashing] = useState(false);
  const [flashColor, setFlashColor] = useState('');

  const trigger = (color: string) => {
    setFlashColor(color);
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 300);
  };

  return { isFlashing, flashColor, trigger };
}
