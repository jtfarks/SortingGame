import { Trophy, Star, Flame } from 'lucide-react';
import { motion } from 'motion/react';
import timesUpBg from '../assets/times-up-background.png';
import tryAgainBtn from '../assets/try-again-button.png';

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
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="text-6xl mb-4"
          >
            🎉
          </motion.div>
          <h2 className="text-3xl font-bold text-green-600 mb-2">Victory!</h2>
          <p className="text-gray-600 mb-4">You completed all levels!</p>

          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-8 h-8 text-yellow-500" />
              <span className="text-4xl font-bold text-purple-800">{score}</span>
            </div>
            <div className="text-sm text-gray-600 mb-2">Level {level} Reached</div>

            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-purple-200">
              <div className="text-center">
                <Trophy className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                <div className="text-xs text-gray-600">High Score</div>
                <div className="font-bold text-purple-800">{stats.highScore}</div>
              </div>
              <div className="text-center">
                <Flame className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                <div className="text-xs text-gray-600">Daily Streak</div>
                <div className="font-bold text-purple-800">{stats.dailyStreak}</div>
              </div>
              <div className="text-center">
                <Star className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                <div className="text-xs text-gray-600">Games</div>
                <div className="font-bold text-purple-800">{stats.gamesPlayed}</div>
              </div>
            </div>
          </div>

          <button
            onClick={onRestart}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-lg"
          >
            Play Again
          </button>
        </div>
      </motion.div>
    </div>
  );
}
