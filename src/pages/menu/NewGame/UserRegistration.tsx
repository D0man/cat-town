//UserRegistration.tsx
import { useState, FormEvent } from 'react';
import { useUserStore } from '../../../stores/userStore';
import { GenderSelector } from './GenderSelector';
import { useNavigate } from 'react-router-dom';

export function UserRegistration() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { addUser, setCurrentUser } = useUserStore();
    const [gender, setGender] = useState<'male' | 'female'>('male');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmed = name.trim();

        // Validate name
        if (!trimmed) {
            alert('Please enter a name');
            return;
        }
        if (trimmed.length < 3) {
            alert('Please use at least 3 letters');
            return;
        }

        setIsSubmitting(true);

        try {
            // Add user to database
            const newUser = await addUser(name.trim(), gender);

            // Auto-login the new user
            setCurrentUser(newUser);

            // Clear form
            setName('');
            navigate('/game');
        } catch (error) {
            console.error('Error creating user:', error);
            alert('Failed to create user');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <fieldset className="max-w-xl flex items-center">
                    <label
                        htmlFor="name"
                        className="flex text-xl font-medium px-4}"
                    >Player Name:
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        disabled={isSubmitting}
                        className="px-4 ml-5 py-2 border text-xl font-medium  border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        maxLength={50}
                    />
                </fieldset>
                <GenderSelector value={gender} onChange={setGender} />
                <button
                    type="submit"
                    disabled={isSubmitting || !name.trim()}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                    {isSubmitting ? 'Starting...' : 'Start Game'}
                </button>
            </form>
        </div>
    );
}