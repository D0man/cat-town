//MainMenu.tsx
import { useNavigate } from 'react-router-dom';
import { MenuLayout } from '@layouts/MenuLayout';
import { MenuButton } from '@components/MenuButton';
import logo from "@assets/logo.png";
import { useUserStore } from '@stores/userStore'

export function MainMenuContent() {
    const { users, setCurrentUser } = useUserStore();

    const navigate = useNavigate();
    const handleCloseGame = async () => {
        try {
            // Check if running in Tauri
            if ('__TAURI__' in window) {
                const { exit } = await import('@tauri-apps/plugin-process');
                await exit(0);
            } else {
                // Running in web browser
                if (confirm('Close the game?')) {
                    window.close(); // May not work in all browsers
                    // If window.close() doesn't work, you could redirect or show a message
                    console.log('Please close the browser tab manually');
                }
            }
        } catch (error) {
            console.error('Failed to exit:', error);
        }
    };
    const handleContinue = () => {
        const mostRecent = users.sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )[0];
        setCurrentUser(mostRecent);
        navigate('/game');
    };

    return (
        <nav className="flex flex-col bg-blue-200 text-white pt-4 pb-10 w-lg m-auto h-full  justify-between">
            {users.length > 0 && <MenuButton onClick={handleContinue}>Contiue</MenuButton>}
            <MenuButton onClick={() => navigate('/menu/new')}>New Game</MenuButton>
            <MenuButton onClick={() => navigate('/menu/settings')}>Setting </MenuButton>
            <MenuButton onClick={handleCloseGame}>Exit</MenuButton>
        </nav>
    )
}

export function MainMenu() {
    return <MenuLayout imageSrc={logo}><MainMenuContent /></MenuLayout>
}