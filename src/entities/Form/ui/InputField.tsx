import React, { FC, memo } from "react";

interface FieldProps {
  type: string;
  value: string | number;
  onChange: (t) => typeof t;
  placeholder: string;
}

const Field: FC<FieldProps> = ({ type, value, onChange, placeholder }) => {
  return (
    <input
      className={"border border-solid border-gray-200 text-gray-200 h-full w-full py-2 px-1"}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

const InputField = memo(Field);

export default InputField;
