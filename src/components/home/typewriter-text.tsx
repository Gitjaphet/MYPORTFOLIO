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
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isFirstPassRef = useRef(true);
  const indexRef = useRef(0);

  const tabVisibleRef = useRef(true);
  const inViewportRef = useRef(true);

  const playTick = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;
      const now = ctx.currentTime;

      const bufferSize = ctx.sampleRate * 0.03;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
      }

      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = "bandpass";
      bandpass.frequency.value = 2200 + Math.random() * 800;
      bandpass.Q.value = 1.2;

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.5, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      noise.connect(bandpass);
      bandpass.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(now);
      noise.stop(now + 0.04);

      const thump = ctx.createOscillator();
      thump.type = "sine";
      thump.frequency.setValueAtTime(140, now);
      thump.frequency.exponentialRampToValueAtTime(60, now + 0.05);

      const thumpGain = ctx.createGain();
      thumpGain.gain.setValueAtTime(0.15, now);
      thumpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      thump.connect(thumpGain);
      thumpGain.connect(ctx.destination);
      thump.start(now);
      thump.stop(now + 0.05);
    } catch {
      // ignore : politique autoplay du navigateur, pas critique
    }
  };

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

      // Coupe/reprend le contexte audio en même temps, pour éviter
      // qu'un son parte juste après un retour d'onglet.
      if (audioCtxRef.current) {
        if (next) audioCtxRef.current.resume().catch(() => {});
        else audioCtxRef.current.suspend().catch(() => {});
      }
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

      if (
        isFirstPassRef.current &&
        text[indexRef.current - 1] &&
        text[indexRef.current - 1] !== " "
      ) {
        playTick();
      }

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