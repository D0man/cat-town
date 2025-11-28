import { useEffect } from 'react';
import { useUserStore } from '../stores/userStore';

export function UserList() {
    const { users, isLoading, loadUsers } = useUserStore();

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (users.length === 0) {
        return <div>No users yet.</div>;
    }

    return (
        <ul>
            {users.map((user) => (
                <li key={user.id}>
                    {user.name} - {new Date(user.createdAt).toLocaleDateString()}
                </li>
            ))}
        </ul>
    );
}
