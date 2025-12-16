
import { GatherType } from '@/constants';

interface GatherItemCardProps {
    gather: GatherType;
    onClick: () => void
    isActive?: boolean
}
export function GatherItemCard({ gather, onClick, isActive = false }: GatherItemCardProps) {
    const activeClass = isActive ? 'pixeled-green-500' : 'pixeled-blue-500'

    return (
        <div className={`pixeled piexeled-border p-4 text-center cursor-pointer bg-gray-50 min-w-45 ${activeClass}`} onClick={onClick}>
            <img src={gather.image} alt={gather.name} className='max-w-24 m-auto' />
            <h3>{gather.name}</h3>
            <p>Duration: {gather.duration / 1000}s</p>
            <p>XP: {gather.xpPerAction}</p>
            <p>Required Level: {gather.requiredLevel}</p>
        </div>
    );
};
