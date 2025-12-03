//index.tsx
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MenuRouter } from './MenuRouter';
import { GameRouter } from './GameRouter';
import { NotFound } from '@pages/Notfound';
import { ProtectedRoute } from '@components/ProtectedRoute'
export function AppRouter() {
    return (
        <HashRouter>
            <Routes>
                {/* Default redirect to menu */}
                <Route path="/" element={<Navigate to="/menu" replace />} />

                {/* Menu routes - all menu-related pages */}
                <Route path="/menu/*" element={<MenuRouter />} />

                {/* Game routes - all game-related pages */}
                <Route
                    element={<ProtectedRoute />}
                >
                    <Route path="/game/*" element={<GameRouter />} />
                </Route>
                <Route path="*" element={<NotFound />} />

            </Routes>
        </HashRouter>
    );
}