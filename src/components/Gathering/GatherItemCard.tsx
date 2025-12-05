
import { GatherType } from '@/constants';

interface GatherItemCardProps {
    gather: GatherType;
    onClick: () => void
}
export function GatherItemCard({ gather, onClick }: GatherItemCardProps) {

    return (
        <div className="pixeled piexeled-border pixeled-blue-500 p-4 text-center cursor-pointer bg-gray-50 min-w-45" onClick={onClick}>
            <img src={gather.image} alt={gather.name} className='max-w-24 m-auto' />
            <h3>{gather.name}</h3>
            <p>Duration: {gather.duration / 1000}s</p>
            <p>XP: {gather.xpPerAction}</p>
            <p>Required Level: {gather.requiredLevel}</p>
        </div>
    );
};
