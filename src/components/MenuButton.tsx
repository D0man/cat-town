//menuButton.tsx
interface MenuButtonProps {
    onClick?: () => void;
    className?: string;
    children: React.ReactNode;
}

export function MenuButton({ onClick, children }: MenuButtonProps) {
    return (
        <button
            onClick={onClick}
            className="text-5xl cursor-pointer hover:bg-blue-300 p-4 text-white"
        >
            {children}
        </button>
    );
}