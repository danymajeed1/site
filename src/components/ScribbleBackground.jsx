// src/components/ScribbleBackground.jsx
import React from "react";
import "./ScribbleBackground.css";

export default function ScribbleBackground() {
  return (
    <div className="scribble" aria-hidden="true">
      <svg className="scribble__svg" viewBox="0 0 1200 700" preserveAspectRatio="none">
        <path className="scribble__p scribble__p--a" d="M-50,260 C120,120 260,420 420,260 C580,110 720,420 900,250 C1060,110 1170,380 1260,250" />
        <path className="scribble__p scribble__p--b" d="M-60,420 C140,300 260,520 430,410 C620,280 720,520 890,410 C1060,300 1180,480 1260,380" />
        <path className="scribble__p scribble__p--c" d="M-40,120 C120,260 280,80 440,170 C620,270 740,70 920,160 C1080,240 1180,90 1260,140" />
        <path className="scribble__p scribble__p--d" d="M-80,560 C120,450 280,640 460,540 C650,440 780,650 950,520 C1100,410 1180,600 1260,510" />
      </svg>
      <div className="scribble__glow" />
    </div>
  );
}
