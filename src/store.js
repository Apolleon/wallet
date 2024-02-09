import reducer from "./reducers/index.ts";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({ reducer: reducer });

export default store;
