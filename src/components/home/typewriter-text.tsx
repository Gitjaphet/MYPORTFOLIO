"use client";

import { useEffect, useRef, useState } from "react";

export function TypewriterText({
  text,
  speed = 45,
  pauseDuration = 2000,
  className,
}: {
  text: string;
  speed?: number;
  pauseDuration?: number;
  className?: string;
}) {
  const [displayed, setDisplayed] = useState("");
  const [isActive, setIsActive] = useState(true);

  const containerRef = useRef<HTMLSpanElement>(null);
  const isFirstPassRef = useRef(true);
  const indexRef = useRef(0);

  const tabVisibleRef = useRef(true);
  const inViewportRef = useRef(true);

  // Reset propre quand le texte change (changement de langue par ex.)
  useEffect(() => {
    indexRef.current = 0;
    isFirstPassRef.current = true;
    setDisplayed("");
  }, [text]);

  // Détection onglet actif + élément visible à l'écran
  useEffect(() => {
    tabVisibleRef.current = !document.hidden;

    const updateActive = () => {
      const next = tabVisibleRef.current && inViewportRef.current;
      setIsActive(next);
    };

    const onVisibilityChange = () => {
      tabVisibleRef.current = !document.hidden;
      updateActive();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewportRef.current = entry.isIntersecting;
        updateActive();
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    updateActive();

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      observer.disconnect();
    };
  }, []);

  // Boucle de frappe : ne tourne que si isActive est true.
  // Reprend depuis indexRef.current, ne redémarre pas de zéro.
  useEffect(() => {
    if (!isActive) return;

    let typingInterval: ReturnType<typeof setInterval> | undefined;
    let pauseTimeout: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;

      indexRef.current += 1;
      setDisplayed(text.slice(0, indexRef.current));

      if (indexRef.current >= text.length) {
        clearInterval(typingInterval);
        isFirstPassRef.current = false;
        pauseTimeout = setTimeout(() => {
          if (cancelled) return;
          indexRef.current = 0;
          setDisplayed("");
          typingInterval = setInterval(tick, speed);
        }, pauseDuration);
      }
    };

    typingInterval = setInterval(tick, speed);

    return () => {
      cancelled = true;
      clearInterval(typingInterval);
      clearTimeout(pauseTimeout);
    };
  }, [isActive, text, speed, pauseDuration]);

  return (
    <span ref={containerRef} className={className}>
      {displayed}
      <span className="text-lime-400 animate-pulse">▍</span>
    </span>
  );
}