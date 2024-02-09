import React, { FC } from "react";
import MenuCollectionItem from "./MenuCollectionItem.tsx";
import styles from "../StaticPurchaseListItem.module.css";
import { useSelector } from "react-redux";
import { State } from "../../../../types.ts";

interface MenuCollectionsListProps {
  sortByCollection: (e: React.MouseEvent<Element, MouseEvent>) => void;
}

const MenuCollectionsList: FC<MenuCollectionsListProps> = ({
  sortByCollection,
}) => {
  const collections = useSelector((state: State) => state.collections);

  return (
    <ul className={styles.selector}>
      <li onClick={(e) => sortByCollection(e)}>Выбери категорию</li>
      {collections.map((category) => (
        <MenuCollectionItem
          key={category._id}
          sortByCollection={sortByCollection}
          category={category.collection}
        />
      ))}
    </ul>
  );
};

export default MenuCollectionsList;
