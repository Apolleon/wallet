import { createSlice } from "@reduxjs/toolkit";
import { PurchaseItemType } from "shared/types/types";

const initialState: { purchases: PurchaseItemType[] } = {
  purchases: [],
};

const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    setPurchases: (state, action) => (state.purchases = action.payload),
    deletePurchase: (state, action) => {
      state.purchases = state.purchases.filter((purchase) => purchase._id !== action.payload);
    },
  },
});

export const { setPurchases } = purchaseSlice.actions;

export default purchaseSlice.reducer;
