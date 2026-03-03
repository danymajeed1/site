// src/components/SmoothScroll.jsx
// ─────────────────────────────────────────────────────────────
//  RAF LERP SCROLL  —  "Apple / book-page" inertial feel
//
//  How it works:
//  • Outer div: position fixed, fills viewport, overflow hidden
//  • Inner div: translates via transform: translateY(-Y)
//  • Wheel + touch events feed a "target" Y
//  • RAF loop lerps currentY → targetY each frame (factor 0.085)
//  • IntersectionObserver / Framer whileInView still works because
//    elements physically move through the fixed viewport
//  • Route changes reset scroll to 0 instantly
// ─────────────────────────────────────────────────────────────

import { useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";

const LERP   = 0.085;   // Lower = more lag/butter. 0.1 is snappy, 0.06 is dreamy
const TOUCH_MULTIPLIER = 1.6;

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
function lerp(a, b, t)      { return a + (b - a) * t; }

export default function SmoothScroll({ children, onScroll }) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const location = useLocation();

  const state = useRef({
    current:    0,
    target:     0,
    rafId:      null,
    touchY:     0,
    running:    false,
  });

  // ── max scrollable height ──────────────────────────────────
  const maxScroll = useCallback(() => {
    if (!innerRef.current) return 0;
    return Math.max(0, innerRef.current.scrollHeight - window.innerHeight);
  }, []);

  // ── reset on route change ──────────────────────────────────
  useEffect(() => {
    const s = state.current;
    s.current = 0;
    s.target  = 0;
    if (innerRef.current) {
      innerRef.current.style.transform = "translateY(0px)";
    }
    onScroll?.(0);
  }, [location.pathname, onScroll]);

  // ── main scroll engine ─────────────────────────────────────
  useEffect(() => {
    const s = state.current;

    // Lock native browser scroll
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow            = "hidden";

    // ── WHEEL ─────────────────────────────────────────────
    const onWheel = (e) => {
      s.target = clamp(s.target + e.deltaY, 0, maxScroll());
    };

    // ── TOUCH ─────────────────────────────────────────────
    const onTouchStart = (e) => { s.touchY = e.touches[0].clientY; };
    const onTouchMove  = (e) => {
      const dy = s.touchY - e.touches[0].clientY;
      s.touchY = e.touches[0].clientY;
      s.target = clamp(s.target + dy * TOUCH_MULTIPLIER, 0, maxScroll());
    };

    // ── KEYBOARD (arrows, space, pgup/pgdn) ───────────────
    const onKeyDown = (e) => {
      const map = {
        ArrowDown:  80,
        ArrowUp:   -80,
        Space:      window.innerHeight * 0.85,
        PageDown:   window.innerHeight * 0.85,
        PageUp:    -window.innerHeight * 0.85,
        Home:      -Infinity,
        End:        Infinity,
      };
      if (map[e.key] !== undefined) {
        e.preventDefault();
        s.target = clamp(s.target + map[e.key], 0, maxScroll());
      }
    };

    // ── RAF LOOP ──────────────────────────────────────────
    const tick = () => {
      s.current = lerp(s.current, s.target, LERP);

      // snap to exact value when close enough to stop jitter
      if (Math.abs(s.target - s.current) < 0.08) s.current = s.target;

      if (innerRef.current) {
        innerRef.current.style.transform = `translateY(${-s.current}px)`;
      }

      onScroll?.(s.current);

      s.rafId = requestAnimationFrame(tick);
    };

    // ── RESIZE — clamp target if page gets shorter ────────
    const onResize = () => {
      s.target = clamp(s.target, 0, maxScroll());
    };

    window.addEventListener("wheel",      onWheel,      { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove",  onTouchMove,  { passive: true });
    window.addEventListener("keydown",    onKeyDown);
    window.addEventListener("resize",     onResize,     { passive: true });

    s.rafId = requestAnimationFrame(tick);
    s.running = true;

    return () => {
      cancelAnimationFrame(s.rafId);
      s.running = false;
      document.documentElement.style.overflow = "";
      document.body.style.overflow            = "";
      window.removeEventListener("wheel",      onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove",  onTouchMove);
      window.removeEventListener("keydown",    onKeyDown);
      window.removeEventListener("resize",     onResize);
    };
  }, [maxScroll, onScroll]);

  return (
    /* Outer: fixed viewport window */
    <div
      ref={outerRef}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      {/* Inner: the scrolling content */}
      <div
        ref={innerRef}
        style={{
          willChange: "transform",
          /* GPU layer — keeps compositing smooth */
          backfaceVisibility: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}
