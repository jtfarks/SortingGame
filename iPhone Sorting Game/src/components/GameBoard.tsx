import { ShelfSlot } from './SortingGame';
import { Shelf } from './Shelf';

interface GameBoardProps {
  shelves: ShelfSlot[][];
  onShelfToShelfMove: (fromShelfIndex: number, fromSlotIndex: number, toShelfIndex: number, toSlotIndex: number) => void;
}

export function GameBoard({ shelves, onShelfToShelfMove }: GameBoardProps) {
  // Arrange shelves in a 3x4 grid (3 columns, 4 rows) to match background
  const rows: ShelfSlot[][][] = [];
  for (let row = 0; row < 4; row++) {
    const rowShelves = shelves.slice(row * 3, row * 3 + 3);
    rows.push(rowShelves);
  }

  // Each row is absolutely positioned so its bottom edge aligns with the
  // shelf surface in the background image.  Adjust these percentages to
  // move rows up/down on the shelves.
  const ROW_TOPS = ['22%', '39.5%', '52%', '67.75%'];

  return (
    <div className="absolute inset-0">
      {rows.map((rowShelves, rowIndex) => (
        <div
          key={rowIndex}
          className="absolute flex justify-between"
          style={{ top: ROW_TOPS[rowIndex], left: '8%', right: '8%', gap: '6%' }}
        >
          {rowShelves.map((shelf, colIndex) => {
            const shelfIndex = rowIndex * 3 + colIndex;
            return (
              <Shelf
                key={shelfIndex}
                shelfIndex={shelfIndex}
                rowIndex={rowIndex}
                slots={shelf}
                onShelfToShelfMove={onShelfToShelfMove}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}