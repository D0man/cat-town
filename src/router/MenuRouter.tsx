import { Routes, Route } from 'react-router-dom';
import { MainMenu } from '../pages/menu/MainMenu'
import { Settings } from '../pages/menu/Settings';
import { New } from '../pages/menu/NewGame';

export function MenuRouter() {
    return (
        <Routes>
            <Route path="/" element={<MainMenu />} />
            <Route path="/new" element={<New />} />
            <Route path="/settings" element={<Settings />} />
        </Routes>
    );
}
