import { Routes, Route } from 'react-router-dom';
import { MainMenu } from '../pages/menu/MainMenu'
import { Settings } from '../pages/menu/Settings';
import { UserRegistration } from '../components/UserRegistration';

export function MenuRouter() {
    return (
        <Routes>
            <Route path="/" element={<MainMenu />} />
            <Route path="/new" element={<UserRegistration />} />
            <Route path="/settings" element={<Settings />} />
        </Routes>
    );
}
