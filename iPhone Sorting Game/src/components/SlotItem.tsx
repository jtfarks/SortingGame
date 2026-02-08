import { useDrag } from 'react-dnd';
import { ITEM_IMAGES } from './SortingGame';

interface SlotItemProps {
  item: string | null;
  shelfIndex: number;
  rowIndex: number;
  slotIndex: number;
}

export function SlotItem({ item, shelfIndex, rowIndex, slotIndex }: SlotItemProps) {
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

  return (
    <div
      ref={drag}
      className={`flex items-end justify-center w-full h-full transition-all ${
        item
          ? 'cursor-move'
          : ''
      } ${isDragging ? 'opacity-50' : ''}`}
    >
      {item && (
        <img
          src={ITEM_IMAGES[item]}
          alt={item}
          draggable={false}
          className="w-10 h-10 object-contain hover:scale-110"
        />
      )}
    </div>
  );
}