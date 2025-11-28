import { create } from 'zustand'
import { db, User } from '../db';

interface UserStore {
    users: User[];
    currentUser: null | User;
    isLoading: boolean;

    // Actions
    addUser: (name: string) => Promise<User>;
    updateLastOnline: (id: number) => Promise<void>;
    updateSavedGame: (id: number, savedGame: string) => Promise<void>;
    deleteUser: (id: number) => Promise<void>;
    setCurrentUser: (user: User | null) => void;
    logout: () => void;
    loadUsers: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
    users: [],
    currentUser: null,
    isLoading: false,
    setCurrentUser: (user: User | null) => {
        if (user && user.id) {
            get().updateLastOnline(user.id);
        }
        set({ currentUser: user });
    },
    loadUsers: async () => {
        set({ isLoading: true });
        try {
            const users = await db.users.toArray();
            set({ users, isLoading: false });
        } catch (error) {
            console.error('Failed to load users:', error);
            set({ isLoading: false });
        }
    },
    logout: () => {
        set({ currentUser: null });
    },

    addUser: async (name: string) => {
        try {
            const newUser: User = {
                name,
                createdAt: new Date(),
                lastOnline: Date.now(),
                savedGame: '' // Empty saved game initially
            };

            const id = await db.users.add(newUser);
            const createdUser = { ...newUser, id: Number(id) };

            set(state => ({
                users: [...state.users, createdUser]
            }));

            return createdUser;
        } catch (error) {
            console.error('Failed to add user:', error);
            throw error;
        }
    },
    updateLastOnline: async (id: number) => {
        try {
            const timestamp = Date.now();
            await db.users.update(id, { lastOnline: timestamp });

            set(state => ({
                users: state.users.map(user =>
                    user.id === id ? { ...user, lastOnline: timestamp } : user
                ),
                currentUser: state.currentUser?.id === id
                    ? { ...state.currentUser, lastOnline: timestamp }
                    : state.currentUser
            }));
        } catch (error) {
            console.error('Failed to update last online:', error);
            throw error;
        }
    },
    deleteUser: async (id: number) => {
        try {
            await db.users.delete(id);

            set(state => ({
                users: state.users.filter(user => user.id !== id),
                currentUser: state.currentUser?.id === id ? null : state.currentUser
            }));
        } catch (error) {
            console.error('Failed to delete user:', error);
            throw error;
        }
    },
    // Update saved game data
    updateSavedGame: async (id: number, savedGame: string) => {
        try {
            await db.users.update(id, { savedGame });

            set(state => ({
                users: state.users.map(user =>
                    user.id === id ? { ...user, savedGame } : user
                ),
                currentUser: state.currentUser?.id === id
                    ? { ...state.currentUser, savedGame }
                    : state.currentUser
            }));
        } catch (error) {
            console.error('Failed to update saved game:', error);
            throw error;
        }
    },
}))


export default useUserStore;