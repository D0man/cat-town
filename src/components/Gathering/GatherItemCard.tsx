
import { GatherType } from '@/constants';

interface GatherItemCardProps {
    gather: GatherType;
}
export function GatherItemCard({ gather }: GatherItemCardProps) {

    return (
        <div className="wood-card">
            <img src={gather.image} alt={gather.name} />
            <h3>{gather.name}</h3>
            <p>Duration: {gather.duration / 1000}s</p>
            <p>XP: {gather.xpPerAction}</p>
            <p>Required Level: {gather.requiredLevel}</p>
        </div>
    );
};
