import { useDrag, useDrop } from 'react-dnd';
import { ITEM_IMAGES } from './SortingGame';

interface SlotItemProps {
  item: string | null;
  shelfIndex: number;
  rowIndex: number;
  slotIndex: number;
  onShelfToShelfMove: (fromShelfIndex: number, fromSlotIndex: number, toShelfIndex: number, toSlotIndex: number) => void;
}

export function SlotItem({ item, shelfIndex, rowIndex, slotIndex, onShelfToShelfMove }: SlotItemProps) {
  const [{ isDragging }, drag] = useDrag({
    type: 'SHELF_ITEM',
    item: () => {
      if (!item) return null;
      return {
        id: `${shelfIndex}-${slotIndex}`,
        type: 'SHELF_ITEM',
        itemType: item,
        fromShelf: shelfIndex,
        fromSlot: slotIndex,
      };
    },
    canDrag: () => item !== null,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'SHELF_ITEM',
    drop: (dragItem: { fromShelf: number; fromSlot: number }) => {
      onShelfToShelfMove(dragItem.fromShelf, dragItem.fromSlot, shelfIndex, slotIndex);
    },
    canDrop: () => item === null,
    collect: (monitor) => ({
      isOver: monitor.isOver() && monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={(node) => { drag(drop(node)); }}
      className={`flex items-end justify-center w-full h-full transition-all ${
        item
          ? 'cursor-move'
          : ''
      } ${isDragging ? 'opacity-50' : ''} ${isOver ? 'bg-white/30 rounded' : ''}`}
    >
      {item && (
        <img
          src={ITEM_IMAGES[item]}
          alt={item}
          draggable={false}
          className={`object-contain object-bottom hover:scale-110 ${
            item === 'wormPastry' ? 'w-[72px] h-[72px]' :
            ['whipCreamCup', 'blueberryPastry'].includes(item) ? 'w-[60px] h-[60px]' : 'w-[50px] h-[50px]'
          }`}
        />
      )}
    </div>
  );
}
