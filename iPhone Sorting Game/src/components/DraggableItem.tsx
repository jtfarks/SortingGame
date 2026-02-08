import { useDrag } from 'react-dnd';
import { TrayItem } from './SortingGame';
import { motion } from 'motion/react';

interface DraggableItemProps {
  item: TrayItem;
}

export function DraggableItem({ item }: DraggableItemProps) {
  const [{ isDragging }, drag] = useDrag({
    type: 'TRAY_ITEM',
    item: { id: item.id, type: 'TRAY_ITEM', itemType: item.type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <motion.div
      ref={drag}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className={`w-full aspect-square bg-gradient-to-br from-purple-200 to-pink-200 rounded-xl flex items-center justify-center text-3xl shadow-md cursor-move hover:scale-110 transition-transform ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      {item.type}
    </motion.div>
  );
}
