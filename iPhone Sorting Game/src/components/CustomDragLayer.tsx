import { createPortal } from 'react-dom';
import { useDragLayer } from 'react-dnd';
import { ITEM_IMAGES } from './SortingGame';

export function CustomDragLayer() {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging(),
    item: monitor.getItem(),
    currentOffset: monitor.getClientOffset(),
  }));

  if (!isDragging || !item || !currentOffset) return null;

  const image = ITEM_IMAGES[item.itemType];
  if (!image) return null;

  const sizeClass =
    item.itemType === 'wormPastry' ? 'w-[72px] h-[72px]' :
    ['whipCreamCup', 'blueberryPastry'].includes(item.itemType) ? 'w-[60px] h-[60px]' :
    'w-[50px] h-[50px]';

  return createPortal(
    <div
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 100,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: currentOffset.x,
          top: currentOffset.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <img
          src={image}
          alt={item.itemType}
          className={`object-contain ${sizeClass}`}
        />
      </div>
    </div>,
    document.body,
  );
}
