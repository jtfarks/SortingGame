import { motion } from 'motion/react';
import timesUpBg from '../assets/times-up-background.png';
import tryAgainBtn from '../assets/try-again-button.png';
import youWonBg from '../assets/You Won 2.png';

interface GameOverModalProps {
  won: boolean;
  score: number;
  level: number;
  stats: {
    highScore: number;
    gamesPlayed: number;
    dailyStreak: number;
  };
  onRestart: () => void;
}

export function GameOverModal({ won, score, level, stats, onRestart }: GameOverModalProps) {
  if (!won) {
    return (
      <div className="absolute inset-0 z-50 flex flex-col">
        <img
          src={timesUpBg}
          alt="Time's Up!"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative flex-1 flex flex-col justify-end items-center -mb-6">
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
            onClick={onRestart}
            className="hover:scale-105 active:scale-95 transition-transform"
          >
            <img
              src={tryAgainBtn}
              alt="Try Again"
              className="w-64"
            />
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-50 flex flex-col">
      <img
        src={youWonBg}
        alt="You Won!"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}
