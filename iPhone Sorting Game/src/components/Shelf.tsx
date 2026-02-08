import { useDrop } from 'react-dnd';
import { ShelfSlot } from './SortingGame';
import { SlotItem } from './SlotItem';

interface ShelfProps {
  shelfIndex: number;
  rowIndex: number;
  slots: ShelfSlot[];
  onShelfToShelfMove: (fromShelfIndex: number, fromSlotIndex: number, toShelfIndex: number) => void;
}

export function Shelf({ shelfIndex, rowIndex, slots, onShelfToShelfMove }: ShelfProps) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'SHELF_ITEM',
    drop: (item: { id: string; type: string; fromShelf?: number; fromSlot?: number }) => {
      if (item.type === 'SHELF_ITEM' && item.fromShelf !== undefined && item.fromSlot !== undefined) {
        onShelfToShelfMove(item.fromShelf, item.fromSlot, shelfIndex);
      }
    },
    canDrop: () => {
      return slots.some(slot => slot.item === null);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isFull = slots.every(slot => slot.item !== null);
  const hasTriple = isFull && slots[0].item === slots[1].item && slots[1].item === slots[2].item;

  return (
    <div
      ref={drop}
      className="flex-1 transition-all"
    >
      <div className="grid grid-cols-3 h-16">
        {slots.map((slot, index) => (
          <SlotItem
            key={index}
            item={slot.item}
            shelfIndex={shelfIndex}
            rowIndex={rowIndex}
            slotIndex={index}
          />
        ))}
      </div>
    </div>
  );
}