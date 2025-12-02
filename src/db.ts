// db.ts
import Dexie, { Table } from 'dexie';

export interface User {
  id?: number;
  name: string;
  gender: 'male' | 'female';
  createdAt: Date;
  lastOnline: number;
  savedGame: string;
}

export interface Skill {
  id?: number;
  userId: number;
  skillName: string;
  level: number;
  exp: number;
}

export interface InventoryItem {
  id?: number;
  userId: number;
  itemId: string;
  quantity: number;
}

export class GameDatabase extends Dexie {
  users!: Table<User>;
  skills!: Table<Skill>;
  inventory!: Table<InventoryItem>;

  constructor() {
    super('GameDB');
    this.version(1).stores({
      users: '++id, name, lastOnline',
      skills: '++id, [userId+skillName], userId',
      inventory: '++id, [userId+itemId], userId',
    });
  }
}

export const db = new GameDatabase();