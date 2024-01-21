import React, { memo } from "react";
import NewData from "../AddNewPurchase/NewData/NewData.tsx";
import CollectionsList from "../AddNewPurchase/Collections/CollectionsList.tsx";
import TopNavigation from "../TopNavigation/TopNavigation.tsx";
import styles from "./Manager.module.css";

const Manager = memo(function Manager({ addItem }) {
  return (
    <div className="container main-div">
      <TopNavigation />
      <div className={styles.manager}>
        <NewData submit={addItem} />
        <CollectionsList />
      </div>
    </div>
  );
});

export default Manager;
