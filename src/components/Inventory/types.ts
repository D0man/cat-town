
export type UniqueIdentifier = string | number;

export interface Item {
  id: UniqueIdentifier;
  description: string;
  img: string;
}
export interface ItembyDb {
  itemId: string;
  amount: number;
  position: number;
}

export interface Container {
  id: UniqueIdentifier;
  title: string;
  items: Item[];
}

export type ContainersMap = Record<UniqueIdentifier, ItembyDb[]>;
export type ContainerTitleMap = Record<UniqueIdentifier, string>;
