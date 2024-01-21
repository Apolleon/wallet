import React, { FC } from "react";
import styles from "./NewData.module.css";
import OptionsList from "../OptionsList.tsx";
import { CollectionItemType } from "../../../types";

interface SelectFieldProps {
  onChange: (t) => typeof t;
  collections: CollectionItemType[];
}

const SelectField: FC<SelectFieldProps> = ({ onChange, collections }) => {
  return (
    <select className={styles.add_form_input} name="select" onChange={onChange}>
      <option value={""}>Выбери категорию</option>
      <OptionsList list={collections} />
    </select>
  );
};

export default SelectField;
