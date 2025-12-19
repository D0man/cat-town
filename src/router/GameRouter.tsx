//GameRouter.tsx
import { Routes, Route } from 'react-router-dom';
import { GameLayout } from '@layouts/GameLayout';
import { GameMain } from '@pages/game/GameMain'
import { Woodcutting } from '@pages/game/Woodcutting';
import { Mining } from "@pages/game/Mining"
import { Fishing } from "@pages/game/Fishing"
import { NotFound } from '@pages/Notfound';

export function GameRouter() {
    return (
        <Routes>
            <Route path="/" element={<GameLayout />}>
                <Route index element={<GameMain />} />
                <Route path="woodcutting" element={<Woodcutting />} />
                <Route path="mining" element={<Mining />} />
                <Route path="Fishing" element={<Fishing />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}
