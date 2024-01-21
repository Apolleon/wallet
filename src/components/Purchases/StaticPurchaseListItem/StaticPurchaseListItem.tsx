import React, { FC, useState } from "react";
import { PurchaseItemType, State } from "../../../types";
import { useSelector } from "react-redux";

import arrow from "../../../img/list-arrow.gif";
import styles from "./StaticPurchaseListItem.module.css";
import MenuCollectionsList from "./MenuCollectionsList/MenuCollectionsList.tsx";

const StaticPurchaseListItem: FC<{
  setFilteredItems: (p: PurchaseItemType[]) => void;
}> = ({ setFilteredItems }) => {
  const purchases = useSelector((state: State) => state.purchases);
  const collections = useSelector((state: State) => state.collections);
  const [showList, setShowList] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("Категория");

  const toggleList = () => setShowList(!showList);

  const sortByCollection = (e: React.MouseEvent<Element, MouseEvent>) => {
    const content = (e.target as HTMLElement).textContent;
    if (content == "Выбери категорию") {
      setCategory("Категория");
      setFilteredItems(purchases);
    } else
      setFilteredItems(
        purchases.filter(
          (purchase: PurchaseItemType) => purchase.collectionName === content
        )
      );
  };

  return (
    <div className={styles.purchase_item}>
      <div className={styles.item_small_element}>Дата</div>
      <div className={styles.item_large_element}>Описание</div>
      <div className={styles.item_medium_element}>
        <div className={styles.collections_toggle} onClick={toggleList}>
          <div id={styles.check_collection}>
            <p>{category}</p>
            <img alt={"icon"} src={arrow} />
          </div>
          {showList && (
            <MenuCollectionsList sortByCollection={sortByCollection} />
          )}
        </div>
      </div>
      <div
        style={{ paddingLeft: "10%" }}
        className={styles.item_medium_element}
      >
        <span>Ценна</span>
      </div>
    </div>
  );
};

export default StaticPurchaseListItem;
