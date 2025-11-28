import { useState, FormEvent } from 'react';
import { useUserStore } from '../stores/userStore';

export function UserRegistration() {
    const [name, setName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { addUser, setCurrentUser } = useUserStore();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmed = name.trim();

        // Validate name
        if (!trimmed) {
            alert('Please enter a name');
            return;
        }
        if (trimmed.length <= 3) {
            alert('Please use at least 3 letters');
            return;
        }

        setIsSubmitting(true);

        try {
            // Add user to database
            const newUser = await addUser(name.trim());

            // Auto-login the new user
            setCurrentUser(newUser);

            // Clear form
            setName('');

            console.log('User created:', newUser);
        } catch (error) {
            console.error('Error creating user:', error);
            alert('Failed to create user');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Create New User</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                    >
                        Player Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        disabled={isSubmitting}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        maxLength={50}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting || !name.trim()}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                    {isSubmitting ? 'Creating...' : 'Create User'}
                </button>
            </form>
        </div>
    );
}