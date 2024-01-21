import { takeEvery, put } from "redux-saga/effects";
import { ReduxActions, UserActions } from "../types.ts";

function* getPurchases() {
  yield window.electronAPI.getAllPurchases();
  const data = yield window.electronAPI.handlePurchases(
    (event, value) => value
  );
  yield put({ type: ReduxActions.SetPurchases, payload: data });
}

function* addPurchase(purchase) {
  yield put({ type: ReduxActions.AddPurchase, payload: purchase });
  console.log(purchase);
}

export function* purchasesSaga() {
  yield takeEvery(UserActions.GetPurchases, getPurchases());
}

export function* addPurchaseSaga() {
  yield takeEvery(UserActions.NewPurchase, addPurchase);
}
