import { CollectionItemType, PurchaseItemType } from "./types.ts";

export interface IElectronAPI {
  getAllStatistics: () => Promise<void>;
  handleStatistics: (event: Event, statistics) => Promise<void>;
  addBoughtItem: (boughtItem: PurchaseItemType) => Promise<void>;
  deleteBoughtItem: (
    boughtItemId: Pick<PurchaseItemType, "_id">
  ) => Promise<void>;
  handleBoughts: (
    cb: (e: Event, boughtItems: PurchaseItemType[]) => void
  ) => Promise<void>;
  getAllCollections: () => Promise<void>;
  editCollection: (oldName: string, collectionName: string) => Promise<void>;
  handleCollections: (
    cb: (event: Event, collections: CollectionItemType[]) => void
  ) => Promise<void>;
  addCollection: (collection: Omit<CollectionItemType, "_id">) => Promise<void>;
  getAllBoughts: () => Promise<void>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
