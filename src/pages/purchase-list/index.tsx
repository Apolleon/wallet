import React, { useEffect, useState, FC, memo } from "react";
import PurchasesListItem from "entities/Purchase/ui/PurchasesListItem.tsx";
import { useSelector, useDispatch } from "react-redux";
import { PurchaseItemType, State } from "../../shared/types/types.ts";
import StaticPurchaseListItem from "widgets/PurchaseListHeader/ui/StaticPurchaseListItem.tsx";

import { purchaseItemStyle } from "shared/lib/tailwind-classes/purchase.js";
import { setPurchases } from "shared/lib/slices/purchaseSlice.ts";
import { setCollections } from "shared/lib/slices/collectionSlice.ts";

const PurchaseList: FC = () => {
  ////////////////////
  const dispatch = useDispatch();
  const purchases: PurchaseItemType[] = useSelector((state: State) => state.purchases);
  const [filteredItems, setFilteredItems] = useState<PurchaseItemType[]>(purchases);

  useEffect(() => {
    window.electronAPI.getAllBoughts();
    window.electronAPI.handleBoughts((event, value) => {
      dispatch(setPurchases({ payload: value }));
    });
    window.electronAPI.getAllCollections();
    window.electronAPI.handleCollections((event, value) => {
      dispatch(setCollections({ payload: value }));
    });
  }, []);

  useEffect(() => {
    setFilteredItems(purchases);
  }, [purchases]);

  return (
    <>
      <StaticPurchaseListItem setFilteredItems={setFilteredItems} />
      <div className={purchaseItemStyle}>
        {filteredItems.map((purchase, index) => (
          <PurchasesListItem index={index} key={purchase._id} item={purchase} />
        ))}
      </div>
    </>
  );
};

export default memo(PurchaseList);
