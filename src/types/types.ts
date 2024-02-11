export interface PurchaseItemType {
  collectionName: string;
  price: number;
  description: string;
  month: number;
  date: string;
  filterDate: number;
  _id: string;
}

export interface CollectionItemType {
  _id: string;
  collection: string;
}

interface MonthObj {
  [index: number]: number;
}

export interface State {
  purchases: PurchaseItemType[];
  collections: CollectionItemType[];
  statisticsData: MonthObj;
}

export enum ReduxActions {
  SetPurchases = "SET_PURCHASES",
  SetCollections = "SET_COLLECTIONS",
  DeleteCollection = "DELETE_COLLECTION",
  DeletePurchase = "DELETE_PURCHASE",
  AddPurchase = "ADD_PURCHASE",
  AddCollection = "ADD_COLLECTION",
  SetStatistics = "SET_STATISTICS",
  EditCollection = "EDIT_COLLECTION",
}
