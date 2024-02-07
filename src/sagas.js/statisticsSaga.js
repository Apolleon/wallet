import { put, takeEvery } from "redux-saga/effects";
import { ReduxActions, UserActions } from "../types.ts";

function* getStatistics() {
  yield window.electonApi.getAllStatistics();
  yield window.electonApi.handleStatistics((event, value) => {
    put({ type: ReduxActions.SetStatistics, payload: value });
  });
}

export function* statisticsSaga() {
  takeEvery(UserActions.GetStatistics, getStatistics);
}
