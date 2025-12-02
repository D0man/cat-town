//GameLayouts.tsx
import { Outlet, useNavigate } from 'react-router-dom';

export function GameLayout() {
    const navigate = useNavigate();

    return (
        <div className="h-screen flex flex-col">
            {/* Game header - always visible */}
            <header className="bg-gray-800 text-white p-4">
                <nav className="flex gap-4">
                    <button onClick={() => navigate('/game')}>Main</button>
                    <button onClick={() => navigate('/game/woodcutting')}>Woodcutting</button>
                    <button onClick={() => navigate('/game/mining')}>Mining</button>
                    <button onClick={() => navigate('/game/fishing')}>Fishing</button>
                    <button onClick={() => navigate('/game/inventory')}>Inventory</button>
                    <button onClick={() => navigate('/menu')}>Exit to Menu</button>
                </nav>
            </header>

            {/* Dynamic content area - changes based on route */}
            <main className="flex-1 overflow-auto p-4">
                <Outlet />
            </main>
        </div>
    );
}