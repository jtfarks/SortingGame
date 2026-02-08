import { ShelfSlot } from './SortingGame';
import { SlotItem } from './SlotItem';

interface ShelfProps {
  shelfIndex: number;
  rowIndex: number;
  slots: ShelfSlot[];
  onShelfToShelfMove: (fromShelfIndex: number, fromSlotIndex: number, toShelfIndex: number, toSlotIndex: number) => void;
}

export function Shelf({ shelfIndex, rowIndex, slots, onShelfToShelfMove }: ShelfProps) {
  return (
    <div className="flex-1 transition-all">
      <div className="grid grid-cols-3 h-16">
        {slots.map((slot, index) => (
          <SlotItem
            key={index}
            item={slot.item}
            shelfIndex={shelfIndex}
            rowIndex={rowIndex}
            slotIndex={index}
            onShelfToShelfMove={onShelfToShelfMove}
          />
        ))}
      </div>
    </div>
  );
}
