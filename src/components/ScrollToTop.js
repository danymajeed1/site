// src/components/ScrollToTop.js
import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // 1. Temporarily override the CSS to force instant behavior
    document.documentElement.style.scrollBehavior = "auto";
    
    // 2. Instantly snap to the top
    window.scrollTo(0, 0);

    // 3. Restore the smooth scrolling CSS a tiny fraction of a second later
    const restoreSmoothScroll = setTimeout(() => {
      document.documentElement.style.scrollBehavior = "smooth";
    }, 10);

    // Cleanup the timer just in case
    return () => clearTimeout(restoreSmoothScroll);
  }, [pathname]);

  return null;
}