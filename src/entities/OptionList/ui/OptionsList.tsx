import React, { FC } from "react";
import { CollectionItemType } from "../../../shared/types/types.ts";
import { useSelector } from "react-redux";

interface OptionsListProps {
  handleSelect: (collectionName: string) => void;
}

const OptionsList: FC<OptionsListProps> = ({ handleSelect }) => {
  const collections = useSelector((state) => state.collections);
  return (
    <>
      {collections.map((collectionItem: CollectionItemType) => (
        <div className={`py-1 px-2 cursor-pointer text-lg`} onClick={() => handleSelect(collectionItem.collection)}>
          {collectionItem.collection}
        </div>
      ))}
    </>
  );
};

export default OptionsList;
