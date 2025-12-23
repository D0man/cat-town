import { useDroppable } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import { UniqueIdentifier, ItembyDb } from './types';

interface DroppableContainerProps {
    id: UniqueIdentifier;
    title: string;
    items: ItembyDb[];
    filter: string;
    isFirst: boolean;
    onRemoveContainer: (containerId: UniqueIdentifier) => void;
    addContainer: () => void
}

export function DroppableContainer({
    id,
    title,
    items,
    isFirst,
    filter,
    onRemoveContainer,
    addContainer
}: DroppableContainerProps) {
    const { setNodeRef, isOver } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            className={`
        flex flex-col w-full min-w-[300px] max-w-full h-65  bg-slate-100/50 
     border-2 transition-colors overflow-hidden
        ${isOver ? 'border-indigo-400 bg-indigo-50/40' : 'border-transparent'}
      `}
        >
            {/* Header */}
            <div className="p-4 flex justify-between items-center bg-white border-b border-slate-200">
                <h3 className="font-semibold text-slate-800 truncate">{title}</h3>
                <div className="flex items-center gap-1">
                    {isFirst ?
                        (
                            <button
                                onClick={() => addContainer()}
                                className="p-1.5 text-slate-400 hover:text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                                title="Delete container and move items to main"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>                            </button>
                        )

                        : (
                            <button
                                onClick={() => onRemoveContainer(id)}
                                className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete container and move items to main"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                            </button>
                        )}
                </div>
            </div>

            {/* Items List */}
            <div className="flex-1 p-3 overflow-y-auto ">
                <SortableContext items={items.map((i) => i.itemId)} strategy={rectSortingStrategy}>
                    <div className="overflow-hidden">
                        <div className="grid grid-cols-[repeat(auto-fill,3rem)] auto-rows-max">
                            {items.map((item) => {
                                console.log(item, 'item sortable')
                                return (
                                    <SortableItem
                                        key={item.itemId}
                                        id={item.itemId}
                                        itemId={item.itemId}
                                        filter={filter}
                                        amount={item.amount}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </SortableContext>
            </div>
        </div>
    );
}
