import { createSlice } from "@reduxjs/toolkit";
import { CollectionItemType } from "shared/types/types";

const initialState: { collections: CollectionItemType[] } = { collections: [] };

const collectionsSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    setCollections: (state, action) => {
      state.collections = action.payload;
    },
    deleteCollection: (state, action) => {
      state.collections = state.collections.filter((collection) => collection._id !== action.payload);
    },
    editCollection: (state, action) => {
      state.collections = state.collections.map((collection) =>
        collection._id === action.payload._id ? action.payload : collection
      );
    },
  },
});

export default collectionsSlice.reducer;
export const { setCollections, deleteCollection, editCollection } = collectionsSlice.actions;
