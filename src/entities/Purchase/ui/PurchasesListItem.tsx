import React, { FC, memo } from "react";
import { useDispatch } from "react-redux";
import { PurchaseItemType } from "../../../shared/types/types.ts";
import styles from "./PurchaseListItem.module.css";
import { deleteCollection } from "shared/lib/slices/collectionSlice.ts";

interface ListItemProps {
  item: PurchaseItemType;
  index: number;
}

const PurchasesListItem: FC<ListItemProps> = ({ item }) => {
  const dispatch = useDispatch();

  const handleDelete = (id: string): void => {
    window.electronAPI.deleteBoughtItem(id);
    dispatch(deleteCollection({ payload: id }));
  };

  return (
    <>
      <div>{item.date}</div>
      <div>{item.description}</div>
      <div>{item.collectionName}</div>
      <div>
        {item.price + " р"}
        <button onClick={() => handleDelete(item._id)} className={`ml-4 ${styles.item_btn} `}>
          X
        </button>
      </div>
    </>
  );
};

export default memo(PurchasesListItem);
