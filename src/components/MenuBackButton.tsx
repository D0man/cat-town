//menuBackButton.tsx
import { useNavigate } from 'react-router-dom';

export function MenuBackButton() {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate('/')}
            aria-label="Go back to main menu"
            style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                height="2rem"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
            >
                <polyline points="15 18 9 12 15 6" />
            </svg>
        </button>
    );
}