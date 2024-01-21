import React from "react";
import store from "./store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App.tsx";

import { createRoot } from "react-dom/client";
import Manager from "./components/Manager/Manager.jsx";
import Statistics from "./components/Statistics/Statistics.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/manager",
    element: <Manager />,
  },
  {
    path: "/stats",
    element: <Statistics />,
  },
]);

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
