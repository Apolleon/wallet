import React, { FC } from "react";

const FormHeader: FC<{ text: string }> = ({ text }) => {
  return <h2>{text}</h2>;
};

export default FormHeader;
