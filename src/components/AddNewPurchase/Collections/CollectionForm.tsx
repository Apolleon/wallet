import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { CollectionItemType, ReduxActions } from "../../../types/types";
import { useDispatch } from "react-redux";

interface CollectionFormProps {
  props: CollectionItemType | {};
}

const CollectionForm: FC<CollectionFormProps> = ({ props }) => {
  const [collectionValue, setCollection] = useState({
    collection: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if ("_id" in props) setCollection(props);
  }, [props]);

  function changeValue(event: ChangeEvent<HTMLInputElement>) {
    if (event.target) setCollection({ collection: event.target.value });
  }

  function setData() {
    if ("_id" in props) {
      dispatch({
        type: ReduxActions.EditCollection,
        payload: {
          ...props,
          newName: collectionValue.collection,
        },
      });
      window.electronAPI.editCollection({
        ...props,
        newName: collectionValue.collection,
      });
    } else {
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
