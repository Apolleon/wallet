import React, { FC } from "react";

interface MenuCollectionItemProps {
  sortByCollection: (e: React.MouseEvent<Element, MouseEvent>) => void;
  category: string;
}

const MenuCollectionItem: FC<MenuCollectionItemProps> = ({
  sortByCollection,
  category,
}) => <li onClick={(e) => sortByCollection(e)}>{category}</li>;

export default MenuCollectionItem;
