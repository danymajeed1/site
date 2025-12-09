// src/components/FlowBackground.js
import React, { useEffect, useRef } from 'react';

const FlowBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;
    let lines = [];
    let mouse = { x: -1000, y: -1000 };
    let animationFrameId;
    
    // Check if Mobile
    const isMobile = window.innerWidth < 768;
    
    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
      
      const gap = isMobile ? 40 : 60; 

      lines = [];
      let index = 0; // We need the index to synchronize the waves
      
      for (let y = 0; y < height; y += gap) {
        lines.push({
          y: y,
          baseY: y,
          // 1. AMPLITUDE: Consistent height (no randomness) keeps them parallel
          amplitude: isMobile ? 25 : 20, 
          
          // 2. SPEED: CONSTANT speed. If they have different speeds, they will cross.
          speed: 0.001, 
          
          // 3. OFFSET: This is the secret. 
          // Instead of random, we shift each line slightly based on its index.
          // This makes them flow like a single sheet of fabric.
          offset: index * 0.5, 
          
          // 4. BRIGHTNESS: Dialed down to 0.25 on mobile (Subtle but visible)
          color: isMobile ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.15)' 
        });
        index++;
      }
    };

    const animate = (t) => {
      ctx.clearRect(0, 0, width, height);
      
      lines.forEach(line => {
        ctx.beginPath();
        ctx.strokeStyle = line.color;
        ctx.lineWidth = 1;

        for (let x = 0; x < width; x += 15) { 
          // 5. FREQUENCY (The "Curve")
          // 0.005 gives a gentle, long curve on mobile.
          const freq = isMobile ? 0.005 : 0.003; 
          
          // The Math: Constant Speed + Indexed Offset = Parallel Waves
          const wave = Math.sin(x * freq + t * line.speed + line.offset) * line.amplitude;
          
          let interaction = 0;
          
          // MOUSE LOGIC (Desktop Only)
          if (!isMobile) {
            const dx = x - mouse.x;
            const dy = line.baseY - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 200) {
              const force = (200 - dist) / 200;
              interaction = Math.sin(force * Math.PI) * 30;
              if (line.baseY < mouse.y) interaction *= -1;
            }
          }

          const y = line.baseY + wave + interaction;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      if (isMobile) return; 
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    }

    window.addEventListener('resize', resize);
    if(canvas.parentElement) {
      canvas.parentElement.addEventListener('mousemove', handleMouseMove);
      canvas.parentElement.addEventListener('mouseleave', handleMouseLeave);
    }
    
    setTimeout(resize, 100); 
    animate(0);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId); 
      if(canvas.parentElement) {
        canvas.parentElement.removeEventListener('mousemove', handleMouseMove);
        canvas.parentElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className="flow-bg-wrapper">
      <canvas ref={canvasRef} className="flow-bg-canvas" />
      <div className="piano-gloss-overlay"></div>
    </div>
  );
};

export default FlowBackground;