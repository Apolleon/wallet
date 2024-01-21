import React, { FC, memo } from "react";
import styles from "./NewData.module.css";

interface FieldProps {
  type: string;
  value: string | number;
  onChange: (t) => typeof t;
  placeholder: string;
}

const Field: FC<FieldProps> = ({ type, value, onChange, placeholder }) => {
  return (
    <input
      className={styles.add_form_input}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

const InputField = memo(Field);

export default InputField;
