import React from 'react';

interface ParticleProps {
  particles: Array<{
    id: number;
    x: number;
    y: number;
    color: string;
    size: number;
    life: number;
  }>;
}

export const ParticleRenderer: React.FC<ParticleProps> = ({ particles }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1000,
      }}
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          style={{
            position: 'absolute',
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: '50%',
            opacity: particle.life,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  );
};
