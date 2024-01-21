import React, { FC } from "react";
import { CollectionItemType } from "../../types";

interface OptionItemProps {
  collectionItem: CollectionItemType;
}

const OptionItem: FC<OptionItemProps> = ({ collectionItem }) => (
  <option value={collectionItem.collection}>{collectionItem.collection}</option>
);

export default OptionItem;
