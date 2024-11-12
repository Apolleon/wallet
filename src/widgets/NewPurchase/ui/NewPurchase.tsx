import { useState } from "react";
import React from "react";
import { PurchaseItemType, State } from "../../../shared/types/types.ts";
import { useSelector } from "react-redux";
import InputField from "../../../entities/Form/ui/InputField.tsx";
import FormHeader from "../../../entities/Form/ui/FormHeader.tsx";
import SelectField from "../../Select/ui/SelectField.tsx";

import styles from "./NewPurchase.module.css";

const changeValue =
  (fn: Function): ((t: Event) => Function) =>
  ({ target }: { target: EventTarget }): ((s: string) => void) => {
    return fn((target as HTMLInputElement).value);
  };

const NewData = () => {
  const collections = useSelector((state: State) => state.collections);
  const [collection, setCollection] = useState("");
  const [price, setPrice] = useState<string | number>("");
  const [description, setDescription] = useState("");

  const dataSubmit = (e: React.FormEvent) => {
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
  };

  return (
    <>
      <FormHeader text="Добавить покупку" />
      <form className={styles.add_form}>
        <SelectField onChange={setCollection} collections={collections} />
        <InputField type="number" value={price} placeholder="стоимость" onChange={changeValue(setPrice)} />
        <InputField type="text" value={description} placeholder="описание" onChange={changeValue(setDescription)} />
        <button onClick={dataSubmit} type="submit" className={`${styles.add_form_input} ${styles.add_form_button}`}>
          добавить
        </button>
      </form>
    </>
  );
};

export default NewData;
