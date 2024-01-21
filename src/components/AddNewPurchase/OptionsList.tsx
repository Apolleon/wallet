import React, { FC } from "react";
import { CollectionItemType } from "../../types";
import OptionItem from "./OptionItem.tsx";

interface OptionsListProps {
  list: CollectionItemType[];
}

const OptionsList: FC<OptionsListProps> = ({ list }) => {
  return (
    <>
      {list.map((collectionItem: CollectionItemType) => (
        <OptionItem collectionItem={collectionItem} key={collectionItem._id} />
      ))}
    </>
  );
};

export default OptionsList;
