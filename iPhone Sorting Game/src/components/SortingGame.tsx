import { useState, useEffect } from 'react';
import { GameBoard } from './GameBoard';
import { GameHeader } from './GameHeader';
import { GameOverModal } from './GameOverModal';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';

import cherryImg from '../assets/fruits/Cherry.png';
import blueberryPastryImg from '../assets/fruits/Blueberry pastry.png';
import lollypopImg from '../assets/fruits/Lollypop.png';
import doughnutImg from '../assets/fruits/doughnut.png';
import heartImg from '../assets/fruits/heart.png';
import eggSandwichImg from '../assets/fruits/egg sandwhich.png';
import gingerBreadManImg from '../assets/fruits/ginger bread man.png';
import raindeerCakeImg from '../assets/fruits/Raindeer cake.png';
import wormPastryImg from '../assets/fruits/worm pastry.png';
import whipCreamCupImg from '../assets/fruits/Whip cream cup.png';
import coffeCupAssetImg from '../assets/fruits/coffe cup asset.png';
import coffeeCupImg from '../assets/fruits/Coffee cup_.png';

export type ItemType = string;

export interface ShelfSlot {
  item: ItemType | null;
}

interface GameStats {
  highScore: number;
  gamesPlayed: number;
  dailyStreak: number;
  lastPlayedDate: string;
}

export const ITEM_IMAGES: Record<string, string> = {
  cherry: cherryImg,
  blueberryPastry: blueberryPastryImg,
  lollypop: lollypopImg,
  doughnut: doughnutImg,
  heart: heartImg,
  eggSandwich: eggSandwichImg,
  gingerBreadMan: gingerBreadManImg,
  raindeerCake: raindeerCakeImg,
  wormPastry: wormPastryImg,
  whipCreamCup: whipCreamCupImg,
  coffeCupAsset: coffeCupAssetImg,
  coffeeCup: coffeeCupImg,
};

const ITEM_TYPES = Object.keys(ITEM_IMAGES);

const LEVEL_CONFIG = [
  { level: 1, itemTypes: 9, time: 120 },
  { level: 2, itemTypes: 9, time: 100 },
  { level: 3, itemTypes: 9, time: 90 },
  { level: 4, itemTypes: 9, time: 80 },
  { level: 5, itemTypes: 9, time: 70 },
];

