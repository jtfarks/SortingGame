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

  // Percentages of the full screen height where each shelf surface sits in
  // the background image.  Rows use translateY(-100%) so their bottom edge
  // aligns with these values — items sit on the shelf automatically.
  const SHELF_SURFACES = ['44.7%', '58.75%', '68.5%', '81.7%'];

  return (
    <div className="absolute inset-0">
      {rows.map((rowShelves, rowIndex) => (
        <div
          key={rowIndex}
          className="absolute flex justify-between"
          style={{ top: SHELF_SURFACES[rowIndex], transform: 'translateY(-100%)', left: '8%', right: '8%', gap: '6%' }}
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