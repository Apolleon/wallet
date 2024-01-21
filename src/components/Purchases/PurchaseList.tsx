import React, { useEffect, useState, FC } from "react";
import ListItem from "./PurchasesListItem/PurchasesListItem.tsx";
// import icon from "../../img/list-arrow.gif";
import { useSelector, useDispatch } from "react-redux";
import { PurchaseItemType, State, UserActions } from "../../types.ts";
import TopNavigation from "../TopNavigation/TopNavigation.tsx";
import StaticPurchaseListItem from "./StaticPurchaseListItem/StaticPurchaseListItem.tsx";

const PurchaseList: FC = () => {
  const purchases: PurchaseItemType[] = useSelector(
    (state: State) => state.purchases
  );
  const dispatch = useDispatch();

  const [filteredItems, setFilteredItems] = useState<PurchaseItemType[]>([]);

  useEffect(() => {
    // dispatch({ type: UserActions.GetCollections });
    // dispatch({ type: UserActions.GetPurchases });
    //dispatch({ type: UserActions.GetStatistics });
  }, []);

  useEffect(() => {
    setFilteredItems(purchases);
  }, [purchases]);

  return (
    <div className="container main-div">
      <TopNavigation />
      <StaticPurchaseListItem setFilteredItems={setFilteredItems} />
      <div className="some-list">
        {filteredItems.map((i, index) => (
          <ListItem index={index} key={index} item={i} />
        ))}
      </div>
    </div>
  );
};

export default PurchaseList;
