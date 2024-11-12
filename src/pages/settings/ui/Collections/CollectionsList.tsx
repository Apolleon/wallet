import React, { FC, useState } from "react";
import editbtn from "shared/img/edit-icon.gif";
import deletebtn from "shared/img/delete-icon.gif";
import CollectionForm from "./CollectionForm.tsx";
import { useDispatch, useSelector } from "react-redux";
import { CollectionItemType, ReduxActions, State } from "shared/types/types.ts";
import FormHeader from "entities/Form/ui/FormHeader.tsx";
import { deleteCollection } from "shared/lib/slices/collectionSlice.ts";

const CollectionsList = () => {
  const [initialData, setInitialData] = useState<CollectionItemType | {}>({});
  const collections = useSelector((state: State) => state.collections);
  const dispatch = useDispatch();

  const editCollection = (item: CollectionItemType) => {
    if (item._id) setInitialData({ ...item, prev: item.collection });
    else setInitialData({});
  };

  const handleDelete = (id: string) => {
    dispatch(deleteCollection({ payload: id }));
    window.electronAPI.deleteCollection(id);
  };

  return (
    <div className="mt-8">
      <FormHeader text="Редактор категорий" />
      <div className="flex">
        <CollectionForm props={initialData} />
        <div className="w-1/2">
          {collections.map((collection) => (
            <CollectionItem
              collection={collection}
              handleDeleteCollection={() => handleDelete(collection._id)}
              handleEditCollection={() => editCollection(collection)}
              key={collection._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface Props {
  collection: CollectionItemType;
  handleEditCollection: () => void;
  handleDeleteCollection: () => void;
}

const CollectionItem: FC<Props> = ({ collection, handleEditCollection, handleDeleteCollection }) => (
  <div className={"center-div"}>
    <h6 className={"header"}>{collection.collection}</h6>
    <div>
      <button onClick={handleEditCollection} style={{ marginRight: "30px" }}>
        <img alt={"img-alt"} src={editbtn} />
      </button>
      <button onClick={handleDeleteCollection}>
        <img alt={"img-alt"} src={deletebtn} />
      </button>
    </div>
  </div>
);

export default CollectionsList;
