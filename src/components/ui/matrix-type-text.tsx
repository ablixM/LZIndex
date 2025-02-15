import { useState, useCallback, useEffect, useRef } from "react";

interface MatrixTypeTextProps {
  text: string;
  isActive: boolean;
  className?: string;
}

const CHARACTERS = "!<>-_\\/@#$%^&*()+=[]{}—=+";
const SCRAMBLE_DURATION = 1000; // Duration in milliseconds

export function MatrixTypeText({
  text,
  isActive,
  className = "",
}: MatrixTypeTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const animationRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | undefined>(undefined);

  const scrambleText = useCallback(
    (progress: number) => {
      const revealIndex = Math.floor(progress * text.length);

      return text
        .split("")
        .map((char, index) => {
          if (index <= revealIndex) return char;
          return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        })
        .join("");
    },
    [text]
  );

  const animate = useCallback(
    (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / SCRAMBLE_DURATION, 1);

      if (progress < 1) {
        setDisplayText(scrambleText(progress));
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(text);
      }
    },
    [text, scrambleText]
  );

  const startAnimation = useCallback(() => {
    if (isActive) return;

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    startTimeRef.current = undefined;
    animationRef.current = requestAnimationFrame(animate);
  }, [isActive, animate]);

  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setDisplayText(text);
  }, [text]);

  useEffect(() => {
    setDisplayText(text);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [text, isActive]);

  return (
    <span
      className={className}
      onMouseEnter={startAnimation}
      onMouseLeave={stopAnimation}
    >
      {isActive ? text : displayText}
    </span>
  );
}
