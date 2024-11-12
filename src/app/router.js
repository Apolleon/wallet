import { createBrowserRouter } from "react-router-dom";
import Settings from "pages/settings";
import Statistics from "pages/statistics";
import PurchaseList from "pages/purchase-list";
import Layout from "widgets/Layout/ui/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <PurchaseList />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/stats",
        element: <Statistics />,
      },
      {
        path: "*",
        element: <PurchaseList />,
      },
    ],
  },
]);
