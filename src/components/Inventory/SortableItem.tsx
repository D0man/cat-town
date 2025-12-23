import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { UniqueIdentifier } from './types';
import { PureItem } from './PureItem';
import { ITEMS } from '@/constants';


interface SortableItemProps {
    id: UniqueIdentifier;
    amount: number;
    filter?: string;
    itemId: string;
}

export function SortableItem({ id, filter, amount, itemId }: SortableItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        zIndex: isDragging ? 100 : 'auto',
    };
    const itemValues = ITEMS[itemId]
    console.log(ITEMS, "itemid:" + itemId)
    const content = itemValues?.description || "no content"
    const image = itemValues?.imgsrc || "Pine"
    const price = itemValues?.price || 0

    const isFiltered = filter ? content.toLowerCase().includes(filter?.toLowerCase()) : false
    const itemStyle = isFiltered ? "border-green-200" : "border-slate-200"
    return (
        <div
            {...attributes}
            {...listeners}
            ref={setNodeRef}
            style={style}
            className={`
         relative border ${itemStyle} w-12 h-12 
        hover:border-indigo-300 transition-all cursor-default
        ${isDragging ? 'ring-2 ring-indigo-500 shadow-xl opacity-50 z-50' : 'opacity-100'}
      `}
        >
            <PureItem amount={amount} description={content} imgsrc={image} price={price} />
        </div>
    );
}
