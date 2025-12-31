'use client';
import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  decay: number;
  size: number;
}

export default function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: Particle[] = [];
    const colors = [
      '#FFD700', // Gold
      '#FFA500', // Orange
      '#FF6B6B', // Red
      '#4ECDC4', // Turquoise
      '#45B7D1', // Blue
      '#FFA07A', // Light Salmon
      '#98D8C8', // Mint
      '#FF69B4', // Hot Pink
      '#FFFF00', // Yellow
      '#00CED1', // Dark Turquoise
    ];

    const createFirework = (x: number, y: number) => {
      const particleCount = 80 + Math.random() * 70; // More particles
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
        const velocity = 3 + Math.random() * 7; // Faster particles
        
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          color,
          alpha: 1,
          decay: 0.008 + Math.random() * 0.006, // Last longer
          size: 3 + Math.random() * 4, // Bigger particles
        });
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Slower fade for more visible trails
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        // Update position
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1; // Gravity
        p.vx *= 0.99; // Air resistance
        p.alpha -= p.decay;

        // Remove dead particles
        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Draw particle with enhanced glow
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 30; // Much stronger glow
        ctx.shadowColor = p.color;
        
        // Draw multiple layers for brightness
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner bright core
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = p.alpha * 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    let animationFrameId = requestAnimationFrame(animate);

    // Launch fireworks at intervals
    const launchFirework = () => {
      const x = canvas.width * (0.2 + Math.random() * 0.6);
      const y = canvas.height * (0.2 + Math.random() * 0.4);
      createFirework(x, y);
    };

    // Initial burst of fireworks
    for (let i = 0; i < 3; i++) {
      setTimeout(() => launchFirework(), i * 300);
    }

    // Random fireworks
    const fireworkInterval = setInterval(() => {
      if (Math.random() > 0.3) {
        launchFirework();
      }
    }, 1000);

    // Click to create fireworks
    const handleClick = (e: MouseEvent) => {
      createFirework(e.clientX, e.clientY);
    };
    canvas.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
      clearInterval(fireworkInterval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-auto z-[5]"
      style={{ opacity: 0.95 }}
    />
  );
}

