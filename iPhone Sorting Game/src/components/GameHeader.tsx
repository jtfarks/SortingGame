import { Trophy, Clock, Target, Flame } from 'lucide-react';

interface GameHeaderProps {
  score: number;
  timeLeft: number;
  level: number;
  isPlaying: boolean;
  stats: {
    highScore: number;
    dailyStreak: number;
  };
}

export function GameHeader({ score, timeLeft, level, isPlaying, stats }: GameHeaderProps) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="bg-white/90 backdrop-blur rounded-3xl p-4 mb-4 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-600" />
          <span className="font-bold text-lg">Level {level}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="font-bold">{stats.highScore}</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="font-bold">{stats.dailyStreak}</span>
          </div>
        </div>
      </div>

      {isPlaying && (
        <div className="flex items-center justify-between">
          <div className="bg-purple-100 px-4 py-2 rounded-xl">
            <span className="text-purple-800 font-bold text-xl">Score: {score}</span>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
            timeLeft < 20 ? 'bg-red-100 animate-pulse' : 'bg-blue-100'
          }`}>
            <Clock className={`w-5 h-5 ${timeLeft < 20 ? 'text-red-600' : 'text-blue-600'}`} />
            <span className={`font-bold text-lg ${timeLeft < 20 ? 'text-red-800' : 'text-blue-800'}`}>
              {minutes}:{seconds.toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
