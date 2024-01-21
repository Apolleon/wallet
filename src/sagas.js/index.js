import { collectionsSaga } from "./collectionSaga";
import { addPurchaseSaga, purchasesSaga } from "./purchasesSaga";
import { all } from "redux-saga/effects";
import { statisticsSaga } from "./statisticsSaga";

export default function* rootSaga() {
  yield all([
    collectionsSaga(),
    purchasesSaga(),
    addPurchaseSaga(),
    statisticsSaga(),
  ]);
}
