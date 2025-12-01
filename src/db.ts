import Dexie, { Table } from 'dexie';

export interface User {
  id?: number;
  name: string;
  gender: 'male' | 'female';
  createdAt: Date;
  lastOnline: number;
  savedGame: string;
}
export interface Resource {
  id?: number;
  name: string;
  value: number;
}

export interface Level {
  id?: number;
  skillName: string;
  value: number;
  exp: number
}

export class GameDatabase extends Dexie {
  users!: Table<User>;

  constructor() {
    super('GameDB');
    this.version(1).stores({
      users: '++id, name, lastOnline',
      resources: '++id, name, value',
      levels: '++id, skillname, value, exp',
    });
  }
}

export const db = new GameDatabase();