import React, { memo } from "react";
import NewData from "../AddNewPurchase/NewData/NewData.tsx";
import CollectionsList from "../AddNewPurchase/Collections/CollectionsList.tsx";
import TopNavigation from "../TopNavigation/TopNavigation.tsx";
import styles from "./Manager.module.css";
import Layout from "../Layout/Layout.tsx";

const Manager = memo(function Manager({ addItem }) {
  return (
    <Layout>
      <div className={styles.manager}>
        <NewData submit={addItem} />
        <CollectionsList />
      </div>
    </Layout>
  );
});

export default Manager;
