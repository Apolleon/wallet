import React, { FC, ReactElement } from "react";
import "./index.css";
import Statistics from "./components/Statistics/Statistics.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Diagrams from "./components/Diagrams.tsx";
import PurchaseList from "./components/Purchases/PurchaseList.tsx";
import Manager from "./components/Manager/Manager.jsx";
const Context = React.createContext({});
export { Context };

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path={"*"} element={<PurchaseList />} />
        <Route path={"/stats"} element={<Statistics />} />
        {/* <Route path={"diagram"} element={<Diagrams />} /> */}
        <Route path={"manager"} element={<Manager />} />
      </Routes>
    </>
  );
};

export default App;