export function SortingGame() {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shelves, setShelves] = useState<ShelfSlot[][]>(
    Array(12).fill(null).map(() => Array(3).fill({ item: null }))
  );
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [stats, setStats] = useState<GameStats>({
    highScore: 0,
    gamesPlayed: 0,
    dailyStreak: 0,
    lastPlayedDate: '',
  });

  // Load stats from localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem('sortingGameStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  // Update daily streak
  const updateDailyStreak = () => {
    const today = new Date().toDateString();
    const lastPlayed = new Date(stats.lastPlayedDate).toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    let newStreak = stats.dailyStreak;
    
    if (lastPlayed !== today) {
      if (lastPlayed === yesterday) {
        newStreak = stats.dailyStreak + 1;
      } else if (stats.lastPlayedDate) {
        newStreak = 1;
      } else {
        newStreak = 1;
      }
    }

    return { newStreak, today };
  };

  // Initialize game
  const initializeGame = (levelNum: number) => {
    const config = LEVEL_CONFIG[Math.min(levelNum - 1, LEVEL_CONFIG.length - 1)];

    // Fisher-Yates shuffle to randomly pick item types
    const shuffledTypes = [...ITEM_TYPES];
    for (let i = shuffledTypes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledTypes[i], shuffledTypes[j]] = [shuffledTypes[j], shuffledTypes[i]];
    }
    const selectedTypes = shuffledTypes.slice(0, config.itemTypes);

    // Generate items: 3 of each selected type
    const items: (ItemType | null)[] = [];
    selectedTypes.forEach(type => {
      for (let i = 0; i < 3; i++) items.push(type);
    });

    // Pad with nulls to fill all 36 slots
    while (items.length < 36) items.push(null);

    // Shuffle all slots (items + empties) using Fisher-Yates
    // Repeat until no shelf starts as a triple
    let newShelves: ShelfSlot[][];
    do {
      for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
      }
      newShelves = [];
      for (let i = 0; i < 12; i++) {
        newShelves.push([
          { item: items[i * 3] },
          { item: items[i * 3 + 1] },
          { item: items[i * 3 + 2] },
        ]);
      }
    } while (
      newShelves.some(shelf => {
        const filled = shelf.filter(s => s.item !== null);
        return filled.length === 3
          && filled[0].item === filled[1].item
          && filled[1].item === filled[2].item;
      })
    );

    setShelves(newShelves);
    setTimeLeft(config.time);
    setScore(0);
    setGameOver(false);
    setWon(false);
    setIsPlaying(true);
  };

  // Start game
  const startGame = () => {
    setLevel(1);
    initializeGame(1);
  };

  // Timer
  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) {
      if (timeLeft <= 0 && isPlaying) {
        handleGameOver(false);
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  // Check for win condition
  useEffect(() => {
    if (isPlaying) {
      const allShelvesEmpty = shelves.every(shelf => 
        shelf.every(slot => slot.item === null)
      );
      
      if (allShelvesEmpty) {
        handleLevelComplete();
      }
    }
  }, [shelves, isPlaying]);

  const handleLevelComplete = () => {
    if (level < LEVEL_CONFIG.length) {
      setLevel(prev => prev + 1);
      initializeGame(level + 1);
    } else {
      handleGameOver(true);
    }
  };

  const handleGameOver = (isWin: boolean) => {
    setIsPlaying(false);
    setGameOver(true);
    setWon(isWin);

    const { newStreak, today } = updateDailyStreak();
    const newStats = {
      highScore: Math.max(stats.highScore, score),
      gamesPlayed: stats.gamesPlayed + 1,
      dailyStreak: newStreak,
      lastPlayedDate: today,
    };

    setStats(newStats);
    localStorage.setItem('sortingGameStats', JSON.stringify(newStats));
  };

  const checkForTriples = (currentShelves: ShelfSlot[][], changedShelfIndex: number) => {
    const shelf = currentShelves[changedShelfIndex];
    const items = shelf.map(slot => slot.item).filter(Boolean);
    
    if (items.length === 3) {
      // Check if all three are the same
      if (items[0] === items[1] && items[1] === items[2]) {
        // Clear the shelf with animation delay
        setTimeout(() => {
          setShelves(prev => 
            prev.map((s, i) => {
              if (i === changedShelfIndex) {
                return Array(3).fill(null).map(() => ({ item: null }));
              }
              return s;
            })
          );
          setScore(prev => prev + 1);
        }, 300);
      }
    }
  };

  const moveItemFromShelfToShelf = (fromShelfIndex: number, fromSlotIndex: number, toShelfIndex: number, toSlotIndex: number) => {
    const item = shelves[fromShelfIndex][fromSlotIndex].item;

    if (!item) return;
    if (fromShelfIndex === toShelfIndex && fromSlotIndex === toSlotIndex) return;
    if (shelves[toShelfIndex][toSlotIndex].item !== null) return; // Target slot occupied

    const newShelves = shelves.map((shelf, shelfIdx) => {
      const isFrom = shelfIdx === fromShelfIndex;
      const isTo = shelfIdx === toShelfIndex;
      if (!isFrom && !isTo) return shelf;
      return shelf.map((slot, slotIdx) => {
        if (isFrom && slotIdx === fromSlotIndex) return { item: null };
        if (isTo && slotIdx === toSlotIndex) return { item };
        return slot;
      });
    });

    setShelves(newShelves);
    checkForTriples(newShelves, toShelfIndex);
  };

  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <div className="min-h-screen w-full max-w-md mx-auto relative flex flex-col">
        <div className="absolute left-0 right-0 z-20 px-4" style={{ top: '20vh' }}>
          <GameHeader
            score={score}
            timeLeft={timeLeft}
            level={level}
            isPlaying={isPlaying}
            totalMatches={LEVEL_CONFIG[Math.min(level - 1, LEVEL_CONFIG.length - 1)].itemTypes}
          />
        </div>

        {!isPlaying && !gameOver && (
          <div className="relative z-10 flex-1 flex items-center justify-center">
            <button
              onClick={startGame}
              className="bg-white text-purple-600 px-8 py-4 rounded-2xl text-xl font-bold shadow-lg hover:scale-105 transition-transform"
            >
              Start Game
            </button>
          </div>
        )}

        {isPlaying && (
          <div className="relative flex-1">
            <GameBoard
              shelves={shelves}
              onShelfToShelfMove={moveItemFromShelfToShelf}
            />
          </div>
        )}

        {gameOver && (
          <GameOverModal
            won={won}
            score={score}
            level={level}
            stats={stats}
            onRestart={startGame}
          />
        )}
      </div>
    </DndProvider>
  );
}