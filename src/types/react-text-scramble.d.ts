declare module "@dilrukr/react-text-scramble" {
  interface TextScrambleProps {
    texts: string[];
    letterSpeed?: number;
    nextLetterSpeed?: number;
    pauseTime?: number;
    steps?: number;
    step?: number;
    scrambleSlice?: string;
  }

  export const TextScramble: React.FC<TextScrambleProps>;
}
