import { TrayItem } from './SortingGame';
import { DraggableItem } from './DraggableItem';

interface ItemTrayProps {
  items: TrayItem[];
}

export function ItemTray({ items }: ItemTrayProps) {
  const visibleItems = items.filter(item => !item.isHidden);
  const hiddenCount = items.filter(item => item.isHidden).length;

  return (
    <div className="bg-white/90 backdrop-blur rounded-3xl p-4 shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-gray-700">Item Tray</span>
        <span className="text-sm text-gray-600">
          {items.length} items {hiddenCount > 0 && `(${hiddenCount} hidden)`}
        </span>
      </div>
      <div className="grid grid-cols-6 gap-2 min-h-[120px]">
        {visibleItems.map((item) => (
          <DraggableItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
