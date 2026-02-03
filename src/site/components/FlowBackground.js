import React, { useEffect, useRef } from 'react';

const FlowBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    // Performance boost: ignore transparency during rendering
    const ctx = canvas.getContext('2d', { alpha: false }); 
    let width, height, lines = [];
    let t = 0;
    
    const isMobile = window.innerWidth < 768;
    const gap = isMobile ? 120 : 100; // Fewer lines = less CPU load
    const step = isMobile ? 40 : 30; // Fewer points per line = smoother flow

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
      lines = [];
      for (let y = 0; y < height + gap; y += gap) {
        lines.push({ baseY: y, offset: Math.random() * 10 });
      }
    };

    const animate = () => {
      t += 0.005; 
      ctx.fillStyle = '#000'; // Pure black to kill the navy blue
      ctx.fillRect(0, 0, width, height);
      
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;

      lines.forEach((line) => {
        ctx.moveTo(0, line.baseY);
        for (let x = 0; x <= width; x += step) {
          // Optimized math for smoother GPU rendering
          const y = line.baseY + Math.sin(x * 0.002 + t + line.offset) * 25;
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();
      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => window.removeEventListener('resize', resize);
  }, []);

  return <canvas ref={canvasRef} className="flow-bg-canvas" style={{ background: '#000' }} />;
};

export default FlowBackground;