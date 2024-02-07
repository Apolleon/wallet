import { ReduxActions, State } from "../types.ts";

const initialState: State = {
  purchases: [],
  collections: [],
  statisticsData: [],
};

const reducer = (
  state: State = initialState,
  action: { type: string; payload }
) => {
  console.log(action);
  switch (action.type) {
    case ReduxActions.SetPurchases:
      return { ...state, purchases: action.payload };
    case ReduxActions.SetCollections:
      console.log(action.payload, "dfsdf");
      return { ...state, collections: action.payload };
    case ReduxActions.DeletePurchase:
      return {
        ...state,
        purchases: state.purchases.filter(
          (purchase) => purchase._id === action.payload
        ),
      };
    case ReduxActions.DeleteCollection:
      return {
        ...state,
        collections: state.collections.filter(
          (collection) => collection._id !== action.payload
        ),
      };
    case ReduxActions.AddPurchase:
      return { ...state, purchases: [...state.purchases, action.payload] };
    case ReduxActions.SetStatistics:
      return { ...state, statisticsData: action.payload };
    default:
      return state;
  }
};

export default reducer;
