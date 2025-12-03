import { useNavigate } from 'react-router-dom';

export function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="h-screen flex flex-col">

            <button onClick={() => navigate('/game')}>Main</button>

            <button onClick={() => navigate('/menu')}>Exit to Menu</button>

        </div>
    );
}