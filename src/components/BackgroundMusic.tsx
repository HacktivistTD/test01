"use client";

import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const audio = new Audio();
    audio.preload = "auto";
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    const handleCanPlay = () => setIsLoaded(true);
    const handleError = () => console.error("Audio failed to load");
    const handleLoadStart = () => {};

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("error", handleError);
    audio.addEventListener("loadstart", handleLoadStart);

    audio.src = "/music.mp3";
    audio.load();

    const attemptAutoplay = async () => {
      if (!audioRef.current || !isLoaded) return;

      try {
        await audioRef.current.play();
        let vol = 0;
        const fadeInterval = setInterval(() => {
          if (audioRef.current && vol < 0.5) {
            vol += 0.01;
            audioRef.current.volume = Math.min(vol, 0.5);
            if (vol >= 0.5) clearInterval(fadeInterval);
          }
        }, 100);
      } catch {
        const startMusic = async () => {
          if (!audioRef.current) return;
          try {
            await audioRef.current.play();
            let vol = 0;
            const fadeInterval = setInterval(() => {
              if (audioRef.current && vol < 0.5) {
                vol += 0.01;
                audioRef.current.volume = Math.min(vol, 0.5);
                if (vol >= 0.5) clearInterval(fadeInterval);
              }
            }, 100);
          } catch {}
          document.removeEventListener("click", startMusic);
          document.removeEventListener("touchstart", startMusic);
          document.removeEventListener("keydown", startMusic);
        };

        document.addEventListener("click", startMusic);
        document.addEventListener("touchstart", startMusic);
        document.addEventListener("keydown", startMusic);
      }
    };

    if (isLoaded) attemptAutoplay();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("canplay", handleCanPlay);
        audioRef.current.removeEventListener("error", handleError);
        audioRef.current.removeEventListener("loadstart", handleLoadStart);
        audioRef.current = null;
      }
    };
  }, [isLoaded]);

  return null; // No UI display
}
