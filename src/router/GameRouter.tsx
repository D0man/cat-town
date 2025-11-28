import { Routes, Route } from 'react-router-dom';
import { GameLayout } from '../layouts/GameLayout';
import { GameMain } from '../pages/game/GameMain'
import { Woodcutting } from '../pages/game/Woodcutting';

export function GameRouter() {
    return (
        <Routes>
            <Route path="/" element={<GameLayout />}>
                <Route index element={<GameMain />} />
                <Route path="woodcutting" element={<Woodcutting />} />
            </Route>
        </Routes>
    );
}
