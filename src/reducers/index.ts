//@ts-nocheck
import { ReduxActions, State } from "../types/types.ts";

const initialState: State = {
  purchases: [],
  collections: [],
  statisticsData: [],
};

const reducer = (
  state: State = initialState,
  action: { type: string; payload }
) => {
  switch (action.type) {
    case ReduxActions.SetPurchases:
      return { ...state, purchases: action.payload };

    case ReduxActions.SetCollections:
      return { ...state, collections: action.payload };

    case ReduxActions.DeletePurchase:
      return {
        ...state,
        purchases: state.purchases.filter(
          (purchase) => purchase._id !== action.payload
        ),
      };

    case ReduxActions.DeleteCollection:
      return {
        ...state,
        collections: state.collections.filter(
          (collection) => collection._id !== action.payload
        ),
      };

    case ReduxActions.SetStatistics:
      return { ...state, statisticsData: action.payload };

    case ReduxActions.EditCollection:
      return {
        ...state,
        collections: state.collections.map((collection) =>
          collection._id === action.payload._id ? action.payload : collection
        ),
      };

    default:
      return state;
  }
};

export default reducer;
