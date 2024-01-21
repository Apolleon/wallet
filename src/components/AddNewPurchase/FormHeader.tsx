import React, { FC } from "react";
import styles from "./AddNewPurchase.module.css";

const FormHeader: FC<{ text: string }> = ({ text }) => {
  return <h2 className={styles.form_header}>{text}</h2>;
};

export default FormHeader;
