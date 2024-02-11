import React, { useEffect, useState, FC, memo } from "react";
import ListItem from "./PurchasesListItem/PurchasesListItem.tsx";
import { useSelector, useDispatch } from "react-redux";
import { PurchaseItemType, ReduxActions, State } from "../../types/types.ts";
import TopNavigation from "../TopNavigation/TopNavigation.tsx";
import StaticPurchaseListItem from "./StaticPurchaseListItem/StaticPurchaseListItem.tsx";

const PurchaseList: FC = () => {
  const purchases: PurchaseItemType[] = useSelector(
    (state: State) => state.purchases
  );
  const dispatch = useDispatch();
  const [filteredItems, setFilteredItems] =
    useState<PurchaseItemType[]>(purchases);

  useEffect(() => {
    window.electronAPI.getAllBoughts();
    window.electronAPI.handleBoughts((event, value) => {
      dispatch({ type: ReduxActions.SetPurchases, payload: value });
    });
    window.electronAPI.getAllCollections();
    window.electronAPI.handleCollections((event, value) => {
      dispatch({ type: ReduxActions.SetCollections, payload: value });
    });
  }, []);

  useEffect(() => {
    setFilteredItems(purchases);
  }, [purchases]);

  return (
    <div className="container main-div">
      <TopNavigation />
      <StaticPurchaseListItem setFilteredItems={setFilteredItems} />
      {filteredItems.map((i, index) => (
        <ListItem index={index} key={index} item={i} />
      ))}
    </div>
  );
};

export default memo(PurchaseList);
