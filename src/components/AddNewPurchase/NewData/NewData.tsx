import { useState } from "react";
import React from "react";
import { PurchaseItemType, State } from "../../../types/types.ts";
import { useDispatch, useSelector } from "react-redux";
import styles from "./NewData.module.css";
import InputField from "./InputField.tsx";
import FormHeader from "../FormHeader.tsx";
import SelectField from "./SelectField.tsx";

const changeValue =
  (fn: Function): ((t: Event) => Function) =>
  ({ target }: { target: EventTarget }): ((s: string) => void) => {
    return fn((target as HTMLInputElement).value);
  };

const NewData = () => {
  const dispatch = useDispatch();
  const collections = useSelector((state: State) => state.collections);
  const [collection, setCollection] = useState("");
  const [price, setPrice] = useState<string | number>("");
  const [description, setDescription] = useState("");

  function dataSubmit(e) {
    e.preventDefault();
    let date = new Date();
    const newPurchase: Omit<PurchaseItemType, "_id"> = {
      collectionName: collection,
      price: Number(price),
      description: description,
      month: date.getMonth(),
      date: date.toLocaleString(),
      filterDate: Date.now(),
    };
    window.electronAPI.addBoughtItem(newPurchase);
    setPrice("");
    setDescription("");
  }

  return (
    <>
      <FormHeader text="Добавить покупку" />
      <form className={styles.add_form}>
        <SelectField
          onChange={changeValue(setCollection)}
          collections={collections}
        />
        <InputField
          type="number"
          value={price}
          placeholder="стоимость"
          onChange={changeValue(setPrice)}
        />
        <InputField
          type="text"
          value={description}
          placeholder="описание"
          onChange={changeValue(setDescription)}
        />
        <button
          onClick={dataSubmit}
          type="submit"
          className={`${styles.add_form_input} ${styles.add_form_button}`}
        >
          добавить
        </button>
      </form>
    </>
  );
};

export default NewData;
