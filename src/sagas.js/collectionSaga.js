import { takeEvery, put } from "redux-saga/effects";
import { ReduxActions, UserActions } from "../types.ts";

function* getCollections() {
  yield window.electronAPI.getAllCollections();
  yield window.electronAPI.handleCollections((event, value) =>
    put({ type: ReduxActions.SetCollections, payload: value })
  );
}

function* editCollection(action) {
  yield window.electronAPI.editCollection(action.payload);
  yield window.electronAPI.handleCollections((event, value) =>
    put({ type: ReduxActions.SetCollections, payload: value })
  );
  yield window.electronAPI.handleCounter((event, value) =>
    put({ type: ReduxActions.SetPurchases, payload: value })
  );
}

export function* collectionsSaga() {
  yield takeEvery(UserActions.GetCollections, getCollections);
}

export function* editCollectionSaga() {
  yield takeEvery(UserActions.ChangeCollection, editCollection);
}
