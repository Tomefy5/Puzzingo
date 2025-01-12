import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

export default function DropPuzzleArea({onDrop}) {
    const [{isOver}, dropRef] = useDrop(() => ({
      accept: ItemTypes.PUZZING,
      drop: (item) => onDrop(item),
      collect: (monitor) => ({
        isOver: !!monitor.isOver()
      })
    }))
  return (
    <div ref={dropRef} className={`shadow-slate-600 ${isOver ? 'shadow-slate-400' : ''} duration-200 p-4 w-full min-w-[300px] max-w-[600px] mx-auto rounded h-[60%] min-h-[300px] shadow-around`}>
      
    </div>
  );
}
