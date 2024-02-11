import { CollectionItemType, PurchaseItemType } from "./types.ts";

interface CollectionForEdit extends CollectionItemType {
  newName: string;
}

export interface IElectronAPI {
  getAllStatistics: () => Promise<void>;
  handleStatistics: (event: Event, statistics) => Promise<void>;
  addBoughtItem: (boughtItem: Omit<PurchaseItemType, "_id">) => Promise<void>;
  deleteBoughtItem: (boughtItemId: string) => Promise<void>;
  handleBoughts: (
    cb: (e: Event, boughtItems: PurchaseItemType[]) => void
  ) => Promise<void>;
  getAllCollections: () => Promise<void>;
  editCollection: (col: CollectionForEdit) => Promise<void>;
  handleCollections: (
    cb: (event: Event, collections: CollectionItemType[]) => void
  ) => Promise<void>;
  addCollection: (collection: Omit<CollectionItemType, "_id">) => Promise<void>;
  getAllBoughts: () => Promise<void>;
  deleteCollection: (id: string) => Promise<void>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
