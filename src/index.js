import React from "react";
import store from "app/store";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { router } from "./app/router";
import "app/index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
