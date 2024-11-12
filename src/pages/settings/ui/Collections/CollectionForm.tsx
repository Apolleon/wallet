import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { CollectionItemType, ReduxActions } from "shared/types/types";
import { useDispatch } from "react-redux";
import { editCollection } from "shared/lib/slices/collectionSlice";

interface CollectionFormProps {
  props: CollectionItemType | {};
}

const CollectionForm: FC<CollectionFormProps> = ({ props }) => {
  const dispatch = useDispatch();
  const [collectionValue, setCollection] = useState({
    collection: "",
  });

  useEffect(() => {
    if ("_id" in props) setCollection(props);
  }, [props]);

  const changeValue = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target) return;
    setCollection({ collection: event.target.value });
  };

  const setData = () => {
    if ("_id" in props) {
      dispatch(
        editCollection({
          payload: {
            ...props,
            newName: collectionValue.collection,
          },
        })
      );
      window.electronAPI.editCollection({
        ...props,
        newName: collectionValue.collection,
      });
    } else {
      window.electronAPI.addCollection(collectionValue);
    }
    setCollection({ collection: "" });
  };

  return (
    <form className={"collection-form"}>
      <div className={"add-form-div"}>
        <input type={"text"} name={"collection"} onChange={changeValue} value={collectionValue.collection} />
      </div>
      <button type={"button"} onClick={setData}>
        Сохранить
      </button>
    </form>
  );
};

export default CollectionForm;
