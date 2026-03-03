// src/components/FlowBackground.js
import React, { useEffect, useRef } from "react";

const FlowBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });

    let width = 0;
    let height = 0;
    let lines = [];
    let t = 0;

    const isMobile = window.innerWidth < 768;
    const gap = isMobile ? 120 : 100;
    const step = isMobile ? 40 : 30;

    const resize = () => {
      // THE FIX: Retina Display scaling keeps lines 1px thin and perfectly crisp
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      lines = [];
      for (let y = 0; y < height + gap; y += gap) {
        lines.push({ baseY: y, offset: Math.random() * 10 });
      }
    };

    let raf = 0;
    const animate = () => {
      t += 0.005;

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);

      ctx.beginPath();
      // Made the lines a subtle, ghostly white
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;

      for (const line of lines) {
        ctx.moveTo(0, line.baseY);
        for (let x = 0; x <= width; x += step) {
          const y = line.baseY + Math.sin(x * 0.002 + t + line.offset) * 25;
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="flow-bg-wrapper" aria-hidden="true">
      <canvas ref={canvasRef} className="flow-bg-canvas" />
      <div className="piano-gloss-overlay" />
    </div>
  );
};

export default FlowBackground;