import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export default function useShutterNav() {
  const navigate = useNavigate();

  const shutterTo = useCallback((to) => {
    // add class to body to trigger shutter animation
    document.body.classList.add("shutter-on");

    // navigate after animation
    window.setTimeout(() => {
      navigate(to);
      // remove after route change
      window.setTimeout(() => document.body.classList.remove("shutter-on"), 50);
    }, 520);
  }, [navigate]);

  return { shutterTo };
}
