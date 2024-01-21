import { takeEvery, put } from "redux-saga/effects";
import { ReduxActions, UserActions } from "../types.ts";

function* getCollections() {
  yield window.electronAPI.getAllCollections();
  const data = yield window.electronAPI.handleCollections(
    (event, value) => value
  );
  yield put({ type: ReduxActions.SetCollections, payload: data });
}

export function* collectionsSaga() {
  yield takeEvery(UserActions.GetCollections, getCollections());
}
