import React, { memo } from "react";
import NewData from "widgets/NewPurchase/ui/NewPurchase";
import CollectionsList from "./ui/Collections/CollectionsList";

const Settings = () => {
  return (
    <>
      <NewData />
      <CollectionsList />
    </>
  );
};

export default memo(Settings);
