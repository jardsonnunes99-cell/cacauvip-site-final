import { useEffect, useRef } from 'react';

interface ConfettiProps {
  active: boolean;
  config?: {
    angle?: number;
    spread?: number;
    startVelocity?: number;
    elementCount?: number;
    duration?: number;
  };
}

export const Confetti = ({ active, config = {} }: ConfettiProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const {
      angle = 90,
      spread = 45,
      startVelocity = 45,
      elementCount = 50,
      duration = 3000
    } = config;

    // Particle system
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      decay: number;
      color: string;
      size: number;
    }> = [];

    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57'];

    // Create particles
    for (let i = 0; i < elementCount; i++) {
      const angleRad = (angle + (Math.random() - 0.5) * spread) * Math.PI / 180;
      const velocity = startVelocity * (0.75 + Math.random() * 0.5);
      
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: Math.cos(angleRad) * velocity * (Math.random() - 0.5) * 2,
        vy: Math.sin(angleRad) * velocity * (Math.random() - 0.5) * 2,
        life: 1,
        decay: 0.02 + Math.random() * 0.02,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 3 + Math.random() * 5
      });
    }

    let animationId: number;
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;

      if (elapsed > duration) {
        canvas.style.display = 'none';
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Update physics
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.3; // gravity
        particle.vx *= 0.99; // air resistance
        particle.life -= particle.decay;

        // Draw particle
        if (particle.life > 0) {
          ctx.save();
          ctx.globalAlpha = particle.life;
          ctx.fillStyle = particle.color;
          ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
          ctx.restore();
        } else {
          particles.splice(index, 1);
        }
      });

      if (particles.length > 0) {
        animationId = requestAnimationFrame(animate);
      } else {
        canvas.style.display = 'none';
      }
    };

    canvas.style.display = 'block';
    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [active, config]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ display: 'none' }}
    />
  );
};