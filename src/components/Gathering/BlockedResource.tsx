import padlockImg from '@assets/skills/padlock.jpg';
interface BlockedResourceProps {
    requiredLevel: number
}

export function BlockedResource({ requiredLevel }: BlockedResourceProps) {
    return (
        <div className="pixeled piexeled-border pixeled-blue-500 p-4 text-center cursor-pointer bg-gray-50 min-w-45">
            <img src={padlockImg} alt="padlock" className='max-w-24 m-auto' />
            Next Level tree at{requiredLevel}
        </div>
    )
}
