import { configureStore } from "@reduxjs/toolkit";
import collectionsReducer from "shared/lib/slices/collectionSlice";
import purchasesReducer from "shared/lib/slices/purchaseSlice";
import statisticsReducer from "shared/lib/slices/statisticsSlice";

const store = configureStore({
  reducer: {
    collections: collectionsReducer,
    purchases: purchasesReducer,
    statistics: statisticsReducer,
  },
});

export default store;
