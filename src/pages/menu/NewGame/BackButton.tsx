import { MenuBackButton } from "@components/MenuBackButton"

export function BackButton() {
    return (
        <div className='flex items-center'>
            <MenuBackButton />
            <h2 className="text-2xl font-bold pb-1 m-auto">Create New Game</h2>
        </div>
    )
}

