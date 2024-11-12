import React, { FC, useState } from "react";
import { PurchaseItemType, State } from "../../../shared/types/types.ts";
import { useSelector } from "react-redux";
import SelectField from "widgets/Select/ui/SelectField.tsx";

import { purchaseItemStyle } from "shared/lib/tailwind-classes/purchase.js";
import arrow from "../../../img/list-arrow.gif";
import styles from "./StaticPurchaseListItem.module.css";

const StaticPurchaseListItem: FC<{
  setFilteredItems: React.Dispatch<React.SetStateAction<PurchaseItemType[]>>;
}> = ({ setFilteredItems }) => {
  const purchases = useSelector((state: State) => state.purchases);

  const sortByCollection = (name: string) => {
    if (!name) {
      setFilteredItems(purchases);
    } else setFilteredItems(purchases.filter((purchase) => purchase.collectionName === name));
  };

  return (
    <div className={`${purchaseItemStyle} bg-opacity-100`}>
      <div>Дата</div>
      <div>Описание</div>
      <div className={styles.item_medium_element}>
        <SelectField onChange={sortByCollection} collections={[]} />
      </div>
      <div>Ценна</div>
    </div>
  );
};

export default StaticPurchaseListItem;
