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
  { level: 1, itemTypes: 12, time: 120 },
  { level: 2, itemTypes: 12, time: 100 },
  { level: 3, itemTypes: 12, time: 90 },
  { level: 4, itemTypes: 12, time: 80 },
  { level: 5, itemTypes: 12, time: 70 },
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
    const selectedTypes = ITEM_TYPES.slice(0, config.itemTypes);
    
    // Generate exactly 36 items (12 types × 3 of each)
    const items: ItemType[] = [];
    selectedTypes.forEach(type => {
      for (let i = 0; i < 3; i++) {
        items.push(type);
      }
    });

    // Shuffle items
    const shuffled = items.sort(() => Math.random() - 0.5);
    
    // Convert to shelf structure (12 shelves × 3 slots)
    const newShelves: ShelfSlot[][] = [];
    for (let i = 0; i < 12; i++) {
      const shelfSlots: ShelfSlot[] = [];
      for (let j = 0; j < 3; j++) {
        const slotIndex = i * 3 + j;
        shelfSlots.push({ item: shuffled[slotIndex] });
      }
      newShelves.push(shelfSlots);
    }

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

  const moveItemFromShelfToShelf = (fromShelfIndex: number, fromSlotIndex: number, toShelfIndex: number) => {
    const fromShelf = shelves[fromShelfIndex];
    const toShelf = shelves[toShelfIndex];
    const item = fromShelf[fromSlotIndex].item;
    
    if (!item) return;

    const emptySlotIndex = toShelf.findIndex(slot => slot.item === null);
    if (emptySlotIndex === -1) return; // Target shelf full

    const newShelves = shelves.map((shelf, shelfIdx) => {
      if (shelfIdx === fromShelfIndex) {
        return shelf.map((slot, slotIdx) => {
          if (slotIdx === fromSlotIndex) {
            return { item: null };
          }
          return slot;
        });
      }
      if (shelfIdx === toShelfIndex) {
        return shelf.map((slot, slotIdx) => {
          if (slotIdx === emptySlotIndex) {
            return { item };
          }
          return slot;
        });
      }
      return shelf;
    });

    setShelves(newShelves);
    checkForTriples(newShelves, toShelfIndex);
  };

  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <div className="min-h-screen w-full max-w-md mx-auto relative flex flex-col">
        <div className="relative z-10 p-4 pt-safe">
          <GameHeader
            score={score}
            timeLeft={timeLeft}
            level={level}
            isPlaying={isPlaying}
            stats={stats}
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