import React, { FC, useEffect, useState } from "react";
import { CollectionItemType } from "../../../types/types";

interface CollectionFormProps {
  props: CollectionItemType | {};
}

const CollectionForm: FC<CollectionFormProps> = ({ props }) => {
  const [collectionValue, setCollection] = useState({
    collection: "",
  });

  useEffect(() => {
    if (props) setCollection(props);
  }, []);

  function changeValue(e: InputEvent) {
    if (e.target)
      setCollection({ collection: (e.target as HTMLInputElement).value });
  }

  function setData() {
    if ("_id" in props) {
      //changeItem(collectionValue);
      // @ts-ignore
      window.electronAPI.editCollection(
        props.collection,
        collectionValue.collection
      );
    } else {
      // @ts-ignore
      window.electronAPI.addCollection(collectionValue);
    }
    setCollection({ collection: "" });
  }

  return (
    <form className={"collection-form"}>
      <div className={"add-form-div"}>
        <input
          type={"text"}
          name={"collection"}
          onChange={changeValue}
          value={collectionValue.collection}
        />
      </div>
      <button type={"button"} onClick={setData}>
        Сохранить
      </button>
    </form>
  );
};

export default CollectionForm;
