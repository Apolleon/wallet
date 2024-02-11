import React, { FC, memo } from "react";
import { useDispatch } from "react-redux";
import { PurchaseItemType, UserActions } from "../../../types/types.ts";
import styles from "./PurchaseListItem.module.css";

type backColor = "greyback" | undefined;
type buttonBackColor = "blackback" | "whiteback";
interface ListItemProps {
  item: PurchaseItemType;
  index: number;
}

const getColumnClass = (num: number): backColor => {
  if (num % 2 === 0) return "greyback";
};

const getButtonClass = (num: number): buttonBackColor => {
  if (num % 2 === 0) return "blackback";
  else return "whiteback";
};

const PurchasesListItem: FC<ListItemProps> = ({ item, index }) => {
  const dispatch = useDispatch();

  const handleDelete = (id: string): void => {
    dispatch({ type: UserActions.RemovePurchase, payload: id });
  };

  return (
    <div className="some-list">
      <div className={getColumnClass(index)}>
        <div className={styles.purchase_item}>
          <div className={styles.item_small_element}>{item.date}</div>
          <div className={styles.item_large_element}>{item.description}</div>
          <div className={styles.item_medium_element}>
            {item.collectionName}
          </div>
          <div className={styles.item_small_element}>{item.price + " р"}</div>
          <div>
            <button
              onClick={() => {
                handleDelete(item._id);
              }}
              className={`${styles.item_btn} ${getButtonClass(index)}`}
            >
              X
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PurchasesListItem);
