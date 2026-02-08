interface GameHeaderProps {
  score: number;
  timeLeft: number;
  level: number;
  isPlaying: boolean;
  totalMatches: number;
}

const font = { fontFamily: "'Architects Daughter', cursive" };

export function GameHeader({ score, timeLeft, level, isPlaying, totalMatches }: GameHeaderProps) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-start justify-between" style={font}>
      {/* Level */}
      <div className="bg-[#f0ebe1] rounded-2xl px-4 py-1.5 border border-[#c4b9a8]">
        <span className="text-[#5c4f3d] text-base" style={font}>Level {level}</span>
      </div>

      {/* Timer */}
      <div className="bg-[#f0ebe1] rounded-2xl px-5 py-1.5 border border-[#c4b9a8]">
        <span className={`text-lg tracking-wider ${
          timeLeft < 20 && isPlaying ? 'text-red-700 animate-pulse' : 'text-[#5c4f3d]'
        }`} style={font}>
          {minutes}:{seconds.toString().padStart(2, '0')}
        </span>
      </div>

      {/* Matched */}
      <div className="bg-[#f0ebe1] rounded-2xl px-4 py-1.5 border border-[#c4b9a8] flex items-center gap-1.5">
        <span className="text-[#5c4f3d] text-base" style={font}>Matched {score}/{totalMatches}</span>
      </div>
    </div>
  );
}
