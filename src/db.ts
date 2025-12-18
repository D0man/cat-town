// db.ts
import Dexie, { Table } from 'dexie';

export interface User {
  id?: number;
  name: string;
  gender: 'male' | 'female';
  createdAt: Date;
  lastOnline: number;
  lastOnlineLogin: number;
  savedGame: string;
}

export interface Skill {
  userId: number;
  skillName: string;
  level: number;
  exp: number;
  active?: boolean,
  actionName?: string
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
    this.version(7).stores({
      users: '++id, name, lastOnline, lasOnlineLogin',
      skills: '[userId+skillName], userId',
      inventory: '[userId+itemId], userId',
    });
  }
}

export const db = new GameDatabase();