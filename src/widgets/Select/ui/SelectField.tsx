import React, { FC, useState } from "react";
import OptionsList from "../../../entities/OptionList/ui/OptionsList.tsx";
import { CollectionItemType } from "../../../shared/types/types.ts";

interface SelectFieldProps {
  onChange: (collectionName: string) => void;
  collections: CollectionItemType[];
}

const SelectField: FC<SelectFieldProps> = ({ onChange, collections }) => {
  const [showList, setShowList] = useState(false);
  const [header, setHeader] = useState("Показать все");

  const handleSelect = (collectionName: string) => {
    onChange(collectionName);
    setShowList(false);
    setHeader(collectionName);
  };

  return (
    <div className={"::placeholder:text-gray-200 relative w-full"}>
      <span className=" cursor-pointer" onClick={() => setShowList(!showList)}>
        {header || "Показать все"}
      </span>
      {showList && (
        <div className="absolute bg-black bg-opacity-90 z-50 w-full top-full left-0">
          <div className="py-1 px-2 cursor-pointer" onClick={() => handleSelect("")}>
            Показать все
          </div>
          <OptionsList handleSelect={handleSelect} />
        </div>
      )}
    </div>
  );
};

export default SelectField;
